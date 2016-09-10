import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const BusLineCurrentStops = new Mongo.Collection('busLineCurrentStops')

BusLineCurrentStops.attachSchema({
  lineNumber: {
    type: String,
    index: 1,
  },

  lineId: {
    index: 1,
    type: SimpleSchema.RegEx.Id,
  },

  currentStops: {
    type: Object,
    blackbox: true,
  },

  createdAt: {
    type: Date,
    autoValue(){
      if(this.isInsert){
        return new Date()
      }
    }
  },
})

export default BusLineCurrentStops
