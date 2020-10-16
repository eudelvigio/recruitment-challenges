# Questions found

1. ./app.js Line 14

        app.disable("x-powered-by"); // QUESTION: any reason is this line here?

The header "x-powered-by" while is not part of the standard headers of a response, is used to send on some servers like express information about what application is working in the server to answer the sent request.

The main reason I can imagine is to avoid sending unnecesary information, as it can help possible attackers to find info from the server.

One extra point to consider is that disabling the header without doing more stuff, is that there are many extra signals which points this to be a express server, so if hiding that kind of info is important, extra work should be done.

2. ./src/router.js Line 6

        // QUESTION: why this endpoint blocks the app?

Seems that the endpoint is not using correctly the response object, as it is setting a value inside a body property of the response.

The main reason the endpoint is blocking the app is because express needs that ".send" method of the response object to answer the request. There are some other methods as ".json" which also can be used, but as no one of them is being called, express never send the response.

# Comments

I implemented all requires tasks, and all proposed bonuses.

I understood that health value is a percentage, as all players have the same value, so I don't allow to create players with a specified health, it will be 100.
Maybe the basic authentication is a bit unclear, but I think is enough verbose with the comments to be understood.

I decided to allow users to have more than one same element, as there is no limitation, seems reasonable to be ok, and simplifies development. The same happens with using a property to indicate destroyed objects instead of deleting them.

---

# REST API implementation

This is a Game of Thrones inspired REST API game. You are responsible to create the engine of the game.

## Your tasks

1. Implement the endpoints in **./src/api.js** file with the most suitable code for players and objects management REST API. You will find detailed instructions in this file.
2. Write some tests for your code. Use test folder for this purpose.
3. Answer all commented questions you find in the code.

### Required endpoints

You have to create endpoints (as many as you consider) to support the following functionality:

1. List all players.
2. Create player: adds a new player to data source.
3. Get player by id: returns the player for the given id.
4. Arm a player with an object in its bag.
5. Kill a player: sets player health to 0.
6. Create object: adds a new object to data source.
7. Get object by id: returns the object for the given id.
8. Upgrade object: increase/descrease the value of the object given by id with a new value
9. Destroy object: remove an object from available objects

**Bonus:**

1. Include a postman collection in utils folder to test the app.
2. Add basic authentication to /api path.
3. Implement pick up item endpoint: one player add to its bag one item that doesn't belong to any other player.
4. Implement attack player endpoint: one player attacks another player using an object from its bag. Adjust health accordingly
5. Implement steal bag from player endpoint: one player steals everything from another player. Bag objects are moved from one player to another.
6. Implement resurrect player endpoint: bring back to life a dead player using its id.
7. Implement use object endpoint: a player use an object against another player or itself.
8. Are you having fun? You are free to extend the game with new functionality.

## Game Rules

1. You are free to implement as many endpoints as you need.
2. You can use inline comments, git commits or readme file to justify your decissions.
3. Bag size is unlimited.
4. Bear in mind RESTful API concepts.
5. One object can be used by multiple players

**Use your own criteria for any rule that is not clear. Justify it.**

## How to run the application using a local server

To run the project, open a terminal and execute the following command from project root path:

Install dependencies

> yarn

Start a local server

> yarn start

A local server will start on port 8080.

> http://localhost:8080

## How to run the application using Docker

Build the image:

> docker build -t <your username>/payvision-fullstack-castleblack .

Run the image on localhost port 8081:

> docker run -p 8081:8080 -d <your username>/payvision-fullstack-castleblack

Enter the container:

> docker exec -it <container id> sh

Print logs:

> docker logs <container id>
> docker logs -f --tail 10 <container id>
