"use client"

import { useState } from 'react'
import { ZoneTypha } from '../lib/supabase'

interface PredictionEngineProps {
  zones: ZoneTypha[]
  onPredictionUpdate: (updatedZones: ZoneTypha[]) => void
}

export default function PredictionEngine({ zones, onPredictionUpdate }: PredictionEngineProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [lastPrediction, setLastPrediction] = useState<Date | null>(null)

  const toggleEngine = () => {
    setIsRunning(!isRunning)
  }

  const runManualPrediction = () => {
    // Simuler des prédictions IA
    const updatedZones = zones.map(zone => {
      const newScore = Math.max(0, Math.min(100, zone.score_ia + (Math.random() * 10 - 3)))
      const newDensity = Math.max(0, Math.min(100, zone.densite_typha + (Math.random() * 5 - 1)))
      
      return {
        ...zone,
        score_ia: Math.round(newScore),
        densite_typha: Math.round(newDensity),
        conseil_ia: `Score mis à jour: ${Math.round(newScore)}. Surveillance active recommandée.`,
        updated_at: new Date().toISOString()
      }
    })
    
    onPredictionUpdate(updatedZones)
    setLastPrediction(new Date())
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <div>
            <h3 className="font-semibold text-purple-800">🤖 Moteur de Prédiction IA</h3>
            <p className="text-sm text-purple-600">
              {isRunning ? 'En cours d\'exécution' : 'En pause'} • 
              {lastPrediction ? ` Dernière prédiction: ${lastPrediction.toLocaleTimeString('fr-FR')}` : ' Aucune prédiction'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={runManualPrediction}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            🎯 Prédire Maintenant
          </button>
          <button
            onClick={toggleEngine}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isRunning 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isRunning ? '⏸️ Pause' : '▶️ Démarrer Auto'}
          </button>
        </div>
      </div>
    </div>
  )
}