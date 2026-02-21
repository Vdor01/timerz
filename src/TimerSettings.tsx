import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DeleteSVG, DragSVG } from "./assets/SVGs"
import { useState } from "react"
import { getColorClass, COLORS, SHADES } from "./colorUtils"

interface TimerData {
    color: string
    remaining: number
}

interface TimerSettingsProps {
    id: number
    timer: TimerData
    onColorChange: (id: number, color: string) => void
    onDelete: (id: number) => void
}

/**
 * Időzítő beállítások komponens, amely lehetővé teszi a szín és árnyalat módosítását,
 * valamint az időzítő törlését. Drag-and-drop sorrendezést is támogat.
 *
 * @param id - Az időzítő egyedi azonosítója.
 * @param timer - Az időzítő aktuális adatai (szín és hátralévő idő).
 * @param onColorChange - Callback, amelyet a szín módosításakor hív meg.
 * @param onDelete - Callback, amelyet az időzítő törlésekor hív meg.
 * @returns JSX.Element - Az időzítő beállítások panel.
 */
const TimerSettings = ({
    id,
    timer,
    onColorChange,
    onDelete,
}: TimerSettingsProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // Parse current color
    const [colorBase, colorShade] = timer.color.split("-")
    const [selectedColor, setSelectedColor] = useState(colorBase || "red")
    const [selectedShade, setSelectedShade] = useState(colorShade || "700")

    /**
     * Frissíti a kiválasztott színt és értesíti a szülő komponenst.
     *
     * @param color - Az újonnan kiválasztott szín neve (pl. "red").
     */
    const handleColorChange = (color: string) => {
        setSelectedColor(color)
        onColorChange(id, `${color}-${selectedShade}`)
    }

    /**
     * Frissíti a kiválasztott árnyalatot és értesíti a szülő komponenst.
     *
     * @param shade - Az újonnan kiválasztott árnyalat (pl. "700").
     */
    const handleShadeChange = (shade: string) => {
        setSelectedShade(shade)
        onColorChange(id, `${selectedColor}-${shade}`)
    }

    return (
        <details
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="border collapse bg-base-200 border-base-300"
        >
            <summary
                className={`collapse-title font-semibold flex justify-between items-center pl-2 p-1 ${getColorClass(timer.color)}`}
            >
                {id}
                <div
                    ref={setActivatorNodeRef}
                    {...listeners}
                    className="content-center w-8 h-full rounded-lg cursor-move bg-base-200"
                >
                    <DragSVG color="#fff" />
                </div>
            </summary>
            <div className="flex flex-row gap-4 text-sm collapse-content items-between">
                <div className="flex flex-col flex-1 gap-2 px-4 pt-4">
                    <div className="grid grid-cols-3 min-[340px]:grid-cols-4 min-[480px]:grid-cols-6 gap-1">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                className={`w-full aspect-square rounded ${getColorClass(`${color}-${selectedShade}`)} ${
                                    selectedColor === color
                                        ? "ring-2 ring-offset-2 ring-base-content"
                                        : ""
                                }`}
                                title={color}
                            />
                        ))}
                    </div>
                    <input
                        type="range"
                        min={SHADES[0]}
                        max={SHADES[SHADES.length - 1]}
                        step={100}
                        value={parseInt(selectedShade)}
                        onChange={(e) => handleShadeChange(e.target.value)}
                        className="w-full range range-xs bg-linear-to-r from-slate-300 to-slate-900"
                    />
                </div>
                <div className="flex flex-col justify-center px-2">
                    <button
                        onClick={() => onDelete(id)}
                        className="btn btn-square btn-sm btn-error"
                        title="Időzítő törlése"
                    >
                        <DeleteSVG />
                    </button>
                </div>
            </div>
        </details>
    )
}

export default TimerSettings
