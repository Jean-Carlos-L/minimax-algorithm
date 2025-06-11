const typeChart = {
  Normal:    { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  Fire:      { Fire: 0.5, Water: 0.5, Grass: 1.2, Ice: 1.2, Bug: 1.2, Rock: 0.5, Dragon: 1, Steel: 1.2 },
  Water:     { Fire: 1.2, Water: 0.5, Grass: 0.5, Ground: 1.2, Rock: 1.2, Dragon: 0.5 },
  Electric:  { Water: 1.2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 1.2, Dragon: 0.5 },
  Grass:     { Fire: 0.5, Water: 1.2, Grass: 0.5, Poison: 0.5, Ground: 1.2, Flying: 0.5, Bug: 0.5, Rock: 1.2, Dragon: 0.5, Steel: 0.5 },
  Ice:       { Fire: 0.5, Water: 0.5, Grass: 1.2, Ice: 0.5, Ground: 1.2, Flying: 1.2, Dragon: 1, Steel: 0.5 },
  Fighting:  { Normal: 1.2, Ice: 1.2, Rock: 1.2, Dark: 1.2, Steel: 1.2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Fairy: 0.5, Ghost: 0 },
  Poison:    { Grass: 1.2, Fairy: 1.2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0 },
  Ground:    { Fire: 1.2, Electric: 1.2, Grass: 0.5, Poison: 1.2, Flying: 0, Bug: 0.5, Rock: 1.2, Steel: 1.2 },
  Flying:    { Electric: 0.5, Grass: 1.2, Fighting: 1.2, Bug: 1.2, Rock: 0.5, Steel: 0.5 },
  Psychic:   { Fighting: 1.2, Poison: 1.2, Psychic: 0.5, Steel: 0.5, Dark: 0 },
  Bug:       { Fire: 0.5, Grass: 1.2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 1.2, Ghost: 0.5, Steel: 0.5, Fairy: 0.5 },
  Rock:      { Fire: 1.2, Ice: 1.2, Fighting: 0.5, Ground: 0.5, Flying: 1.2, Bug: 1.2, Steel: 0.5 },
  Ghost:     { Normal: 0, Psychic: 1.2, Ghost: 1.2, Dark: 0.5 },
  Dragon:    { Dragon: 1, Steel: 0.5, Fairy: 0 },
  Dark:      { Fighting: 0.5, Psychic: 1.2, Ghost: 1.2, Dark: 0.5, Fairy: 0.5 },
  Steel:     { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 1.2, Rock: 1.2, Fairy: 1.2, Steel: 0.5 },
  Fairy:     { Fighting: 1.2, Dragon: 1, Dark: 1.2, Fire: 0.5, Poison: 0.5, Steel: 0.5 }
};

export default typeChart;
