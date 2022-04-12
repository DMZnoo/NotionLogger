import {BaseHeading} from './styles';
import { ModifierKeys } from 'styled-components-modifiers';

interface IHeading {
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    className?: any;
    id?: string;
    modifiers?: ModifierKeys;
  }

  const Heading: React.FC<IHeading> = ({
    children,
    modifiers = [],
    className,
    as = 'h1',
    id,
    ...rest
  }) => {
    let modifiersList: string[] = [];
    modifiersList = Array.isArray(modifiers) ? [as, ...modifiers] : [as, modifiers];
    return (
      <BaseHeading
        className={`${className ? className : ''}`}
        id={id}
        as={as}
        modifiers={modifiersList}
        {...rest}
      >
        {children}
      </BaseHeading>
    );
  }
  export default Heading;
