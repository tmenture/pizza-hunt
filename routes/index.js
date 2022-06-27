const router = require('express').Router();
// Imports just the api routes
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

// add prefix of api to all of the api routes imported from the pai directory
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
