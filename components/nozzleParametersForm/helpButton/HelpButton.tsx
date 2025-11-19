import { HelpModalForEnums } from '@/lib/types'
import React from 'react'
import { FiHelpCircle } from 'react-icons/fi';

interface HelpButtonProps {
  modalFor: HelpModalForEnums;
  openModal: () => void;
}

const HelpButton = ({
  // modalFor,
  openModal
}: HelpButtonProps) => {
  return (
    <button
      type="button"
      onClick={openModal}
      className="text-gray-400 dark:text-gray-300 text-2xl cursor-pointer"
    >
      <FiHelpCircle />
    </button>
  )
}

export default HelpButton