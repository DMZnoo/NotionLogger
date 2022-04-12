import * as React from 'react'
import { Dialog } from '@headlessui/react'

interface IModal {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const Modal = ({isOpen, setIsOpen}: IModal) => {

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <Dialog.Overlay />

      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button onClick={() => setIsOpen(false)}>Deactivate</button>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
    </Dialog>
  )
};
export default Modal;