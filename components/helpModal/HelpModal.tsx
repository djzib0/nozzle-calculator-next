import { HelpModalForEnums, HelpModalType } from '@/lib/types';
import React from 'react'
import ProfileHelp from '../helpModals/ProfileHelp';
import InnerRingHelp from '../helpModals/InnerRingHelp';
import DiameterHelp from '../helpModals/DiameterHelp';
import WeightHelp from '../helpModals/WeightHelp';
import SegmentsHelp from '../helpModals/SegmentsHelp';
import ConeRowsHelp from '../helpModals/ConeRowsHelp';
import RibsHelp from '../helpModals/RibsHelp';
import OtherTransversePlatesHelp from '../helpModals/OtherTransversePlatesHelp';
import IsHeadboxHelp from '../helpModals/IsHeadboxHelp';
import AllHeadboxPlatesHelp from '../helpModals/AllHeadboxPlatesHelp';
import HeadboxSidePlatesHelp from '../helpModals/HeadboxSidePlatesHelp';
import IsOutletProfileHelp from '../helpModals/IsOutletProfileHelp';
import OtherDataHelp from '../helpModals/OtherDataHelp';
import DmcnlProjectRefHelp from '../helpModals/DmcnlProjectRefHelp';
import InternalProjectRefHelp from '../helpModals/InternalProjectRefHelp';
import ClientRefHelp from '../helpModals/ClientRefHelp';
import ProfileHeightHelp from '../helpModals/ProfileHeightHelp';

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
            {modalFor === HelpModalForEnums.dmcnlProjectRef && <DmcnlProjectRefHelp />}
            {modalFor === HelpModalForEnums.internalProjectRef && <InternalProjectRefHelp />}
            {modalFor === HelpModalForEnums.clientRef && <ClientRefHelp />}
            {modalFor === HelpModalForEnums.nozzleProfile && <ProfileHelp />}
            {modalFor === HelpModalForEnums.nozzleInnerRingType && <InnerRingHelp />}
            {modalFor === HelpModalForEnums.diameter && <DiameterHelp />}
            {modalFor === HelpModalForEnums.profileHeightHelp && <ProfileHeightHelp />}
            {modalFor === HelpModalForEnums.weight && <WeightHelp />}
            {modalFor === HelpModalForEnums.segments && <SegmentsHelp />}
            {modalFor === HelpModalForEnums.coneRows && <ConeRowsHelp />}
            {modalFor === HelpModalForEnums.ribs && <RibsHelp />}
            {modalFor === HelpModalForEnums.otherTransversePlates && <OtherTransversePlatesHelp />}
            {modalFor === HelpModalForEnums.isHeadbox && <IsHeadboxHelp />}
            {modalFor === HelpModalForEnums.allHeadboxPlates && <AllHeadboxPlatesHelp />}
            {modalFor === HelpModalForEnums.headboxSidePlates && <HeadboxSidePlatesHelp />}
            {modalFor === HelpModalForEnums.isOutletProfile && <IsOutletProfileHelp />}
            {modalFor === HelpModalForEnums.other && <OtherDataHelp />}
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