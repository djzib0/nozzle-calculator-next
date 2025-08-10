import React from 'react'

const WeldResultSummaryRow = (
    {name, carbonSteelWire, stainlessSteelWire, weldingTime}
  : {name: string | number; carbonSteelWire: string | number;
     stainlessSteelWire: string | number; weldingTime: string | number }
) => {

  return (
    <tr className="even:bg-gray-50 dark:even:bg-gray-700">
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">{name}</td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {carbonSteelWire}
      </td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {stainlessSteelWire}
      </td>
      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {weldingTime}
      </td>
    </tr>
  )
}
export default WeldResultSummaryRow