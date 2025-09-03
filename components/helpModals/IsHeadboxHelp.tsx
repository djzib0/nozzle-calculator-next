import Image from 'next/image'
import React from 'react'

const IsHeadboxHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Headbox</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Clear this option if the nozzle does not include a headbox.
        </p>
      </header>
      <Image
        src="/helpImages/isHeadbox_01 - drawing.png" // put file into /public/images
        alt="Screen from weight calculation sheet showing the place from which the profile height is taken"
        width={600}
        height={400}
        className="w-full h-auto object-contain mt-4 mb-8"
        priority // optional: loads immediately
      />
    </div>
  )
}

export default IsHeadboxHelp