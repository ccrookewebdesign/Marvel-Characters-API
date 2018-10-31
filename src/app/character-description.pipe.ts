import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'characterDescription'})
export class CharacterDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    if(value.length < 3) {
      return 'No description available.';
    }

    if(value.length > 135) {
      return value.substring(0,135) + '...';
    } 

    return value;
  }
}