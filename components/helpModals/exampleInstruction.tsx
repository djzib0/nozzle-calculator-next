import React from 'react'
import { Callout } from '../ui/callout/Callout'

const ProfileHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">How to fill the form</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Follow these steps to ensure accurate welding time and wire
          calculations. Fields marked with <span className="text-amber-600">*</span> are required.
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">1) Basic parameters</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Diameter</strong> – enter in <em>millimetres</em> (e.g. <code className="px-1 rounded bg-gray-100 dark:bg-gray-800">2000</code>). We’ll snap it to the nearest supported value.
          </li>
          <li>
            <strong>Segments</strong> – number of longitudinal segments (2–8 typical).
          </li>
          <li>
            <strong>Ribs</strong> &amp; <strong>Transverse plates</strong> – counts per nozzle (not per segment) unless your process specifies otherwise.
          </li>
        </ul>
        <Callout type="info" title="Tip">
          If you’re unsure, start with <strong>Segments = 2</strong> and adjust. The table will show how totals scale.
        </Callout>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">2) Profiles & rings</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Nozzle profile</strong> – choose from <em>Optima</em>, <em>19A</em>, <em>Schottel SDV 45</em>, etc.
          </li>
          <li>
            <strong>Inner ring type</strong> – select <em>St/St inside</em> vs <em>St/St ring</em> based on your drawing.
          </li>
          <li>
            <strong>Outlet roundbar</strong> – toggle only if the outlet roundbar is present on this build.
          </li>
        </ul>
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Replace src with your asset if you have one */}

        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">3) Headbox</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Headbox?</strong> – check if present in the assembly.
          </li>
          <li>
            <strong>Headbox plates</strong> – total count of plates that require welding.
          </li>
        </ul>
        <Callout type="warning" title="Common mismatch">
          If you enable <em>Headbox</em> but leave plate count at <code className="px-1 rounded bg-gray-100 dark:bg-gray-800">0</code>,
          totals will be understated.
        </Callout>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">4) Other time</h3>
        <p>
          Use <strong>Other assembly time</strong> to add manual adjustments (prep, fit-up, rework). This value is added after the core calculation and waste factor.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Validation</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Required fields must be filled: Diameter, Segments, Profile, Inner Ring.</li>
          <li>Values must be non-negative; segments &gt;= 1.</li>
          <li>If Headbox = Yes, plates &gt; 0.</li>
        </ul>
      </section>

      <footer className="pt-2 text-xs text-gray-500 dark:text-gray-400">
        Need help? Add a quick note with the comment button and export — comments are saved in the Excel header.
      </footer>
    </div>
  )
}

export default ProfileHelp