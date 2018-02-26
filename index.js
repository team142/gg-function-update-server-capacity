'use strict';

const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();
const uuid = require('uuid');


exports.handle = (req, res) => {

  return SimpleHttpResponder.handlePost(req, res)

};

class SimpleHttpResponder {

  static handlePost(req, res) {
    const key = datastore.key(["capacity", req.body.serverName])

    const subEntity = {
      capacity: {
        currentPlayers: req.body.currentPlayers,
        maxPlayers: req.body.maxPlayers
      },
      details: {
        hostname: req.body.serverName,
        joinUrl: req.body.serverName
      },
      lastUpdate: new Date().getTime()
    }

    const entity = {
      key: key,
      data: subEntity
    };

    return datastore.save(entity)
      .then(() => SimpleHttpResponder.handleSuccess(res))
      .catch((err) => {
        SimpleHttpResponder.handleFailure(res, err)
      });
  }

  static handleSuccess(res) {
    res.status(200).send(`Entity saved.`)
    return Promise.resolve()
  }

  static handleFailure(res, err) {
    console.error(err)
    res.status(500).send(err.message)
  }

}


