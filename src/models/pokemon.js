class Pokemon {
  constructor({
    name,
    type1,
    type2,
    total,
    hp,
    currentHP, // <--- importante
    attack,
    defense,
    spAtk,
    spDef,
    speed,
    generation,
    legendary,
    attacks
  }) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.total = total;
    this.hp = hp;
    this.currentHP = hp; 
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
    this.generation = generation;
    this.legendary = legendary;
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