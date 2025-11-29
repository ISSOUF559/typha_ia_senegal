import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://votre-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'votre-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

export interface ZoneTypha {
  id: string
  nom: string
  latitude: number
  longitude: number
  type_zone: 'touchée' | 'à_risque' | 'traitée' | 'prédiction'
  niveau_risque: 'faible' | 'moyen' | 'élevé'
  score_ia: number
  superficie_hectares: number
  date_detection: string
  est_traitee: boolean
  est_prediction: boolean
  densite_typha: number
  conseil_ia: string
  created_at: string
  updated_at: string
}

export interface LotTypha {
  id: string
  pnl: string
  zone_id: string
  poids_kg: number
  statut: 'récolté' | 'en_transit' | 'à_l_entrepôt'
  operateur_id: string
  created_at: string
  updated_at: string
}

export const senegalConfig = {
  center: [14.4974, -14.4524] as [number, number],
  zoom: 7
}