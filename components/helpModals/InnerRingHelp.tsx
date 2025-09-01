import React from 'react'
import { Callout } from '../ui/callout/Callout'
import Image from 'next/image'

const InnerRingHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Inner ring selection</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose the correct inner ring type based on the project drawing or
          the details provided in the inquiry.
        </p>
      </header>

      <section className="space-y-3">

        <Callout type="warning" title="Important">
          Selecting the wrong inner ring may significantly affect the final price.
        </Callout>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Inner rings examples</h3>
        <p className='text-gray-600 dark:text-gray-300'>Below are typical examples of inner ring types commonly used in nozzle construction.</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Complete stainless steel inside</strong>
            <Image
              src="/helpImages/profile_01 - st.st. inside.png" // put file into /public/images
              alt="Annotated nozzle diagram"
              width={600}
              height={400}
              className="w-full h-auto object-contain mt-4 mb-8"
              priority // optional: loads immediately
            />
          </li>
          <li>
            <strong>Stainless steel ring in a way of propeller</strong>
            <Image
              src="/helpImages/profile_02 - st.st. ring.png" // put file into /public/images
              alt="Annotated nozzle diagram"
              width={600}
              height={400}
              className="w-full h-auto object-contain mt-4 mb-8"
              priority // optional: loads immediately
            />
          </li>
          <li>
            <strong>Stainless steel ring and outlet</strong>
            <Image
              src="/helpImages/profile_03 - st.st. ring with outlet.png" // put file into /public/images
              alt="Annotated nozzle diagram"
              width={600}
              height={400}
              className="w-full h-auto object-contain mt-4 mb-8"
              priority // optional: loads immediately
            />
          </li>
        </ul>
        
      </section>
    </div>
  )
}

export default InnerRingHelp