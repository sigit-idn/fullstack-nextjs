const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'nextjs',
      password : 'nextjs123##',
      database : 'fullstacknextjs'
    }
  });

  export default knex;