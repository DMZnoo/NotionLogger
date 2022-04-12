import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Heading from '@components/common/Heading';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Button from '@components/common/Button';
import axios from 'axios';
import { AppContextProps, AppContext } from '@hooks/useApp';

interface IIntegrationModal {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const IntegrationModal: React.FC<IIntegrationModal> = ({isOpen, setIsOpen}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const {loading, setLoading, setIsIntegrated} = React.useContext<AppContextProps>(AppContext);


  const onSubmit = (data) => {
    setLoading(true);
    window.localStorage.setItem("api-token", data.apiToken);
    window.localStorage.setItem("database-id", data.databaseId);
      axios.post('/api/init',{
        token: data.apiToken,
        databaseId: data.databaseId
      }).then((res) => {
        console.log('init: ', res);
        reset();
        setLoading(false);
        setIsIntegrated(true);
      });
  }

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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                  🤖 Integration
                  </Dialog.Title>
                  <div>
                    <Heading>Hi!</Heading>
                    <p className="mb-8">Note: You need to have a Notion account for this to work!</p>
                    <form>
                      <div className="flex flex-col">
                        <p>API Token</p>
                        <input {...register(`apiToken`, {required: true})} className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      </div>
                      <div className="flex flex-col mb-2">
                        <p>Database ID</p>
                        <input {...register(`databaseId`, {required: true})} className="capitalize shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      </div>
                      <Button className="text-white" variant="third" onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </form>
                  </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
};

export default IntegrationModal;