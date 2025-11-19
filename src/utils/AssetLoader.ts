import * as PIXI from "pixi.js";

const IMAGES_PATH = "/assets/images/";
const IMAGES = ["BACKGROUND_FIELD.png"];

const textureCache: Record<string, PIXI.Texture> = {};

export class AssetLoader {
  public async loadAssets(): Promise<void> {
    try {
      const urls = IMAGES.map(img => IMAGES_PATH + img);

      const textures = await PIXI.Assets.load(urls);

      IMAGES.forEach((img, index) => {
        textureCache[img] = textures[urls[index]] as PIXI.Texture;
      });

    } catch (error) {
      console.error("Error loading assets:", error);
      throw error;
    }
  }

  public static getTexture(name: string): PIXI.Texture | undefined {
    return textureCache[name];
  }

  public static isLoaded(): boolean {
    return IMAGES.every(img => textureCache[img] !== undefined);
  }
}
