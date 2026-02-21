import { useState } from "react"
import Timers from "./Timers"
import { ExitSVG, SettingsSVG } from "./assets/SVGs"

/**
 * Weboldal fő komponense, amely a navigációs sávot és a Timers komponenst tartalmazza.
 *
 * @returns JSX.Element - A fő alkalmazás komponens, amely a navigációs sávot és a Timers komponenst rendereli.
 */
function App() {
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <>
            <div className="shadow-sm navbar bg-base-300">
                <div className="flex-1">
                    <h1 className="ml-4 text-xl font-bold">Timerz</h1>
                </div>
                <div className="flex-none">
                    <label className="btn btn-circle swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            checked={settingsOpen}
                            onChange={() => setSettingsOpen(!settingsOpen)}
                        />

                        {/* hamburger icon */}
                        <SettingsSVG className="w-8 h-8 fill-current swap-off" />

                        {/* close icon */}
                        <ExitSVG className="w-8 h-8 fill-current swap-on" />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <Timers isSettings={settingsOpen} />
            </div>
        </>
    )
}

export default App
