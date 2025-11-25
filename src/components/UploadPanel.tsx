import { Upload, ImageIcon, X } from 'lucide-react'

interface UploadPanelProps {
    files: File[]
    dragActive: boolean
    handleDrag: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent) => void
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    removeFile: (index: number) => void
    formatFileSize: (bytes: number) => string
}

export default function UploadPanel({
    files,
    dragActive,
    handleDrag,
    handleDrop,
    handleFileChange,
    removeFile,
    formatFileSize
}: UploadPanelProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Images</h3>

            {/* Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${dragActive
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
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
                    id="file-upload-panel"
                />
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 mb-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                    </div>
                    <label htmlFor="file-upload-panel" className="cursor-pointer">
                        <span className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition block">
                            Click to upload
                        </span>
                        <span className="text-xs text-gray-500">or drag and drop</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF, WebP</p>
                </div>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:border-indigo-300 transition"
                            >
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                                        <ImageIcon className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 hover:bg-red-100 rounded-lg transition flex-shrink-0 ml-2"
                                    title="Remove"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {files.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No images uploaded yet</p>
                </div>
            )}
        </div>
    )
}
