import * as PIXI from "pixi.js";
import { Sound } from "./Sound";

const IMAGES_PATH = "/assets/images/";
const JSON_PATH = "/assets/json/";
const SOUNDS_PATH = 'assets/sounds/';
const IMAGES = [
  "reel.png",
  "buttons.png",
  "background.jpg",
  "character/idle.png",
  "character/idle2.png",
  "character/attacking.png",
  "symbols/0.png",
  "symbols/1.png",
  "symbols/2.png",
  "symbols/3.png",
  "symbols/4.png",
  "symbols/5.png",
  "symbols/6.png",
  "symbols/7.png",
  "symbols/8.png",
  "symbols/9.png",
];

const SOUNDS = [
    'music.wav',
    'spin.wav',
    'win.wav'
];

const textureCache: Record<string, PIXI.Texture> = {};
const jsonCache: Record<string, any> = {};

export class AssetLoader {
  public async loadAssets(): Promise<void> {
    try {
      const urls = IMAGES.map(img => IMAGES_PATH + img);
      const jsonUrl = JSON_PATH + "mainCharacter.json";

      const [textures, jsonResponse] = await Promise.all([
        PIXI.Assets.load(urls),
        fetch(jsonUrl)
      ]);

      IMAGES.forEach((img, index) => {
        textureCache[img] = textures[urls[index]] as PIXI.Texture;
      });

      const jsonData = await jsonResponse.json();
      jsonCache["mainCharacter.json"] = jsonData;
      await this.loadSounds();

    } catch (error) {
      console.error("Error loading assets:", error);
      throw error;
    }
  }

  public static getTexture(name: string): PIXI.Texture | undefined {
    return textureCache[name];
  }

  public static getJson(name: string): any {
    return jsonCache[name];
  }

  public static isLoaded(): boolean {
    return IMAGES.every(img => textureCache[img] !== undefined);
  }

      private async loadSounds(): Promise<void> {
        try {
            SOUNDS.forEach(soundFile => {
                Sound.add(soundFile.split('.')[0], SOUNDS_PATH + soundFile);
            });
        } catch (error) {
            console.error('Error loading sounds:', error);
            throw error;
        }
    }
}
