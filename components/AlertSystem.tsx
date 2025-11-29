"use client"

import { useState, useEffect } from 'react'
import { ZoneTypha } from '../lib/supabase'

interface AlertSystemProps {
  zones: ZoneTypha[]
}

export default function AlertSystem({ zones }: AlertSystemProps) {
  const [alerts, setAlerts] = useState<number>(0)
  const [showAlerts, setShowAlerts] = useState(false)

  useEffect(() => {
    // Compter les alertes basées sur les zones à risque
    const newAlerts = zones.filter(zone => 
      zone.niveau_risque === 'élevé' || 
      (zone.type_zone === 'prédiction' && zone.score_ia > 75)
    ).length
    
    setAlerts(newAlerts)
  }, [zones])

  return (
    <div className="relative">
      <button
        onClick={() => setShowAlerts(!showAlerts)}
        className="relative p-2 bg-white rounded-lg shadow border hover:bg-gray-50 transition"
      >
        <span className="text-xl">🚨</span>
        {alerts > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {alerts}
          </span>
        )}
      </button>

      {showAlerts && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border z-50 p-4">
          <h3 className="font-bold text-gray-900 mb-3">Alertes Temps Réel</h3>
          {alerts === 0 ? (
            <p className="text-gray-500 text-sm">Aucune alerte active</p>
          ) : (
            <div className="space-y-2">
              {zones.filter(z => z.niveau_risque === 'élevé').map(zone => (
                <div key={zone.id} className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="font-semibold text-red-800">🚨 Intervention Urgente</div>
                  <div className="text-sm text-red-700">{zone.nom} - Score: {zone.score_ia}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}