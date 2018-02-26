'use strict';

const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();
const uuid = require('uuid');


exports.handle = (req, res) => {

  return SimpleHttpResponder.handlePost(req, res)

};

class SimpleHttpResponder {

  static handlePost(req, res) {
    const key = datastore.key(["capacity", req.body.friendlyName])
    const subEntity = [
      {
        name: 'capacity',
        value: req.body.currentPlayers,
        excludeFromIndexes: true,
      },
      {
        name: 'maxPlayers',
        value: req.body.maxPlayers,
        excludeFromIndexes: true,
      },
      {
        name: 'friendlyName',
        value: req.body.friendlyName,
        excludeFromIndexes: true,
      },
      {
        name: 'joinUrl',
        value: req.body.joinUrl,
        excludeFromIndexes: true,
      },
      {
        name: 'lastUpdate',
        value: new Date().getTime(),
      },
    ];
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


