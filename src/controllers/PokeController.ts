import { APIGatewayProxyHandler } from "aws-lambda";
import {
  MSG_ERROR_11001,
  MSG_ERROR_11002,
  MSG_ERROR_11004,
} from "../constants/ErrorConstants";
const PokeService = require("../services/PokeService");
import { PokemonValidator } from "../validators/AppSchemaValidator";

// export const getPokesCtrl: APIGatewayProxyHandler = async () => {
//   try {
//     const result = await PokeService.getPokemons();
//     if (!result) {
//       throw new Error("No result available for the requested Pokemon");
//     }
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: true,
//         message: MSG_ERROR_11002,
//         data: result,
//       }),
//     };
//   } catch (error) {
//     console.error("Error fetching Pokemon data:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Internal Server Error" }),
//     };
//   }
// };
export const getPokeCtrl: APIGatewayProxyHandler = async (event) => {
  console.log("event", event);
  if (!event.pathParameters) {
    //Obtener todos los pokemones
    const result = await PokeService.getPokemons();
    if (!result) {
      throw new Error("No result available for the requested Pokemon");
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        message: MSG_ERROR_11002,
        data: result,
      }),
    };
  }
  const { pokemonId } = event.pathParameters;
  console.log("pokemonId", pokemonId);
  try {
    if (!pokemonId) {
      return {
        statusCode: 404,
        body: "Not Found",
      };
    } else {
      const result = await PokeService.getPokemonById(pokemonId);
      console.log("result", result);

      if (!result) {
        throw new Error("No result available for the requested Pokemon");
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: true,
          message: MSG_ERROR_11002,
          data: result,
        }),
      };
    }
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
export const postPokeCtrl: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: "El cuerpo del evento está ausente",
        }),
      };
    }
    // Validate input
    const data = JSON.parse(event.body);
    const { error, value } = PokemonValidator.validate(data);
    console.log("validator", error, value);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: MSG_ERROR_11001,
        }),
      };
    }

    const result = await PokeService.setPokemon(data);
    console.log("HELLO WORLD", result);

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: true,
        message: MSG_ERROR_11002,
        data,
      }),
    };
  } catch (error) {
    console.error("HELLO ERROR", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: MSG_ERROR_11004,
      }),
    };
  }
};
