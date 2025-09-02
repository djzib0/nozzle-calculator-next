import React from 'react'
import { Callout } from '../ui/callout/Callout'
import Image from 'next/image'

const SegmentsHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Nozzle segments</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Segments act as circumferential stiffeners. 
          The user must specify both the number of segment rows and their thickness.
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className='text-gray-600 dark:text-gray-300'>The number of segment rows and their thickness can be found in the weight calculation sheet.</p>
        <Image
          src="/helpImages/segments_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with segments</p>
        <Image
          src="/helpImages/segments_02 - drawing.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />

        <Callout type="info" title="Tip">
          <p>
            If the segment rows have different thicknesses, calculate the average value.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>One row is 15 mm thick, another is 18 mm thick.</li>
            <li>The average thickness is 16.5 mm.</li>
            <li>
              In the calculator, select the closest available thickness from the list.
            </li>
            <li>In this case, choose <strong>16 mm</strong>.</li>
          </ul>
        </Callout>
      </section>

    </div>
  )
}

export default SegmentsHelp