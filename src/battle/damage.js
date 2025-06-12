import typeChart from "../utils/typeChart.js";
 
function getTypeEffectiveness(attackType, defenderType1, defenderType2 = null) {
  let multiplier = 1;

  if (typeChart[attackType]) {
    if (typeChart[attackType][defenderType1]) {
      multiplier *= typeChart[attackType][defenderType1];
    }
    if (defenderType2 && typeChart[attackType][defenderType2]) {
      multiplier *= typeChart[attackType][defenderType2];
    }
  }

  return multiplier;
}

function calculateDamage(attacker, defender, attack) {
  const atkStat = attacker.spAtk > attacker.attack ? attacker.spAtk : attacker.attack;
  const defStat = defender.spDef > defender.defense ? defender.spDef : defender.defense;

  const effectiveness = getTypeEffectiveness(attack.type, defender.type1, defender.type2);
  const baseDamage = ((2 * 10 / 5 + 2) * attack.power * (atkStat / defStat)) / 10 + 2;

  return Math.floor(baseDamage * effectiveness);
}

export default calculateDamage;