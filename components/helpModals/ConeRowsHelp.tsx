import React from 'react'
import { Callout } from '../ui/callout/Callout'
import Image from 'next/image'

const ConeRowsHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Nozzle cone plates</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cone plates form the outer shell of the nozzle and are usually conically shaped.
           The selected profile type influences the shape of these plates.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          The number of cone plates is usually one greater than the number of segments. 
           However, in some special profile types, the last row of cone plates is not present
            (for example SDV or SDC profiles).
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className='text-gray-600 dark:text-gray-300'>Thickness of cone plates can be taken from the weight calculation sheet</p>
        <Image
          src="/helpImages/cone_plates_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with cone plates (2 segment rows, 3 cone plates rows)</p>
        <p className='text-gray-600 dark:text-gray-300'></p>
        <Image
          src="/helpImages/cone_plates_02 - drawing.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      <section className="space-y-3">
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with the nozzle without the outlet cone plates (2 segment rows, 2 cone plates rows)</p>
        <p className='text-gray-600 dark:text-gray-300'></p>
        <Image
          src="/helpImages/cone_plates_03 - drawing, not outlet cone.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

        <Callout type="warning" title="Tip">
          <p>
            If the cone plates rows have different thicknesses, calculate the average value.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>One row is 15 mm thick, another is 12 mm thick.</li>
            <li>The average thickness is 13.5 mm.</li>
            <li>
              In the calculator, select the closest <strong>rounded up</strong> available thickness from the list.
            </li>
            <li>In this case, choose <strong>14 mm</strong>.</li>
          </ul>
        </Callout>
      </section>

    </div>
  )
}

export default ConeRowsHelp