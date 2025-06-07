import calculateDamage from "./damage.js";
import { Pokemon } from "../models/pokemon.js";

//esta es la heuristica de evaluación del estado del juego
// en este caso, simplemente restamos los puntos de vida del jugador y del oponente
// si el resultado es positivo, significa que el jugador está ganando
// si es negativo, significa que el oponente está ganando
// si es cero, significa que están empatados
function evaluateState(player, opponent) {
  const p1HP = player.getActivePokemon().currentHP;
  const p2HP = opponent.getActivePokemon().currentHP;
  return p1HP - p2HP;
}

function clonePlayer(original) {
  const originalPkmn = original.getActivePokemon();

  const clonedPokemon = new Pokemon({
    name: originalPkmn.name,
    type1: originalPkmn.type1,
    type2: originalPkmn.type2,
    stats: {
      hp: originalPkmn.hp,
      attack: originalPkmn.attack,
      defense: originalPkmn.defense,
      spAtk: originalPkmn.spAtk,
      spDef: originalPkmn.spDef,
      speed: originalPkmn.speed,
    },
    attacks: JSON.parse(JSON.stringify(originalPkmn.attacks))
  });

  clonedPokemon.currentHP = originalPkmn.currentHP;

  return {
    pokemon: clonedPokemon,
    getActivePokemon() {
      return this.pokemon;
    },
  };
}


function minimax(player, opponent, depth, alpha, beta, maximizingPlayer) {
  const pkmnPlayer = player.getActivePokemon();
  const pkmnOpponent = opponent.getActivePokemon();

  if (depth === 0 || pkmnPlayer.isFainted() || pkmnOpponent.isFainted()) {
    return evaluateState(player, opponent);
  }

  const attacker = maximizingPlayer ? player : opponent;
  const defender = maximizingPlayer ? opponent : player;
  const attackerPkmn = attacker.getActivePokemon();

  let bestScore = maximizingPlayer ? -Infinity : Infinity;

  for (const attack of attackerPkmn.attacks) {
    const attackerClone = clonePlayer(attacker);
    const defenderClone = clonePlayer(defender);

    const damage = calculateDamage(
      attackerClone.getActivePokemon(),
      defenderClone.getActivePokemon(),
      attack
    );
    defenderClone.getActivePokemon().receiveDamage(damage);

    const score = minimax(
      attackerClone,
      defenderClone,
      depth - 1,
      alpha,
      beta,
      !maximizingPlayer
    );

    if (maximizingPlayer) {
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, score);
    } else {
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, score);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return bestScore;
}

function chooseBestMove(player, opponent, depth = 2) {
  const activePokemon = player.getActivePokemon();

  if (!activePokemon.attacks || activePokemon.attacks.length === 0) {
    return null;
  }

  let bestMove = activePokemon.attacks[0];
  let bestValue = -Infinity;

  for (const attack of activePokemon.attacks) {
    const playerClone = clonePlayer(player);
    const opponentClone = clonePlayer(opponent);

    const damage = calculateDamage(
      playerClone.getActivePokemon(),
      opponentClone.getActivePokemon(),
      attack
    );
    opponentClone.getActivePokemon().receiveDamage(damage);

    const value = minimax(
      playerClone,
      opponentClone,
      depth - 1,
      -Infinity,
      Infinity,
      false
    );

    if (value > bestValue) {
      bestValue = value;
      bestMove = attack;
    }
  }

  return bestMove;
}

export { chooseBestMove };
