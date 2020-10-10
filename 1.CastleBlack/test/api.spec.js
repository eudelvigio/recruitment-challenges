const request = require("supertest");
const api = require("../src/api");
const express = require("express");
const bodyParser = require("body-parser");

describe("Api endpoints", () => {
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

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(api);
  });
  test("It should have an endpoint to get a player list", async () => {
    const response = await request(app).get("/player/list");

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);
    response.body.map(p => checkPlayerDataTypes(p));
  });
  test("It should have an endpoint to get particular player info", async () => {
    const playerId = 1;
    const response = await request(app).get(`/player/${playerId}`);
    
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
    const response = await request(app).put(`/player/${playerId}/arm/${objectId}`);
    
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
    const response = await request(app).put(`/player/${playerId}/kill`);
    
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
    const response = await request(app).get(`/object/${objectId}`);
    
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
    const responseOldObject = await request(app).get(`/object/${objectId}`);
    const oldObject = responseOldObject.body;

    const response = await request(app)
      .put(`/object/${objectId}/upgrade`)
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
      .put(`/object/${objectId}/destroy`);
    
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    const object = response.body;
    checkObjectDataTypes(object);
    expect(object.id).toBe(objectId);
    expect(object.destroyed).toBe(true);
  });
});