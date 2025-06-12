# Informe del Proyecto: Pokeminmax!

## Descripción General
**Pokeminmax!** es una simulación de combate estratégico entre dos entrenadores Pokémon, donde uno es controlado por el jugador humano y el otro por una inteligencia artificial (IA). Esta IA utiliza el algoritmo **Minimax con poda alfa-beta**, como se vio en clase, para seleccionar sus movimientos de forma óptima. Todo el desarrollo se centró en la lógica de combate y decisión, siguiendo estrictamente los lineamientos planteados por el docente.

---

## Estructura de Datos

### Clase `Pokemon`
Ubicada en el módulo `models/pokemon.js`, esta clase representa un Pokémon con:
- Nombre
- Tipos (tipo1 y tipo2)
- Estadísticas base (hp, attack, defense, spAtk, spDef, speed)
- Lista de ataques disponibles
- Puntos de salud actuales (currentHP)

### Clase `trainer`
Ubicada en `models/trainer.js`. Cada trainer tiene:
- Nombre
- Lista de Pokémon
- Métodos para obtener el Pokémon activo, verificar si aún tiene Pokémon disponibles, etc.

---

## Simulación de Combate

Implementada en `engine.js`, contiene las funciones principales para gestionar el flujo del combate:

- `battleTurn`: ejecuta un turno de batalla entre un atacante y un defensor, aplicando daño y penalizaciones si se repite el mismo ataque.
- `userVsCpuTurn`: gestiona un turno de combate donde el jugador humano elige un ataque y la IA responde.
- `cpuVsCpuBattle`: permite simular una batalla entre dos IAs para pruebas y demostraciones.

---

## Cálculo de Daño

El archivo `battle/damage.js` contiene la lógica para calcular el daño considerando:
- Ataque y defensa del Pokémon
- Tipo del ataque y efectividad basada en una tabla de tipos simplificada (primera generación)
- Mismo tipo del atacante (STAB)

La efectividad se calcula usando `utils/typechart.js`, donde se define un objeto `typeChart` con las interacciones entre tipos. Ejemplos:
- Supereficaz: multiplicador > 1 (ej. x1.2)
- No muy eficaz: multiplicador < 1 (ej. x0.5)
- Inmune: multiplicador = 0

---

## Fuente de Datos de Pokémon

La carpeta `data` contiene el archivo `pokedex.js`, donde se encuentra toda la información de los Pokémon usados en el combate:
- Estadísticas base
- Tipos
- Lista de movimientos disponibles

Esta fuente de datos es esencial para instanciar correctamente los objetos `Pokemon` en el modelo.

---

## Inteligencia Artificial: Minimax con poda alfa-beta

Ubicada en `battle/minimax.js`, la IA toma decisiones estratégicas mediante:

### `minimax`
- Algoritmo con poda alfa-beta
- Profundidad configurable (por defecto 2)
- Alterna entre el jugador maximizador (IA) y el minimizador (jugador humano)

### `evaluateState`
- Evalúa un estado del combate en base a:
  - PS actuales de los Pokémon activos
  - Número de Pokémon restantes
  - Tipos y efectividad de los ataques
  - No se considera cambio de Pokémon (según restricción del proyecto)

### `chooseBestMove`
- Itera sobre todos los ataques disponibles
- Simula los posibles estados futuros y elige el ataque que maximice la puntuación

### `getStrongestAttack`
- Se usa para penalizar a la IA si siempre usa el mismo ataque más fuerte

---

## Restricciones y Consideraciones

- Solo se consideran ataques que hacen daño directo
- No hay estados alterados ni cambios de estadísticas
- Todos los ataques aciertan
- No se permite cambiar de Pokémon durante el combate
- Se limita a la primera generación

---

## Ejecución

El proyecto puede ejecutarse directamente desde un entorno de desarrollo Node.js. Para lanzar la simulación de batalla entre jugador humano e IA, se corre el archivo principal ubicado en `main.js`.

Se puede ejecutar el proyecto con el comando npm run dev

## Pruebas

Durante el desarrollo se llevaron a cabo múltiples pruebas manuales y automatizadas para verificar:

- El correcto cálculo del daño (ataques con ventaja/desventaja de tipo).
- La respuesta coherente de la IA en distintas situaciones del combate.
- La penalización efectiva al uso repetido de ataques por parte de la IA.
- La finalización del combate cuando un entrenador se queda sin Pokémon.

Además, se usaron combates entre dos IAs para observar el equilibrio del sistema, así como pruebas controladas con Pokémon específicos para asegurar que las decisiones tomadas por la IA se alinearan con la lógica del algoritmo Minimax.

---

## Conclusión

El backend del proyecto **Pokeminmax!** cumple con todos los requisitos exigidos por el docente:
- Simulación de combate Pokémon simplificada pero funcional
- Uso del algoritmo Minimax con poda alfa-beta
- Implementación modular, organizada y clara
- Evaluación heurística razonable según la situación de los Pokémon

Este desarrollo sienta las bases para extenderse con interfaz gráfica o mejorar la IA con nuevas funcionalidades en el futuro.


## 👨‍💻 Autor

Desarrollado por Juan Camilo García Saenz y Jean Carlos Lerma Rojas.
Proyecto académico de implementación del minimax.
