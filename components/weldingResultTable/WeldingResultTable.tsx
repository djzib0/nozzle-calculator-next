import React from 'react'
import WeldingResultTableHeader from './weldingResultTableHeader/WeldingResultTableHeader'
import WeldingResultTableRow from './weldingResultTableRow/WeldingResultTableRow'
import { WeldingResultType } from '@/lib/types'
import WeldResultSummaryRow from './weldResultSummaryRow/WeldResultSummaryRow'

const WeldingResultTable = ({result, isError}: {result: WeldingResultType; isError: boolean}) => {
  return (
    <table className="text-sm text-left border border-gray-300 dark:border-gray-600 mt-4">
      <caption className="caption-top text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Welding Results Summary
      </caption>

      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <WeldingResultTableHeader title={"Name"} />
          <WeldingResultTableHeader title={"Carbon Wire [kg]"} />
          <WeldingResultTableHeader title={"Stainless Wire [kg]"} />
          <WeldingResultTableHeader title={"Manual welding time [hr]"} />
          <WeldingResultTableHeader title={"Manipulator welding time [hr]"} />
        </tr>
      </thead>

      <tbody className="text-gray-800 dark:text-gray-100">
        <WeldingResultTableRow 
          name={"Inner ring"} 
          carbonSteelWire={result.details.innerRingWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.innerRingWelding.stainlessSteelWire}
          manualWeldingTime={result.details.innerRingWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.innerRingWelding.manipulatorWeldingTime}
        />
        <WeldingResultTableRow 
          name={"Segments"} 
          carbonSteelWire={result.details.segmentsWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.segmentsWelding.stainlessSteelWire}
          manualWeldingTime={result.details.segmentsWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.segmentsWelding.manipulatorWeldingTime}
        />
        <WeldingResultTableRow 
          name={"Inlet"} 
          carbonSteelWire={result.details.inletWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.inletWelding.stainlessSteelWire}
          manualWeldingTime={result.details.inletWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.inletWelding.manipulatorWeldingTime}

        />
        <WeldingResultTableRow 
          name={"Outlet"} 
          carbonSteelWire={result.details.outletWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.outletWelding.stainlessSteelWire}
          manualWeldingTime={result.details.outletWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.outletWelding.manipulatorWeldingTime}

        />
        <WeldingResultTableRow 
          name={"Ribs"} 
          carbonSteelWire={result.details.ribsWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.ribsWelding.stainlessSteelWire}
          manualWeldingTime={result.details.ribsWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.ribsWelding.manipulatorWeldingTime}

        />
        <WeldingResultTableRow 
          name={"Cone plates"} 
          carbonSteelWire={result.details.conePlatesWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.conePlatesWelding.stainlessSteelWire}
          manualWeldingTime={result.details.conePlatesWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.conePlatesWelding.manipulatorWeldingTime}

        />
        <WeldingResultTableRow 
          name={"Headbox"} 
          carbonSteelWire={result.details.headboxWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.headboxWelding.stainlessSteelWire}
          manualWeldingTime={result.details.headboxWelding.manualWeldingTime}
          manipulatorWeldingtime={result.details.headboxWelding.manipulatorWeldingTime}

        />
        <WeldingResultTableRow 
          name={"Other"} 
          carbonSteelWire={result.otherCarbonWire} 
          stainlessSteelWire={result.otherStainlessWire}
          manualWeldingTime={result.otherWeldingTime}
          manipulatorWeldingtime={0}

        />
        {/* Summary row */}
        <WeldResultSummaryRow 
          name={"Total"}
          carbonSteelWire={result.carbonSteelWire}
          stainlessSteelWire={result.stainlessSteelWire}
          manualWeldingHours={result.manualWeldingHours}
          manipulatorWeldingHours={result.manipulatorWeldingHours}
          isError={isError}
        />

      </tbody>
    </table>
  )
}

export default WeldingResultTable