import { Sparkles, Heart } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
            <div className="px-4 md:px-8 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Left - Branding */}
                    <div className="flex items-center space-x-2 md:space-x-4 ml-16 md:ml-0">
                        <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Image Converter Pro
                            </h1>
                            <p className="text-xs text-gray-600 hidden sm:block">Professional image editing and conversion</p>
                        </div>
                    </div>

                    {/* Right - Quick Actions */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition shadow-md">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium hidden lg:inline">Support</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
