import * as React from 'react';
import { ModifierKeys } from 'styled-components-modifiers';
import { PrimaryButton, SecondaryButton, ThirdButton } from './styles';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'third';
    disabled?: boolean;
    loading?: boolean;
    modifiers?: ModifierKeys;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const getVariant = (variant: string): React.ElementType => {
    switch (variant) {
        case "primary":
            return PrimaryButton
        case "secondary":
            return SecondaryButton
        case 'third':
            return ThirdButton
        default:
            return PrimaryButton
    }
}

const Button: React.FC<IButtonProps> = ({
    children,
    disabled,
    loading,
    className = '',
    modifiers = '',
    icon = null,
    iconPosition = '',
    variant = 'primary',
    ...rest
}) => {
    const ButtonComponent = getVariant(variant);
    return (
        <ButtonComponent
            className={className}
            role="button"
            disabled={disabled}
            {...rest}
        >{children}</ButtonComponent>
    )
}
export default Button;