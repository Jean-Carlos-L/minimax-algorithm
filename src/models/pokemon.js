class Pokemon {
  constructor({
    name,
    type1,
    type2,
    stats,
    attacks
  }) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.total = stats.hp + stats.attack + stats.defense + stats.spAtk + stats.spDef + stats.speed;
    this.hp = stats.hp;
    this.currentHP = stats.hp;
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.spAtk = stats.spAtk;
    this.spDef = stats.spDef;
    this.speed = stats.speed;

    this.attacks = attacks;
  }

  receiveDamage(damage) {
    this.currentHP = Math.max(0, this.currentHP - damage);
  }

  isFainted() {
    return this.currentHP <= 0;
  }
}

export { Pokemon };
