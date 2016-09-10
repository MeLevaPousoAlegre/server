import { Meteor } from 'meteor/meteor';
import PrincesaDoSul from 'princesa-do-sul-api'
import BusLines from '/imports/collections/bus_lines'
import NodeGeocoder from 'node-geocoder'
import Future from 'fibers/future'
import '/imports/server/'

const future = new Future()

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: 'AIzaSyCH1lIm2qyt7LHdHpAQq9gB0xABIsQXujk',
  formatter: null,
})

const geocodeSync = Meteor.wrapAsync(geocoder.geocode, geocoder)

PrincesaDoSul.getBusLines().then(busLines => {
  console.log('Fetched', busLines)
  future.return(busLines)
})

const busLines = future.wait()
busLines.forEach(lineNumber => {
  console.log('Checking', lineNumber)
  if(BusLines.find({ lineNumber }).count()){
    console.log(lineNumber, 'already exists. Skippping operation')
    return
  }

  const busFuture = new Future()

  PrincesaDoSul
    .getAllBusLineStops(lineNumber)
    .then(stops => {
      console.log(`Fetched stops for ${lineNumber}`)
      busFuture.return(stops)
    })

  const stops = busFuture.wait()

  if(!stops.coming || !stops.going) return console.info(`No stops for ${lineNumber}`)
  BusLines.insert({
    lineNumber,
    stopsComing: stops.coming.map(geocodeStop),
    stopsGoing: stops.going.map(geocodeStop),
  })
})

function geocodeStop(stop){
  console.log(`Geocoding ${stop.address}`)
  const geocodedInfo = geocodeSync(`${stop.address}, Pouso Alegre, Minas Gerais`)

  if(!geocodedInfo) return console.info(`Couldn't geocode ${stop.address}`)
  

  return {
    ...stop,
    coordinates: {
      latitude: geocodedInfo[0].latitude,
      longitude: geocodedInfo[0].longitude,
    },
  }
}
