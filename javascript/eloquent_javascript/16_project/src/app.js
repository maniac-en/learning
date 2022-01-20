import { Vec, Level, State, Player, Lava, Coin } from './game.js'
import {DOMDisplay} from './dom_display.js'
import {GAME_LEVELS} from './levels.js'

// set object sizes
Player.prototype.size = new Vec(0.8, 1.5);
Lava.prototype.size = new Vec(1, 1);
Coin.prototype.size = new Vec(0.6, 0.6);

let level1 = new Level(GAME_LEVELS[0]);
let display_level1 = new DOMDisplay(document.body, level1);
display_level1.syncState(State.start(level1));

