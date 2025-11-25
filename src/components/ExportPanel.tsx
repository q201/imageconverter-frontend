import { ImageIcon, Sparkles, Download, Loader2 } from 'lucide-react'

type Format = 'jpeg' | 'png' | 'webp' | 'tiff' | 'gif' | 'avif' | 'bmp' | 'heif'

interface ExportPanelProps {
    format: Format
    setFormat: (format: Format) => void
    quality: number
    setQuality: (quality: number) => void
    handleConvert: () => void
    loading: boolean
    filesCount: number
}

export default function ExportPanel({
    format,
    setFormat,
    quality,
    setQuality,
    handleConvert,
    loading,
    filesCount
}: ExportPanelProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Export Settings</h3>

            {/* Format */}
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 mr-1.5 text-indigo-600" />
                    Output Format
                </label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as Format)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                    <option value="tiff">TIFF</option>
                    <option value="gif">GIF</option>
                    <option value="avif">AVIF</option>
                    <option value="heif">HEIF</option>
                </select>
            </div>

            {/* Quality */}
            <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-1.5 text-indigo-600" />
                        Quality
                    </span>
                    <span className="text-indigo-600 font-bold">{quality}%</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    style={{
                        background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${quality}%, rgb(229, 231, 235) ${quality}%, rgb(229, 231, 235) 100%)`
                    }}
                />
            </div>

            {/* Export Summary */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Export Summary</h4>
                <div className="space-y-1 text-xs text-indigo-700">
                    <p>• Format: <span className="font-medium">{format.toUpperCase()}</span></p>
                    <p>• Quality: <span className="font-medium">{quality}%</span></p>
                    <p>• Files: <span className="font-medium">{filesCount}</span></p>
                </div>
            </div>

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                disabled={loading || filesCount === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Converting...</span>
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        <span>Convert & Download All</span>
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 text-center">
                High-quality server-side conversion
            </p>
        </div>
    )
}
