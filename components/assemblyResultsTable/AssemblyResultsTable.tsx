import { AssemblyResultType } from '@/lib/types'
import React from 'react'
import AssemblyResultTableHeader from './assemblyResultTableHeader/AssemblyResultTableHeader'

const AssemblyResultsTable = ({result}: {result: AssemblyResultType}) => {
  return (
    <table className="w-[500px] text-sm text-left border border-gray-300 dark:border-gray-600 mt-4">
      <caption className="caption-top text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Assembly time summary
      </caption>

      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <AssemblyResultTableHeader title={"Name"} />
          <AssemblyResultTableHeader title={"Hours"} />
        </tr>
      </thead>

      <tbody className="text-gray-800 dark:text-gray-100">
      </tbody>
    </table>
  )
}

export default AssemblyResultsTable