import { Howl } from "howler";

const sounds: Record<string, Howl> = {};

export const Sound = {
  add: (alias: string, url: string): void => {
    try {
      sounds[alias] = new Howl({
        src: [url],
        volume: 0.8,
        preload: true,
      });
      console.log(`Sound added: ${alias} from ${url}`);
    } catch (error) {
      console.error(`Error adding sound ${alias}:`, error);
    }
  },
  play: (alias: string, volume : number = 0.8): void => {
      if (sounds[alias]) {
        sounds[alias].volume(volume)
        sounds[alias].play();
      } 
  },
  stop: (alias: string): void => {
      if (sounds[alias]) {
        sounds[alias].stop();
      } 
  },
  loop: (alias: string): void => {
      if (sounds[alias]) {
        sounds[alias].stop();
        sounds[alias].loop(true);
        sounds[alias].volume(0.2);
        sounds[alias].play();
      }
  },
};
