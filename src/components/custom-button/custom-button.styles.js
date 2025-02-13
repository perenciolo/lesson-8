import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: black;
  color: white;
  border: 1px solid transparent;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: 1px solid #557ae8;

  &:hover {
    background-color: #557ae8;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignIn) return googleSignInStyles;

  return props && props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.31s ease-in;

  ${getButtonStyles}
`;
