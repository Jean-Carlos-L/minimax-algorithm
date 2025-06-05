import { battle } from './engine.js';
import { Trainer } from '../models/trainer.js'; 
import { Pokemon } from '../models/pokemon.js'; 


const flamethrower = { name: "Flamethrower", power: 90, type: "fire" };
const slash = {name: "Slash", power: 70, type: "normal" };

const charizard = new Pokemon({
  name: "Charizard",
  type1: "fire",
  type2: "flying",
  total: 534,
  hp: 150,
  attack: 84,
  defense: 78,
  spAtk: 109,
  spDef: 85,
  speed: 100,
  generation: 1,
  legendary: false,
  attacks: [flamethrower, slash]

});

const vineWhip = { name: "Vine Whip", power: 45, type: "grass" };
const tackle = { name: "Tackle", power: 40, type: "normal" };

const venusaur = new Pokemon({
    name: "Venusaur",
    type1: "grass",
    type2: "poison",
    total: 525,
    hp: 160,
    attack: 82,
    defense: 83,
    spAtk: 100,
    spDef: 100,
    speed: 80,
    generation: 1,
    legendary: false,
    attacks: [vineWhip, tackle]
    });



const ash = new Trainer('Ash', [charizard]);
const misty = new Trainer('Misty', [venusaur]);

battle(ash, misty);
