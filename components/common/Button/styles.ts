import styled, { css } from 'styled-components'


export const BaseButtonCss = css`
  min-height: 35px;
  min-width: auto;
  border-radius: 5px;
  padding: 0 20px;
  line-height: 1.2px;
  letter-spacing: 0.29px;

  &:hover,
  &:focus {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled,
  [disabled] {
    cursor: no-drop;
  }


`;

export const PrimaryButton = styled.button`
    ${BaseButtonCss}
    border-width: 1px;
    border-style: solid;    
    background-color: var(--primary-color);
    font-family: Arcade;
`;

export const SecondaryButton = styled.button`
    ${BaseButtonCss}
    border-width: 1px;
    border-style: solid;    
    background-color: var(--secondary-color);
    font-family: Arcade;
`;

export const ThirdButton = styled.button`
    ${BaseButtonCss}
    border-width: 1px;
    border-style: solid;    
    background-color: var(--dark-green-color);
    font-family: Arcade;
`;