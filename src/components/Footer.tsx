import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 border-t border-gray-700">
            <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left - About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Image Converter Pro
                            </span>
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Professional image editing, conversion, and optimization tool. Fast, secure, and easy to use.
                        </p>
                        <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
                            <span>Version 2.0.0</span>
                            <span>•</span>
                            <span>Made with</span>
                            <Heart className="w-3 h-3 text-red-500 fill-current" />
                        </div>
                    </div>

                    {/* Middle - Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#features" className="hover:text-indigo-400 transition flex items-center space-x-1">
                                    <span>Features</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#documentation" className="hover:text-indigo-400 transition flex items-center space-x-1">
                                    <span>Documentation</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="hover:text-indigo-400 transition flex items-center space-x-1">
                                    <span>Privacy Policy</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="hover:text-indigo-400 transition flex items-center space-x-1">
                                    <span>Terms of Service</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right - Social & Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Connect</h4>
                        <div className="flex space-x-3 mb-4">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                                title="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:support@imageconverter.com"
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                                title="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500">
                            Need help? Contact us at{' '}
                            <a href="mailto:support@imageconverter.com" className="text-indigo-400 hover:underline">
                                support@imageconverter.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom - Copyright */}
                <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        © {currentYear} Image Converter Pro. All rights reserved. Built with React, TypeScript, and Sharp.
                    </p>
                </div>
            </div>
        </footer>
    )
}
