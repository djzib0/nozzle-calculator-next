import { HelpModalForEnums, HelpModalType } from '@/lib/types';
import React from 'react'
import ProfileHelp from '../helpModals/ProfileHelp';
import InnerRingHelp from '../helpModals/InnerRingHelp';
import DiameterHelp from '../helpModals/DiameterHelp';
import ProfileHeight from '../helpModals/ProfileHeight';

const HelpModal = (props: HelpModalType) => {

  // destructuring props
  const {
    modalFor,
    closeFunction
  } = props

  // function for backdrop click
   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close only if clicking the backdrop (not the modal box)
    if (event.target === event.currentTarget) {
      closeFunction();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      {/* Modal box */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] relative">
          <div className="mt-8 max-h-[70vh] overflow-y-auto pr-2">
            {modalFor === HelpModalForEnums.nozzleProfile && <ProfileHelp />}
            {modalFor === HelpModalForEnums.nozzleInnerRingType && <InnerRingHelp />}
            {modalFor === HelpModalForEnums.diameter && <DiameterHelp />}
            {modalFor === HelpModalForEnums.profileHeight && <ProfileHeight />}
          </div>
        {/* Close button */}
        <button
          onClick={() => closeFunction()}
          className="text-3xl absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default HelpModal