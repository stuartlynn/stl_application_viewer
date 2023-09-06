"use client"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState } from "react"
import { format } from "date-fns"
import { AboutModal } from "./AboutModal"
import { NavBar } from "./NavBar"
import { StatusIndicator } from "./StatusIndicator"
import { decisionToStatusColor } from "@/utils"


const Stat: React.FC<{ value: number | string, label: string }> = ({ value, label }) => {
  return (
    <div>
      <p className='font-bold font-serif'>{label}</p>
      <p className="font-sans">{value}</p>
    </div>
  )
}

function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd")
}


const STLDetails: React.FC<{ stl: Record<string, any> }> = ({ stl }) => {
  return (
    <div className="flex border-t-radius-2 flex-col gap-4 md:overflow-y-auto md:overflow-x-hidden overflow-x-auto  align-center ">
      <Stat label="Unique Property Reference Number" value={stl["UPRN"]} />
      <Stat label="Manager" value={stl["Manager"] ?? "Not Specified"} />

      {(stl["Letting Period From"] && stl["Letting Period Until"]) &&
        <Stat label="Letting Period" value={`${formatDate(stl["Letting Period From"])} to ${formatDate(stl["Letting Period Until"])}`} />
      }

      <Stat label="Status" value={stl["Status"]} />
      <Stat label="Decision" value={stl["Decision"]} />

      {stl["Decision Date"] &&
        <Stat label={"Decision Date"} value={formatDate(stl["Decision Date"])} />
      }

      {stl["Reason for Refusal - if applicatble"] &&
        <Stat label={"Reason For Refusal"} value={stl["Reason for Refusal - if applicatble"]} />
      }

      <Stat label="Type of Premises" value={stl["Type of Premises"]} />
      <Stat label="Short Term Let Type" value={stl["Short Term Let Type"]} />
      <Stat label="Maximum Occupancy" value={stl["Maximum Occupancy"]} />
      <Stat label="Number of Bedrooms" value={stl["Number of Berooms"]} />
    </div>
  )
}

const Sidebar: React.FC<{ stl: Record<string, any>, stats: Record<string, number> }> = ({ stl, stats }) => {
  return (
    <div className="flex flex-col md:p-2 bg-white z-20 md:w-64 w-full b-t-r-2 h-64 md:h-full">
      <header className='w-full p-2 border-solid border-b-2 border-gray-600 '>
        {stl ?
          <div className="flex flex-row items-center gap-2">
            <StatusIndicator decision={stl["Decision"]} />
            <h4 className="font-bold">{stl["Premises address"]}, {stl["Postcode"]}</h4>
          </div>
          :
          <h4>Click a property to see the details of the short term let application there</h4>
        }
      </header>
      <div className="flex-1 overflow-y-auto p-2 ">
        {stl &&
          <STLDetails stl={stl} />
        }
      </div>
      <div className="p-2 border-solid border-t-2 border-gray-600 md:block hidden">
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
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavBar onShowAbout={() => setShowModal(true)} />
      <div className='flex-1 flex h-full flex-col md:flex-row '>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -3.188267,
            latitude: 55.953251,
            zoom: 12
          }}
          style={{ width: "100%", height: "100%", flex: 1 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {stls.filter(stl => stl.geocode).map(stl =>
            <Marker
              key={stl["UPRN"]}
              longitude={stl.geocode.geometry.coordinates[0]}
              latitude={stl.geocode.geometry.coordinates[1]}
              color={decisionToStatusColor(stl["Decision"])}
              onClick={() => setSelectedSTL(stl)}
            />
          )}
        </Map>
        <Sidebar stl={selectedSTL} stats={{ noAccepted, noWithdrawn, noPending, total, notGeocoded }} />
      </div>
      {showModal &&
        <AboutModal onClose={() => setShowModal(false)} />
      }

    </div>
  )

}
