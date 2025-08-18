import React from 'react'

const AssemblyResultTableSummaryRow = ({name, totalHours, isError}:
   {name: string; totalHours: string | number; isError: boolean}) => {
  return (
    <>
    {!isError ?
      <tr className="bg-gray-200 dark:bg-gray-800 font-semibold">
        <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500">
          {name}
        </td>
        <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500">
          {totalHours}
        </td>
      </tr>
      :
      <tr>
        <td 
          colSpan={2} 
          className="px-4 py-2 border-t text-red-600 border-gray-400 dark:border-gray-500"
        >
          There are mistakes in the form. Please correct them to see the result.
        </td>
      </tr>
    }
    </>
  )
}

export default AssemblyResultTableSummaryRow