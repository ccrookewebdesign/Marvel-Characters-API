import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5'

import {Observable} from 'rxjs';
import { 
  catchError,
  map,
  tap,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeWhile,first 
} from 'rxjs/operators';

import { environment } from '../environments/environment';

import { MarvelResponse, Character } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private marvelCharacterUrl : string = "https://gateway.marvel.com:443/v1/public/characters";
  private publicKey : string = environment.publicKey;
  private privateKey : string = environment.privateKey;
  
  constructor(private http: HttpClient) {}

  private getHash(timeStamp : string) : string {
    let hashGenerator : Md5 = new Md5();
  
    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(this.privateKey);
    hashGenerator.appendStr(this.publicKey);
  
    let hash : string = hashGenerator.end().toString();
  
    return hash;
  }
  
  private getTimeStamp() : string {
    return new Date().valueOf().toString();
  }  

  getCharacters(limit : number = environment.pageSize, prefix : string = null, offset: number = 0) {
    let ts = this.getTimeStamp();
    let hash = this.getHash(ts);
    
    let requestUrl = `
      ${this.marvelCharacterUrl}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    if (prefix) {
      requestUrl += `&nameStartsWith=${prefix}`;
    }

    let params = {
      limit,
      offset,
      ts,
      hash,
      prefix,
      apikey: this.publicKey
    }

    return this.http.get<MarvelResponse>(requestUrl);    
  }

  /* loadCharacters(): Observable<Character[]> {
    let tempCharacters: Character[];
    let tempArray;
    let startRow = 0;
    for(let i = 0; i <= 15; i++) {
      tempArray = this.getCharacters(100, null, startRow);
      tempCharacters = [...tempCharacters, ...tempArray.data.results];
       
      startRow += 100;      
    }
    
    return tempCharacters;
  } */

}
