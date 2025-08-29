import { HelpModalForEnums, HelpModalType } from '@/lib/types';
import { useState } from 'react'

const useToggleModal = () => {
  
    // initial data to easily reset modal
    const initialModalData = {
        isModalOn: false,
        modalFor: HelpModalForEnums.whenClosed,
        closeFunction: () => closeModal()
    }

    const [modalData, setModalData] = useState<HelpModalType>(initialModalData)

    const openModal = () => {
        setModalData(prevData => {
            return {
                ...prevData,
                isModalOn: true,
            }
        })
    }

    const closeModal = () => {
        setModalData(initialModalData)
    }

    return {
        modalData,
        closeModal,
        openModal,
        setModalData,
    }

}

export default useToggleModal