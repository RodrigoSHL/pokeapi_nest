import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interface/pokemon-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async executeSeed() {
    this.getPokemonList();
    return 'SEED EXECUTED';
  }

  async getPokemonList() {
    try {
      await this.pokemonModel.deleteMany({});
      const { data } = await this.httpService.axiosRef.get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=50',
      );
      const pokemonToInsert: { name: string; no: number }[] = [];

      data.results.forEach(async ({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];
        pokemonToInsert.push({ name, no });
      });
      await this.pokemonModel.insertMany(pokemonToInsert);
      return pokemonToInsert;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
