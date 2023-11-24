// metrics.js
const Prometheus = require('prom-client');

// Enable collection of default metrics like memory and CPU usage
Prometheus.collectDefaultMetrics();

// Define a custom metric
const customMetric = new Prometheus.Counter({
  name: 'custom_metric',
  help: 'A custom metric for demonstration purposes',
  labelNames: ['endpoint'],
});

// Function to increase the custom metric
function increaseCustomMetric(endpoint) {
  customMetric.inc({ endpoint });
}

async function exposeMetrics(app) {
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    
    try {
      const metrics = await Prometheus.register.metrics();
      res.end(metrics);
    } catch (err) {
      console.error('Error generating metrics:', err);
      res.status(500).send('Internal Server Error');
    }
  });
}


module.exports = {
  increaseCustomMetric,
  exposeMetrics,
};

