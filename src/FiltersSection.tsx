import { Palette } from 'lucide-react'

interface FiltersSectionProps {
    grayscale: boolean
    setGrayscale: (value: boolean) => void
    sepia: boolean
    setSepia: (value: boolean) => void
    blur: number
    setBlur: (value: number) => void
    sharpen: boolean
    setSharpen: (value: boolean) => void
    brightness: number
    setBrightness: (value: number) => void
    contrast: number
    setContrast: (value: number) => void
    saturation: number
    setSaturation: (value: number) => void
    negative: boolean
    setNegative: (value: boolean) => void
    tint: string
    setTint: (value: string) => void
}

export default function FiltersSection(props: FiltersSectionProps) {
    const {
        grayscale, setGrayscale,
        sepia, setSepia,
        blur, setBlur,
        sharpen, setSharpen,
        brightness, setBrightness,
        contrast, setContrast,
        saturation, setSaturation,
        negative, setNegative,
        tint, setTint
    } = props

    const resetAllFilters = () => {
        setGrayscale(false)
        setSepia(false)
        setBlur(0)
        setSharpen(false)
        setBrightness(1)
        setContrast(1)
        setSaturation(1)
        setNegative(false)
        setTint('')
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters & Effects</h3>

            <div className="space-y-6">

                {/* Quick Effect Toggles */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Effects</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button
                            onClick={() => setGrayscale(!grayscale)}
                            className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${grayscale
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            Grayscale
                        </button>
                        <button
                            onClick={() => setSepia(!sepia)}
                            className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${sepia
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            Sepia
                        </button>
                        <button
                            onClick={() => setSharpen(!sharpen)}
                            className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${sharpen
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            Sharpen
                        </button>
                        <button
                            onClick={() => setNegative(!negative)}
                            className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${negative
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            Negative
                        </button>
                    </div>
                </div>

                {/* Blur Slider */}
                <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Blur</span>
                        <span className="text-purple-600 font-bold">{blur.toFixed(1)}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={blur}
                        onChange={(e) => setBlur(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>

                {/* Brightness Slider */}
                <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Brightness</span>
                        <span className="text-purple-600 font-bold">{brightness.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.01}
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>

                {/* Contrast Slider */}
                <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Contrast</span>
                        <span className="text-purple-600 font-bold">{contrast.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.01}
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>

                {/* Saturation Slider */}
                <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                        <span>Saturation</span>
                        <span className="text-purple-600 font-bold">{saturation.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.01}
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>



                {/* Tint Color */}
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Palette className="w-4 h-4 mr-1.5 text-purple-600" />
                        Tint Color (optional)
                    </label>
                    <div className="flex items-center space-x-3">
                        <input
                            type="color"
                            value={tint || '#ffffff'}
                            onChange={(e) => setTint(e.target.value)}
                            className="h-12 w-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={tint}
                            onChange={(e) => setTint(e.target.value)}
                            placeholder="#ffffff or rgb(255,255,255)"
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm"
                        />
                        {tint && (
                            <button
                                onClick={() => setTint('')}
                                className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-medium"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Reset Filters Button */}
                <button
                    onClick={resetAllFilters}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                    Reset All Filters
                </button>
            </div>
        </div>
    )
}
