import { ZoneTypha } from './supabase'

export const demoZones: ZoneTypha[] = [
  {
    id: '1',
    nom: 'Delta du Fleuve - Saint-Louis',
    latitude: 16.0246,
    longitude: -16.4896,
    type_zone: 'touchée',
    niveau_risque: 'élevé',
    score_ia: 92,
    superficie_hectares: 450,
    date_detection: new Date().toISOString(),
    est_traitee: false,
    est_prediction: false,
    densite_typha: 85,
    conseil_ia: 'Priorité MAXIMALE: Infestation critique menaçant les écosystèmes du delta. Intervention urgente recommandée.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    nom: 'Lac de Guiers - Richard Toll',
    latitude: 16.2667,
    longitude: -15.8000,
    type_zone: 'touchée',
    niveau_risque: 'moyen',
    score_ia: 67,
    superficie_hectares: 320,
    date_detection: new Date().toISOString(),
    est_traitee: false,
    est_prediction: false,
    densite_typha: 60,
    conseil_ia: 'Surveillance active requise. Développement modéré mais potentiel de propagation rapide.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    nom: 'Zone Côtière - Mboro',
    latitude: 15.0333,
    longitude: -16.8167,
    type_zone: 'à_risque',
    niveau_risque: 'moyen',
    score_ia: 58,
    superficie_hectares: 120,
    date_detection: new Date().toISOString(),
    est_traitee: false,
    est_prediction: false,
    densite_typha: 25,
    conseil_ia: 'Conditions favorables détectées. Surveillance renforcée recommandée.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]