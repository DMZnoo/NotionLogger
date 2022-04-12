import * as React from 'react';


const useApp = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isIntegrated, setIsIntegrated] = React.useState<boolean>(false);
    const [logData, setLogData] = React.useState<any>([]);
    const [exerciseData, setExerciseData] = React.useState<any>([]);
    

    return {
        loading,
        logData,
        exerciseData,
        isIntegrated,

        setLogData,
        setLoading,
        setExerciseData,
        setIsIntegrated,
    }

};

export type AppContextProps = {
    loading: boolean;
    isIntegrated: boolean;
    logData: any;
    exerciseData: any;

    setLogData: (val: any) => void;
    setExerciseData: (val: any) => void;
    setLoading: (val: boolean) => void;
    setIsIntegrated: (val: boolean) => void;

}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default useApp;
