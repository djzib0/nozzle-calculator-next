import Image from 'next/image'
import React from 'react'

const HeadboxSidePlatesHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Headbox side plates</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Headbox side plates are all plates located to the left or right of the center headbox rib. 
          Typically, there are two side plates, but for wider headboxes there may be four or more.
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Weight calculation sheet</h3>
        <p className="text-gray-600 dark:text-gray-300">
          The thickness of the side plates is specified in the weight calculation sheet. 
          By default, the number of side plates is <strong>2</strong>, unless the sheet indicates a wider headbox.
        </p>
        <Image
          src="/helpImages/sideplates_01 - weight calculation sheet.png" // put file into /public/images
          alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
          width={600}
          height={400}
          className="w-full h-auto object-contain mt-4 mb-8"
          priority // optional: loads immediately
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing</h3>
        <p className='text-gray-600 dark:text-gray-300'>Example drawing with marked headbox side plates</p>
      </section>
      
      <Image
        src="/helpImages/sideplates_02 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />
      <p></p>
    </div>
  )
}

export default HeadboxSidePlatesHelp