import BusLineCurrentStops from '/imports/collections/bus_line_current_stops'
import { Meteor } from 'meteor/meteor'

BusLineCurrentStops
  .publish('busLineCurrentStops.all')
  .apply()
