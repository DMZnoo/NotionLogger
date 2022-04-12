import * as React from 'react';
import useApp, {AppContext} from '@hooks/useApp';

const AppContextProvider: React.FC = ({children}) => {
    const value = useApp();

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

};

export default AppContextProvider;