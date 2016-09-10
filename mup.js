module.exports = {
  servers: {
    one: {
      host: '104.131.12.202',
      username: 'root'
    }
  },

  meteor: {
    name: 'app',
    path: 'app/',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'app.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
