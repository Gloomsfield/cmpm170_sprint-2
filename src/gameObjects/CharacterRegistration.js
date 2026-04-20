import { registerCharacterName } from '@src/globals.js';

import { Baby } from './Baby.js';
import { Bear } from './enemies/Bear.js';
import { Clown } from './enemies/Clown.js';
import { Dog } from './enemies/Dog.js';
import { Doll } from './enemies/Doll.js';
import { Fish } from './enemies/Fish.js';
import { Moth } from './enemies/Moth.js';

export function registerCharacters() {
	registerCharacterName('baby', Baby);
	registerCharacterName('bear', Bear);
	registerCharacterName('clown', Clown);
	registerCharacterName('dog', Dog);
	registerCharacterName('doll', Doll);
	registerCharacterName('fish', Fish);
	registerCharacterName('moth', Moth);
}
