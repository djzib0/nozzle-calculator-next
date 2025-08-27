import React from 'react'

const AssemblyResultTableRow = ({name, hours}: {name: string; hours: string | number }) => {
  return (
    <tr className="even:bg-gray-50 dark:even:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 ">
        {name}
      </td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 ">
        {hours}
      </td>

    </tr>
  )
}

export default AssemblyResultTableRow