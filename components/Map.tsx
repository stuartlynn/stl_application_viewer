"use client"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { AboutModal } from "./AboutModal"

const statusColor: Record<string, string> = {
  "Grant Licence": 'green',
  "Refer to Licensing Sub Committee": 'yellow',
  "Application Withdrawn": 'red',
}


const STLDetails: React.FC<{ stl: Record<string, any> }> = ({ stl }) => {
  return (
    <div style={{ display: 'grid', overflowY: "auto", gridTemplateColumns: '1fr', gap: "10px", alignItems: "center", flex: 1 }}>
      <div>
        <p style={{ fontWeight: "bold" }}>Unique Property Reference Number</p>
        <p>{stl["UPRN"]}</p>
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>Address</p>
        <p>{stl["Premises address"]}, {stl["Postcode"]}</p>
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>Manager</p>
        <p>{stl["Manger"] ? stl["Manager"] : "Not Specified"}</p>
      </div>

      {(stl["Letting Period From"] && stl["Letting Period Until"]) &&
        <div>
          <p style={{ fontWeight: "bold" }}>Letting Period</p>
          <p>{format(stl["Letting Period From"], "yyyy-MM-dd")} to {format(stl["Letting Period Until"], "yyyy-MM-dd")}</p>
        </div>
      }

      <div>
        <p style={{ fontWeight: "bold" }}>Status</p>
        <p>{stl["Status"]}</p>
      </div>


      {stl["Decision"] &&
        <div>
          <p style={{ fontWeight: "bold" }}>Decision</p>
          <p>{stl["Decision"]}</p>
        </div>
      }

      {stl["Decision Date"] &&
        <div>
          <p style={{ fontWeight: "bold" }}>Decision Date</p>
          <p>{format(stl["Decision Date"], "yyyy-MM-dd")}</p>
        </div>
      }

      {stl["Reason for Refusal - if applicatble"] &&
        <div>
          <p style={{ fontWeight: "bold" }}>Reason For Refusal</p>
          <p>{stl["Reason for Refusal - if applicatble"]}</p>
        </div>
      }

      <div>
        <p style={{ fontWeight: "bold" }}>Type of Premises</p>
        <p>{stl["Type of Premises"]}</p>
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>Short Term Let Type</p>
        <p>{stl["Short Term Let Type"]}</p>
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>Maximum Occupancy</p>
        <p>{stl["Maximum Occupancy"]}</p>
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>Number of Bedrooms</p>
        <p>{stl["Number of Berooms"]}</p>
      </div>

    </div>
  )
}

const Sidebar: React.FC<{ stl: Record<string, any>, stats: Record<string, number> }> = ({ stl, stats }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", position: 'absolute', height: "calc(100vh - 60px)", boxSizing: 'border-box', padding: "20px", right: "0px", top: "60px", width: "300px", backgroundColor: "white", zIndex: 20 }}>

      {stl ?
        <STLDetails stl={stl} />
        :
        <h2>Click a property to see the details of the short term let application there</h2>
      }
      <div style={{ borderTop: "1px solid lightgray", boxSizing: 'border-box', padding: "20px" }}>
        <p>Total Applications: <span style={{ fontWeight: "bold", color: "black" }}>{stats.total}</span></p>
        <p style={{ color: "#008000" }}>Accepted: <span style={{ fontWeight: "bold", color: "black" }}>{stats.noAccepted}</span></p>
        <p style={{ color: "#ff0200" }}>Withdrawn / Rejected: <span style={{ fontWeight: "bold", color: "black" }}>{stats.noWithdrawn}</span></p>
        <p style={{ color: "#ffdd00" }}>Pending: <span style={{ fontWeight: "bold", color: "black" }}>{stats.noPending}</span></p>
        <p>Missed Geocode: <span style={{ fontWeight: "bold", color: "black" }}>{stats.notGeocoded}</span></p>
      </div>

    </div>
  )
}

export const STLMap: React.FC<{ stls: Array<Record<string, any>> }> = ({ stls }) => {
  const [selectedSTL, setSelectedSTL] = useState<any | null>(null)
  const total = stls.length
  const notGeocoded = stls.filter(s => !s.geocode).length
  const noAccepted = stls.filter(s => s["Decision"] === "Grant Licence").length
  const noWithdrawn = stls.filter(s => s["Decision"] === "Application Withdrawn").length
  const noPending = stls.filter(s => !s["Decision"]).length
  const [showAboutModal, setShowAboutModal] = useState(false)
  console.log("Show about modal ", showAboutModal)

  return (
    <div style={{ position: 'absolute', width: "100vw", height: "100vh" }}>
      <div style={{ width: "100vw", display: "flex", alignItems: 'center', borderBottom: "1px solid lightgray", justifyContent: "space-between", "flexDirection": 'row', height: "60px", padding: '20px', boxSizing: 'border-box', position: "absolute", zIndex: 20, backgroundColor: "white", top: "0px", left: "0px" }}>
        <h1>Edinburgh Short Term Let Application Explorer</h1>
        <Link href="/about" target="__blank">About</Link>
      </div>
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
            key={stl["UPRN"]}
            longitude={stl.geocode.geometry.coordinates[0]}
            latitude={stl.geocode.geometry.coordinates[1]}
            color={stl["Decision"] in statusColor ? statusColor[stl["Decision"]] : 'yellow'}
            onClick={() => setSelectedSTL(stl)}
          />
        )}
      </Map>
      <Sidebar stl={selectedSTL} stats={{ noAccepted, noWithdrawn, noPending, total, notGeocoded }} />
    </div>
  )

}
