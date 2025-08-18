import { AssemblyResultType } from '@/lib/types'
import React from 'react'
import AssemblyResultTableHeader from './assemblyResultTableHeader/AssemblyResultTableHeader'
import AssemblyResultTableRow from './assemblyResultTableRow/AssemblyResultTableRow'
import AssemblyResultTableSummaryRow from './assemblyResultTableSummaryRow/AssemblyResultTableSummaryRow'

const AssemblyResultsTable = ({result, isError}: {result: AssemblyResultType; isError: boolean}) => {
  return (
    <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-600 mt-4">
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
        <AssemblyResultTableRow
          name={"Inner ring"}
          hours={result.innerRingHours}
        />
        <AssemblyResultTableRow
          name={"Base plate"}
          hours={result.basePlateHours}
        />
        <AssemblyResultTableRow
          name={"Inlet profile"}
          hours={result.inletProfileHours}
        />
        <AssemblyResultTableRow
          name={"Outlet profile"}
          hours={result.outletProfileHours}
        />
        <AssemblyResultTableRow
          name={"Segments"}
          hours={result.segmentsHours}
        />
        <AssemblyResultTableRow
          name={"Ribs / transversal plates"}
          hours={result.ribsAndTransversalHours}
        />
        <AssemblyResultTableRow
          name={"Cone plates"}
          hours={result.coneRowsHours}
        />
        <AssemblyResultTableRow
          name={"Headbox"}
          hours={result.headboxHours}
        />
        <AssemblyResultTableRow
          name={"Grinding"}
          hours={result.grindingHours}
        />
        <AssemblyResultTableRow
          name={"Other"}
          hours={result.otherHours}
        />
        {/* Summary row */}
        <AssemblyResultTableSummaryRow 
          name={"Total"}
          totalHours={result.total}
          isError={isError}
        />
      </tbody>
    </table>
  )
}

export default AssemblyResultsTable