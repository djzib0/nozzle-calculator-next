import Image from 'next/image'
import React from 'react'
import { Callout } from '../ui/callout/Callout'

const HeadboxSidePlatesHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Headbox side plates</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This field becomes active only when the <strong>Headbox</strong> option is selected. 
          Enter the number of side plates and their thickness as specified in the weight calculation sheet or on the drawing.
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className="text-gray-600 dark:text-gray-300">
          In the example below, the user must enter 5 pieces.
        </p>
        <Image
          src="/helpImages/headbox_plates_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with headbox plates</p>
        <Callout type="info" title="Example">
          <p>In the below example, the user must enter <strong>6 positions</strong> in the form:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Side plates</li>
            <li>Aft plate</li>
            <li>Front plate</li>
            <li>Center rib</li>
            <li>Plates in the way of segment 1</li>
            <li>Plates in the way of segment 2</li>
          </ol>
        </Callout>
      </section>
      
      <Image
        src="/helpImages/headbox_plates_02 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />

    </div>
  )
}

export default HeadboxSidePlatesHelp