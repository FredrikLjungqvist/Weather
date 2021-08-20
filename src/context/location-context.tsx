import React, {useState} from 'react'
import { getLocalStorage, setLocalStorage } from '../handlers/localstorageHandler'
interface PositionContext {
  checkDevicePosition: () => void;
  loadingLocation: boolean;
  locationIsFetched: boolean;
  positionDenied: boolean;
}

const LocationContext = React.createContext<PositionContext>({
  checkDevicePosition: () => { },
  loadingLocation: false,
  locationIsFetched: false,
  positionDenied: false,
})

interface Props {
  children: JSX.Element
}

export interface Position {
address: { county: string, city: string}
position: {lat: number, lng: number}
}

const apiKey = "V2olu2NpV3UrXM82R1rrKp-m8ylURma16wLVMns77Uk"

export const LocationContextProvider: React.FC<Props> = (props: Props) => {
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [locationIsFetched, setLocationIsFetched] = useState(false)
  const [positionDenied, setPositionDenied] = useState(false)
  
    const checkDevicePosition =  () => {
      setLoadingLocation(true)

      const deniedPos = () => {
        setLoadingLocation(false)
        setPositionDenied(true)
      }

      navigator.geolocation.getCurrentPosition(async(pos) => {   
        
          const {latitude, longitude} = pos.coords
          const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=se&apiKey=${apiKey}`)
          const positionData = await response.json()
          const currentCity = positionData.items.map((pos:Position) => {
            return{
              city:pos.address.county,
              long:pos.position.lng,
              lat:pos.position.lat,
            }
          })
            let storedData = getLocalStorage()
            storedData.splice(0,1,currentCity[0])
            setLocalStorage(storedData)
            setLoadingLocation(false)
            setLocationIsFetched(true)
        },deniedPos)     
    }   
  return (
    <LocationContext.Provider value={{
      checkDevicePosition,
      loadingLocation,
      locationIsFetched,
      positionDenied
    }}>
      {props.children}
    </LocationContext.Provider>
  )
}

export default LocationContext