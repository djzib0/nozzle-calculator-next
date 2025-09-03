import Image from 'next/image'
import React from 'react'

const RibsHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Ribs</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ribs act as longitudinal stiffeners. The number of ribs determines the number of segment plates.
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
        <p className='text-gray-600 dark:text-gray-300'>Number and thickness of ribs can be taken from the weight calculation sheet</p>
        <Image
          src="/helpImages/ribs_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with marked ribs</p>
        <p className='text-gray-600 dark:text-gray-300'></p>
      </section>
      <Image
        src="/helpImages/ribs_02 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />

    </div>
  )
}

export default RibsHelp