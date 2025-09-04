import React from 'react'
import { Callout } from '../ui/callout/Callout'

const OtherDataHelp = () => {
  return (
    <div className="help-content text-sm leading-relaxed text-gray-800 dark:text-gray-100 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Other</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This calculator applies only to standard fixed nozzles with a straight headbox.
          Additional requirements may sometimes be specified in the weight calculation sheet or shown on the drawing (e.g., extra headbox top plate, sole plate, or sole piece).
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Such extra work is not included in the automatic calculation. In these cases, the user must manually enter the required welding wire (steel or stainless steel) and any additional work related to assembly or welding into the form.
        </p>
      </header>

      <section className="space-y-3">
        <Callout type="info" title="Tip">
          You can add comments to each input field to record the reason for adding extra time or welding material. 
          This helps ensure that the justification is not forgotten.
        </Callout>
      </section>

      <p></p>
    </div>
  )
}

export default OtherDataHelp