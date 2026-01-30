import { Moon, Sun } from 'lucide-react'
import React from 'react'

function DarkNightToggler() {
  return (
    <div className="absolute top-0 my-4 right-0 mx-6">
        <label className="flex cursor-pointer gap-2">
          <span className="label-text">
            <Sun />
          </span>
          <input
            type="checkbox"
            value="cmyk"
            className="toggle theme-controller"
          />
          <span className="label-text">
            <Moon />
          </span>
        </label>
      </div>
  )
}

export default DarkNightToggler