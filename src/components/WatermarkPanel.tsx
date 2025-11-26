import { Type, Image as ImageIcon, Droplet, Eraser, Upload } from 'lucide-react'

type WatermarkMode = 'add' | 'remove'
type WatermarkType = 'text' | 'image'
type Position = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'

interface WatermarkPanelProps {
    mode: WatermarkMode
    setMode: (mode: WatermarkMode) => void
    watermarkType: WatermarkType
    setWatermarkType: (type: WatermarkType) => void
    watermarkText: string
    setWatermarkText: (text: string) => void
    fontSize: number
    setFontSize: (size: number) => void
    textColor: string
    setTextColor: (color: string) => void
    opacity: number
    setOpacity: (opacity: number) => void
    rotation: number
    setRotation: (rotation: number) => void
    position: Position[]
    setPosition: (position: Position[]) => void
    watermarkImage: File | null
    setWatermarkImage: (file: File | null) => void
    imageScale: number
    setImageScale: (scale: number) => void
    onConvert?: () => void
    loading?: boolean
    filesCount?: number
}

export default function WatermarkPanel({
    mode,
    setMode,
    watermarkType,
    setWatermarkType,
    watermarkText,
    setWatermarkText,
    fontSize,
    setFontSize,
    textColor,
    setTextColor,
    opacity,
    setOpacity,
    rotation,
    setRotation,
    position,
    setPosition,
    watermarkImage,
    setWatermarkImage,
    imageScale,
    setImageScale,
    onConvert,
    loading = false,
    filesCount = 0
}: WatermarkPanelProps) {
    const positions: { id: Position; label: string }[] = [
        { id: 'top-left', label: 'Top Left' },
        { id: 'top', label: 'Top' },
        { id: 'top-right', label: 'Top Right' },
        { id: 'left', label: 'Left' },
        { id: 'center', label: 'Center' },
        { id: 'right', label: 'Right' },
        { id: 'bottom-left', label: 'Bottom Left' },
        { id: 'bottom', label: 'Bottom' },
        { id: 'bottom-right', label: 'Bottom Right' },
    ]

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setWatermarkImage(e.target.files[0])
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Watermarking</h3>

            {/* Mode Selector */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Mode</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setMode('add')}
                        className={`p-4 rounded-xl border-2 transition-all ${mode === 'add'
                            ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                                <Droplet className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <h4 className={`font-semibold text-sm ${mode === 'add' ? 'text-indigo-900' : 'text-gray-900'}`}>
                                    Add Watermark
                                </h4>
                                <p className={`text-xs ${mode === 'add' ? 'text-indigo-600' : 'text-gray-500'}`}>
                                    Protect content
                                </p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setMode('remove')}
                        className={`p-4 rounded-xl border-2 transition-all ${mode === 'remove'
                            ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                                <Eraser className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <h4 className={`font-semibold text-sm ${mode === 'remove' ? 'text-indigo-900' : 'text-gray-900'}`}>
                                    Remove Watermark
                                </h4>
                                <p className={`text-xs ${mode === 'remove' ? 'text-indigo-600' : 'text-gray-500'}`}>
                                    AI-powered
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Add Watermark Mode */}
            {mode === 'add' && (
                <>
                    {/* Watermark Type */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Watermark Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setWatermarkType('text')}
                                className={`p-3 rounded-lg border-2 transition-all ${watermarkType === 'text'
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 bg-white hover:border-indigo-300'
                                    }`}
                            >
                                <Type className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                                <span className="text-sm font-medium">Text</span>
                            </button>

                            <button
                                onClick={() => setWatermarkType('image')}
                                className={`p-3 rounded-lg border-2 transition-all ${watermarkType === 'image'
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 bg-white hover:border-indigo-300'
                                    }`}
                            >
                                <ImageIcon className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                                <span className="text-sm font-medium">Image</span>
                            </button>
                        </div>
                    </div>

                    {/* Text Watermark Controls */}
                    {watermarkType === 'text' && (
                        <>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Watermark Text</label>
                                <input
                                    type="text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    placeholder="© Your Name 2024"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                                    <span>Font Size</span>
                                    <span className="text-indigo-600 font-bold">{fontSize}px</span>
                                </label>
                                <input
                                    type="range"
                                    min={10}
                                    max={100}
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Text Color</label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Image Watermark Controls */}
                    {watermarkType === 'image' && (
                        <>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Logo/Signature</label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-600">
                                        {watermarkImage ? watermarkImage.name : 'Click to upload image'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                                    <span>Scale</span>
                                    <span className="text-indigo-600 font-bold">{imageScale}%</span>
                                </label>
                                <input
                                    type="range"
                                    min={10}
                                    max={200}
                                    value={imageScale}
                                    onChange={(e) => setImageScale(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                        </>
                    )}

                    {/* Common Controls */}
                    <div>
                        <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>Opacity</span>
                            <span className="text-indigo-600 font-bold">{opacity}%</span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div>
                        <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>Rotation</span>
                            <span className="text-indigo-600 font-bold">{rotation}°</span>
                        </label>
                        <input
                            type="range"
                            min={-45}
                            max={45}
                            value={rotation}
                            onChange={(e) => setRotation(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    {/* Position Grid */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Position</label>
                        <div className="grid grid-cols-3 gap-2">
                            {positions.map((pos) => (
                                <button
                                    key={pos.id}
                                    onClick={() => {
                                        if (position.includes(pos.id)) {
                                            if (position.length > 1) {
                                                setPosition(position.filter(p => p !== pos.id))
                                            }
                                        } else {
                                            setPosition([...position, pos.id])
                                        }
                                    }}
                                    className={`p-3 rounded-lg border-2 transition-all text-xs font-medium ${position.includes(pos.id)
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                                        }`}
                                >
                                    {pos.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Remove Watermark Mode */}
            {mode === 'remove' && (
                <>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 mb-6">
                        <h4 className="text-sm font-semibold text-orange-900 mb-2">Blur Region Removal</h4>
                        <p className="text-xs text-orange-700">
                            Select the area(s) containing the watermark to apply a heavy blur.
                        </p>
                    </div>

                    {/* Removal Area Size (reuse imageScale) */}
                    <div>
                        <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>Removal Area Size</span>
                            <span className="text-indigo-600 font-bold">{imageScale}%</span>
                        </label>
                        <input
                            type="range"
                            min={5}
                            max={50}
                            value={imageScale}
                            onChange={(e) => setImageScale(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Adjust the size of the blur box</p>
                    </div>

                    {/* Position Grid (reuse position) */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Watermark Position</label>
                        <div className="grid grid-cols-3 gap-2">
                            {positions.map((pos) => (
                                <button
                                    key={pos.id}
                                    onClick={() => {
                                        if (position.includes(pos.id)) {
                                            if (position.length > 1) {
                                                setPosition(position.filter(p => p !== pos.id))
                                            }
                                        } else {
                                            setPosition([...position, pos.id])
                                        }
                                    }}
                                    className={`p-3 rounded-lg border-2 transition-all text-xs font-medium ${position.includes(pos.id)
                                        ? 'border-orange-500 bg-orange-50 text-orange-900'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                                        }`}
                                >
                                    {pos.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Apply Button */}
            {onConvert && (
                <button
                    onClick={onConvert}
                    disabled={loading || filesCount === 0}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading || filesCount === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : mode === 'add'
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        mode === 'add'
                            ? `Apply Watermark${filesCount > 1 ? ` to ${filesCount} Images` : ''}`
                            : `Remove Watermark${filesCount > 1 ? ` from ${filesCount} Images` : ''}`
                    )}
                </button>
            )}

            {/* Info Box */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">
                    {mode === 'add' ? 'How to Add Watermarks' : 'How Removal Works'}
                </h4>
                {mode === 'add' ? (
                    <ul className="space-y-1 text-xs text-indigo-700">
                        <li>• <strong>Text</strong>: Add copyright, name, or custom text</li>
                        <li>• <strong>Image</strong>: Upload your logo or signature</li>
                        <li>• <strong>Position</strong>: Choose from 9 preset locations</li>
                        <li>• <strong>Customize</strong>: Adjust opacity, size, and rotation</li>
                    </ul>
                ) : (
                    <ul className="space-y-1 text-xs text-indigo-700">
                        <li>• <strong>AI-powered</strong>: Uses content-aware fill</li>
                        <li>• <strong>Best for</strong>: Simple text watermarks</li>
                        <li>• <strong>Quality</strong>: Depends on background complexity</li>
                        <li>• <strong>Process</strong>: Click button to auto-remove</li>
                    </ul>
                )}
            </div>
        </div>
    )
}
