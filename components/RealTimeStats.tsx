"use client"

import { ZoneTypha } from '../lib/supabase'

interface RealTimeStatsProps {
  zones: ZoneTypha[]
}

export default function RealTimeStats({ zones }: RealTimeStatsProps) {
  const stats = {
    totalZones: zones.length,
    zonesTouchees: zones.filter(z => z.type_zone === 'touchée').length,
    zonesRisque: zones.filter(z => z.type_zone === 'à_risque').length,
    zonesTraitees: zones.filter(z => z.type_zone === 'traitée').length,
    predictions: zones.filter(z => z.type_zone === 'prédiction').length,
    risqueEleve: zones.filter(z => z.niveau_risque === 'élevé').length,
    superficieTotale: zones.reduce((sum, zone) => sum + zone.superficie_hectares, 0),
    scoreMoyen: zones.length > 0 
      ? zones.reduce((sum, zone) => sum + zone.score_ia, 0) / zones.length 
      : 0
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
        <div className="text-2xl font-bold text-gray-900">{stats.totalZones}</div>
        <div className="text-sm text-gray-600">Zones Surveillées</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
        <div className="text-2xl font-bold text-red-600">{stats.zonesTouchees}</div>
        <div className="text-sm text-gray-600">Zones Touchées</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-orange-500">
        <div className="text-2xl font-bold text-orange-600">{stats.zonesRisque}</div>
        <div className="text-sm text-gray-600">À Risque</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
        <div className="text-2xl font-bold text-green-600">{stats.zonesTraitees}</div>
        <div className="text-sm text-gray-600">Traitées</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
        <div className="text-2xl font-bold text-purple-600">{stats.predictions}</div>
        <div className="text-sm text-gray-600">Prédictions IA</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-600">
        <div className="text-2xl font-bold text-red-700">{stats.risqueEleve}</div>
        <div className="text-sm text-gray-600">Risque Élevé</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-indigo-500">
        <div className="text-2xl font-bold text-indigo-600">{stats.superficieTotale.toFixed(0)} ha</div>
        <div className="text-sm text-gray-600">Superficie</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow border-l-4 border-cyan-500">
        <div className="text-2xl font-bold text-cyan-600">{stats.scoreMoyen.toFixed(1)}</div>
        <div className="text-sm text-gray-600">Score IA Moyen</div>
      </div>
    </div>
  )
}