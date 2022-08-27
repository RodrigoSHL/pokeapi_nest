import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { PokemonResponse } from './interface/pokemon-response.interface';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}
  async executeSeed() {
    return this.getPokemonList();
  }

  async getPokemonList() {
    try {
      const { data } = await this.httpService.axiosRef.get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=10',
      );

      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];
        console.log({ name, no });
      });
      return data.results;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
