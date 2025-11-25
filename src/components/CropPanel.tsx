import { Crop, Maximize2, Grid3x3 } from 'lucide-react'

interface CropPanelProps {
    aspectRatio: number | null
    setAspectRatio: (ratio: number | null) => void
    showGrid: boolean
    setShowGrid: (show: boolean) => void
    zoom: number
    setZoom: (zoom: number) => void
    onResetCrop: () => void
    onDownload?: () => void
}

const ASPECT_RATIOS = [
    { value: 1, label: '1:1', name: 'Square', description: 'Instagram posts', color: 'from-pink-500 to-rose-500' },
    { value: 16 / 9, label: '16:9', name: 'Landscape', description: 'YouTube', color: 'from-red-500 to-orange-500' },
    { value: 9 / 16, label: '9:16', name: 'Portrait', description: 'Stories', color: 'from-purple-500 to-indigo-500' },
    { value: 4 / 3, label: '4:3', name: 'Standard', description: 'Photos', color: 'from-blue-500 to-cyan-500' },
    { value: 3 / 2, label: '3:2', name: 'DSLR', description: 'Camera', color: 'from-green-500 to-emerald-500' },
    { value: 21 / 9, label: '21:9', name: 'Ultrawide', description: 'Cinema', color: 'from-amber-500 to-yellow-500' },
    { value: null, label: 'Free', name: 'Free Form', description: 'No constraints', color: 'from-gray-500 to-slate-500' },
]

export default function CropPanel({
    aspectRatio,
    setAspectRatio,
    showGrid,
    setShowGrid,
    zoom,
    setZoom,
    onResetCrop,
    onDownload
}: CropPanelProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Crop Image</h3>

            {/* Aspect Ratio Presets */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Aspect Ratio Presets</label>
                <div className="grid grid-cols-2 gap-3">
                    {ASPECT_RATIOS.map((preset) => {
                        const isActive = aspectRatio === preset.value

                        return (
                            <button
                                key={preset.label}
                                onClick={() => setAspectRatio(preset.value)}
                                className={`p-3 rounded-xl border-2 transition-all text-left ${isActive
                                    ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                                    : 'border-gray-200 bg-white hover:border-indigo-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${preset.color} flex-shrink-0`}>
                                        <Crop className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className={`font-semibold text-sm ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                                                {preset.name}
                                            </h4>
                                            <span className={`text-xs font-mono ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                                {preset.label}
                                            </span>
                                        </div>
                                        <p className={`text-xs mt-0.5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                            {preset.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Zoom Control */}
            <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                        <Maximize2 className="w-4 h-4 mr-1.5 text-indigo-600" />
                        Zoom
                    </span>
                    <span className="text-indigo-600 font-bold">{zoom.toFixed(1)}x</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    style={{
                        background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${((zoom - 1) / 2) * 100}%, rgb(229, 231, 235) ${((zoom - 1) / 2) * 100}%, rgb(229, 231, 235) 100%)`
                    }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1x</span>
                    <span>2x</span>
                    <span>3x</span>
                </div>
            </div>

            {/* Grid Overlay Toggle */}
            <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                        <Grid3x3 className="w-4 h-4 mr-1.5 text-indigo-600" />
                        Grid Overlay
                    </span>
                </label>
                <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${showGrid
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-400'
                        }`}
                >
                    {showGrid ? 'Grid Enabled (Rule of Thirds)' : 'Show Grid'}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                    Grid helps with composition and alignment
                </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                {onDownload && (
                    <button
                        onClick={onDownload}
                        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium shadow-lg flex items-center justify-center"
                    >
                        <Crop className="w-5 h-5 mr-2" />
                        Crop & Download
                    </button>
                )}
                <button
                    onClick={onResetCrop}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                >
                    Reset Crop Area
                </button>
            </div>

            {/* Info Box */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">How to Crop</h4>
                <ul className="space-y-1 text-xs text-indigo-700">
                    <li>• <strong>Select preset</strong>: Choose aspect ratio for your platform</li>
                    <li>• <strong>Drag</strong>: Reposition the image</li>
                    <li>• <strong>Pinch/Scroll</strong>: Zoom in or out</li>
                    <li>• <strong>Grid</strong>: Enable for composition guidelines</li>
                </ul>
            </div>

            {/* Crop Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Crop Info</h4>
                <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                        <span>Aspect Ratio:</span>
                        <span className="font-medium">
                            {aspectRatio === null ? 'Free Form' : ASPECT_RATIOS.find(r => r.value === aspectRatio)?.label || 'Custom'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Zoom Level:</span>
                        <span className="font-medium">{zoom.toFixed(1)}x</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Grid:</span>
                        <span className="font-medium">{showGrid ? 'Enabled' : 'Disabled'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
