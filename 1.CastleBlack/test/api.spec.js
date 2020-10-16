const request = require("supertest");
const api = require("../src/api");
const express = require("express");
const bodyParser = require("body-parser");

let app;

const checkPlayerDataTypes = (player) => {
  expect(player).toBeInstanceOf(Object);
  expect(player.id).not.toBeNaN();
  expect(player.name).toMatch(/.+/);
  expect(player.bag).toBeInstanceOf(Array);
  expect(player.age).not.toBeNaN();
  expect(player.health).not.toBeNaN();
}
const checkObjectDataTypes = (object) => {
  expect(object).toBeInstanceOf(Object);
  expect(object.id).not.toBeNaN();
  expect(object.name).toMatch(/.+/);
  expect(object.value).not.toBeNaN();
}

describe("Api endpoints", () => {
  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(api);
  });

  test("It should have an endpoint to get a player list", async () => {
    const response = await request(app).get("/player/list").auth("mol", "123");

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);
    response.body.map(p => checkPlayerDataTypes(p));
  });

  test("It should have an endpoint to get particular player info", async () => {
    const playerId = 1;
    const response = await request(app).get(`/player/${playerId}`).auth("mol", "123");
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const player = response.body;
    checkPlayerDataTypes(player);
    expect(player.id).toBe(playerId);
  });

  test("It should have an endpoint to create new players", async () => {
    const newPlayer = {
        name: "Manolo",
        age: 23
    }
    const response = await request(app)
      .post("/player")
      .auth("mol", "123")
      .send(newPlayer);
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const player = response.body;
    checkPlayerDataTypes(player);
    expect(player.name).toBe(newPlayer.name);
    expect(player.age).toBe(newPlayer.age);
    expect(player.health).toBe(100);
    expect(player.bag).toStrictEqual([]);
  });
  
  test("It should have an endpoint allowing a player to arm an object from his bag", async () => {
    const playerId = 1;
    const objectId = 1;
    const response = await request(app).put(`/player/${playerId}/arm/${objectId}`).auth("mol", "123");
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const player = response.body;
    checkPlayerDataTypes(player);
    expect(player.id).toBe(playerId);
    expect(player.armed).toBe(objectId);
    expect(player.bag).toContain(objectId);
  });
  
  test("It should have an endpoint to kill a player", async () => {
    const playerId = 1;
    const response = await request(app).put(`/player/${playerId}/kill`).auth("mol", "123");
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const player = response.body;
    checkPlayerDataTypes(player);
    expect(player.id).toBe(playerId);
    expect(player.health).toBe(0);
  });

  test("It should have an endpoint to create new objects", async () => {
    const newObject = {
        name: "Tortilla",
        value: 200
    }
    const response = await request(app)
      .post("/object")
      .auth("mol", "123")
      .send(newObject);
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const object = response.body;
    checkObjectDataTypes(object);
    expect(object.name).toBe(newObject.name);
    expect(object.value).toBe(newObject.value);
  });

  test("It should have an endpoint to get an object by id", async () => {
    const objectId = 1;
    const response = await request(app).get(`/object/${objectId}`).auth("mol", "123");
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const object = response.body;
    checkObjectDataTypes(object);
    expect(object.id).toBe(objectId);
  });

  test("It should have an endpoint to upgrade existing objects", async () => {
    const upgrade = {
        value: -50
    }
    const objectId = 1;
    const responseOldObject = await request(app).get(`/object/${objectId}`).auth("mol", "123");
    const oldObject = responseOldObject.body;

    const response = await request(app)
      .put(`/object/${objectId}/upgrade`)
      .auth("mol", "123")
      .send(upgrade);
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const object = response.body;
    checkObjectDataTypes(object);
    expect(object.id).toBe(objectId);
    expect(object.value).toBe(oldObject.value + upgrade.value);
  });

  test("It should have an endpoint to destroy existing objects", async () => {
    const objectId = 1;
    const response = await request(app)
      .put(`/object/${objectId}/destroy`)
      .auth("mol", "123");
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const object = response.body;
    checkObjectDataTypes(object);
    expect(object.id).toBe(objectId);
    expect(object.destroyed).toBe(true);
  });
});

describe("Bonus Api endpoints", () => {

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(api);
  });
  test("It should have an endpoint to pickup one object no other player has", async () => {
    const playerId = 1;
    const existingObject = 2;
    const newObjectId = 1;

    const responseBad = await request(app).put(`/player/${playerId}/pickup/${existingObject}`).auth("mol", "123");

    expect(responseBad.statusCode).toBe(400);

    const responseOk = await request(app).put(`/player/${playerId}/pickup/${newObjectId}`).auth("mol", "123");

    expect(responseOk.statusCode).toBe(200);

    expect(responseOk.type).toBe("application/json");
    expect(responseOk.body).toBeInstanceOf(Object);

    const player = responseOk.body;
    checkPlayerDataTypes(player);
    expect(player.bag).toHaveLength(2);
    expect(player.bag).toStrictEqual([1,1]);
    
  });



  test("It should have an endpoint to attack another player with an object from bag", async () => {
    const attackerId = 1;
    const defenderId = 2;
    const attackObject = await request(app).get(`/object/1`).auth("mol", "123").body;
    const attackObjectIdNotInBag = 2;

    const badAttackCommand = {
        defender: defenderId,
        object: attackObjectIdNotInBag
    }
    const responseKo = await request(app)
      .put(`/player/${attackerId}/attack`)
      .auth("mol", "123")
      .send(badAttackCommand);
    
    expect(responseKo.statusCode).toBe(400);

    const attackCommand = {
        defender: defenderId,
        object: attackObject.id
    }
    const responseOk = await request(app)
      .put(`/player/${playerId}/attack`)
      .auth("mol", "123")
      .send(attackCommand);
    
    expect(responseOk.statusCode).toBe(200);


    const player = response.body;
    checkPlayerDataTypes(player);
  
    const defender = await request(app).get(`/player/${defenderId}`).auth("mol", "123").body;
    
    expect(defender.health).toBe(100 + attackObject.value);
  });

});