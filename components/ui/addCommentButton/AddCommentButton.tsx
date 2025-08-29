import React from 'react'
import { BiCommentAdd, BiCommentDetail } from 'react-icons/bi'

const AddCommentButton = ({comment}: {comment: string}) => {
  return (
    <>
      {comment && comment.trim().length > 0 ? 
      <BiCommentDetail className='text-2xl'/> :
      <BiCommentAdd className='text-2xl'/>
    }
    </>
  )
}

export default AddCommentButton