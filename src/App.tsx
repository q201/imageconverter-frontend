import { useMemo, useState } from 'react'
import axios from 'axios'
import { Upload, Image as ImageIcon, Download, Settings, Maximize2, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react'
import logo from './assets/logo-1.webp'

type Format = 'jpeg' | 'png' | 'webp' | 'tiff' | 'gif' | 'avif' | 'bmp' | 'heif'

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [format, setFormat] = useState<Format>('png')
  const [quality, setQuality] = useState<number>(90)
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const previewUrls = useMemo(() => files.map(file => URL.createObjectURL(file)), [files])

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

    setLoading(true)
    setMessage('')
    setMessageType('')
    try {
      debugger
      const base = import.meta.env.VITE_API_BASE_URL
      const url = base ? `${base}/api/convert`:''
      const response = await axios.post(url, data, { responseType: 'blob' })
      if(!response)
        throw Error
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
      setMessage(err?.response?.data?.error || 'Failed to convert images.')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 text-gray-900 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-2xl shadow-lg">
              <img src={logo} alt="Logo" className="w-18 h-16 rounded-lg" />
            </div>
          </div>
          <h1 className="text-4xl p-2 md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Image Converter
          </h1>
          <p className="text-gray-600">Transform your images with ease - resize, convert, and optimize</p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Upload Section */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-200 ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400 bg-gray-50 hover:bg-indigo-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <div className="text-center">
                <div className="mx-auto w-16 h-16 mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-lg font-semibold text-gray-700 hover:text-indigo-600 transition">
                    Click to upload images
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF, WebP up to 10MB each</p>
              </div>
            </div>

            {/* Files Info */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700 font-bold" title="Remove">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="p-6 md:p-8 bg-gray-50">
            <div className="flex items-center mb-6">
              <Settings className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Conversion Settings</h2>
            </div>

            <div className="grid gap-6">
              {/* Format and Quality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 mr-1.5 text-indigo-600" />
                    Output Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as Format)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white shadow-sm"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                    <option value="tiff">TIFF</option>
                    <option value="gif">GIF</option>
                    <option value="avif">AVIF</option>
                    <option value="bmp">BMP</option>
                    <option value="heif">HEIF</option>
                  </select>
                </div>

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
              </div>

              {/* Dimensions */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Maximize2 className="w-4 h-4 mr-1.5 text-indigo-600" />
                  Dimensions (optional)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    min={1}
                    placeholder="Width (px)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder="Height (px)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                  />
                </div>
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={loading || files.length === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Convert & Download</span>
                  </>
                )}
              </button>

              {/* Message */}
              {message && (
                <div
                  className={`flex items-center space-x-3 p-4 rounded-xl ${
                    messageType === 'success'
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
                    className={`text-sm font-medium ${
                      messageType === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {previewUrls.length > 0 && previewUrls.length <= 6 && (
            <div className="p-6 md:p-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Preview ({files.length} file{files.length > 1 ? 's' : ''})
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview ${index + 1}`}
                      className="max-h-32 w-full object-cover rounded-xl shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>✨ Fast, secure, and easy image conversion</p>
        </div>
      </div>
    </div>
  )
}

export default App
