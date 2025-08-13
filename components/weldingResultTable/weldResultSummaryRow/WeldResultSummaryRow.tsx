import React from 'react'

const WeldResultSummaryRow = (
    {name, carbonSteelWire, stainlessSteelWire, manualWeldingHours, manipulatorWeldingHours}
  : {name: string | number; carbonSteelWire: string | number;
     stainlessSteelWire: string | number; manualWeldingHours: string | number;
    manipulatorWeldingHours: string | number }
) => {

  return (
    <tr className="bg-gray-200 dark:bg-gray-800 font-semibold">
      <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500 text-right">
        {name}
      </td>
      <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500 text-right">
        {carbonSteelWire}
      </td>
      <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500 text-right">
        {stainlessSteelWire}
      </td>
      <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500 text-right">
        {manualWeldingHours}
      </td>
      <td className="px-4 py-2 border-t border-gray-400 dark:border-gray-500 text-right">
        {manipulatorWeldingHours}
      </td>

    </tr>
  )
}
export default WeldResultSummaryRow