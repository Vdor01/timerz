import {
    closestCenter,
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import TimerRunning from "./TimerRunning"
import TimerSettings from "./TimerSettings"
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from "@dnd-kit/modifiers"
import { PlusSVG } from "./assets/SVGs"

interface TimerData {
    color: string
    remaining: number
}

interface TimersProps {
    isSettings: boolean
}

interface StoredData {
    globalTime: number
    timers: TimerData[]
}

const DEFAULT_DATA: StoredData = {
    globalTime: 600,
    timers: [
        { color: "red-700", remaining: 600 },
        { color: "lime-600", remaining: 600 },
        { color: "sky-500", remaining: 600 },
    ],
}

const STORAGE_KEY = "timerz-data"

/**
 * Betölti az időzítők adatait a localStorage-ból.
 * Ha nincs mentett adat vagy hiba történik, az alapértelmezett adatokat adja vissza.
 *
 * @returns StoredData - A betöltött vagy alapértelmezett adatok.
 */
const loadFromStorage = (): StoredData => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (error) {
        console.error("Failed to load from localStorage:", error)
    }
    return DEFAULT_DATA
}

/**
 * Elmenti az időzítők adatait a localStorage-ba.
 *
 * @param data - A mentendő adatok (globalTime és timers tömb).
 */
const saveToStorage = (data: StoredData) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
        console.error("Failed to save to localStorage:", error)
    }
}

/**
 * Az időzítők listáját kezelő fő komponens.
 * Normál módban futó időzítőket, beállítások módban szerkeszthető időzítőket jelenít meg.
 * Drag-and-drop sorrendezést, globális idő beállítást és localStorage perzisztenciát biztosít.
 *
 * @param isSettings - Ha true, a beállítások nézetet jeleníti meg; egyébként a futó időzítőket.
 * @returns JSX.Element - Az időzítők listája vagy a beállítások nézet.
 */
