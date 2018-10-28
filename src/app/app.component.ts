import { Component } from '@angular/core';

import { environment } from '../environments/environment';

import { MarvelService } from './marvel.service';
import { Character} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  thisYear = new Date().getFullYear();
  alphabetArray: string[] = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  characters: Character[] = [];
  totalCharacters: number = 0;
  limit: number = environment.pageSize;
  offset: number = 0;
  prefix: string = '';
  
  minusOffset(offset: number) {
    if(this.offset > 0) {
      this.offset -= offset;
      this.refreshCharacters(this.prefix, this.offset);
    }
  }

  plusOffset(offset: number) {
    if(this.offset <= this.totalCharacters && this.totalCharacters > this.limit) {
      this.offset += offset;
      this.refreshCharacters(this.prefix, this.offset);
    }    
  }

  constructor(private marvel: MarvelService) {}

  ngOnInit() {
    this.refreshCharacters();
  }

  refreshCharacters(prefix = null, offset = 0) {
    this.marvel.getCharacters(this.limit, prefix, offset).subscribe(data => {
      console.log('data', data);
      this.characters = data.data.results;
      this.totalCharacters = data.data.total;
    });
  }

  /* getCharacter(characterId: number) {
    this.marvel.getCharacter(characterId).subscribe(data => {
      console.log('data', data);
      this.characters = data.data.results;
    });
  } */
  
  goToCharacter(url) {
    window.location.href = url;
  }

}
