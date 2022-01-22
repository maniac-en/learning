import {runGame} from './game.js'
import {DOMDisplay} from './dom_display.js'
import {GAME_LEVELS} from './levels.js'

// object pixel scaling factor
export const scale = 35;

runGame(GAME_LEVELS, DOMDisplay);
