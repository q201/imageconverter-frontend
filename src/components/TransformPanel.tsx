import { Maximize2 } from 'lucide-react'

interface TransformPanelProps {
    width: string
    setWidth: (value: string) => void
    height: string
    setHeight: (value: string) => void
    rotation: number
    setRotation: (value: number) => void
    flipHorizontal: boolean
    setFlipHorizontal: (value: boolean) => void
    flipVertical: boolean
    setFlipVertical: (value: boolean) => void
}

export default function TransformPanel({
    width,
    setWidth,
    height,
    setHeight,
    rotation,
    setRotation,
    flipHorizontal,
    setFlipHorizontal,
    flipVertical,
    setFlipVertical
}: TransformPanelProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Transform</h3>

            {/* Resize */}
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Maximize2 className="w-4 h-4 mr-1.5 text-indigo-600" />
                    Resize (optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="number"
                        min={1}
                        placeholder="Width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        min={1}
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep original size</p>
            </div>

            {/* Rotation */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Rotation</label>
                <div className="grid grid-cols-4 gap-2">
                    {[0, 90, 180, 270].map((deg) => (
                        <button
                            key={deg}
                            onClick={() => setRotation(deg)}
                            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${rotation === deg
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                                }`}
                        >
                            {deg}°
                        </button>
                    ))}
                </div>
            </div>

            {/* Flip */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Flip</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setFlipHorizontal(!flipHorizontal)}
                        className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${flipHorizontal
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                            }`}
                    >
                        ↔ Horizontal
                    </button>
                    <button
                        onClick={() => setFlipVertical(!flipVertical)}
                        className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${flipVertical
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                            }`}
                    >
                        ↕ Vertical
                    </button>
                </div>
            </div>
        </div>
    )
}
