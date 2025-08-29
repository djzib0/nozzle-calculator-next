import { NozzleFormDataType } from '@/lib/types'
import React, { useState } from 'react'

const CommentModal = (
  {
    formData, 
    property, 
    closeFunction,
    saveCommentChange,
  }
  :
  {
    formData: NozzleFormDataType;
    property: string;
    closeFunction: () => void;
    saveCommentChange: (changedText: string) => void;
  }) => {

  const [inputValue, setInputValue] = useState(
    {
      value: String(formData[property as keyof NozzleFormDataType] ?? "")
    }
  )

  console.log("new input value", inputValue.value)

  // handling functions
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setInputValue((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <div>CommentModal
      <div className="w-full max-w-md">
      <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Your Comment
      </label>
      <textarea
        id={`value`}
        name={`value`}
        rows={4}
        value={inputValue.value}
        onChange={handleChange}
        placeholder="Type your comment here..."
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   px-3 py-2 text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p className="mt-2 text-sm text-gray-500"> / 500</p>
      <button onClick={closeFunction}>Close me</button>
      <button onClick={() => saveCommentChange(inputValue.value)}>Save</button>
    </div>

    </div>
  )
}

export default CommentModal