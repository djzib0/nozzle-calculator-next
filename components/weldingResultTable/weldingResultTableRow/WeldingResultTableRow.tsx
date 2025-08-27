import React from 'react'

const WeldingResultTableRow = (
  {name, carbonSteelWire, stainlessSteelWire, manualWeldingTime, manipulatorWeldingtime}
  : {name: string; carbonSteelWire: string | number;
     stainlessSteelWire: string | number; manualWeldingTime: string | number;
     manipulatorWeldingtime: string | number}
) => {

  return (
    <tr className="even:bg-gray-50 dark:even:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
      <td className="w-2/6 px-4 py-2 border-b border-gray-300 dark:border-gray-600">{name}</td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {carbonSteelWire}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {stainlessSteelWire}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {manualWeldingTime}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">
        {manipulatorWeldingtime}
      </td>
    </tr>
  )
}

export default WeldingResultTableRow