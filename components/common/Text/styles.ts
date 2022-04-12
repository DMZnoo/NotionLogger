import styled from 'styled-components';
import { applyStyleModifiers, ModifierKeys } from 'styled-components-modifiers';

export type BaseTextProps = {
  modifiers?: ModifierKeys;
};

const BASE_TEXT_MODIFIERS = {
  extraSmall: () => `
    font-size: 0.875rem;
  `,
  small: () => `
      font-size: var(--font-small);
    `,
  bold: () => `
      --text-font-weight: var(--font-weight-bold);
    `,
  semiBold: () => `
      --text-font-weight: var(--font-weight-semi-bold);     
    `,
  blue: () => `
    color: var(--blue-100);
  `,
  darkBlue: () => `
    color: var(--dark-blue-100);
  `,
};

export const BaseText = styled.p<BaseTextProps>`
  --text-font-weight: var(--font-weight-regular);
  --text-line-height: 24px;
  --text-letter-spacing: 0.27px;

  ${applyStyleModifiers(BASE_TEXT_MODIFIERS)}

  font: var(--font-body);
  font-weight: var(--text-font-weight);
  line-height: var(--text-line-height);
  letter-spacing: var(--text-letter-spacing);
`;
