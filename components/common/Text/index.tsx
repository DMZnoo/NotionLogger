import { ModifierKeys } from 'styled-components-modifiers';
import { BaseText } from './styles';

export interface IText extends React.HTMLAttributes<HTMLParagraphElement> {
  modifiers?: ModifierKeys;
}

const Text: React.FC<IText> = ({ children, modifiers, className, ...rest }) => (
  <BaseText className={`${className ? className : ''}`} modifiers={modifiers} {...rest}>
    {children}
  </BaseText>
);

export default Text;
