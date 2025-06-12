import calculateDamage from "./damage.js";
import { Pokemon } from "../models/pokemon.js";

/**
 * Evalúa la diferencia de HP entre el Pokémon activo del jugador y del oponente.
 *
 * @param {Object} player - Jugador actual con método getActivePokemon()
 * @param {Object} opponent - Oponente con método getActivePokemon()
 * @returns {number} Diferencia de HP entre los Pokémon activos
 */
function evaluateState(player, opponent) {
  const p1HP = player.getActivePokemon().currentHP;
  const p2HP = opponent.getActivePokemon().currentHP;
  return p1HP - p2HP;
}

/**
 * Crea una copia del jugador y su Pokémon activo para simulaciones.
 *
 * @param {Object} original - Jugador original con método getActivePokemon()
 * @returns {Object} Objeto clonado con método getActivePokemon()
 */
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
    attacks: JSON.parse(JSON.stringify(originalPkmn.attacks)),
  });

  clonedPokemon.currentHP = originalPkmn.currentHP;

  return {
    pokemon: clonedPokemon,
    getActivePokemon() {
      return this.pokemon;
    },
  };
}

/**
 * Implementa el algoritmo minimax con poda alfa-beta para simular futuros turnos.
 *
 * @param {Object} player - Jugador maximizador
 * @param {Object} opponent - Jugador minimizador
 * @param {number} depth - Profundidad máxima de búsqueda
 * @param {number} alpha - Mejor puntuación que el maximizador puede asegurar
 * @param {number} beta - Mejor puntuación que el minimizador puede asegurar
 * @param {boolean} maximizingPlayer - True si es el turno del maximizador
 * @returns {number} Valor del estado simulado del juego
 */
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

/**
 * Elige el mejor ataque disponible para el jugador usando minimax.
 *
 * @param {Object} player - Jugador que debe atacar
 * @param {Object} opponent - Oponente
 * @param {number} [depth=2] - Profundidad de búsqueda
 * @returns {Object|null} El mejor ataque según minimax, o null si no hay ataques
 */
function chooseBestMove(player, opponent, depth = 10) {
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
/**
 * Devuelve el ataque que genera el mayor daño inmediato al oponente.
 *
 * @param {Object} attacker - Pokémon atacante
 * @param {Object} defender - Pokémon defensor
 * @returns {Object} Ataque que produce el daño más alto
 */
function getStrongestAttack(attacker, defender) {
  let bestAttack = attacker.attacks[0];
  let maxDamage = calculateDamage(attacker, defender, bestAttack);

  for (const attack of attacker.attacks) {
    const dmg = calculateDamage(attacker, defender, attack);
    if (dmg > maxDamage) {
      maxDamage = dmg;
      bestAttack = attack;
    }
  }

  return bestAttack;
}

export { chooseBestMove, getStrongestAttack };
