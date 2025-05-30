import { useState } from 'react'
import DatenschutzUebung from './components/DatenschutzUebung'
import KIPromptUebung from './components/KIPromptUebung'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'datenschutz' | 'prompts'>('home')

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'home' && (
        <div className="container mx-auto p-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KI-Schulung Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Interaktive Übungen für sicheren KI-Einsatz in der Steuerberatung
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentView('datenschutz')}
                className="block w-full max-w-md mx-auto bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold"
              >
                🔒 Datenschutz-Challenge
                <div className="text-sm font-normal opacity-90 mt-1">
                  Was gehört nicht in die KI?
                </div>
              </button>
              <button 
                onClick={() => setCurrentView('prompts')}
                className="block w-full max-w-md mx-auto bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                🎯 Prompt Engineering Übung
                <div className="text-sm font-normal opacity-90 mt-1">
                  Lernen Sie effektive KI-Kommunikation
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {currentView === 'datenschutz' && (
        <div>
          <button 
            onClick={() => setCurrentView('home')}
            className="m-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Zurück zur Übersicht
          </button>
          <DatenschutzUebung />
        </div>
      )}
      
      {currentView === 'prompts' && (
        <div>
          <button 
            onClick={() => setCurrentView('home')}
            className="m-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Zurück zur Übersicht
          </button>
          <KIPromptUebung />
        </div>
      )}
    </div>
  )
}

export default App
