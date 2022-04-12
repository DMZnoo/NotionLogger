import type { NextPage } from 'next'
import * as React from 'react';

import {AppContext, AppContextProps} from '@hooks/useApp';
import Loading from '@components/common/Loading';
import {getDatabase, insertLogIntoBlock, updateDatabase} from '@lib/notion';
import { Disclosure } from '@headlessui/react'
import { Dialog, Transition } from '@headlessui/react';
import Log from '@components/widget/Log';
import Button from '@components/common/Button';
import Heading from '@components/common/Heading';
import Image from 'next/image';
import axios from 'axios';
import InstructionModal from '@components/widget/Modal/InstructionModal';
import IntegrationModal from '@components/widget/Modal/IntegrationModal';


const Home: NextPage = () => {
  const {loading, setLoading, isIntegrated, setIsIntegrated} = React.useContext<AppContextProps>(AppContext);
  const [enabled, setEnabled] = React.useState(false);
  const [isIModalOpen, setIModalOpen] = React.useState<boolean>(false);
  const [isIntModalOpen, setIntModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    const token = window.localStorage.getItem("api-token");
    const databaseId = window.localStorage.getItem("database-id");

    if(token && databaseId) {
      axios.post('/api/init',{
        token: token,
        databaseId: databaseId
      }).then((res) => {
        console.log('init: ', res);
        setIsIntegrated(true);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    console.log('loading:', loading)
  }, []);

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="m-4">
      {
        isIntegrated ? (
          <Log /> 
        ) : (
          <div className="flex xs:flex-col md:flex-row xs:space-y-2 md:space-y-0 md:space-x-2 items-center w-full justify-center">
            <Button onClick={() => setIntModalOpen(!isIntModalOpen)}>🤖 Integrate</Button>
            <Button onClick={() => setIModalOpen(!isIModalOpen)}>🔨 Instructions</Button>
            <InstructionModal isOpen={isIModalOpen} setIsOpen={setIModalOpen}/>
            <IntegrationModal isOpen={isIntModalOpen} setIsOpen={setIntModalOpen}/>
          </div>
        )
        }
    </div>
  )
}

export default Home
