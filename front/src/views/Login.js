import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Button from '../components/atomic/Button/Button';
import { auth, register } from '../actions/userActions';
import AuthTemplate from '../templates/AuthTemplate';
import { routes } from '../routes';
import Heading from '../components/atomic/Heading/Heading';
import Input from '../components/atomic/Input/Input';
import { typesOfItems } from '../static/types';
import messages from '../static/messages';

const { home } = routes;
const { login } = messages.views;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const INPUTS = {
  USERNAME: 'username',
  CONFIRM_PASSWORD: 'confirmPassword',
  PASSWORD: 'password',
};

const Login = ({
       userID,
       authAction,
       registerAction,
       ...props
   }) => {
    const [isDisabled, setDisabled] = useState(false);
    const changeDisabled = (firstField, secondField) => {
        const check = props.isRegistration
            ? firstField === secondField && !(firstField === '' || secondField === '')
            : !(firstField === '' || secondField === '');
        setDisabled(check);
    };
    return (
        <AuthTemplate>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    ...(props.isRegistration && { confirmPassword: '' })
                }}
                onSubmit={({ username, password }) => props.isRegistration
                    ? registerAction(username, password)
                    : authAction(username, password)}
            >
                {({ handleChange, handleBlur, values }) => {
                    const { isRegistration } = props;
                    if (userID) return <Redirect to={home} />;
                    else return (
                        <>
                            <Heading>{isRegistration ? login.register : login.logIn}</Heading>
                            <StyledForm>
                                <StyledInput
                                    name={INPUTS.USERNAME}
                                    type="text"
                                    placeholder={login.email}
                                    onBlur={handleBlur}
                                    onChange={event => {
                                        changeDisabled(event.target.value, values.password);
                                        handleChange(event);
                                    }}
                                    value={values.username}
                                />
                                <StyledInput
                                    name={INPUTS.PASSWORD}
                                    type="password"
                                    placeholder={login.password}
                                    onBlur={handleBlur}
                                    onChange={event => {
                                        if (isRegistration) changeDisabled(event.target.value, values.confirmPassword);
                                        else changeDisabled(values.username, event.target.value);
                                        handleChange(event);
                                    }}
                                    value={values.password}
                                />
                                {isRegistration && <StyledInput
                                    name={INPUTS.CONFIRM_PASSWORD}
                                    type="password"
                                    placeholder={login.repeatPassword}
                                    onBlur={handleBlur}
                                    onChange={event => {
                                        changeDisabled(values.password, event.target.value);
                                        handleChange(event);
                                    }}
                                    value={values.confirmPassword}
                                />}
                                <Button
                                    type="submit"
                                    activecolor={typesOfItems.notes}
                                    disabled={!isDisabled}
                                >
                                    {isRegistration ? login.register : login.logIn}
                                </Button>

                                <StyledLink to={!isRegistration ? routes.registration : routes.login}>
                                    {!isRegistration ? login.iWantAccount : login.iHaveAccount}
                                </StyledLink>
                            </StyledForm>
                        </>
                    )
                }}
            </Formik>
        </AuthTemplate>
    );
};
Login.propTypes = {
    userID: PropTypes.oneOfType([PropTypes.object]),
    authAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
    isRegistration: PropTypes.bool,
};
Login.defaultProps = {
    isRegistration: false,
    userID: null,
};
const mapStateToProps = ({ user: { userID } }) => ({
    userID,
});
const mapDispatchToProps = dispatch => ({
    authAction: (lgn, psswd) => dispatch(auth(lgn, psswd)),
    registerAction: (lgn, psswd) => dispatch(register(lgn, psswd)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
