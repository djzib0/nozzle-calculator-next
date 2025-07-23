import { useState } from 'react'

const useToggleModal = () => {
  
    const [isModalOn, setIsModalOn] = useState(false);

    const toggleModal = () => {
        setIsModalOn(prevState => !prevState)
    }

    const closeModal = () => {
        setIsModalOn(false)
    }

    const openModal = () => {
        setIsModalOn(true)
    }

    return {
        isModalOn,
        toggleModal,
        closeModal,
        openModal
    }

}

export default useToggleModal