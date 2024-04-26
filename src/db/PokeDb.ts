const { v4 } = require("uuid");
import DynamoDBConnection from "./connection/DynamoDBConnection";

export const getPokemons = async () => {
  try {
    const params = {
      TableName: process.env.POKEMON_TABLE,
    };
    console.log("params", params);
    return await DynamoDBConnection.callSingleOperation("scan", params);
  } catch (error) {
    console.error("Error from data");
    throw new Error(error.message);
  }
};
export const getPokemonById = async (id: number) => {
  try {
    const params = {
      TableName: process.env.POKEMON_TABLE,
      Key: {
        id,
      },
    };
    console.log("params", params);
    return await DynamoDBConnection.callSingleOperation("get", params);
  } catch (error) {
    console.error("Error from data");
    throw new Error(error.message);
  }
};
export const setPokemonByIdDB = async (data) => {
  try {
    console.log("setPokemonByID");

    const id = v4();
    const params = {
      TableName: process.env.POKEMON_TABLE,
      Item: {
        ...data,
        imagen: `${process.env.POKEMON_IMAGE_BASE_URL}${data.id}.png`,
        idPokemon: data.id,
        createAt: new Date().toISOString(),
        id,
      },
    };
    console.log("params", params);
    return await DynamoDBConnection.callSingleOperation("put", params);
  } catch (error) {
    console.error("Error from data");
    throw new Error(error.message);
  }
};

export const findPokemonByNameDB = async (name) => {
  try {
    console.log("FindPokemon");
    const params = {
      TableName: "PokemonTableV2",
      IndexName: "name-index",
      KeyConditionExpression: "#n = :name",
      ExpressionAttributeNames: {
        "#n": "name",
      },
      ExpressionAttributeValues: {
        ":name": `${name}`,
      },
    };
    console.log("params", params);
    return await DynamoDBConnection.callSingleOperation("query", params);
  } catch (error) {
    console.error("Error from findPokemon");
    throw new Error(error.message);
  }
};
