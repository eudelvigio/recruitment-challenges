const { Router } = require("express");
const api = Router();

// This will be your data source
const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
];
const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];

const users = [
  { login: "mol", password: "123"}
];

// Helper function to extract user and password from request header
function getLoginAndPasswordFromRequest(req) {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  return Buffer.from(b64auth, 'base64').toString().split(':');
}

// BASIC AUTHENTICATION
api.use((req, res, next) => {
  const [login, password] = getLoginAndPasswordFromRequest(req);

  if (login && password && users.find(u => u.login === login && u.password === password)) {
    return next();
  }
  res.status(401).send('Unauthorized');
});


// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", function(req, res) {
  res.json(objects);
});

// PLAYERS ENDPOINTS

// List all players
api.get("/player/list", function(req, res) {
  res.json(players);
});

// Create new player
api.post("/player", function(req, res) {
  if (req.body.name && req.body.age && !req.body.id) {
    // Maybe reduce can be used, but I think this is more understandable
    const newId = Math.max.apply(Math, players.map(p => p.id)) + 1;
    const newPlayer = {
      id: newId,
      name: req.body.name,
      age: req.body.age,
      health: 100,
      bag: []
    }
    players.push(newPlayer);
    res.json(newPlayer);
  } else {
    res.status(400).send({});
  }
});

// Get player by id
api.get("/player/:id", function(req, res) {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player);
  } else {
    res.status(404).send({});
  }
});

// Arm player with a object from his bag
api.put("/player/:id/arm/:objectId", function(req, res) {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    if (player.bag.includes(parseInt(req.params.objectId))) {
      player['armed'] = parseInt(req.params.objectId);
      res.json(player);
    } else {
      res.status(400).send({});
    }
  } else {
    res.status(404).send({});
  }
});

// Kill player
api.put("/player/:id/kill", function(req, res) {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    player.health = 0;
    res.json(player);
  } else {
    res.status(404).send({});
  }
});

// Pick up object no other player has
api.put("/player/:id/pickup/:objectId", function(req, res) {
  const playerId = parseInt(req.params.id);
  const objectId = parseInt(req.params.objectId);

  // if object not exist error
  if (!objects.some(o => o.id === objectId)) {
    res.status(400).send({});
    return;
  } 

  // if another player have objectId error
  if (players.filter(p => p.id !== playerId).some(p => p.bag.includes(objectId))
  ) {
    res.status(400).send({});
    return;
  }

  const player = players.find(p => p.id === playerId);
  if (player) {
    player.bag.push(objectId);
    res.json(player);
  } else {
    res.status(400).send({});
  }
});

// Attack *another* player with object from bag
api.put("/player/:id/attack", function(req, res) {
  const playerId = parseInt(req.params.id);

  const attackCommand = req.body;

  // if no defender or object, error
  if (!players.some(p => p.id === attackCommand.defender)) {
    res.status(400).send({});
    return;
  }

  if (playerId === attackCommand.defender) {
    res.status(400).send({});
    return;
  }

  const player = players.find(p => p.id === playerId);
  // if player not exist or not has the object, error
  if (!player || !player.bag.includes(attackCommand.object)) {
    res.status(400).send({});
    return;
  } else {
    const attackObject = objects.find(o => o.id === attackCommand.object);
    const anotherPlayer = players.find(p => p.id === attackCommand.defender);

    anotherPlayer.health += attackObject.value;

    res.json(player);
  }

});


// Use an object against a player
api.put("/player/:id/use", function(req, res) {
  const playerId = parseInt(req.params.id);

  const useCommand = req.body;
  // if no user against use the object, error
  if (!players.some(p => p.id === useCommand.against)) {
    res.status(400).send({});
    return;
  }

  const player = players.find(p => p.id === playerId);
  // if player not exist or not has the object, error
  if (!player) {
    res.status(400).send({});
    return;
  } else {
    const useObject = objects.find(o => o.id === useCommand.object);
    const anotherPlayer = players.find(p => p.id === useCommand.against);

    anotherPlayer.health += useObject.value;

    res.json(player);
  }

});

// Attack player with object from bag
api.put("/player/:id/steal/:stolenId", function(req, res) {
  const playerId = parseInt(req.params.id);
  const stolenId = parseInt(req.params.stolenId);

  // if no stolen, error
  if (!players.some(p => p.id === stolenId)) {
    res.status(400).send({});
    return;
  }

  const player = players.find(p => p.id === playerId);
  // if player not exist or not has the object, error
  if (!player) {
    res.status(400).send({});
    return;
  } else {
    const stolenPlayer = players.find(p => p.id === stolenId);

    player.bag.push(...stolenPlayer.bag);
    stolenPlayer.bag = [];

    res.json(player);
  }
});


// Kill player
api.put("/player/:id/resurrect", function(req, res) {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player && player.health <= 0) {
    player.health = 100;
    res.json(player);
  } else {
    res.status(404).send({});
  }
});


// OBJECTS ENDPOINTS

// Create new object
api.post("/object", function(req, res) {
  if (req.body.name && req.body.value && !req.body.id) {
    const newId = Math.max.apply(Math, objects.map(o => o.id)) + 1;
    const newObject = {
      id: newId,
      name: req.body.name,
      value: parseInt(req.body.value)
    }
    objects.push(newObject);
    res.json(newObject);
  } else {
    res.status(400).send({});
  }
});

// Get object by id
api.get("/object/:id", function(req, res) {
  const object = objects.find(o => o.id === parseInt(req.params.id));
  if (object) {
    res.json(object);
  } else {
    res.status(404).send({});
  }
});

// Upgrade object
api.put("/object/:id/upgrade", function(req, res) {
  const object = objects.find(o => o.id === parseInt(req.params.id));
  if (object) {
    if (!isNaN(req.body.value)) {
      object.value += req.body.value;
      res.json(object);
    } else {
      res.status(400).send({});
    }
  } else {
    res.status(404).send({});
  }
});

// Destroy object
api.put("/object/:id/destroy", function(req, res) {
  const object = objects.find(o => o.id === parseInt(req.params.id));
  if (object) {
    object['destroyed'] = true;
    res.json(object);
  } else {
    res.status(404).send({});
  }
});

module.exports = api;
