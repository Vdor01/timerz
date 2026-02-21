/**
 * Húzás ikon SVG komponens.
 *
 * @param color - Az ikon vonalainak színe (alapértelmezett: "#fff").
 * @returns JSX.Element - A húzás ikon SVG.
 */
export function DragSVG({ color = "#fff" }: { color?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g stroke={color} strokeLinecap="round" strokeWidth="2">
                <path d="M14 18a1 1 0 102 0 1 1 0 00-2 0zM8 18a1 1 0 102 0 1 1 0 00-2 0zM14 12a1 1 0 102 0 1 1 0 00-2 0zM8 12a1 1 0 102 0 1 1 0 00-2 0zM14 6a1 1 0 102 0 1 1 0 00-2 0zM8 6a1 1 0 102 0 1 1 0 00-2 0z" />
            </g>
        </svg>
    )
}

/**
 * Lejátszás ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @param className - Opcionális CSS osztálynev.
 * @returns JSX.Element - A lejátszás ikon SVG.
 */
export function PlaySVG({
    color = "#fff",
    className = "",
}: {
    color?: string
    className?: string
}) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3 5.497c0-2.32 2.521-3.762 4.521-2.586l11.055 6.503c1.972 1.16 1.972 4.012 0 5.172L7.521 21.089C5.521 22.265 3 20.823 3 18.503V5.497z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    )
}

/**
 * Szünet ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @param className - Opcionális CSS osztálynev.
 * @returns JSX.Element - A szünet ikon SVG.
 */
export function PauseSVG({
    color = "#fff",
    className = "",
}: {
    color?: string
    className?: string
}) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20 5v14a3 3 0 01-3 3h-1a3 3 0 01-3-3V5a3 3 0 013-3h1a3 3 0 013 3zM8 2a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3h1z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    )
}

/**
 * Leállítás ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @returns JSX.Element - A leállítás ikon SVG.
 */
export function StopSVG({ color = "#fff" }: { color?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.25 2.388C8.55 2.099 10.124 2 12 2s3.451.1 4.75.388c1.31.291 2.399.788 3.236 1.626.838.837 1.335 1.926 1.626 3.236C21.901 8.55 22 10.124 22 12s-.1 3.451-.388 4.75c-.291 1.31-.788 2.399-1.626 3.236-.837.838-1.926 1.335-3.236 1.626-1.299.289-2.874.388-4.75.388s-3.451-.1-4.75-.388c-1.31-.291-2.399-.788-3.236-1.626-.838-.837-1.335-1.926-1.626-3.236C2.099 15.45 2 13.876 2 12s.1-3.451.388-4.75c.291-1.31.788-2.399 1.626-3.236.837-.838 1.926-1.335 3.236-1.626z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    )
}

/**
 * Törlés ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @returns JSX.Element - A törlés ikon SVG.
 */
export function DeleteSVG({ color = "#fff" }: { color?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 2.25a.75.75 0 00-.75.75v1H5a.75.75 0 000 1.5h14a.75.75 0 000-1.5h-4.25V3a.75.75 0 00-.75-.75h-4zM5 7.5a.75.75 0 01.75.75v10.5a2.25 2.25 0 002.25 2.25h8a2.25 2.25 0 002.25-2.25V8.25a.75.75 0 011.5 0v10.5a3.75 3.75 0 01-3.75 3.75H8a3.75 3.75 0 01-3.75-3.75V8.25A.75.75 0 015 7.5z"
                fill={color}
                fillRule="evenodd"
            />
            <path
                d="M9.75 10.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zM14.25 10.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    )
}

/**
 * Plusz ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @returns JSX.Element - A plusz ikon SVG.
 */
export function PlusSVG({ color = "#fff" }: { color?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 4a.75.75 0 01.75.75v6.5h6.5a.75.75 0 010 1.5h-6.5v6.5a.75.75 0 01-1.5 0v-6.5h-6.5a.75.75 0 010-1.5h6.5v-6.5A.75.75 0 0112 4z"
                fill={color}
                fillRule="evenodd"
            />
        </svg>
    )
}

/**
 * Beállítás ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @param className - Opcionális CSS osztálynev.
 * @returns JSX.Element - A beállítás ikon SVG.
 */
export function SettingsSVG({
    color = "#fff",
    className = "",
}: {
    color?: string
    className?: string
}) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.94 5.421l-5.17-2.99c-.99-.57-2.54-.57-3.53 0l-5.22 3.01c-2.07 1.4-2.19 1.61-2.19 3.84v5.43c0 2.23.12 2.45 2.23 3.87l5.17 2.99c.5.29 1.14.43 1.77.43.63 0 1.27-.14 1.76-.43l5.22-3.01c2.07-1.4 2.19-1.61 2.19-3.84v-5.44c0-2.23-.12-2.44-2.23-3.86zM12 15.251c-1.79 0-3.25-1.46-3.25-3.25s1.46-3.25 3.25-3.25 3.25 1.46 3.25 3.25-1.46 3.25-3.25 3.25z"
                fill={color}
            />
        </svg>
    )
}

/**
 * Kilépés ikon SVG komponens.
 *
 * @param color - Az ikon kitöltési színe (alapértelmezett: "#fff").
 * @param className - Opcionális CSS osztálynev.
 * @returns JSX.Element - A kilépés ikon SVG.
 */
export function ExitSVG({ color = "#fff", className = "" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z"
                fill={color}
            />
        </svg>
    )
}
