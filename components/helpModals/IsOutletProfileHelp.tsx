import Image from 'next/image'
import React from 'react'

const IsOutletProfileHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Outlet profile</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Clear this option if the nozzle does not include an outlet profile (it may be a pipe or a round bar).
        </p>
      </header>
      
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Details about the outlet profile can be found in the weight calculation sheet.
        </p>
        <Image
          src="/helpImages/outlet_profile_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with outlet profile</p>
      <Image
        src="/helpImages/outlet_profile_02 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />
      </section>
      
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing without outlet profile</p>
      <Image
        src="/helpImages/outlet_profile_03 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />
      </section>
      <p></p>
    </div>
  )
}

export default IsOutletProfileHelp