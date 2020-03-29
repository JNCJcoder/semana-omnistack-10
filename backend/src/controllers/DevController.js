const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    try {
      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`,
        );

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
        });

        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray,
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
      }

      return response.json(dev);
    } catch (error) {
      return response.status(404).json('User does not exists');
    }
  },
  async read(request, response) {
    const { github_username } = request.params;
    const dev = await Dev.findOne({ github_username });

    return response.json(dev === null ? {} : dev);
  },
  async update(request, response) {
    const { github_username } = request.params;
    const dev = await Dev.findOne({ github_username });
    const { latitude, longitude, techs, ...rest } = request.body;
    rest.github_username = github_username;

    if (latitude && longitude)
      var newLocation = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

    if (techs) var techsArray = parseStringAsArray(techs);

    const newDev = await Dev.updateOne(
      { github_username },
      {
        location: latitude && longitude ? newLocation : dev.location,
        techs: techs ? techsArray : dev.techs,
        ...rest,
      },
    );

    return response.json({
      modifiedCount: newDev.nModified,
      ok: newDev.ok,
    });
  },
  async delete(request, response) {
    const { github_username } = request.params;
    await Dev.deleteOne({ github_username });
    return response.json();
  },
};
