// Helper to get the complete Tailwind class name for dynamic colors
// This ensures Tailwind JIT can detect all color classes at build time

type ColorName =
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"

type Shade = "300" | "400" | "500" | "600" | "700" | "800" | "900"

const colorClassMap: Record<string, string> = {
    "red-300": "bg-red-300",
    "red-400": "bg-red-400",
    "red-500": "bg-red-500",
    "red-600": "bg-red-600",
    "red-700": "bg-red-700",
    "red-800": "bg-red-800",
    "red-900": "bg-red-900",
    "orange-300": "bg-orange-300",
    "orange-400": "bg-orange-400",
    "orange-500": "bg-orange-500",
    "orange-600": "bg-orange-600",
    "orange-700": "bg-orange-700",
    "orange-800": "bg-orange-800",
    "orange-900": "bg-orange-900",
    "amber-300": "bg-amber-300",
    "amber-400": "bg-amber-400",
    "amber-500": "bg-amber-500",
    "amber-600": "bg-amber-600",
    "amber-700": "bg-amber-700",
    "amber-800": "bg-amber-800",
    "amber-900": "bg-amber-900",
    "yellow-300": "bg-yellow-300",
    "yellow-400": "bg-yellow-400",
    "yellow-500": "bg-yellow-500",
    "yellow-600": "bg-yellow-600",
    "yellow-700": "bg-yellow-700",
    "yellow-800": "bg-yellow-800",
    "yellow-900": "bg-yellow-900",
    "lime-300": "bg-lime-300",
    "lime-400": "bg-lime-400",
    "lime-500": "bg-lime-500",
    "lime-600": "bg-lime-600",
    "lime-700": "bg-lime-700",
    "lime-800": "bg-lime-800",
    "lime-900": "bg-lime-900",
    "green-300": "bg-green-300",
    "green-400": "bg-green-400",
    "green-500": "bg-green-500",
    "green-600": "bg-green-600",
    "green-700": "bg-green-700",
    "green-800": "bg-green-800",
    "green-900": "bg-green-900",
    "emerald-300": "bg-emerald-300",
    "emerald-400": "bg-emerald-400",
    "emerald-500": "bg-emerald-500",
    "emerald-600": "bg-emerald-600",
    "emerald-700": "bg-emerald-700",
    "emerald-800": "bg-emerald-800",
    "emerald-900": "bg-emerald-900",
    "teal-300": "bg-teal-300",
    "teal-400": "bg-teal-400",
    "teal-500": "bg-teal-500",
    "teal-600": "bg-teal-600",
    "teal-700": "bg-teal-700",
    "teal-800": "bg-teal-800",
    "teal-900": "bg-teal-900",
    "cyan-300": "bg-cyan-300",
    "cyan-400": "bg-cyan-400",
    "cyan-500": "bg-cyan-500",
    "cyan-600": "bg-cyan-600",
    "cyan-700": "bg-cyan-700",
    "cyan-800": "bg-cyan-800",
    "cyan-900": "bg-cyan-900",
    "sky-300": "bg-sky-300",
    "sky-400": "bg-sky-400",
    "sky-500": "bg-sky-500",
    "sky-600": "bg-sky-600",
    "sky-700": "bg-sky-700",
    "sky-800": "bg-sky-800",
    "sky-900": "bg-sky-900",
    "blue-300": "bg-blue-300",
    "blue-400": "bg-blue-400",
    "blue-500": "bg-blue-500",
    "blue-600": "bg-blue-600",
    "blue-700": "bg-blue-700",
    "blue-800": "bg-blue-800",
    "blue-900": "bg-blue-900",
    "indigo-300": "bg-indigo-300",
    "indigo-400": "bg-indigo-400",
    "indigo-500": "bg-indigo-500",
    "indigo-600": "bg-indigo-600",
    "indigo-700": "bg-indigo-700",
    "indigo-800": "bg-indigo-800",
    "indigo-900": "bg-indigo-900",
    "violet-300": "bg-violet-300",
    "violet-400": "bg-violet-400",
    "violet-500": "bg-violet-500",
    "violet-600": "bg-violet-600",
    "violet-700": "bg-violet-700",
    "violet-800": "bg-violet-800",
    "violet-900": "bg-violet-900",
    "purple-300": "bg-purple-300",
    "purple-400": "bg-purple-400",
    "purple-500": "bg-purple-500",
    "purple-600": "bg-purple-600",
    "purple-700": "bg-purple-700",
    "purple-800": "bg-purple-800",
    "purple-900": "bg-purple-900",
    "fuchsia-300": "bg-fuchsia-300",
    "fuchsia-400": "bg-fuchsia-400",
    "fuchsia-500": "bg-fuchsia-500",
    "fuchsia-600": "bg-fuchsia-600",
    "fuchsia-700": "bg-fuchsia-700",
    "fuchsia-800": "bg-fuchsia-800",
    "fuchsia-900": "bg-fuchsia-900",
    "pink-300": "bg-pink-300",
    "pink-400": "bg-pink-400",
    "pink-500": "bg-pink-500",
    "pink-600": "bg-pink-600",
    "pink-700": "bg-pink-700",
    "pink-800": "bg-pink-800",
    "pink-900": "bg-pink-900",
    "rose-300": "bg-rose-300",
    "rose-400": "bg-rose-400",
    "rose-500": "bg-rose-500",
    "rose-600": "bg-rose-600",
    "rose-700": "bg-rose-700",
    "rose-800": "bg-rose-800",
    "rose-900": "bg-rose-900",
}

/**
 * Visszaadja a megadott szín-kulcshoz tartozó Tailwind CSS háttérszín osztálynevet.
 * Ha a szín-kulcs nem szerepel a térképben, "bg-gray-500" értékkel tér vissza.
 *
 * @param colorKey - A szín-kulcs "szín-árnyalat" formátumban (pl. "red-700").
 * @returns string - A megfelelő Tailwind CSS osztálynev (pl. "bg-red-700").
 */
export const getColorClass = (colorKey: string): string => {
    return colorClassMap[colorKey] || "bg-gray-500"
}

export const COLORS: ColorName[] = [
    "red",
    "orange",
    // "amber",
    "yellow",
    "lime",
    // "green",
    "emerald",
    "teal",
    "cyan",
    // "sky",
    "blue",
    "indigo",
    // "violet",
    "purple",
    "fuchsia",
    "pink",
    // "rose",
]

export const SHADES: Shade[] = ["300", "400", "500", "600", "700", "800", "900"]
