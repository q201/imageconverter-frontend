import { Zap, Target, Sparkles } from 'lucide-react'

type CompressionPreset = 'web' | 'print' | 'maximum' | 'balanced' | 'custom'

interface CompressionPanelProps {
    preset: CompressionPreset
    setPreset: (preset: CompressionPreset) => void
    targetSize: string
    setTargetSize: (size: string) => void
    quality: number
    setQuality: (quality: number) => void
}

export default function CompressionPanel({
    preset,
    setPreset,
    targetSize,
    setTargetSize,
    quality,
    setQuality
}: CompressionPanelProps) {
    const presets = [
        {
            id: 'web' as CompressionPreset,
            name: 'Web Optimized',
            description: 'Fast loading, good quality',
            quality: 80,
            icon: Zap,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'print' as CompressionPreset,
            name: 'Print Quality',
            description: 'High quality, larger size',
            quality: 95,
            icon: Sparkles,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'maximum' as CompressionPreset,
            name: 'Maximum Compression',
            description: 'Smallest size, acceptable quality',
            quality: 60,
            icon: Target,
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'balanced' as CompressionPreset,
            name: 'Balanced',
            description: 'Middle ground',
            quality: 85,
            icon: Zap,
            color: 'from-orange-500 to-amber-500'
        }
    ]

    const handlePresetChange = (presetId: CompressionPreset) => {
        setPreset(presetId)
        const selectedPreset = presets.find(p => p.id === presetId)
        if (selectedPreset) {
            setQuality(selectedPreset.quality)
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Smart Compression</h3>

            {/* Preset Modes */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Compression Presets</label>
                <div className="grid grid-cols-2 gap-3">
                    {presets.map((presetOption) => {
                        const Icon = presetOption.icon
                        const isActive = preset === presetOption.id

                        return (
                            <button
                                key={presetOption.id}
                                onClick={() => handlePresetChange(presetOption.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${isActive
                                        ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                                        : 'border-gray-200 bg-white hover:border-indigo-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${presetOption.color}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-semibold text-sm ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                                            {presetOption.name}
                                        </h4>
                                        <p className={`text-xs mt-0.5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                            {presetOption.description}
                                        </p>
                                        <p className={`text-xs mt-1 font-medium ${isActive ? 'text-indigo-700' : 'text-gray-600'}`}>
                                            Quality: {presetOption.quality}%
                                        </p>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Custom Quality Slider */}
            <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Custom Quality</span>
                    <span className="text-indigo-600 font-bold">{quality}%</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(e) => {
                        setQuality(Number(e.target.value))
                        setPreset('custom')
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    style={{
                        background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${quality}%, rgb(229, 231, 235) ${quality}%, rgb(229, 231, 235) 100%)`
                    }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Smallest</span>
                    <span>Balanced</span>
                    <span>Highest</span>
                </div>
            </div>

            {/* Target File Size */}
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 mr-1.5 text-indigo-600" />
                    Target File Size (optional)
                </label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        min={1}
                        placeholder="500"
                        value={targetSize}
                        onChange={(e) => setTargetSize(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                        <option value="kb">KB</option>
                        <option value="mb">MB</option>
                    </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Algorithm will find optimal quality to meet target size
                </p>
            </div>

            {/* Info Box */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">How it works</h4>
                <ul className="space-y-1 text-xs text-indigo-700">
                    <li>• <strong>Presets</strong>: Quick optimization for common use cases</li>
                    <li>• <strong>Custom</strong>: Fine-tune quality manually</li>
                    <li>• <strong>Target Size</strong>: Auto-find best quality for desired file size</li>
                </ul>
            </div>

            {/* Statistics Placeholder */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Compression Stats</h4>
                <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                        <span>Original Size:</span>
                        <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Compressed Size:</span>
                        <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Reduction:</span>
                        <span className="font-medium text-green-600">-</span>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 italic">
                    Upload and convert an image to see statistics
                </p>
            </div>
        </div>
    )
}
