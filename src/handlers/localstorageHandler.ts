export interface PositionData{
  city:string;
  long:number;
  lat:number;
}

export const setPositionData = () => {

  const positionData:PositionData[] = [
    {
      city:"Stockholm",
      long:18.075,
      lat:59.319
    },
    {
    city:"Malmö",
    long:13.003,
    lat:55.604
    },
    {
    city:"Kalmar",
    long:13.003,
    lat:55.604
    },
    {
    city: "Göteborg",
    long:11.96822,
    lat:57.70067
    },
  ]

  if (localStorage.getItem("positions") === null) {
    localStorage.setItem("positions", JSON.stringify(positionData))
  }
}

export const getLocalStorage = () => {
  let data = localStorage.getItem("positions")
  let storedData: PositionData[]  =  data ? JSON.parse(data) : []
  return storedData
}

export const setLocalStorage = (updatedData:PositionData[]) => {
  localStorage.setItem("positions", JSON.stringify(updatedData) )
}


