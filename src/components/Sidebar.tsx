import { Upload, Wand2, Zap, Crop, Info, Droplet, RotateCw, Settings, Download, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

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
        <>
            {/* Mobile Menu Button - Fixed at top */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="md:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
            >
                {isCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {!isCollapsed && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-all duration-300 flex flex-col shadow-2xl
                    ${isCollapsed
                        ? 'hidden md:flex md:w-20'
                        : 'fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-80'
                    }`}
            >
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                    Tools
                                </h2>
                                <p className="text-indigo-300 text-xs md:text-sm mt-1">Edit your images</p>
                            </div>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition ml-auto"
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
                <nav className="flex-1 p-3 md:p-4 space-y-2 overflow-y-auto">
                    {categories.map((category) => {
                        const Icon = category.icon
                        const isActive = activeCategory === category.id

                        return (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id)
                                    // Auto-close on mobile after selection
                                    if (window.innerWidth < 768) {
                                        setIsCollapsed(true)
                                    }
                                }}
                                className={`w-full flex items-center space-x-3 px-3 md:px-4 py-3 md:py-3 rounded-xl transition-all duration-200 min-h-[44px] ${isActive
                                    ? 'bg-white text-indigo-900 shadow-lg transform scale-105'
                                    : 'hover:bg-white/10 text-white active:bg-white/20'
                                    }`}
                                title={isCollapsed ? category.name : ''}
                            >
                                <Icon className={`w-5 h-5 md:w-5 md:h-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : ''}`} />
                                {!isCollapsed && (
                                    <div className="flex-1 text-left">
                                        <div className={`font-semibold text-sm md:text-base ${isActive ? 'text-indigo-900' : 'text-white'}`}>
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
        </>
    )
}
