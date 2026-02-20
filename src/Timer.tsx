import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragSVG, PauseSVG, PlaySVG, StopSVG } from "./assets/SVGs"

/**
 * Egyedi időzítő kártya komponens, amely drag-and-drop sorrendezést támogat.
 * Megjeleníti az időzítő állapotát, valamint lejátszás/szünet és leállítás gombokat.
 *
 * @param props - Az időzítő azonosítója és egyéb drag-and-drop tulajdonságok.
 * @returns JSX.Element - Az időzítő kártya.
 */
const Timer = (props: any) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="bg-base-100 rounded-lg shadow-md cursor-move flex justify-between"
        >
            <div className="bg-warning w-2 rounded-l-lg"></div>
            <div className="p-4 flex-1">{`Timer ${props.id}`}</div>
            <div className="flex flex-row gap-4 items-center h-auto">
                <label className="swap swap-rotate btn btn-square btn-sm">
                    <input type="checkbox" />

                    <PlaySVG className="swap-on h-full w-full" />
                    <PauseSVG className="swap-off h-full w-full" />
                </label>
                <button className="btn btn-square btn-sm">
                    <StopSVG />
                </button>
                <div
                    ref={setActivatorNodeRef}
                    {...listeners}
                    className="w-8 bg-base-200 rounded-r-lg cursor-move h-14 content-center"
                >
                    <DragSVG color="#fff" />
                </div>
            </div>
        </div>
    )
}

export default Timer
