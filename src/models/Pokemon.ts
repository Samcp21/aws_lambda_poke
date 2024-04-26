interface PokemonData {
  name?: string;
  base_experience?: number;
  height?: number;
  weight?: number;
  id?: number;
}
export class Pokemon {
  id: number;
  height: number;
  weight: number;
  name: string;
  base_experience: number;
  constructor(pokemonData: PokemonData = {}) {
    const {
      name = "",
      base_experience = 0,
      height = 0,
      weight = 0,
      id = 0,
    } = pokemonData;
    this.height = height;
    this.weight = weight;
    this.name = name;
    this.id = id;
    this.base_experience = base_experience;
  }
}
