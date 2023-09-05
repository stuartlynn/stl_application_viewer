"use client"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState } from "react"
import { format } from "date-fns"

const statusColor: Record<string, string> = {
  "Grant Licence": 'green',
  "Refer to Licensing Sub Committee": 'yellow',
  "Application Withdrawn": 'red',
}

const Sidebar: React.FC<{ stl: Record<string, any> }> = ({ stl }) => {
  if (!stl) {
    return (
      <div style={{ position: 'absolute', height: "100vh", boxSizing: 'border-box', padding: "20px", right: "0px", top: "0px", width: "300px", backgroundColor: "white", zIndex: 100 }}>
        <h1> Select a property to view details</h1>
      </div>
    )
  }
  return (
    <div style={{ position: 'absolute', height: "100vh", boxSizing: 'border-box', padding: "20px", right: "0px", top: "0px", width: "400px", backgroundColor: "white", zIndex: 100 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: "20px", alignItems: "center" }}>
        <p style={{ fontWeight: "bold" }}>Unique Property Reference Number</p>
        <p>{stl["UPRN"]}</p>

        <p style={{ fontWeight: "bold" }}>Address</p>
        <p>{stl["Premises address"]}, {stl["Postcode"]}</p>
        <p style={{ fontWeight: "bold" }}>Status</p>
        <p>{stl["Status"]}</p>
        <p style={{ fontWeight: "bold" }}>Letting Period</p>
        <p>{format(stl["Letting Period From"], "yyyy-MM-dd")} to {format(stl["Letting Period Until"], "yyyy-MM-dd")}</p>

        {stl["Decision"] &&
          <>
            <p style={{ fontWeight: "bold" }}>Decision</p>
            <p>{stl["Decision"]}</p>
          </>
        }
      </div>
    </div>
  )
}

export const STLMap: React.FC<{ stls: Array<Record<string, any>> }> = ({ stls }) => {
  const [selectedSTL, setSelectedSTL] = useState<any | null>(null)

  return (
    <div style={{ position: 'relative', width: "100vw", height: "100vh" }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -3.188267,
          latitude: 55.953251,
          zoom: 12
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {stls.filter(stl => stl.geocode).map(stl =>
          <Marker
            longitude={stl.geocode.geometry.coordinates[0]}
            latitude={stl.geocode.geometry.coordinates[1]}
            color={stl["Decision"] in statusColor ? statusColor[stl["Decision"]] : 'yellow'}
            onClick={() => setSelectedSTL(stl)}
            scale={(selectedSTL && stl["UPRN"] === selectedSTL['UPRN']) ? 2 : 1}
          />

        )}
      </Map>
      <Sidebar stl={selectedSTL} />
    </div>
  )

}
