# Lambda Poke API

Lambda Poke API es una API RESTful que proporciona información sobre Pokémon. Utiliza AWS Lambda, DynamoDB y API Gateway  para administrar las operaciones de backend.
![](https://samcp-aws-demo-s3.s3.us-east-2.amazonaws.com/Lambda+PokeApi.png)


## Configuración del Proyecto
1. **Environment**
   - Asegúrate de que tienes Node.js V.16 instalado en tu sistema.
   - Clona este repositorio en tu máquina local.

2. **Instalar dependencias**
>  npm install

3. **Variables de Entorno**
- Crea un archivo .env en el directorio raíz del proyecto.
- Define las siguientes variables de entorno:
```
URL_POKE_API=https://pokeapi.co/api/v2/
POKEMON_TABLE=PokemonTableV2
POKEMON_IMAGE_BASE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/
```
## Despliegue
1. **Despliegue en AWS**
- Configura tus credenciales de AWS en tu máquina local.
- Utiliza el siguiente comando para desplegar el servicio en AWS:
``` 
npm run deploy
```
## Uso
La API proporciona las siguientes endpoints:

- GET /pokemon/{pokemonId}: Obtiene información sobre un Pokémon específico por su ID o nombre.
- GET /pokemons: Obtiene información sobre todos los Pokémon almacenados en DynamoDB.
- POST /pokemon: Crea un nuevo Pokémon.
