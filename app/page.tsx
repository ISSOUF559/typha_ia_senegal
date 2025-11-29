"use client"

import { useState, useEffect } from 'react'
import RealtimeMap from '../components/RealtimeMap'
import RealTimeStats from '../components/RealTimeStats'
import PredictionEngine from '../components/PredictionEngine'
import AlertSystem from '../components/AlertSystem'
import ZoneDetailsPanel from '../components/ZoneDetailsPanel'
import { ZoneTypha } from '../lib/supabase'
import { demoZones } from '../lib/demo-data'

export default function Home() {
  const [zones, setZones] = useState<ZoneTypha[]>([])
  const [selectedZone, setSelectedZone] = useState<ZoneTypha | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    // En attendant Supabase, utiliser les données de démo
    setZones(demoZones)
  }, [])

  const handleZoneClick = (zone: ZoneTypha) => {
    setSelectedZone(zone)
    setIsDetailsOpen(true)
  }

  const handleUpdateZone = (updatedZone: ZoneTypha) => {
    setZones(prev => prev.map(zone => 
      zone.id === updatedZone.id ? updatedZone : zone
    ))
    setSelectedZone(updatedZone)
  }

  const handlePredictionUpdate = (updatedZones: ZoneTypha[]) => {
    setZones(updatedZones)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-typha-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">🌿 TYPHA IA SÉNÉGAL</h1>
            </div>
            <div className="flex items-center space-x-4">
              <AlertSystem zones={zones} />
              <div className="text-sm bg-typha-700 px-3 py-1 rounded-full">
                🔴 Temps Réel Actif
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              🗺️ Carte Interactive Temps Réel du Typha
            </h2>
          </div>

          <PredictionEngine 
            zones={zones} 
            onPredictionUpdate={handlePredictionUpdate}
          />

          <RealTimeStats zones={zones} />
          
          <RealtimeMap 
            zones={zones}
            onZoneClick={handleZoneClick}
          />
        </div>
      </main>

      <ZoneDetailsPanel
        zone={selectedZone}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onUpdateZone={handleUpdateZone}
      />
    </div>
  )
}