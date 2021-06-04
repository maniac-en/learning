#!/usr/bin/env node

var roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        // console.log(`turn: ${turn}`);
        let action = robot(state, memory);
        // console.log(`moving to ${action.direction} with memory: [${action.memory}]`)
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState(randomPick(Object.keys(roadGraph)), parcels);
};

var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

function compareRobots(robot1, robot2, robot3, parcelsToTest = 5) {
    let compareObj = { robot1: 0, robot2: 0, robot3: 0};
    for (let i = 0; i < 100; i++) {
        let randomState = VillageState.random(parcelsToTest);
        compareObj.robot1 += runRobot(randomState, robot1, []);
        compareObj.robot2 += runRobot(randomState, robot2, []);
        compareObj.robot3 += runRobot(randomState, robot3, []);
    }
    console.log(`100 random iterations for ${parcelsToTest} parcels:`)
    console.log(`\t${robot1.name} took ${Math.floor(compareObj.robot1 / 100)} steps per task!`);
    console.log(`\t${robot2.name} took ${Math.floor(compareObj.robot2 / 100)} steps per task!`);
    console.log(`\t${robot3.name} took ${Math.floor(compareObj.robot3 / 100)} steps per task!`);
}

function fastRobot({place, parcels}, route) {
    // console.log('Currently at:', place);
    // console.log('Parcels left to deliver:', parcels);
    if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true};
            } else {
                return {route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false};
            }
        });

        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        function score({route, pickUp}) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
        // console.log('possible routes: ', routes);
        // console.log('selected route: ', route);
    }

    return {direction: route[0], memory: route.slice(1)};
}

// test
compareRobots(routeRobot, goalOrientedRobot, fastRobot, 25);
compareRobots(routeRobot, goalOrientedRobot, fastRobot, 50);
compareRobots(routeRobot, goalOrientedRobot, fastRobot, 75);
compareRobots(routeRobot, goalOrientedRobot, fastRobot, 100);
// state = VillageState.random(3);
// runRobot(state, fastRobot, []);
