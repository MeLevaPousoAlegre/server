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

    docker: {
      image:'abernix/meteord:base'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 120
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
