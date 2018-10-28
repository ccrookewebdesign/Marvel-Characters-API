import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5'

import { environment } from '../environments/environment';

import { MarvelResponse } from './interfaces';

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

  /* getCharacter(characterId: number) {
    let timeStamp = this.getTimeStamp();
    let hash = this.getHash(timeStamp);
    console.log('characterId', characterId);
    let requestUrl = `
    ${this.marvelCharacterUrl}/${characterId}?ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    console.log('requestUrl', requestUrl);    
    
    return this.http.get(requestUrl);    
  } */

}
