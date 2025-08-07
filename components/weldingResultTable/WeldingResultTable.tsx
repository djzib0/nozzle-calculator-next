import React from 'react'
import WeldingResultTableHeader from './weldingResultTableHeader/WeldingResultTableHeader'
import WeldingResultTableRow from './weldingResultTableRow/WeldingResultTableRow'
import { WeldingResultType } from '@/lib/types'

const WeldingResultTable = ({result}: {result: WeldingResultType}) => {
  return (
    <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-600 mt-4">
      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <WeldingResultTableHeader title={"Name 1"} />
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">Name</th>
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Carbon Wire [kg]</th>
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Stainless Wire [kg]</th>
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Welding time [hr]</th>
        </tr>
      </thead>

      <tbody className="text-gray-800 dark:text-gray-100">
        <WeldingResultTableRow data={result.details} />
      </tbody>
    </table>
  )
}

export default WeldingResultTable