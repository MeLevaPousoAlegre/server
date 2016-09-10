import Future from 'fibers/future'
import PrincesaDoSul from 'princesa-do-sul-api'
import BusLines from '/imports/collections/bus_lines'
import BusLineCurrentStops from '/imports/collections/bus_line_current_stops'
import { SyncedCron } from 'meteor/percolate:synced-cron'

SyncedCron.add({
  name: 'Fetch current buses stops',
  schedule(parser){
    return parser.text('every 5 minutes')
  },
  job(){
    const busLines = BusLines.find().fetch()

    busLines.forEach(busLine => {
      const future = new Future()
      PrincesaDoSul
        .getBusLineCurrentStops(busLine.lineNumber)
        .then(currentStops => future.return(currentStops))
      const currentStops = future.wait() 

      if(!currentStops) return console.warn(`No current stops could be fetched for ${busLine.lineNumber}`)

      BusLineCurrentStops.upsert({
        lineNumber: busLine.lineNumber,
      }, {
        $set: {
          lineId: busLine._id,
          lineNumber: busLine.lineNumber,
          currentStops,
          createdAt: new Date(),
        },
      })
    })
  },
})
