import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
import { InputFilterComponent } from '../../shared/input-filter/input-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NgxPaginationModule,
    InputFilterComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: { name: string; url: string }[] = [];

  page = 1;
  pageSize = 20;
  totalItems = 0;
  filterTerm: string = '';

  get filteredPokemons() {
    const term = this.filterTerm.trim().toLowerCase();
    return this.pokemons.filter((p) => p.name.toLowerCase().includes(term));
  }

  constructor(private router: Router, private pokeApiService: PokeApiService) {}

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
      },
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchPage();
  }

  onFilterChange(term: string) {
    this.filterTerm = term;
  }

  getPokemonImage(url: string): string {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  goToDetails(name: string) {
    this.router.navigate(['/pokemon', name]);
  }
}
