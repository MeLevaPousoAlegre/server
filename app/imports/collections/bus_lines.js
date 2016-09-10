import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const BusLines = new Mongo.Collection('busLines')

const StopSchema = new SimpleSchema({
  _id: {
    type: SimpleSchema.RegEx.Id,
    autoValue(){
      if(this.isInsert){
        return Random.id()
      }
    },
  },
  address: {
    type: String,
    index: 1,
  },
  coordinates: {
    type: new SimpleSchema({
      latitude: {
        type: Number,
        decimal: true,
      },
      longitude: {
        type: Number,
        decimal: true,
      },
    }),
  },
  stopDescription: {
    type: String,
  },
})

BusLines.attachSchema({
  lineNumber: {
    type: String,
    index: 1,
    unique: true,
  },

  stopsComing: {
    type: [StopSchema],
  },

  stopsGoing: {
    type: [StopSchema],
  },
})

export default BusLines