const Timers = ({ isSettings }: TimersProps) => {
    const [timers, setTimers] = useState<TimerData[]>(
        () => loadFromStorage().timers,
    )
    const [globalTime, setGlobalTime] = useState(
        () => loadFromStorage().globalTime,
    )
    const [isRunning, setIsRunning] = useState<boolean[]>(() =>
        new Array(loadFromStorage().timers.length).fill(false),
    )
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

    // Save to localStorage whenever timers or globalTime changes
    useEffect(() => {
        saveToStorage({ globalTime, timers })
    }, [timers, globalTime])

    // Central countdown interval — runs regardless of active view
    useEffect(() => {
        const interval = window.setInterval(() => {
            setTimers((prevTimers) => {
                const newTimers = prevTimers.map((timer, index) => {
                    if (isRunning[index] && timer.remaining > 0) {
                        const newRemaining = timer.remaining - 1
                        if (newRemaining === 0) {
                            navigator.vibrate?.([200, 100, 200])
                            setIsRunning((prev) =>
                                prev.map((r, i) => (i === index ? false : r)),
                            )
                        }
                        return { ...timer, remaining: newRemaining }
                    }
                    return timer
                })
                return newTimers
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [isRunning])

    /**
     * Kezeli a drag-and-drop esemény végét, és frissíti az időzítők sorrendjét.
     *
     * @param event - A dnd-kit drag end esemény objektuma.
     */
    function handleDragEnd(event: any) {
        const { active, over } = event

        if (active.id !== over.id) {
            setTimers((items) => {
                const oldIndex = active.id
                const newIndex = over.id

                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    /**
     * Váltja az adott időzítő futó/szüneteltetett állapotát.
     *
     * @param id - Az időzítő indexe.
     */
    const handlePlayPause = (id: number) => {
        setIsRunning((prev) => prev.map((r, i) => (i === id ? !r : r)))
    }

    /**
     * Leállítja az adott időzítőt és visszaállítja az időt a globális értékre.
     *
     * @param id - Az időzítő indexe.
     */
    const handleStop = (id: number) => {
        setIsRunning((prev) => prev.map((r, i) => (i === id ? false : r)))
        setTimers((prevTimers) =>
            prevTimers.map((timer, index) =>
                index === id ? { ...timer, remaining: globalTime } : timer,
            ),
        )
    }

    /**
     * Frissíti egy adott időzítő színét.
     *
     * @param id - A módosítandó időzítő indexe.
     * @param color - Az új szín (pl. "red-700").
     */
    const handleColorChange = (id: number, color: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer, index) =>
                index === id ? { ...timer, color } : timer,
            ),
        )
    }

    /**
     * Beállítja az összes időzítő alapértelmezett idejét és visszaellítja az összes hátralévő időt.
     *
     * @param time - Az új globális idő másodpercben.
     */
    const handleGlobalTimeChange = (time: number) => {
        setGlobalTime(time)
        setTimers((prevTimers) =>
            prevTimers.map((timer) => ({ ...timer, remaining: time })),
        )
        setIsRunning((prev) => prev.map(() => false))
    }

    /**
     * Hozzáad egy új időzítőt az alapértelmezett kék színnel és a globális idővel.
     */
    const handleAddTimer = () => {
        const newTimer: TimerData = {
            color: "blue-700",
            remaining: globalTime,
        }
        setTimers((prevTimers) => [...prevTimers, newTimer])
        setIsRunning((prev) => [...prev, false])
    }

    /**
     * Töröl egy időzítőt az indexe alapján.
     *
     * @param id - A törlendő időzítő indexe.
     */
    const handleDeleteTimer = (id: number) => {
        setTimers((prevTimers) => prevTimers.filter((_, index) => index !== id))
        setIsRunning((prev) => prev.filter((_, i) => i !== id))
    }

    if (isSettings) {
        return (
            <>
                <div className="p-4 mb-2 rounded-lg shadow-md bg-base-200">
                    <div className="flex flex-wrap items-center gap-3">
                        <label className="text-sm font-semibold">Idő:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={Math.floor(globalTime / 60)}
                                onChange={(e) => {
                                    const minutes =
                                        parseInt(e.target.value) || 0
                                    const seconds = globalTime % 60
                                    handleGlobalTimeChange(
                                        minutes * 60 + seconds,
                                    )
                                }}
                                className="w-10 input input-bordered input-sm"
                                placeholder="perc"
                            />
                            <span className="text-sm">perc</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={globalTime % 60}
                                onChange={(e) => {
                                    const minutes = Math.floor(globalTime / 60)
                                    const seconds = Math.min(
                                        59,
                                        parseInt(e.target.value) || 0,
                                    )
                                    handleGlobalTimeChange(
                                        minutes * 60 + seconds,
                                    )
                                }}
                                className="w-10 input input-bordered input-sm"
                                placeholder="mp"
                            />
                            <span className="text-sm">másodperc</span>
                        </div>
                    </div>
                </div>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                >
                    <SortableContext
                        items={timers.map((_, index) => index)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="flex flex-col gap-2">
                            {timers.map((timer, index) => (
                                <TimerSettings
                                    key={index}
                                    id={index}
                                    timer={timer}
                                    onColorChange={handleColorChange}
                                    onDelete={handleDeleteTimer}
                                />
                            ))}
                            <button
                                onClick={handleAddTimer}
                                className="self-center btn btn-outline btn-primary btn-circle"
                            >
                                <PlusSVG color="currentColor" />
                            </button>
                        </div>
                    </SortableContext>
                </DndContext>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            {timers.map((timer, index) => (
                <TimerRunning
                    key={index}
                    id={index}
                    timer={timer}
                    isRunning={isRunning[index] ?? false}
                    onPlayPause={handlePlayPause}
                    onStop={handleStop}
                />
            ))}
        </div>
    )
}

export default Timers
