"use client"

import { ZoneTypha } from '../lib/supabase'

interface ZoneDetailsPanelProps {
  zone: ZoneTypha | null
  isOpen: boolean
  onClose: () => void
  onUpdateZone: (zone: ZoneTypha) => void
}

export default function ZoneDetailsPanel({ 
  zone, 
  isOpen, 
  onClose, 
  onUpdateZone 
}: ZoneDetailsPanelProps) {
  if (!isOpen || !zone) return null

  const handleMarkAsTreated = () => {
    const updatedZone = {
      ...zone,
      type_zone: 'traitée',
      niveau_risque: 'faible',
      score_ia: Math.max(0, zone.score_ia - 30),
      conseil_ia: 'Zone marquée comme traitée. Surveillance de maintenance.',
      updated_at: new Date().toISOString()
    }
    onUpdateZone(updatedZone)
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l z-50">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{zone.nom}</h2>
              <div className="flex space-x-2 mt-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  zone.type_zone === 'touchée' ? 'bg-red-100 text-red-800' :
                  zone.type_zone === 'à_risque' ? 'bg-orange-100 text-orange-800' :
                  zone.type_zone === 'traitée' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {zone.type_zone}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  zone.niveau_risque === 'élevé' ? 'bg-red-100 text-red-800' :
                  zone.niveau_risque === 'moyen' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Risque {zone.niveau_risque}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{zone.score_ia}</div>
              <div className="text-blue-700 text-sm">Score IA</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{zone.superficie_hectares} ha</div>
              <div className="text-green-700 text-sm">Superficie</div>
            </div>
          </div>

          {zone.conseil_ia && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">💡 Conseil IA</h3>
              <p className="text-yellow-700 text-sm">{zone.conseil_ia}</p>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">🎯 Actions Rapides</h3>
            <button
              onClick={handleMarkAsTreated}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition text-sm font-medium"
            >
              ✅ Marquer comme Traitée
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}