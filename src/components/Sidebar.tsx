import { Upload, Wand2, Zap, Crop, Info, Droplet, RotateCw, Settings, Download, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
    isCollapsed: boolean
    setIsCollapsed: (collapsed: boolean) => void
    activeCategory: string
    setActiveCategory: (category: string) => void
}

export default function Sidebar({ isCollapsed, setIsCollapsed, activeCategory, setActiveCategory }: SidebarProps) {
    const categories = [
        { id: 'upload', name: 'Upload', icon: Upload, description: 'Add images' },
        { id: 'filters', name: 'Filters', icon: Wand2, description: 'Apply effects' },
        { id: 'compression', name: 'Compression', icon: Zap, description: 'Optimize size' },
        { id: 'crop', name: 'Crop', icon: Crop, description: 'Crop & resize' },
        { id: 'metadata', name: 'Metadata', icon: Info, description: 'View & edit EXIF' },
        { id: 'watermark', name: 'Watermark', icon: Droplet, description: 'Add watermarks' },
        { id: 'transform', name: 'Transform', icon: RotateCw, description: 'Rotate & flip' },
        { id: 'settings', name: 'Settings', icon: Settings, description: 'Format & quality' },
        { id: 'export', name: 'Export', icon: Download, description: 'Download images' },
    ]

    return (
        <div
            className={`bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-all duration-300 flex flex-col shadow-2xl ${isCollapsed ? 'w-20' : 'w-80'
                }`}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                Tools
                            </h2>
                            <p className="text-indigo-300 text-sm mt-1">Edit your images</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-white/10 rounded-lg transition ml-auto"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {categories.map((category) => {
                    const Icon = category.icon
                    const isActive = activeCategory === category.id

                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-white text-indigo-900 shadow-lg transform scale-105'
                                    : 'hover:bg-white/10 text-white'
                                }`}
                            title={isCollapsed ? category.name : ''}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : ''}`} />
                            {!isCollapsed && (
                                <div className="flex-1 text-left">
                                    <div className={`font-semibold ${isActive ? 'text-indigo-900' : 'text-white'}`}>
                                        {category.name}
                                    </div>
                                    <div className={`text-xs ${isActive ? 'text-indigo-600' : 'text-indigo-300'}`}>
                                        {category.description}
                                    </div>
                                </div>
                            )}
                        </button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                {!isCollapsed && (
                    <div className="text-center text-indigo-300 text-xs">
                        <p>✨ Image Converter Pro</p>
                        <p className="mt-1 opacity-75">Fast & Secure</p>
                    </div>
                )}
            </div>
        </div>
    )
}
