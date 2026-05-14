API REST - Jugadores del Real Madrid

Para este trabajo final he elegido hacer una API sobre el Real Madrid, sobre sus jugadores y los goles que meten por partido. Es un tema que controlo y se me ha hecho más fácil inventarme los datos.

Express es una librería de Node que me facilita la creación de nuestra API.

¿Como funciona?

Tengo dos recursos principales:
- Jugadores: el recurso principal, con datos de cada jugador del Madrid (nombre, posicion, dorsal, nacionalidad, edad, valor de mercado, goles en la temporada y si esta activo o no).
- Goles: el recurso secundario, cada gol está vinculado a un jugador mediante su `jugador_id`.

Cómo arrancar el proyecto:
npm install express
node index.js

El servidor arranca en `http://localhost:3000` y te muestra un mensaje de confirmación.




ENDPOINTS:




GET /jugadores
Devuelve todos los jugadores. Puedes filtrarlos con query params:
- `?posicion=Delantero` — filtra por posición
- `?nacionalidad=Brasileña` — filtra por nacionalidad
- `?activo=true` — solo jugadores activos
- `?edad_min=20&edad_max=30` — rango de edad
- `?valor_min=50&valor_max=200` — rango de valor de mercado (en millones)
- `?goles_min=10` — jugadores con al menos X goles
- `?ordenar=goles_temporada&orden=desc` — ordenar por campo
Un Ejemplo es: `GET /jugadores?posicion=Delantero&goles_min=10&ordenar=goles_temporada&orden=desc`



GET /jugadores/:id
Devuelve un jugador por su ID.
Un Ejemplo es: `GET /jugadores/7` -> devuelve a Vinicius Junior



GET /jugadores/buscar/nombre?nombre=...
Busca un jugador por nombre.
Ejemplo: `GET /jugadores/buscar/nombre?nombre=Modric`



POST /jugadores
Crea un jugador nuevo. Campos obligatorios: nombre, posicion, dorsal, nacionalidad, edad, valor_mercado.
Ejemplo de body:
{
  "nombre": "Kylian Mbappe",
  "posicion": "Delantero",
  "dorsal": 9,
  "nacionalidad": "Francesa",
  "edad": 25,
  "valor_mercado": 180,
  "goles_temporada": 20,
  "activo": true
}



PUT /jugadores/:id
Modifica los datos de un jugador. Solo hace falta enviar los campos que quieres cambiar.
Ejemplo: `PUT /jugadores/7` con body `{ "goles_temporada": 30 }`



DELETE /jugadores/:id
Elimina un jugador por su ID.
Ejemplo: `DELETE /jugadores/6`



GOLES
GET /goles
Devuelve todos los goles. Puedes filtrar por rival con `?rival=Barcelona`.



GET /goles/jugador/:jugador_id
Devuelve todos los goles de un jugador concreto.
Ejemplo: `GET /goles/jugador/7` → todos los goles de Vinicius



POST /goles
Registra un gol nuevo. Campos obligatorios: jugador_id, rival, fecha, minuto, tipo_gol.

Ejemplo de body:
{
  "jugador_id": 5,
  "rival": "Paris Saint-Germain",
  "fecha": "2025-03-05",
  "minuto": 77,
  "tipo_gol": "Cabezazo"
}



DELETE /goles/:id
Elimina un gol por su ID.
Ejemplo: `DELETE /goles/3`



FILTROS
GET /jugadores/filtros/buscar
Permite filtrar jugadores combinando varios query params a la vez.
Ejemplo: `GET /jugadores/filtros/buscar?posicion=Delantero&activo=true&ordenar=valor_mercado&orden=desc`



ESTADISTICAS
GET /estadisticas/jugadores?campo=...
Calcula la media, el máximo y el mínimo de un campo numérico. Campos válidos: `valor_mercado`, `goles_temporada`, `edad`.
Ejemplo: `GET /estadisticas/jugadores?campo=valor_mercado`



GET /estadisticas/top?campo=...&n=...&orden=...
Devuelve los N jugadores más altos o bajos según un campo numérico.
Ejemplo: `GET /estadisticas/top?campo=goles_temporada&n=3&orden=desc`



GET /estadisticas/totales
Devuelve el total de jugadores y goles registrados.



GET /estadisticas/por-posicion
Agrupa y cuenta los jugadores según su posición.



CODIGOS HTTP QUE USO
Código | Cuándo lo uso 

200    | Todo ha ido bien 
201    | Se ha creado un recurso nuevo 
400    | Faltan datos o están mal 
404    | No se ha encontrado lo que se busca 
500    | Error inesperado del servidor 