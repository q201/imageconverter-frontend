import { X, Download, AlertCircle } from 'lucide-react'

interface WatermarkPreviewModalProps {
    isOpen: boolean
    onClose: () => void
    previewUrl: string | null
    onDownload: () => void
    filesCount: number
    filename: string
}

export default function WatermarkPreviewModal({
    isOpen,
    onClose,
    previewUrl,
    onDownload,
    filesCount,
    filename
}: WatermarkPreviewModalProps) {
    if (!isOpen || !previewUrl) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Watermark Preview</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">{filename}</p>
                        {filesCount > 1 && (
                            <p className="text-sm text-gray-500 mt-1">
                                Showing preview of 1st image. Download will include all {filesCount} images.
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6 bg-gray-50 flex items-center justify-center min-h-[300px]">
                    <div className="relative shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC440OannAAAABxpRE9UAAAAAgAAAAAAAACAAAAAj8AAIOAAAAAgyAAAi2e7/dAAAABaSURBVDhP3YxRCoAwDEN3/3PoS3jxJCtbiuCvD4MAbTrNfIukInL5fH8oM78fQp+xX2L1x72F9Y/7Cusf9xXWP+4rrH/cV1j/uK+w/nFfYf3jvsL6x32F9Y/7Clc3E70j16WbAAAAAElFTkSuQmCC')]">
                        <img
                            src={previewUrl}
                            alt="Watermark Preview"
                            className="max-w-full max-h-[60vh] object-contain"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
                    <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Review carefully before downloading</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Adjust Settings
                        </button>
                        <button
                            onClick={onDownload}
                            className="flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download {filesCount > 1 ? 'All Images' : 'Image'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
