import BusLines from '/imports/collections/bus_lines'

export const typeDefs = [`
  type Coordinate {
    longitude: Float
    latitude: Float
  }

  type Stop {
    address: String
    stopDescription: String
    coordinates: Coordinate
  }

  type CurrentStop {
    goingStop: Stop
    comingStop: Stop
  }

  type BusLine {
    lineNumber: String
    stopsComing: [Stop]
  }

  type Query {
    busLine(lineNumber: String!): BusLine
  }
`]

export const resolvers = {
  Query: {
    async busLine(root, args, context){
      return await BusLines.findOne({lineNumber: args.lineNumber})
    }
  },

  BusLine: {
    lineNumber: ({ lineNumber }) => lineNumber,
    stopsComing: ({ stopsComing }) => stopsComing,
  },
}
