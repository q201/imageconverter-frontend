import { useState } from 'react'
import axios from 'axios'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import PreviewCanvas from './components/PreviewCanvas'
import UploadPanel from './components/UploadPanel'
import FiltersSection from './FiltersSection'
import TransformPanel from './components/TransformPanel'
import ExportPanel from './components/ExportPanel'
import CompressionPanel from './components/CompressionPanel'
import CropPanel from './components/CropPanel'
import CropEditor from './components/CropEditor'
import MetadataPanel from './components/MetadataPanel'
import WatermarkPanel from './components/WatermarkPanel'
import WatermarkPreviewModal from './components/WatermarkPreviewModal'

type Format = 'jpeg' | 'png' | 'webp' | 'tiff' | 'gif' | 'avif' | 'bmp' | 'heif'
type CompressionPreset = 'web' | 'print' | 'maximum' | 'balanced' | 'custom'
type WatermarkMode = 'add' | 'remove'
type WatermarkType = 'text' | 'image'
type Position = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'

function App() {
  // File management
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState<boolean>(false)

  // Export settings
  const [format, setFormat] = useState<Format>('png')
  const [quality, setQuality] = useState<number>(90)

  // Transform settings
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [rotation, setRotation] = useState<number>(0)
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false)
  const [flipVertical, setFlipVertical] = useState<boolean>(false)

  // Filter states
  const [grayscale, setGrayscale] = useState<boolean>(false)
  const [sepia, setSepia] = useState<boolean>(false)
  const [blur, setBlur] = useState<number>(0)
  const [sharpen, setSharpen] = useState<boolean>(false)
  const [brightness, setBrightness] = useState<number>(1)
  const [contrast, setContrast] = useState<number>(1)
  const [saturation, setSaturation] = useState<number>(1)
  const [negative, setNegative] = useState<boolean>(false)
  const [tint, setTint] = useState<string>('')

  // Compression settings
  const [compressionPreset, setCompressionPreset] = useState<CompressionPreset>('balanced')
  const [targetSize, setTargetSize] = useState<string>('')

  // Crop settings
  const [cropAspectRatio, setCropAspectRatio] = useState<number | null>(1)
  const [cropZoom, setCropZoom] = useState<number>(1)
  const [showCropGrid, setShowCropGrid] = useState<boolean>(true)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  // Metadata settings
  const [metadata, setMetadata] = useState<any>(null)
  const [metadataLoading, setMetadataLoading] = useState<boolean>(false)
  const [stripMetadata, setStripMetadata] = useState<'all' | 'gps' | 'camera' | 'none'>('none')

  // Watermark settings
  const [watermarkMode, setWatermarkMode] = useState<WatermarkMode>('add')
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('text')
  const [watermarkText, setWatermarkText] = useState<string>('© 2025')
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(48)
  const [watermarkTextColor, setWatermarkTextColor] = useState<string>('#ffffff')
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(70)
  const [watermarkRotation, setWatermarkRotation] = useState<number>(0)
  const [watermarkPosition, setWatermarkPosition] = useState<Position[]>(['bottom-right'])
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
  const [watermarkImageScale, setWatermarkImageScale] = useState<number>(50)

  // Preview state
  const [watermarkedPreview, setWatermarkedPreview] = useState<string | null>(null)
  const [showWatermarkPreview, setShowWatermarkPreview] = useState<boolean>(false)
  const [watermarkedFilename, setWatermarkedFilename] = useState<string>('')

  // UI state
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string>('upload')

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter(dropFile => dropFile.type.startsWith('image/'))
    if (droppedFiles.length > 0) {
      const newFiles = droppedFiles.filter(f => !files.some(existing => existing.name === f.name && existing.size === f.size))
      setFiles([...files, ...newFiles])
      setMessage('')
      setMessageType('')
    } else {
      setMessage('Please drop image files')
      setMessageType('error')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = selectedFiles.filter(f => !files.some(existing => existing.name === f.name && existing.size === f.size))
    setFiles([...files, ...newFiles])
    if (newFiles.length > 0) {
      setMessage('')
      setMessageType('')
    }
  }

  // Metadata handlers
  const handleExtractMetadata = async () => {
    if (files.length === 0) {
      setMessage('Please upload an image first')
      setMessageType('error')
      return
    }

    setMetadataLoading(true)
    const formData = new FormData()
    formData.append('image', files[0])

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/metadata`, formData)
      setMetadata(response.data.metadata)
      setMessage('Metadata extracted successfully')
      setMessageType('success')
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to extract metadata')
      setMessageType('error')
    } finally {
      setMetadataLoading(false)
    }
  }

  const handleStripMetadata = (option: 'all' | 'gps' | 'camera') => {
    setStripMetadata(option)
    setMessage(`Metadata stripping (${option}) will be applied during export`)
    setMessageType('success')
  }

  const handleWatermarkConvert = async () => {
    if (files.length === 0) {
      setMessage('Please select image files.')
      setMessageType('error')
      return
    }

    // Validation for Add mode
    if (watermarkMode === 'add') {
      if (watermarkType === 'text' && !watermarkText.trim()) {
        setMessage('Please enter watermark text.')
        setMessageType('error')
        return
      }

      if (watermarkType === 'image' && !watermarkImage) {
        setMessage('Please upload a watermark image.')
        setMessageType('error')
        return
      }
    }

    const data = new FormData()
    files.forEach(file => data.append('images', file))

    // Common parameters
    data.append('position', JSON.stringify(watermarkPosition))
    data.append('imageScale', String(watermarkImageScale)) // Used for blur box size in remove mode
    data.append('format', format)
    data.append('quality', String(quality))

    // Add mode specific parameters
    if (watermarkMode === 'add') {
      data.append('watermarkType', watermarkType)
      data.append('watermarkText', watermarkText)
      data.append('fontSize', String(watermarkFontSize))
      data.append('textColor', watermarkTextColor)
      data.append('opacity', String(watermarkOpacity))
      data.append('rotation', String(watermarkRotation))

      if (watermarkType === 'image' && watermarkImage) {
        data.append('watermarkImage', watermarkImage)
      }
    }

    setLoading(true)
    setMessage('')
    setMessageType('')
    try {
      const base = import.meta.env.VITE_API_BASE_URL
      const endpoint = watermarkMode === 'add' ? '/api/watermark/add' : '/api/watermark/remove'
      const url = base ? `${base}${endpoint}` : endpoint

      const response = await axios.post(url, data, { responseType: 'blob' })

      // Create preview URL
      const objectUrl = URL.createObjectURL(response.data)
      setWatermarkedPreview(objectUrl)

      // Set filename
      const suffix = watermarkMode === 'add' ? '-watermarked' : '-removed'
      const downloadFilename = files.length === 1
        ? `${files[0].name.split('.')[0]}${suffix}.${format}`
        : `images${suffix}.zip`
      setWatermarkedFilename(downloadFilename)

      // Show preview modal
      setShowWatermarkPreview(true)

    } catch (err: any) {
      console.log("Error: ", err)
      if (err.response && err.response.data instanceof Blob) {
        const text = await err.response.data.text()
        try {
          const json = JSON.parse(text)
          setMessage(json.error || 'An error occurred')
        } catch {
          setMessage('An error occurred')
        }
      } else {
        setMessage(err?.response?.data?.error || err.message)
      }
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadWatermarked = () => {
    if (!watermarkedPreview) return

    const link = document.createElement('a')
    link.href = watermarkedPreview
    link.download = watermarkedFilename
    document.body.appendChild(link)
    link.click()
    link.remove()

    // Clean up
    setShowWatermarkPreview(false)
    // Don't revoke URL yet if we want to allow re-download, but here we close modal so it's fine
    // URL.revokeObjectURL(watermarkedPreview) 

    const downloadMessage = files.length === 1 ? 'Watermark applied! File downloaded.' : 'Watermarks applied! Archive downloaded.'
    setMessage(downloadMessage)
    setMessageType('success')
  }

  const handleClosePreview = () => {
    setShowWatermarkPreview(false)
    if (watermarkedPreview) {
      URL.revokeObjectURL(watermarkedPreview)
      setWatermarkedPreview(null)
    }
  }


  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      setMessage('Please select image files.')
      setMessageType('error')
      return
    }

    const data = new FormData()
    files.forEach(file => data.append('images', file))
    data.append('format', format)
    data.append('quality', String(quality))
    if (width) data.append('width', String(width))
    if (height) data.append('height', String(height))

    // Add filter parameters
    data.append('grayscale', String(grayscale))
    data.append('sepia', String(sepia))
    if (blur > 0) data.append('blur', String(blur))
    data.append('sharpen', String(sharpen))
    data.append('brightness', String(brightness))
    data.append('contrast', String(contrast))
    data.append('saturation', String(saturation))
    if (rotation !== 0) data.append('rotation', String(rotation))
    data.append('flipHorizontal', String(flipHorizontal))
    data.append('flipVertical', String(flipVertical))
    data.append('negative', String(negative))
    if (tint) data.append('tint', tint)

    // Add crop parameters
    if (croppedAreaPixels) {
      data.append('cropLeft', String(croppedAreaPixels.x))
      data.append('cropTop', String(croppedAreaPixels.y))
      data.append('cropWidth', String(croppedAreaPixels.width))
      data.append('cropHeight', String(croppedAreaPixels.height))
    }

    // Add metadata stripping
    data.append('stripMetadata', stripMetadata)

    setLoading(true)
    setMessage('')
    setMessageType('')
    try {
      const base = import.meta.env.VITE_API_BASE_URL
      const url = base ? `${base}/api/convert` : ''
      const response = await axios.post(url, data, { responseType: 'blob' })
      const objectUrl = URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = objectUrl
      const downloadFilename = files.length === 1 ? `${files[0].name.split('.')[0]}-converted.${format}` : 'converted-images.zip'
      link.download = downloadFilename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(objectUrl)
      const downloadMessage = files.length === 1 ? 'Conversion successful! File downloaded.' : 'Conversion successful! Archive downloaded.'
      setMessage(downloadMessage)
      setMessageType('success')
    } catch (err: any) {
      console.log("Error: ", err)
      if (err.response && err.response.data instanceof Blob) {
        const text = await err.response.data.text()
        try {
          const json = JSON.parse(text)
          setMessage(json.error || 'An error occurred')
        } catch {
          setMessage('An error occurred')
        }
      } else {
        setMessage(err?.response?.data?.error || err.message)
      }
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  // Get filter object for preview
  const filters = {
    grayscale,
    sepia,
    blur,
    sharpen,
    brightness,
    contrast,
    saturation,
    rotation,
    flipHorizontal,
    flipVertical,
    negative,
    tint
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Tool Controls */}
          <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto p-6">
            {activeCategory === 'upload' && (
              <UploadPanel
                files={files}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                removeFile={removeFile}
                formatFileSize={formatFileSize}
              />
            )}

            {activeCategory === 'filters' && (
              <FiltersSection
                grayscale={grayscale}
                setGrayscale={setGrayscale}
                sepia={sepia}
                setSepia={setSepia}
                blur={blur}
                setBlur={setBlur}
                sharpen={sharpen}
                setSharpen={setSharpen}
                brightness={brightness}
                setBrightness={setBrightness}
                contrast={contrast}
                setContrast={setContrast}
                saturation={saturation}
                setSaturation={setSaturation}
                negative={negative}
                setNegative={setNegative}
                tint={tint}
                setTint={setTint}
              />
            )}

            {activeCategory === 'compression' && (
              <CompressionPanel
                preset={compressionPreset}
                setPreset={setCompressionPreset}
                targetSize={targetSize}
                setTargetSize={setTargetSize}
                quality={quality}
                setQuality={setQuality}
              />
            )}

            {activeCategory === 'crop' && (
              <CropPanel
                aspectRatio={cropAspectRatio}
                setAspectRatio={setCropAspectRatio}
                showGrid={showCropGrid}
                setShowGrid={setShowCropGrid}
                zoom={cropZoom}
                setZoom={setCropZoom}
                onResetCrop={() => {
                  setCropAspectRatio(1)
                  setCroppedAreaPixels(null)
                }}
                onDownload={handleConvert}
              />
            )}

            {activeCategory === 'metadata' && (
              <MetadataPanel
                metadata={metadata}
                onExtractMetadata={handleExtractMetadata}
                onStripMetadata={handleStripMetadata}
                loading={metadataLoading}
              />
            )}

            {activeCategory === 'transform' && (
              <TransformPanel
                width={width}
                setWidth={setWidth}
                height={height}
                setHeight={setHeight}
                rotation={rotation}
                setRotation={setRotation}
                flipHorizontal={flipHorizontal}
                setFlipHorizontal={setFlipHorizontal}
                flipVertical={flipVertical}
                setFlipVertical={setFlipVertical}
              />
            )}

            {activeCategory === 'watermark' && (
              <WatermarkPanel
                mode={watermarkMode}
                setMode={setWatermarkMode}
                watermarkType={watermarkType}
                setWatermarkType={setWatermarkType}
                watermarkText={watermarkText}
                setWatermarkText={setWatermarkText}
                fontSize={watermarkFontSize}
                setFontSize={setWatermarkFontSize}
                textColor={watermarkTextColor}
                setTextColor={setWatermarkTextColor}
                opacity={watermarkOpacity}
                setOpacity={setWatermarkOpacity}
                rotation={watermarkRotation}
                setRotation={setWatermarkRotation}
                position={watermarkPosition}
                setPosition={setWatermarkPosition}
                watermarkImage={watermarkImage}
                setWatermarkImage={setWatermarkImage}
                imageScale={watermarkImageScale}
                setImageScale={setWatermarkImageScale}
                onConvert={handleWatermarkConvert}
                loading={loading}
                filesCount={files.length}
              />
            )}

            {activeCategory === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
                <p className="text-sm text-gray-600">
                  Format and quality settings are available in the Export panel.
                </p>
              </div>
            )}

            {activeCategory === 'export' && (
              <ExportPanel
                format={format}
                setFormat={setFormat}
                quality={quality}
                setQuality={setQuality}
                handleConvert={handleConvert}
                loading={loading}
                filesCount={files.length}
              />
            )}

            {/* Message Display */}
            {message && (
              <div
                className={`mt-6 flex items-center space-x-3 p-4 rounded-lg ${messageType === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
                  }`}
              >
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <p
                  className={`text-sm font-medium ${messageType === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                >
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Preview/Crop Area */}
          <div className="flex-1 p-6 flex">
            {activeCategory === 'crop' ? (
              <CropEditor
                image={files[0] ? URL.createObjectURL(files[0]) : ''}
                aspectRatio={cropAspectRatio}
                zoom={cropZoom}
                onZoomChange={setCropZoom}
                showGrid={showCropGrid}
                onCropComplete={(_croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels)
                }}
                onDownload={handleConvert}
              />
            ) : (
              <PreviewCanvas file={files[0] || null} filters={filters} />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Watermark Preview Modal */}
      <WatermarkPreviewModal
        isOpen={showWatermarkPreview}
        onClose={handleClosePreview}
        previewUrl={watermarkedPreview}
        onDownload={handleDownloadWatermarked}
        filesCount={files.length}
        filename={watermarkedFilename}
      />
    </div>
  )
}

export default App
