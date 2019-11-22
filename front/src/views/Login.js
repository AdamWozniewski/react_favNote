import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Button from '../components/atomic/Button/Button';
import { auth } from '../actions';
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
       ...props,
   }) =>
    <AuthTemplate>
        <Formik
            initialValues={{
                username: '',
                password: '',
                ...(props.isRegistration && { registration: '' })
            }}
            onSubmit={({ username, password }) => authAction(username, password)}
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
                                onChange={handleChange}
                                value={values.password}
                            />
                            {isRegistration && <StyledInput
                                name="registration"
                                type="password"
                                placeholder="Powtórz hasło"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.registration}
                            />}
                            <Button type="submit" activecolor="notes">{isRegistration ? 'Zarejestruj się' : 'Zaloguj się'}</Button>

                            <StyledLink to={!isRegistration ? routes.registration : routes.login}>{!isRegistration ? 'Chcę mieć konto!' : 'Mam juz konto'}</StyledLink>
                        </StyledForm>
                    </>

                )
            }}
        </Formik>
    </AuthTemplate>;
// const mapStateToProps = ({userID = {}}) => ({
const mapStateToProps = ({userID = null}) => ({
    userID,
});
const mapDispatchToProps = dispatch => ({
    authAction: (login, psswd) => dispatch(auth(login, psswd)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
