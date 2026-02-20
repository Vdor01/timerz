import { useState } from "react"
import Timers from "./Timers"

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
                        <svg
                            className="fill-current swap-off"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                        >
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>

                        {/* close icon */}
                        <svg
                            className="fill-current swap-on"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                        >
                            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
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
