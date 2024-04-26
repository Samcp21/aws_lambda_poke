const Joi = require('joi');

export class PokemonValidator {
  static validate(pokemon) {
    const schema = Joi.object({
      name: Joi.string().required(),
      id: Joi.number().required(),
      base_experience: Joi.number().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
    });

    return schema.validate(pokemon);
  }
}
