import Image from 'next/image'
import React from 'react'
import { Callout } from '../ui/callout/Callout'

const OtherTransversePlatesHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Other transverse plates</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Transverse plates are additional stiffening elements, similar to ribs. They are usually struts or sole plate side plates. 
          The number of transverse plates determines the number of segment plates.
        </p>
        <Image
          src="/helpImages/ribs_and_trasnversal_plates.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className='text-gray-600 dark:text-gray-300'>Number and thickness of transverse plates can be taken from the weight calculation sheet</p>
        <Image
          src="/helpImages/transverse_plates_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with marked additional transverse plates</p>
        <p className='text-gray-600 dark:text-gray-300'></p>
      </section>
      <Image
        src="/helpImages/transverse_plates_02 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />
      <Callout type="warning" title="Warning">
        In the weight calculation sheet, a sole piece may sometimes be listed as “1 piece.” In this case, enter 2 pieces of side plates in the form.
      </Callout>
      <p> </p>
    </div>
  )
}

export default OtherTransversePlatesHelp