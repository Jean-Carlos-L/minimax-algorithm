import calculateDamage from './damage.js';
import { chooseBestMove } from './minimax.js';


function battleTurn(attackerTrainer, defenderTrainer, attack) {
  const attacker = attackerTrainer.getActivePokemon();
  const defender = defenderTrainer.getActivePokemon();

  const damage = calculateDamage(attacker, defender, attack);
  defender.receiveDamage(damage);

  console.log(`${attacker.name} usó ${attack.name} e hizo ${damage} de daño a ${defender.name}`);
  console.log(`HP restante de ${defender.name}: ${defender.currentHP}\n`);
}


function battle(trainer1, trainer2) {
  console.log(`⚔️ ¡Comienza la batalla entre ${trainer1.name} y ${trainer2.name}!\n`);


  while (trainer1.hasRemainingPokemon() && trainer2.hasRemainingPokemon()) {
    const pkmn1 = trainer1.getActivePokemon();
    const pkmn2 = trainer2.getActivePokemon();


    const move1 = chooseBestMove(trainer1, trainer2);
    const move2 = chooseBestMove(trainer2, trainer1);

    let first, second;
    if (pkmn1.speed >= pkmn2.speed) {
      first = { trainer: trainer1, attack: move1 };
      second = { trainer: trainer2, attack: move2 };
    } else {
      first = { trainer: trainer2, attack: move2 };
      second = { trainer: trainer1, attack: move1 };
    }


    battleTurn(first.trainer, second.trainer, first.attack);


    if (second.trainer.hasRemainingPokemon()) {
      battleTurn(second.trainer, first.trainer, second.attack);
    }
  }


  if (trainer1.hasRemainingPokemon()) {
    console.log(`🎉 ¡${trainer1.name} gana la batalla!\n`);
  } else {
    console.log(`🎉 ¡${trainer2.name} gana la batalla!\n`);
  }
}

export { battleTurn, battle };
