import { AssetLoader } from "../../../utils/AssetLoader";
import { SYMBOL_TEXTURES } from "./SymbolTextures";
import * as PIXI from "pixi.js";

export class Symbol {
  public sprite: PIXI.Sprite;
    constructor(symbolSize: number){
    const randomIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
    const randomTexture = SYMBOL_TEXTURES[randomIndex];
    const texture = AssetLoader.getTexture(randomTexture);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = symbolSize;
    this.sprite.height = symbolSize;
    this.sprite.anchor.set(0.5);
    }
}