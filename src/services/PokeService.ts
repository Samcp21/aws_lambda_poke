import { Pokemon } from "../models/Pokemon";
const poke_api = require("../api/index");
const PokeDB = require("../db/PokeDb");
export const getPokemons = async () => {
  try {
    const { Items } = await PokeDB.getPokemons();
    console.log("from service Get", Items);

    if (Items.length > 0) {
      return {
        statusCode: 200,
        body: Items,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getPokemonById = async (id) => {
  try {
    // Buscar pokemon por id o por nombre en la DB
    console.log("getpokemon", id);
    const { Items } = await PokeDB.getPokemonById(id);
    console.log("ItemsV1", Items);
    if (!Items) {
      const { Items } = await PokeDB.findPokemonByNameDB(id);
      console.log("ItemsV2", Items);
      if (Items.length != 0) {
        return {
          statusCode: 200,
          body: Items,
        };
      }
    }
    const { data, status } = await poke_api.GET_API_POKE(id);
    console.log("from service v2", status, data);
    if (status === true) {
      const { name, base_experience, height, weight, id } = data;
      const dataPokemon = {
        id,
        name,
        base_experience,
        height,
        weight,
      };
      const classPokemon = new Pokemon(dataPokemon);
      console.log("classPokemon", classPokemon);
      await PokeDB.setPokemonByIdDB(classPokemon);
      return {
        body: JSON.stringify(classPokemon),
      };
    } else {
      // 404
      throw new Error("No se ha encontrado un pokemon en su busqueda");
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const setPokemon = async (body) => {
  try {
    console.log("From service", body);
    //Buscar si el pokemon existe en la BD
    const { Items } = await PokeDB.findPokemonByNameDB(body.name.toLowerCase());
    console.log("Items", Items);
    if (Items.length === 0) {
      console.log("else Set Pokemon");
      return await PokeDB.setPokemonByIdDB(body);
    }
    return Items;
  } catch (error) {
    throw new Error(error);
  }
};

export const findPokemon = async (body) => {
  try {
    console.log("findPokemon", body);
    return await PokeDB.findPokemonDB(body);
  } catch (error) {
    throw new Error(error);
  }
};
