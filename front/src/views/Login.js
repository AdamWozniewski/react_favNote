import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Button from '../components/atomic/Button/Button';
import { auth, register } from '../actions';
import AuthTemplate from '../templates/AuthTemplate';
import { routes } from '../routes';
import Heading from '../components/atomic/Heading/Heading';
import Input from '../components/atomic/Input/Input';

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
const Login = ({
       userID,
       authAction,
       registerAction,
       ...props,
   }) => {
    const [isDisabled, setDisabled] = useState(false);
    const changeDisabled = (firstField, secondField) => {
        const disabled = firstField === secondField &&
            !(firstField === '' || secondField === '');
        setDisabled(disabled);
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
                    if (userID) return <Redirect to="/" />;
                    else return (
                        <>
                            <Heading>Zaloguj się</Heading>
                            <StyledForm>
                                <StyledInput
                                    name="username"
                                    type="text"
                                    placeholder="Login"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                />
                                <StyledInput
                                    name="password"
                                    type="password"
                                    placeholder="Hasło"
                                    onBlur={handleBlur}
                                    onChange={event => {
                                        changeDisabled(event.target.value, values.confirmPassword);
                                        handleChange(event);
                                    }}
                                    value={values.password}
                                />
                                {isRegistration && <StyledInput
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    onBlur={handleBlur}
                                    onChange={event => {
                                        changeDisabled(values.password, event.target.value);
                                        handleChange(event);
                                    }}
                                    value={values.confirmPassword}
                                />}
                                <Button
                                    type="submit"
                                    activecolor="notes"
                                    disabled={!isDisabled}
                                >
                                    {isRegistration ? 'Zarejestruj się' : 'Zaloguj się'}
                                </Button>

                                <StyledLink to={!isRegistration ? routes.registration : routes.login}>{!isRegistration ? 'Chcę mieć konto!' : 'Mam juz konto'}</StyledLink>
                            </StyledForm>
                        </>

                    )
                }}
            </Formik>
        </AuthTemplate>
    );
};
Login.propTypes = {
    userID: PropTypes.object,
    authAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
    isRegistration: PropTypes.bool,
};
Login.defaultProps = {
    isRegistration: false,
    userID: null,
};
const mapStateToProps = ({userID = null}) => ({
    userID,
});
const mapDispatchToProps = dispatch => ({
    authAction: (login, psswd) => dispatch(auth(login, psswd)),
    registerAction: (login, psswd) => dispatch(register(login, psswd)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
