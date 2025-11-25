import { useState } from 'react'
import { Info, Camera, MapPin, Calendar, FileText, Shield, Edit3, Copy, Trash2, Eye, EyeOff } from 'lucide-react'

interface MetadataInfo {
    camera?: {
        make?: string
        model?: string
        lens?: string
        software?: string
    }
    exposure?: {
        iso?: number
        aperture?: string
        shutterSpeed?: string
        focalLength?: string
        flash?: string
    }
    gps?: {
        latitude?: number
        longitude?: number
        altitude?: number
    }
    image?: {
        width?: number
        height?: number
        colorSpace?: string
        bitDepth?: number
    }
    dates?: {
        created?: string
        modified?: string
    }
    copyright?: {
        artist?: string
        copyright?: string
        description?: string
    }
}

interface MetadataPanelProps {
    metadata: MetadataInfo | null
    onExtractMetadata: () => void
    onStripMetadata: (option: 'all' | 'gps' | 'camera') => void
    loading: boolean
}

export default function MetadataPanel({
    metadata,
    onExtractMetadata,
    onStripMetadata,
    loading
}: MetadataPanelProps) {
    const [showSections, setShowSections] = useState({
        camera: true,
        exposure: true,
        gps: true,
        image: true,
        dates: true,
        copyright: true
    })

    const toggleSection = (section: keyof typeof showSections) => {
        setShowSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const formatGPS = (lat?: number, lon?: number) => {
        if (!lat || !lon) return null
        return `${lat.toFixed(6)}, ${lon.toFixed(6)}`
    }

    const getMapLink = (lat?: number, lon?: number) => {
        if (!lat || !lon) return '#'
        return `https://www.google.com/maps?q=${lat},${lon}`
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Image Metadata</h3>

            {/* Extract Button */}
            <button
                onClick={onExtractMetadata}
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium shadow-lg disabled:opacity-50"
            >
                {loading ? 'Extracting...' : 'Extract Metadata'}
            </button>

            {!metadata && !loading && (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <Info className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload an image and click "Extract Metadata"</p>
                </div>
            )}

            {metadata && (
                <>
                    {/* Privacy Controls */}
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Privacy Controls
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => onStripMetadata('all')}
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-medium"
                            >
                                Strip All
                            </button>
                            <button
                                onClick={() => onStripMetadata('gps')}
                                className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-xs font-medium"
                            >
                                Remove GPS
                            </button>
                            <button
                                onClick={() => onStripMetadata('camera')}
                                className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-xs font-medium"
                            >
                                Remove Camera
                            </button>
                        </div>
                        <p className="text-xs text-red-700 mt-2">
                            ⚠️ Stripping metadata is permanent for downloaded images
                        </p>
                    </div>

                    {/* Camera Information */}
                    {metadata.camera && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('camera')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <Camera className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-gray-900">Camera Information</span>
                                </div>
                                {showSections.camera ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.camera && (
                                <div className="p-4 space-y-2">
                                    {metadata.camera.make && (
                                        <MetadataRow label="Make" value={metadata.camera.make} />
                                    )}
                                    {metadata.camera.model && (
                                        <MetadataRow label="Model" value={metadata.camera.model} />
                                    )}
                                    {metadata.camera.lens && (
                                        <MetadataRow label="Lens" value={metadata.camera.lens} />
                                    )}
                                    {metadata.camera.software && (
                                        <MetadataRow label="Software" value={metadata.camera.software} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Exposure Settings */}
                    {metadata.exposure && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('exposure')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <Camera className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-gray-900">Exposure Settings</span>
                                </div>
                                {showSections.exposure ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.exposure && (
                                <div className="p-4 space-y-2">
                                    {metadata.exposure.iso && (
                                        <MetadataRow label="ISO" value={String(metadata.exposure.iso)} />
                                    )}
                                    {metadata.exposure.aperture && (
                                        <MetadataRow label="Aperture" value={metadata.exposure.aperture} />
                                    )}
                                    {metadata.exposure.shutterSpeed && (
                                        <MetadataRow label="Shutter Speed" value={metadata.exposure.shutterSpeed} />
                                    )}
                                    {metadata.exposure.focalLength && (
                                        <MetadataRow label="Focal Length" value={metadata.exposure.focalLength} />
                                    )}
                                    {metadata.exposure.flash && (
                                        <MetadataRow label="Flash" value={metadata.exposure.flash} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* GPS Location */}
                    {metadata.gps && metadata.gps.latitude && metadata.gps.longitude && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('gps')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-gray-900">GPS Location</span>
                                </div>
                                {showSections.gps ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.gps && (
                                <div className="p-4 space-y-2">
                                    <MetadataRow
                                        label="Coordinates"
                                        value={formatGPS(metadata.gps.latitude, metadata.gps.longitude) || 'N/A'}
                                        copyable
                                    />
                                    {metadata.gps.altitude && (
                                        <MetadataRow label="Altitude" value={`${metadata.gps.altitude}m`} />
                                    )}
                                    <a
                                        href={getMapLink(metadata.gps.latitude, metadata.gps.longitude)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        <span>View on Google Maps</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Image Information */}
                    {metadata.image && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('image')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <FileText className="w-5 h-5 text-orange-600" />
                                    <span className="font-semibold text-gray-900">Image Information</span>
                                </div>
                                {showSections.image ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.image && (
                                <div className="p-4 space-y-2">
                                    {metadata.image.width && metadata.image.height && (
                                        <MetadataRow
                                            label="Dimensions"
                                            value={`${metadata.image.width} × ${metadata.image.height} px`}
                                        />
                                    )}
                                    {metadata.image.colorSpace && (
                                        <MetadataRow label="Color Space" value={metadata.image.colorSpace} />
                                    )}
                                    {metadata.image.bitDepth && (
                                        <MetadataRow label="Bit Depth" value={`${metadata.image.bitDepth}-bit`} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dates */}
                    {metadata.dates && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('dates')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                    <span className="font-semibold text-gray-900">Dates & Times</span>
                                </div>
                                {showSections.dates ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.dates && (
                                <div className="p-4 space-y-2">
                                    {metadata.dates.created && (
                                        <MetadataRow label="Date Created" value={metadata.dates.created} />
                                    )}
                                    {metadata.dates.modified && (
                                        <MetadataRow label="Date Modified" value={metadata.dates.modified} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Copyright & Author */}
                    {metadata.copyright && (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('copyright')}
                                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <Edit3 className="w-5 h-5 text-rose-600" />
                                    <span className="font-semibold text-gray-900">Copyright & Author</span>
                                </div>
                                {showSections.copyright ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            {showSections.copyright && (
                                <div className="p-4 space-y-2">
                                    {metadata.copyright.artist && (
                                        <MetadataRow label="Artist" value={metadata.copyright.artist} />
                                    )}
                                    {metadata.copyright.copyright && (
                                        <MetadataRow label="Copyright" value={metadata.copyright.copyright} />
                                    )}
                                    {metadata.copyright.description && (
                                        <MetadataRow label="Description" value={metadata.copyright.description} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Info Box */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">About Metadata</h4>
                <ul className="space-y-1 text-xs text-indigo-700">
                    <li>• <strong>EXIF data</strong> contains camera settings, location, and more</li>
                    <li>• <strong>Privacy</strong>: Remove GPS to protect your location</li>
                    <li>• <strong>Professional</strong>: Add copyright to protect your work</li>
                </ul>
            </div>
        </div>
    )
}

// Helper component for metadata rows
function MetadataRow({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900">{value}</span>
                {copyable && (
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-gray-100 rounded transition"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <span className="text-xs text-green-600">✓</span>
                        ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
