import { HelpModalType } from '@/lib/types';
import React from 'react'

const HelpModal = (props: HelpModalType) => {

  // destructuring props
  const {
    closeFunction
  } = props

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={() => closeFunction()}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
        >
          &times;
        </button>

        
      </div>
    </div>
  );
}

export default HelpModal