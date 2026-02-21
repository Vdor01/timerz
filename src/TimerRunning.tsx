import { PauseSVG, PlaySVG, StopSVG } from "./assets/SVGs"
import { getColorClass } from "./colorUtils"

interface TimerData {
    color: string
    remaining: number
}

interface TimerRunningProps {
    id: number
    timer: TimerData
    isRunning: boolean
    onPlayPause: (id: number) => void
    onStop: (id: number) => void
}

/**
 * Futó időzítő komponens, amely visszaszámlálást végez és megjeleníti a hátralévő időt.
 * Támogatja a lejátszás/szünet/leállítás funkciókat, és rezgéssel jelzi, ha az idő lejárt.
 *
 * @param id - Az időzítő egyedi azonosítója.
 * @param timer - Az időzítő adatai (szín és hátralévő idő).
 * @param globalTime - Az alapértelmezett időtartam másodpercben.
 * @param onUpdate - Callback, amelyet a hátralévő idő változásakor hív meg.
 * @returns JSX.Element - A futó időzítő megjelenítése.
 */
const TimerRunning = ({
    id,
    timer,
    isRunning,
    onPlayPause,
    onStop,
}: TimerRunningProps) => {
    /**
     * Másodperceket MM:SS formátumú karakterlánccá alakítja.
     *
     * @param seconds - Az átalakítandó másodpercek száma.
     * @returns string - A formázott idő "MM:SS" alakban.
     */
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="relative flex justify-between overflow-hidden rounded-lg shadow-md bg-base-200">
            {/* Animated color overlay */}
            <div
                className={`absolute inset-0 ${getColorClass(timer.color)} rounded-lg transition-transform duration-500 ${timer.remaining === 0 ? "translate-x-0" : "-translate-x-full"}`}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex justify-between w-full">
                <div
                    className={`${getColorClass(timer.color)} w-2 rounded-l-lg`}
                ></div>
                <div className="flex items-center flex-1 p-4">
                    <span className="font-mono text-2xl font-bold">
                        {formatTime(timer.remaining)}
                    </span>
                </div>
                <div className="flex flex-row items-center h-auto gap-4 pr-4">
                    <label className="swap swap-rotate btn btn-square btn-sm">
                        <input
                            type="checkbox"
                            checked={isRunning}
                            onChange={() => onPlayPause(id)}
                        />
                        <PlaySVG className="w-full h-full swap-off" />
                        <PauseSVG className="w-full h-full swap-on" />
                    </label>
                    <button
                        className="btn btn-square btn-sm"
                        onClick={() => onStop(id)}
                    >
                        <StopSVG />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TimerRunning
