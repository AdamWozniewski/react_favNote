import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import styled from "styled-components";
import Input from "../../atomic/Input/Input";
import Button from "../../atomic/Button/Button";
import withContext from "../../../hoc/withContext";
import Heading from "../../atomic/Heading/Heading";
import { addItemAction } from "../../../actions";
import { Formik, Form } from 'formik';

const StyledWrapper = styled.div`
  z-index: 9999;
  border-left: 5px solid ${({ theme, activeColor }) => theme[activeColor]};
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 100px 90px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => isVisible ? '0' : '100%'});
  transition: transform .25s ease-in-out;
`;

const StyledTextArea = styled(Input)`
  border-radius: 10px;
  margin: 30px 0 50px;
  height: 30vh;
  resize: none;
`;
const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) =>
    <StyledWrapper isVisible={isVisible} activeColor={pageContext}>
        <Heading big>Stwórz nowy: {pageContext}</Heading>
        <Formik
            initialValues={{
                title: '',
                content: '',
                articleURL: '',
                twitterName: '',
                created: '',
            }}
            onSubmit={values => {
                addItem(pageContext, {...values});
                handleClose();
            }}
        >
            {({ handleChange, handleBlur, values }) => (
                <StyledForm>
                    <Input
                        type="text"
                        name="title"
                        placeholder={pageContext === 'twitters' ? 'Nazwa Profilu' : 'Tytuł'}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                    />
                    {pageContext === 'articles' &&
                        <StyledInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="articleURL"
                            placeholder="Link do artykułu"
                            value={values.articleURL}
                        />}
                    {pageContext === 'twitters' &&
                        <StyledInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            name="twitterName"
                            placeholder="Nazwa profilu"
                            value={values.twitterName}
                        />}
                    <StyledTextArea
                        as="textarea"
                        placeholder="Treśc"
                        name="content"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.content}
                    />
                    <Button type="submit" activecolor={pageContext}>Dodaj</Button>
                </StyledForm>
            )}
        </Formik>
    </StyledWrapper>;
NewItemBar.propTypes = {
    pageContext: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};
NewItemBar.defaultProps = {
    pageContext: 'notes',
};
const mapDispatchToProps = dispatch => ({
    addItem: (itemType, itemContent) => dispatch(addItemAction(itemType, itemContent)),
});
export default connect(null, mapDispatchToProps)(withContext(NewItemBar));