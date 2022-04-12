import Heading from '@components/common/Heading';
import * as React from 'react';
import Exercise from '../Exercise';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { AppContext, AppContextProps } from '@hooks/useApp';
import axios from 'axios';
import Button from '@components/common/Button';


const Log = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {logData, exerciseData, setExerciseData, setLogData} = React.useContext<AppContextProps>(AppContext);
    const date = moment().format('MMMM Do YYYY');

    const onSubmit = (data: any) => {
        const temp = {
            title: data['logTitle'],
            description: data['logDescription'],
            date: moment(),
            exercises: exerciseData
        };

        setLogData(temp);

        axios.post(`/api/log`, {
            data: temp
        }).then((res) => {
            console.log("response: ", res);
            setLogData({});
            setExerciseData([]);
            reset();
        });

    };

    return (
    <div className="flex flex-col space-y-4">
        <form>
            <div className="flex xs:flex-col md:flex-row xs:space-y-2 md:space-x-2 items-center mb-2">
                <div className="flex items-center space-x-2">
                    <Heading>Title: </Heading>
                    <input {...register("logTitle", {required: true})} className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
                <span className="font-bold">Date: </span>
                <span>({date})</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold mb-2">Description</span>
                <textarea {...register("logDescription")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        </form>
        <Exercise />
        <Button className="m-auto w-32" onClick={handleSubmit(onSubmit)}>Submit Log</Button>
    </div>
    );
}

export default Log;