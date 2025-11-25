import { AssetLoader } from "../../../utils/AssetLoader";
import { SYMBOL_TEXTURES } from "./SymbolTextures";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
export class SlotSymbol {
  public symbolId: number;
  public sprite: PIXI.Sprite;
  constructor(symbolSize: number) {
    const randomIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
    this.symbolId = randomIndex;

    const randomTexture = SYMBOL_TEXTURES[randomIndex];
    const texture = AssetLoader.getTexture(randomTexture);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = symbolSize;
    this.sprite.height = symbolSize;
    this.sprite.anchor.set(0.5);
  }

  public playWin() {
    gsap.to(this.sprite.scale, {
      x: 1.2,
      y: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power1.inOut",
    });
  }

  public createSpecificSymbol(symbolId: number) {
    this.symbolId = symbolId;

    const newTexture = AssetLoader.getTexture(SYMBOL_TEXTURES[symbolId]);
    if (!newTexture)
      throw new Error(`Texture not found: ${SYMBOL_TEXTURES[symbolId]}`);
    this.sprite.texture = newTexture;
  }

  public createRandomSymbol() {
    const newIndex = Math.floor(Math.random() * SYMBOL_TEXTURES.length);
    this.symbolId = newIndex;

    const newTexture = AssetLoader.getTexture(SYMBOL_TEXTURES[newIndex]);
    if (!newTexture)
      throw new Error(`Texture not found: ${SYMBOL_TEXTURES[newIndex]}`);
    this.sprite.texture = newTexture;
  }
}
