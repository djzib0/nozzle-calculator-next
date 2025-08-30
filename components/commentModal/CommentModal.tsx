import { NozzleFormDataType } from '@/lib/types'
import React, { useState } from 'react'

const CommentModal = (
  {
    formData, 
    property, 
    title,
    closeFunction,
    saveCommentChange,
  }
  :
  {
    formData: NozzleFormDataType;
    property: string;
    title: string;
    closeFunction: () => void;
    saveCommentChange: (property: string, changedText: string) => void;
  }) => {

  const [inputValue, setInputValue] = useState(
    {
      value: String(formData[property as keyof NozzleFormDataType] ?? "")
    }
  )

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeFunction}
      />

      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-10 w-full max-w-[600px] h-[500px]">
        {/* Modal header */}
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comment on {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
        {/* Close X button */}
        <button
          onClick={closeFunction}
          className="absolute top-3 right-3 text-gray-500
                  hover:text-gray-700 dark:hover:text-gray-300
                   text-xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          x
        </button>

        <textarea
          id="value"
          name="value"
          rows={4}
          value={inputValue.value}
          onChange={handleChange}
          maxLength={1000}
          placeholder="Type your comment here..."
          className="w-full h-2/3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                     px-3 py-2 text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     resize-none"
        />

        {/* Counter */}
        <p className="text-sm text-gray-500 text-right">
          {inputValue.value.length} / 1000
        </p>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          {/* Close button */}
          <button
            onClick={closeFunction}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white 
                      text-gray-700 hover:bg-gray-100 
                      dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 
                      transition-colors cursor-pointer"
          >
            Close
          </button>

          {/* Save button */}
          <button
            onClick={() => saveCommentChange(property, inputValue.value)}
            // disabled={inputValue.value.trim().length === 0}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium 
                      hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                      focus:ring-2 focus:ring-blue-400 
                      disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModal