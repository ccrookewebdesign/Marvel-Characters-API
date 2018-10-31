import { CharacterDescriptionPipe } from './character-description.pipe';

describe('CharacterDescriptionPipe', () => {
  let pipe;
  
  beforeEach(() => {
    pipe = new CharacterDescriptionPipe();
  });

  it('should display "No description available." if character description is less than 3 characters', () => {
    

    let val = pipe.transform('  ');

    expect(val).toEqual('No description available.');    
  });

  it('should trim characters and append "..." if character description is over 135 characters', () => {
    let desc = "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy experiment";
    let val = pipe.transform(desc);
    let expectedResult = "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy exp...";

    expect(val).toEqual(expectedResult);    
  })

  it('should do nothing if character description is between 3 and 135 characters', () => {
    

    let desc = "Rick Jones has been Hulk's best bud since day one.";
    let val = pipe.transform(desc);
    let expectedResult = "Rick Jones has been Hulk's best bud since day one.";

    expect(val).toEqual(expectedResult);    
  })
})