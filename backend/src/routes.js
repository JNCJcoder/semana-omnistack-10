const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Devs
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/devs/:github_username', DevController.read);
routes.put('/devs/:github_username', DevController.update);
routes.delete('/devs/:github_username', DevController.delete);

// Search
routes.get('/search', SearchController.index);

module.exports = routes;
