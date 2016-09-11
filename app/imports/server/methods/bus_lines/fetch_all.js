import { Meteor } from 'meteor/meteor'
import BusLines from '/imports/collections/bus_lines'

Meteor.methods({
  'busLines/fetchAll'(){
    return BusLines.find().fetch()
  },
})
