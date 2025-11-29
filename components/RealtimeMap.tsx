"use client"

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { ZoneTypha } from '../lib/supabase'
import 'leaflet/dist/leaflet.css'

interface RealtimeMapProps {
  zones: ZoneTypha[]
  onZoneClick?: (zone: ZoneTypha) => void
}

function MapUpdater({ zones }: { zones: ZoneTypha[] }) {
  const map = useMap()
  
  // Mettre à jour la vue quand les zones changent
  if (zones.length > 0) {
    const group = new (window as any).L.featureGroup(
      zones.map(zone => (window as any).L.marker([zone.latitude, zone.longitude]))
    )
    map.fitBounds(group.getBounds().pad(0.1))
  }

  return null
}

export default function RealtimeMap({ zones, onZoneClick }: RealtimeMapProps) {
  const getZoneColor = (zone: ZoneTypha) => {
    switch (zone.type_zone) {
      case 'touchée':
        return zone.niveau_risque === 'élevé' ? '#ef4444' : 
               zone.niveau_risque === 'moyen' ? '#f59e0b' : '#84cc16'
      case 'à_risque':
        return '#f97316'
      case 'traitée':
        return '#3b82f6'
      case 'prédiction':
        return '#8b5cf6'
      default:
        return '#6b7280'
    }
  }

  const getZoneRadius = (zone: ZoneTypha) => {
    const baseSize = Math.max(zone.superficie_hectares / 100, 5)
    return Math.min(baseSize, 20)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm">Zone Touchée (Risque Élevé)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm">Zone Touchée (Risque Moyen)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Zone Touchée (Risque Faible)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm">Zone Traitée</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
          <span className="text-sm">Prédiction IA</span>
        </div>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[14.4974, -14.4524]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapUpdater zones={zones} />
          
          {zones.map((zone) => (
            <CircleMarker
              key={zone.id}
              center={[zone.latitude, zone.longitude]}
              radius={getZoneRadius(zone)}
              pathOptions={{
                color: getZoneColor(zone),
                fillColor: getZoneColor(zone),
                fillOpacity: 0.6,
                weight: 2
              }}
              eventHandlers={{
                click: () => onZoneClick && onZoneClick(zone)
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">{zone.nom}</h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <strong>Type:</strong><br/>
                      <span className={`px-2 py-1 rounded text-xs ${
                        zone.type_zone === 'touchée' ? 'bg-red-100 text-red-800' :
                        zone.type_zone === 'à_risque' ? 'bg-orange-100 text-orange-800' :
                        zone.type_zone === 'traitée' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {zone.type_zone}
                      </span>
                    </div>
                    <div>
                      <strong>Risque:</strong><br/>
                      <span className={`px-2 py-1 rounded text-xs ${
                        zone.niveau_risque === 'élevé' ? 'bg-red-100 text-red-800' :
                        zone.niveau_risque === 'moyen' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {zone.niveau_risque}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div><strong>Score IA:</strong> {zone.score_ia}/100</div>
                    <div><strong>Superficie:</strong> {zone.superficie_hectares} ha</div>
                    <div><strong>Densité Typha:</strong> {zone.densite_typha}%</div>
                    <div><strong>Détection:</strong> {new Date(zone.date_detection).toLocaleDateString('fr-FR')}</div>
                  </div>

                  {zone.conseil_ia && (
                    <div className="mt-3 p-2 bg-yellow-50 border-l-4 border-yellow-400">
                      <strong>💡 Conseil IA:</strong><br/>
                      <span className="text-sm">{zone.conseil_ia}</span>
                    </div>
                  )}

                  <div className="mt-3 flex space-x-2">
                    <button 
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-500 transition"
                      onClick={() => onZoneClick && onZoneClick(zone)}
                    >
                      📋 Voir Détails
                    </button>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
        <strong>{zones.filter(z => z.type_zone === 'touchée').length}</strong> zones touchées • 
        <strong> {zones.filter(z => z.type_zone === 'traitée').length}</strong> zones traitées
      </div>
    </div>
  )
}