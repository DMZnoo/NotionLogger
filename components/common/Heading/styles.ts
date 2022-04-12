import styled from 'styled-components';
import { applyStyleModifiers, ModifierKeys } from 'styled-components-modifiers';

interface IBaseHeading {
    as: "h1" | "h2" | "h3" | "h4";
    modifiers?: ModifierKeys
}

const HEADER_MODIFIERS = {
    h1: () => `
        --header-font: var(--font-h1);
    `,
    h2: () => `
        --header-font: var(--font-h2);
    `,
    h3: () => `
        --header-font: var(--font-h3);
    `,
    h4: () => `
        --header-font: var(--font-h4);
    `
}

export const BaseHeading = styled.h1<IBaseHeading>`
    --header-font: var(--font-h1);

    ${applyStyleModifiers(HEADER_MODIFIERS)};

    font: var(--header-font);
    
    `;