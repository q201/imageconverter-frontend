import { useEffect, useRef, useState } from 'react'
import { Download, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface PreviewCanvasProps {
    file: File | null
    filters: {
        grayscale: boolean
        sepia: boolean
        blur: number
        sharpen: boolean
        brightness: number
        contrast: number
        saturation: number
        rotation: number
        flipHorizontal: boolean
        flipVertical: boolean
        negative: boolean
        tint: string
    }
}

export default function PreviewCanvas({ file, filters }: PreviewCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [zoom, setZoom] = useState(1)
    const imageRef = useRef<HTMLImageElement | null>(null)

    // Load image when file changes
    useEffect(() => {
        if (!file) {
            setImageLoaded(false)
            return
        }

        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            imageRef.current = img
            setImageLoaded(true)
            URL.revokeObjectURL(url)
        }

        img.src = url

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [file])

    // Apply filters and render to canvas
    useEffect(() => {
        if (!imageLoaded || !imageRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        const img = imageRef.current

        // Set canvas size based on rotation
        const isRotated = filters.rotation === 90 || filters.rotation === 270
        canvas.width = isRotated ? img.height : img.width
        canvas.height = isRotated ? img.width : img.height

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Save context state
        ctx.save()

        // Apply transformations
        ctx.translate(canvas.width / 2, canvas.height / 2)

        // Rotation
        ctx.rotate((filters.rotation * Math.PI) / 180)

        // Flip
        const scaleX = filters.flipHorizontal ? -1 : 1
        const scaleY = filters.flipVertical ? -1 : 1
        ctx.scale(scaleX, scaleY)

        // Draw image
        ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)

        // Restore context
        ctx.restore()

        // Get image data for pixel manipulation
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Apply pixel-based filters
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i]
            let g = data[i + 1]
            let b = data[i + 2]

            // Grayscale
            if (filters.grayscale) {
                const gray = 0.299 * r + 0.587 * g + 0.114 * b
                r = g = b = gray
            }

            // Sepia
            if (filters.sepia) {
                const tr = 0.393 * r + 0.769 * g + 0.189 * b
                const tg = 0.349 * r + 0.686 * g + 0.168 * b
                const tb = 0.272 * r + 0.534 * g + 0.131 * b
                r = Math.min(255, tr)
                g = Math.min(255, tg)
                b = Math.min(255, tb)
            }

            // Negative
            if (filters.negative) {
                r = 255 - r
                g = 255 - g
                b = 255 - b
            }

            // Brightness
            if (filters.brightness !== 1) {
                r *= filters.brightness
                g *= filters.brightness
                b *= filters.brightness
            }

            // Contrast
            if (filters.contrast !== 1) {
                const factor = filters.contrast
                r = ((r - 128) * factor) + 128
                g = ((g - 128) * factor) + 128
                b = ((b - 128) * factor) + 128
            }

            // Saturation
            if (filters.saturation !== 1) {
                const gray = 0.299 * r + 0.587 * g + 0.114 * b
                r = gray + (r - gray) * filters.saturation
                g = gray + (g - gray) * filters.saturation
                b = gray + (b - gray) * filters.saturation
            }

            // Tint
            if (filters.tint) {
                const tintColor = hexToRgb(filters.tint)
                if (tintColor) {
                    r = (r + tintColor.r) / 2
                    g = (g + tintColor.g) / 2
                    b = (b + tintColor.b) / 2
                }
            }

            // Clamp values
            data[i] = Math.max(0, Math.min(255, r))
            data[i + 1] = Math.max(0, Math.min(255, g))
            data[i + 2] = Math.max(0, Math.min(255, b))
        }

        // Put modified image data back
        ctx.putImageData(imageData, 0, 0)

        // Apply blur using canvas filter (CSS-based)
        if (filters.blur > 0) {
            ctx.filter = `blur(${filters.blur}px)`
            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = canvas.width
            tempCanvas.height = canvas.height
            const tempCtx = tempCanvas.getContext('2d')
            if (tempCtx) {
                tempCtx.drawImage(canvas, 0, 0)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.filter = `blur(${filters.blur}px)`
                ctx.drawImage(tempCanvas, 0, 0)
                ctx.filter = 'none'
            }
        }

        // Sharpen effect (simplified convolution)
        if (filters.sharpen) {
            const sharpened = applySharpen(ctx, canvas.width, canvas.height)
            ctx.putImageData(sharpened, 0, 0)
        }

    }, [imageLoaded, filters])

    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }

    // Sharpen filter using convolution
    const applySharpen = (ctx: CanvasRenderingContext2D, width: number, height: number): ImageData => {
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data
        const output = ctx.createImageData(width, height)

        // Sharpen kernel
        const kernel = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ]

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let r = 0, g = 0, b = 0

                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4
                        const k = kernel[(ky + 1) * 3 + (kx + 1)]
                        r += data[idx] * k
                        g += data[idx + 1] * k
                        b += data[idx + 2] * k
                    }
                }

                const idx = (y * width + x) * 4
                output.data[idx] = Math.max(0, Math.min(255, r))
                output.data[idx + 1] = Math.max(0, Math.min(255, g))
                output.data[idx + 2] = Math.max(0, Math.min(255, b))
                output.data[idx + 3] = data[idx + 3]
            }
        }

        return output
    }

    // Download the filtered image
    const handleDownload = () => {
        if (!canvasRef.current || !file) return

        canvasRef.current.toBlob((blob) => {
            if (!blob) return

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
            link.download = `${fileName}-filtered.png`
            link.href = url
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 'image/png')
    }

    if (!file) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                    <Maximize2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No image selected</p>
                    <p className="text-sm">Upload an image to see the preview</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h3 className="text-white font-semibold text-lg">Live Preview</h3>
                    <span className="text-indigo-100 text-sm">{file.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-white font-medium min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
                    <button
                        onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-white/30 mx-2"></div>
                    <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            {/* Canvas Container */}
            <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="flex items-center justify-center min-h-full">
                    <canvas
                        ref={canvasRef}
                        className="shadow-2xl rounded-lg"
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'center',
                            transition: 'transform 0.2s ease',
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
