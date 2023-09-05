import Image from 'next/image'
import XLSX from "xlsx"
import Map from 'react-map-gl';
import { STLMap } from '@/components/Map';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


const geocoder = new MapboxGeocoder({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
  types: 'country,region,place,postcode,locality,neighborhood'
});

const column_names = [
  "Date Received",
  "Short Term Let Licence Number",
  "Applicant - If company or Organisation",
  "Premises address",
  "Postcode",
  "UPRN",
  "Council Ward",
  "Status",
  "Decision",
  "Decision Date",
  "Reason for Refusal - if applicatble",
  "Expiry Date",
  "Type of Premises",
  "Short Term Let Type",
  "Maximum Occupancy",
  "Number of Berooms",
  "Letting Period From",
  "Letting Period Until",
  "Manager",
  "Manager Address",
  "Postcode",
  "EPC rating",
  "Application reference number"
]

async function geocodeAddress(address: string) {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  return await fetch(endpoint, { cache: 'force-cache' }).then(r => r.json())
}

async function geocodeAll(stls: Array<Record<string, string>>) {
  return Promise.all(stls.map(async (stl) => {
    const address = stl["Premises address"] + ", " + stl["Postcode"]
    try {
      const geocode = await geocodeAddress(address)
      return { ...stl, geocode: geocode.features[0] }
    }
    catch (e) {
      console.log("Failed to geocode ", stl)
      return { ...stl, geocode: false }
    }
  }))
}

async function getSTLs() {
  const url = "https://www.edinburgh.gov.uk/downloads/file/32198/short-term-lets";
  const file = await (await fetch(url, { next: { revalidate: 3600 } })).arrayBuffer();
  const sheet = XLSX.read(file, { cellDates: true })
  const data = XLSX.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[0]])
  let headers = data[0]

  const stls = data.slice(1, -1).map(d => {
    let dp = {}
    //@ts-ignore
    Object.keys(d).forEach((key) => dp[headers[key]] = d[key])
    return dp
  })

  const geocoded = await geocodeAll(stls)
  return { stls: geocoded }
}

export default async function Home() {
  const { stls } = await getSTLs()

  return (
    <main className="flex min-h-screen ">
      <STLMap stls={stls} />
    </main>
  )
}
