import * as PIXI from "pixi.js";
import { Symbol } from "./symbols/Symbol";

export class Reel {
  public container: PIXI.Container;
  private symbols: Symbol[];
  private symbolCount: number;
  private symbolSize: number;

  constructor(symbolCount: number, symbolSize: number) {
    this.container = new PIXI.Container();
    this.container.name = "Reel";
    this.symbols = [];
    this.symbolSize = symbolSize;
    this.symbolCount = symbolCount;

    this.createSymbols();
  }

  private createSymbols(): void {
    for (let i = 0; i < this.symbolCount; i++) {
      const symbol = this.createRandomSymbol();
      symbol.sprite.x = i * this.symbolSize;
      symbol.sprite.y = 0;
      this.symbols.push(symbol);
      this.container.addChild(symbol.sprite);
    }
  }

  private createRandomSymbol(): Symbol {
    return new Symbol(this.symbolSize);
  }
}
