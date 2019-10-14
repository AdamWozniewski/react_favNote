import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form } from "formik";
import Button from "../components/atomic/Button/Button";
import { auth } from "../actions";
import AuthTemplate from "../templates/AuthTemplate";
import { routes } from "../routes";
import Heading from "../components/atomic/Heading/Heading";
import Input from "../components/atomic/Input/Input";

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
   }) =>
    <AuthTemplate>
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={({ username, password }) => authAction(username, password)}
        >
            {({ handleChange, handleBlur, values }) => {
                if (userID) return <Redirect to="/" />;
                else return (
                    <>
                        <Heading>Sign in</Heading>
                        <StyledForm>
                            <StyledInput
                                name="username"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                            />
                            <StyledInput
                                name="password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                            />
                            <Button type="submit" activecolor="notes">Zaloguj się</Button>

                            <StyledLink to={routes.login}>Chcę mieć konto!</StyledLink>
                        </StyledForm>
                    </>

                )
            }}
        </Formik>
    </AuthTemplate>;
const mapStateToProps = ({userID = null}) => ({
    userID,
});
const mapDispatchToProps = dispatch => ({
    authAction: (login, psswd) => dispatch(auth(login, psswd)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);