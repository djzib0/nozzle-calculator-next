import React from 'react'

const WeldingResultTableRow = (data) => {

  return (
    <tr className="even:bg-gray-50 dark:even:bg-gray-700">
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">{"name"}</td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {data.carbonSteelWire}
      </td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {"item 2"}
      </td>
    </tr>
  )
}

export default WeldingResultTableRow