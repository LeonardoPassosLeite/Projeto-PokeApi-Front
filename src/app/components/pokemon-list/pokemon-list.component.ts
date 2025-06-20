import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokeApiService } from 'src/shared/services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, IonicModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: { name: string; url: string }[] = [];

  page = 1;
  pageSize = 20;
  totalItems = 0;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.fetchPage();
  }

  fetchPage(): void {
    this.pokeApiService.getPokemons(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.pokemons = data.results;
        this.totalItems = data.count;
      },
      error: (err) => {
        console.error('Erro ao buscar pokémons:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchPage();
  }

  getPokemonImage(url: string): string {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
