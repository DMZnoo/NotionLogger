import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Heading from '@components/common/Heading';
import Image from 'next/image';

interface IInstructionModal {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const InstructionModal: React.FC<IInstructionModal> = ({isOpen, setIsOpen}) => {
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
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                  🔨  Instructions
                  </Dialog.Title>
                  <div>
                    <Heading className="w-full m-auto">Hi! ✋</Heading>
                    <p className="mb-8">Note: You need to have a Notion account for this to work!</p>
                    <div className="flex flex-col">
                      <p>1. Create a page</p>
                      <Image src="/notion-add-page-link.png" layout="responsive" width="500px" height="200px" objectFit="contain" alt="notion-add-page-link-image"/>
                    </div>
                    <div className="flex flex-col">
                      <p>2. Create a database by typing <code>/database</code>. You&apos;re going to select <strong>Table Database - Inline</strong></p>
                      <Image src="/notion-database.png" layout="responsive" width="500px" height="150px" objectFit="contain" alt="notion-database"/>
                    </div>
                    <div className="flex flex-col">
                      <p>3. Go to Settings and Members &gt; Integrations &gt; Develop your own integrations </p>
                      <Image src="/notion-integration-tab.png" layout="responsive" width="500px" height="200px" objectFit="contain" alt="notion-integration-tab"/>
                    </div>
                    <div className="flex flex-col">
                      <p>* Note: Be sure to enable all content capabilities </p>
                      <Image src="/notion-enable-content.png" layout="responsive" width="500px" height="150px" objectFit="contain" alt="notion-enable-content"/>
                    </div>
                    <div className="flex flex-col">
                      <p>4. Copy the token and store it somewhere! </p>
                      <Image src="/notion-secret.png" layout="responsive" width="600px" height="150px" objectFit="contain" alt="notion-secret"/>
                    </div>
                    <div className="flex flex-col">
                      <p>5. Add integration to your page </p>
                      <Image src="/notion-integrate-page.png" layout="responsive" width="500px" height="200px" objectFit="contain" alt="notion-integrate-page"/>
                    </div>
                    <div className="flex flex-col mb-8">
                      <p>6. Copy the database id from the url: <code>https://www.notion.so/&lt;<strong>database_id</strong>&gt;?v=&lt;view_id&gt;</code> </p>
                    </div>
                    <Heading>Now you&apos;re ready to integrate with Notion!</Heading>
                  </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
};

export default InstructionModal;