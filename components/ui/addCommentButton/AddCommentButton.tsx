import React from 'react'
import { BiCommentAdd, BiCommentDetail } from 'react-icons/bi'

const AddCommentButton = ({comment}: {comment: string}) => {
  return (
    <>
      {comment && comment.trim().length > 0 ? 
      <div className='relative inline-block'>
        <BiCommentDetail className='text-2xl cursor-pointer'/>
        <span
          className="absolute top-4 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"
        />
      </div>
      
      :
      <BiCommentAdd className='text-2xl cursor-pointer'/>
    }
    </>
  )
}

export default AddCommentButton