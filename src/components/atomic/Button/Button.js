import styled, { css } from 'styled-components';
import { theme as buttonColor} from "../../../theme/mainTheme";

const Button = styled.button`
  background-color: ${({ activecolor }) => buttonColor[activecolor]};
  width: 220px;
  height: 47px;
  border: 0;
  border-radius: 50px;
  font-size: 16px;
  font-family: "Monstserrat";
  font-weight: 500;
  text-transform: uppercase;
  padding: 0;
  
  ${({ secondary }) => secondary && css`
    background-color: hsl(0, 0%, 90%);
    width: 220px;
    height: 30px;
    font-size: 10px;
  `}
`;

export default Button;
