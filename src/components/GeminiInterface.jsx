import React, { useState } from 'react';
import { Menu, Edit, Settings, HelpCircle, Plus, Mic, ChevronDown, Sun, Moon, X } from 'lucide-react';

export default function GeminiClone() {
  const [selectedModel, setSelectedModel] = useState('2.5 Flash');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const models = ['2.5 Flash', '2.5 Pro', '1.5 Pro', '1.5 Flash'];
  
  const promptSuggestions = [
    "Help me write a professional email",
    "Explain quantum computing simply",
    "Create a workout plan for beginners",
    "Suggest ideas for a birthday party"
  ];

  const bgColor = isDarkMode ? 'bg-[#131314]' : 'bg-gray-50';
  const sidebarBg = isDarkMode ? 'bg-[#1e1f20]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const tertiaryText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDarkMode ? 'bg-[#1e1f20]' : 'bg-white';
  const hoverBg = isDarkMode ? 'hover:bg-[#2d2e30]' : 'hover:bg-gray-100';
  const cardBg = isDarkMode ? 'bg-[#2d2e30]' : 'bg-gray-100';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`flex h-screen ${bgColor} ${textColor} font-sans`}>
      {/* Sidebar */}
      <div className={`w-72 ${sidebarBg} flex flex-col border-r ${borderColor}`}>
        {/* Header */}
        <div className={`p-4 flex items-center justify-between border-b ${borderColor}`}>
          <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
            <Menu size={24} className={tertiaryText} />
          </button>
          <span className={`text-xl font-light ${secondaryText}`}>Gemini</span>
          <div className="w-10"></div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button className={`w-full flex items-center gap-3 px-4 py-3 ${cardBg} ${hoverBg} rounded-lg transition-colors`}>
            <Edit size={20} className={tertiaryText} />
            <span className={secondaryText}>New chat</span>
          </button>
        </div>

        {/* Recent Section */}
        <div className="flex-1 px-4 overflow-y-auto">
          <h3 className={`text-sm font-medium ${tertiaryText} mb-3`}>Recent</h3>
          <div className={`${cardBg} rounded-lg p-6`}>
            <p className={`${secondaryText} text-sm mb-2`}>Sign in to start saving your chats</p>
            <p className={`${tertiaryText} text-xs mb-4`}>
              Once you're signed in, you can access your recent chats here.
            </p>
            <button className="text-blue-500 text-sm font-medium hover:underline">
              Sign in
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className={`p-4 border-t ${borderColor}`}>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 ${hoverBg} rounded-lg transition-colors`}
          >
            <Settings size={20} className={tertiaryText} />
            <span className={secondaryText}>Settings & help</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className={`flex items-center justify-between px-8 py-4 border-b ${borderColor}`}>
          <div className="flex-1"></div>
          <nav className="flex gap-8">
            <a href="#" className={`${tertiaryText} hover:${textColor} text-sm transition-colors`}>About Gemini</a>
            <a href="#" className={`${tertiaryText} hover:${textColor} text-sm transition-colors`}>Gemini App</a>
            <a href="#" className={`${tertiaryText} hover:${textColor} text-sm transition-colors`}>Subscriptions</a>
            <a href="#" className={`${tertiaryText} hover:${textColor} text-sm transition-colors`}>For Business</a>
          </nav>
          <div className="flex-1 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium text-white transition-colors">
              Sign in
            </button>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
          <h1 className="text-6xl font-light mb-2 text-center">
            Meet Gemini,
          </h1>
          <h2 className={`text-6xl font-light mb-16 ${secondaryText} text-center`}>
            your personal AI assistant
          </h2>

          {/* Prompt Suggestions */}
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-3xl w-full">
            {promptSuggestions.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputValue(prompt)}
                className={`px-5 py-4 ${inputBg} ${hoverBg} rounded-2xl text-left text-sm ${secondaryText} border ${borderColor} hover:border-gray-${isDarkMode ? '700' : '300'} transition-all`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Section */}
          <div className="w-full max-w-4xl">
            <div className="relative">
              <div className={`flex items-center gap-4 ${inputBg} rounded-full px-6 py-4 border ${borderColor} hover:border-gray-${isDarkMode ? '700' : '300'} transition-colors shadow-lg`}>
                <button className={`p-2 ${hoverBg} rounded-full transition-colors`}>
                  <Plus size={24} className={tertiaryText} />
                </button>
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Gemini"
                  className={`flex-1 bg-transparent outline-none ${textColor} placeholder-${isDarkMode ? 'gray-500' : 'gray-400'}`}
                />
                
                <div className="flex items-center gap-2">
                  {/* Model Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                      className={`flex items-center gap-2 px-4 py-2 ${cardBg} ${hoverBg} rounded-full transition-colors`}
                    >
                      <span className={`text-sm ${secondaryText}`}>{selectedModel}</span>
                      <ChevronDown size={16} className={tertiaryText} />
                    </button>
                    
                    {isModelDropdownOpen && (
                      <div className={`absolute bottom-full right-0 mb-2 w-48 ${cardBg} rounded-lg shadow-xl border ${borderColor} overflow-hidden`}>
                        {models.map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm ${hoverBg} transition-colors ${
                              selectedModel === model ? `${hoverBg} ${textColor}` : secondaryText
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className={`p-2 ${hoverBg} rounded-full transition-colors`}>
                    <Mic size={24} className={tertiaryText} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className={`text-center text-xs ${tertiaryText} mt-4`}>
              <a href="#" className="underline hover:opacity-80">Google Terms</a> and the{' '}
              <a href="#" className="underline hover:opacity-80">Google Privacy Policy</a> apply. 
              Gemini can make mistakes, so double-check it.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${sidebarBg} rounded-2xl shadow-2xl w-full max-w-md p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-semibold ${textColor}`}>Settings</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X size={24} className={tertiaryText} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div>
                <h3 className={`text-sm font-medium ${secondaryText} mb-3`}>Appearance</h3>
                <div className={`flex items-center justify-between p-4 ${cardBg} rounded-lg`}>
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Moon size={20} className={tertiaryText} />
                    ) : (
                      <Sun size={20} className={tertiaryText} />
                    )}
                    <span className={secondaryText}>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        isDarkMode ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className={`text-sm font-medium ${secondaryText} mb-3`}>Language</h3>
                <button className={`w-full flex items-center justify-between p-4 ${cardBg} ${hoverBg} rounded-lg transition-colors`}>
                  <span className={secondaryText}>English (US)</span>
                  <ChevronDown size={18} className={tertiaryText} />
                </button>
              </div>

              {/* Data & Privacy */}
              <div>
                <h3 className={`text-sm font-medium ${secondaryText} mb-3`}>Data & Privacy</h3>
                <button className={`w-full text-left p-4 ${cardBg} ${hoverBg} rounded-lg transition-colors`}>
                  <p className={`${secondaryText} text-sm`}>Manage your data</p>
                  <p className={`${tertiaryText} text-xs mt-1`}>Control what data is saved</p>
                </button>
              </div>

              {/* Help */}
              <div>
                <h3 className={`text-sm font-medium ${secondaryText} mb-3`}>Support</h3>
                <div className="space-y-2">
                  <button className={`w-full text-left p-4 ${cardBg} ${hoverBg} rounded-lg transition-colors`}>
                    <span className={`${secondaryText} text-sm`}>Help Center</span>
                  </button>
                  <button className={`w-full text-left p-4 ${cardBg} ${hoverBg} rounded-lg transition-colors`}>
                    <span className={`${secondaryText} text-sm`}>Send Feedback</span>
                  </button>
                </div>
              </div>

              {/* About */}
              <div className={`pt-4 border-t ${borderColor}`}>
                <p className={`text-xs ${tertiaryText} text-center`}>
                  Gemini Clone v1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}