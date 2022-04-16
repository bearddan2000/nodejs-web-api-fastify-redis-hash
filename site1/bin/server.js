var redis = require('redis');
var client = redis.createClient(6379, 'redis'); //creates a new client
// Require the framework and instantiate it
const app = require('fastify')({
    logger: true
})

client.on('connect', function() {
  app.log.info('connected');
});

client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

app.get('/', (req, res) => {
  client.hgetall('frameworks', function(err, reply) {
      res.send({
          message: reply
      });
  });
});

app.listen(3000, '0.0.0.0');
