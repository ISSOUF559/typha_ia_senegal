import 'leaflet'

declare module 'leaflet' {
  interface CircleMarkerOptions {
    className?: string
  }
}