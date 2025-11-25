import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Download, ZoomIn, ZoomOut, Maximize2, Crop as CropIcon } from 'lucide-react'

interface Area {
    x: number
    y: number
    width: number
    height: number
}

interface Point {
    x: number
    y: number
}

interface CropEditorProps {
    image: string
    aspectRatio: number | null
    zoom: number
    onZoomChange: (zoom: number) => void
    showGrid: boolean
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
    onDownload?: () => void
}

export default function CropEditor({
    image,
    aspectRatio,
    zoom,
    onZoomChange,
    showGrid,
    onCropComplete,
    onDownload
}: CropEditorProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })

    const handleCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            onCropComplete(croppedArea, croppedAreaPixels)
        },
        [onCropComplete]
    )

    if (!image) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                    <Maximize2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No image selected</p>
                    <p className="text-sm">Upload an image to start cropping</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h3 className="text-white font-semibold text-lg flex items-center">
                        <CropIcon className="w-5 h-5 mr-2" />
                        Crop Editor
                    </h3>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onZoomChange(Math.max(1, zoom - 0.25))}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-white font-medium min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
                    <button
                        onClick={() => onZoomChange(Math.min(3, zoom + 0.25))}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>

                    {onDownload && (
                        <>
                            <div className="w-px h-6 bg-white/30 mx-2"></div>
                            <button
                                onClick={onDownload}
                                className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium shadow-lg"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex-1 relative bg-gray-900 overflow-hidden">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio || undefined}
                    onCropChange={setCrop}
                    onZoomChange={onZoomChange}
                    onCropComplete={handleCropComplete}
                    showGrid={showGrid}
                    style={{
                        containerStyle: {
                            backgroundColor: '#111827',
                        },
                        cropAreaStyle: {
                            border: '2px solid rgb(79, 70, 229)',
                            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                        },
                    }}
                />

                {/* Instructions Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm pointer-events-none">
                    <p className="font-medium">💡 Drag to reposition • Scroll to zoom</p>
                </div>
            </div>
        </div>
    )
}
