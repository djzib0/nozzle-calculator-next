import React from 'react'
import Image from 'next/image'

const ProfileHeightHelp = () => {

  console.log("test")
  
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Nozzle diameter</h2>
        <p className="text-gray-600 dark:text-gray-300">
          The nozzle height can be found in the weight calculation sheet 
          or directly on the project drawing.
        </p>
      </header>

      <section className="space-y-3">
        <p className='text-gray-600 dark:text-gray-300'>Profile height in weight calculation sheet.</p>
        <Image
          src="/helpImages/profile_height 01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
        <p className='text-gray-600 dark:text-gray-300'>Profile height on the drawing.</p>
        <Image
          src="/helpImages/profile_height 02 - drawing.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from the diameter is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>
    </div>
  )
}

export default ProfileHeightHelp