import { useEffect, useState } from "react"
import { PauseSVG, PlaySVG, StopSVG } from "./assets/SVGs"
import { getColorClass } from "./colorUtils"

interface TimerData {
    color: string
    remaining: number
}

interface TimerRunningProps {
    id: number
    timer: TimerData
    globalTime: number
    onUpdate: (id: number, remaining: number) => void
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
    globalTime,
    onUpdate,
}: TimerRunningProps) => {
    const [isRunning, setIsRunning] = useState(false)
    const [remaining, setRemaining] = useState(timer.remaining)

    useEffect(() => {
        setRemaining(timer.remaining)
    }, [timer.remaining])

    useEffect(() => {
        let interval: number | undefined

        if (isRunning && remaining > 0) {
            interval = window.setInterval(() => {
                setRemaining((prev) => Math.max(0, prev - 1))
            }, 1000)
        } else if (remaining === 0) {
            setIsRunning(false)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, remaining])

    // Separate effect to update parent component
    useEffect(() => {
        if (remaining !== timer.remaining) {
            onUpdate(id, remaining)
        }
    }, [remaining, id, onUpdate, timer.remaining])

    // Vibration when timer expires
    useEffect(() => {
        if (remaining === 0 && timer.remaining > 0) {
            // Vibrate pattern: vibrate for 200ms, pause 100ms, vibrate 200ms
            navigator.vibrate?.([200, 100, 200])
        }
    }, [remaining, timer.remaining])

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

    /**
     * Váltja az időzítő futó/szüneteltetett állapotát.
     */
    const handlePlayPause = () => {
        setIsRunning(!isRunning)
    }

    /**
     * Leállítja az időzítőt és visszaellítja az időt az alapértelmezett értékre.
     */
    const handleStop = () => {
        setIsRunning(false)
        setRemaining(globalTime)
    }

    return (
        <div className="relative flex justify-between overflow-hidden rounded-lg shadow-md bg-base-200">
            {/* Animated color overlay */}
            <div
                className={`absolute inset-0 ${getColorClass(timer.color)} rounded-lg transition-transform duration-500 ${remaining === 0 ? "translate-x-0" : "-translate-x-full"}`}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex justify-between w-full">
                <div
                    className={`${getColorClass(timer.color)} w-2 rounded-l-lg`}
                ></div>
                <div className="flex items-center flex-1 p-4">
                    <span className="font-mono text-2xl font-bold">
                        {formatTime(remaining)}
                    </span>
                </div>
                <div className="flex flex-row items-center h-auto gap-4 pr-4">
                    <label className="swap swap-rotate btn btn-square btn-sm">
                        <input
                            type="checkbox"
                            checked={isRunning}
                            onChange={handlePlayPause}
                        />
                        <PlaySVG className="w-full h-full swap-off" />
                        <PauseSVG className="w-full h-full swap-on" />
                    </label>
                    <button
                        className="btn btn-square btn-sm"
                        onClick={handleStop}
                    >
                        <StopSVG />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TimerRunning
