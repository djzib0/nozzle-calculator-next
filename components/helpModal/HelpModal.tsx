import useToggleModal from '@/customHooks/useToggleModal/useToggleModal'
import React from 'react'

const HelpModal = ({title, closeModal} : {title: string, closeModal: () => void}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          &times;
        </button>

        {title}
      </div>
    </div>
  );
}

export default HelpModal