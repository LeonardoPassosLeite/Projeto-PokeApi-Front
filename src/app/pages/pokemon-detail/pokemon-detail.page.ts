import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PokemonDetailsComponent } from 'src/app/components/features/pokemon-details/pokemon-details.component';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    PokemonDetailsComponent,
  ],
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;  
  loading = true;  

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokeApiService.getPokemonDetails(name).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar Pokémon:', err);
        this.loading = false;
      },
    });
  }
}
