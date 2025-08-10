import React from 'react'
import WeldingResultTableHeader from './weldingResultTableHeader/WeldingResultTableHeader'
import WeldingResultTableRow from './weldingResultTableRow/WeldingResultTableRow'
import { WeldingResultType } from '@/lib/types'

const WeldingResultTable = ({result}: {result: WeldingResultType}) => {
  return (
    <table className="w-full text-sm text-left border border-gray-300 dark:border-gray-600 mt-4">
      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
        <tr>
          <WeldingResultTableHeader title={"Name"} />
          <WeldingResultTableHeader title={"Carbon Wire [kg]"} />
          <WeldingResultTableHeader title={"Stainless Wire [kg]"} />
          <WeldingResultTableHeader title={"Welding time [hr]"} />

                    {/* <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Carbon Wire [kg]</th>
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Stainless Wire [kg]</th>
          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-right">Welding time [hr]</th> */}
        </tr>
      </thead>

      <tbody className="text-gray-800 dark:text-gray-100">
        <WeldingResultTableRow 
          name={"Inner ring"} 
          carbonSteelWire={result.details.innerRingWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.innerRingWelding.stainlessSteelWire}
          weldingTime={result.details.innerRingWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Segments"} 
          carbonSteelWire={result.details.segmentsWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.segmentsWelding.stainlessSteelWire}
          weldingTime={result.details.segmentsWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Inlet"} 
          carbonSteelWire={result.details.inletWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.inletWelding.stainlessSteelWire}
          weldingTime={result.details.inletWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Outlet"} 
          carbonSteelWire={result.details.outletWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.outletWelding.stainlessSteelWire}
          weldingTime={result.details.outletWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Ribs"} 
          carbonSteelWire={result.details.ribsWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.ribsWelding.stainlessSteelWire}
          weldingTime={result.details.ribsWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Cone plates"} 
          carbonSteelWire={result.details.conePlatesWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.conePlatesWelding.stainlessSteelWire}
          weldingTime={result.details.conePlatesWelding.weldingTime}
        />
        <WeldingResultTableRow 
          name={"Headbox"} 
          carbonSteelWire={result.details.headboxWelding.carbonSteelWire} 
          stainlessSteelWire={result.details.headboxWelding.stainlessSteelWire}
          weldingTime={result.details.headboxWelding.weldingTime}
        />
      </tbody>
    </table>
  )
}

export default WeldingResultTable