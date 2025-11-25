import { Sparkles, Github, Heart } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Left - Branding */}
                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Image Converter Pro
                            </h1>
                            <p className="text-xs text-gray-600">Professional image editing and conversion</p>
                        </div>
                    </div>

                    {/* Right - Quick Actions */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-indigo-600 transition rounded-lg hover:bg-gray-100"
                            title="View on GitHub"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium hidden md:inline">GitHub</span>
                        </a>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition shadow-md">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium hidden md:inline">Support</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
