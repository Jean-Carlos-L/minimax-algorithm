
# Informe del Proyecto: Simulador de Combate Pokémon con Inteligencia Artificial

## 📌 Descripción General

Este proyecto implementa un sistema de combate por turnos entre Pokémon, donde se utiliza un algoritmo de **minimax con poda alfa-beta** para que la inteligencia artificial (IA) elija el mejor ataque posible. Está diseñado en JavaScript, siguiendo principios de programación orientada a objetos y buenas prácticas modulares.

## 🧠 Funcionalidades Clave

- Evaluación de estados de juego según la diferencia de HP.
- Clonación de jugadores y Pokémon para simulaciones sin alterar el estado original.
- Implementación del algoritmo **minimax** para simular decisiones inteligentes.
- Selección del mejor ataque con base en simulaciones profundas del estado del juego.
- Alternativamente, selección del ataque que inflige el mayor daño directo.


## ⚙️ Detalle de Componentes

### `minimax.js`

Contiene la lógica de IA con las siguientes funciones:

- **`evaluateState(player, opponent)`**  
  Devuelve la diferencia de HP entre los Pokémon activos para evaluar el estado actual del juego.

- **`clonePlayer(original)`**  
  Crea una copia profunda del jugador y su Pokémon activo para simular futuros turnos sin afectar el juego real.

- **`minimax(player, opponent, depth, alpha, beta, maximizingPlayer)`**  
  Implementación recursiva del algoritmo minimax con poda alfa-beta.

- **`chooseBestMove(player, opponent, depth)`**  
  Devuelve el ataque más prometedor evaluado mediante simulación con minimax.

- **`getStrongestAttack(attacker, defender)`**  
  Selecciona el ataque que inflige mayor daño inmediato.

### `damage.js`

Calcula el daño infligido de un ataque a un Pokémon defensor, teniendo en cuenta sus estadísticas y tipos.

### `pokemon.js`

Modelo de un Pokémon que incluye:

- Estadísticas base (`hp`, `attack`, `defense`, `spAtk`, `spDef`, `speed`)
- Lista de ataques disponibles
- Métodos para recibir daño y verificar si ha sido debilitado

## 🧪 Simulación de IA

La IA puede analizar múltiples turnos a futuro, simulando todos los ataques posibles. Usa una función de evaluación simple (diferencia de HP) para decidir qué acciones le acercan más a ganar.

Ejemplo:

```js
const bestAttack = chooseBestMove(player, opponent);
console.log(`El mejor ataque es: ${bestAttack.name}`);
```

## 🔧 Requisitos Técnicos

- Node.js (si se ejecuta fuera del navegador)
- ECMAScript Modules (import/export)
- Entorno que soporte programación orientada a objetos en JS

## ✅ Posibles Mejoras Futuras

- Añadir efectos de estado (quemaduras, parálisis, etc.)
- Implementar múltiples Pokémon por jugador
- Incorporar tipos y resistencias con bonificaciones (STAB, efectividad)
- UI gráfica para interacción visual

## 👨‍💻 Autor

Desarrollado por Juan Camilo García Saenz y Jean Carlos Lerma Rojas.
Proyecto académico de implementación del minimax.
