import Image from 'next/image'
import React from 'react'
import { Callout } from '../ui/callout/Callout'

const WeightHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Nozzle weight</h2>
        <p className="text-gray-600 dark:text-gray-300">
          The nozzle weight can be found in the weight calculation sheet 
          or in the booklet provided after the full documentation release.
        </p>
      </header>

      <section className="space-y-3">
        <p className='text-gray-600 dark:text-gray-300'>Nozzle weight in weight calculation sheet.</p>
        <Image
          src="/helpImages/weight_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />

        <Callout type="info" title="Tip">
          The weight does not affect the calculation; it is only used to show the percentage share of welding wire in the total mass of the nozzle.
        </Callout>
      </section>
    </div>
  )
}

export default WeightHelp