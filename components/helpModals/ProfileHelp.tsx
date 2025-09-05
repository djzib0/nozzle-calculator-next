import React from 'react';
import { Callout } from '../ui/callout/Callout';
import Image from 'next/image';

const ProfileHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Nozzle profile</h2>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold"></h3>
        <p>
          Select the profile type based on the project drawing or the information provided in the inquiry.
        </p>
        <Callout type="info" title="Tip">
          The shape of the profile directly affects both labor requirements and the amount of welding material needed.
        </Callout>
        <p>
          The nozzle profile can be identified in the weight calculation sheet or taken directly from the project drawing.
        </p>
        <Image
            src="/helpImages/profile_01 - weight calculation sheet.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Profile types examples</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Optima</strong>
          </li>
          <Image
            src="/helpImages/profile_01 - Optima.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>19A</strong>
            <Image
            src="/helpImages/profile_02 - 19A.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>SDV 45</strong>
            <Image
            src="/helpImages/profile_03 - SDV.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>SDC</strong>
            <Image
            src="/helpImages/profile_04 - SDC.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Type 37</strong>
            <Image
            src="/helpImages/profile_05 - type 37.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>VG40</strong>
            <Image
            src="/helpImages/profile_06 - VG40.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>HR</strong>
            <Image
            src="/helpImages/profile_07 - HR.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>HP</strong>
            <Image
            src="/helpImages/profile_08 - HP.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>AHT</strong>
            <Image
            src="/helpImages/profile_09 - AHT.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>AQM</strong>
            <Image
            src="/helpImages/profile_10 - AQM.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>HS2.0</strong>
            <Image
            src="/helpImages/profile_11 - HS2.0.png" // put file into /public/images
            alt="Annotated nozzle diagram"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority // optional: loads immediately
          />
          </li>
        </ul>
      </section>

    </div>
  )
}

export default ProfileHelp