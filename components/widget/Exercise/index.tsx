import * as React from 'react';
import Heading from '@components/common/Heading';
import { useForm } from "react-hook-form";
import { AppContext, AppContextProps } from '@hooks/useApp';
import { Dialog, Transition  } from '@headlessui/react'
import Button from '@components/common/Button';
const Exercise = () => {
    const [tableHead, setTableHead] = React.useState<string[]>(["Exercise", "Description", "Sets", "Reps", "Weights"]);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const {exerciseData, setExerciseData} = React.useContext<AppContextProps>(AppContext);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onSubmit = (newData: any) => {
    console.log("data: ", newData); 
    setExerciseData((data: any) => [...data, newData]);
    reset();
  }

  const renderAddExerciseModal = () => {
    return (
      <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(!isOpen)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-5 w-full">
                    {tableHead.map((head, i) => {
                    if(head === 'Description') {
                        return (
                        <div className="flex flex-col space-y-2" key={`th-head-${i}`}>
                            <Heading as="h3">{head}</Heading>
                            <textarea {...register(`${head.toLowerCase()}`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        )
                    } else if (head === 'Exercise') {
                      return (
                        <div className="flex flex-col space-y-2" key={`th-head-${i}`}>
                            <Heading as="h3">{head}</Heading>
                            <input 
                            {...register(`${head.toLowerCase()}`, {required: true})}
                            onChange={(e) => {
                              const val = e.currentTarget.value;
                              setValue('exercise', val.charAt(0).toUpperCase() + val.substring(1));
                            }} className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors[`${head.toLowerCase()}`] && <span className="text-red-700">Required</span>}
                        </div>
                    )
                    }
                    return (
                        <div className="flex flex-col space-y-2" key={`th-head-${i}`}>
                            <Heading as="h3">{head}</Heading>
                            <input {...register(`${head.toLowerCase()}`, {required: true})} className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors[`${head.toLowerCase()}`] && <span className="text-red-700">Required</span>}
                        </div>
                    )
                    })}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    )
  };

    return (
    <div >
        <div className="overflow-scroll">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-8 overflow-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {tableHead.map((head, i) => {
                return <th key={`th-head-${i}`} scope="col" className="px-6 py-3">{head}</th>
                })
                }
            </tr>
            </thead>
            <tbody>
            {exerciseData && exerciseData.map((dat: any, i: number) => {
                return (
                <tr className={`bg-white ${i === exerciseData.length-1 ? "" : "border-b dark:border-gray-700"} dark:bg-gray-800`} key={`${dat}-${i}`}>
                    <th scope="row" className="capitalize px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{dat.exercise}</th>
                    <td className="px-6 py-4">{dat.description}</td>
                    <td className="px-6 py-4">{dat.sets}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dat.reps}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dat.weights}</td>
                </tr>
                )
            })
            }
            </tbody>
      </table>
        </div>
        <Button
        variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Exercise
        </Button>
        {renderAddExerciseModal()}

    </div>
    )

};
export default Exercise;