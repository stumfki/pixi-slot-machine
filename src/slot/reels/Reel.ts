import * as PIXI from "pixi.js";
import { Symbol } from "./symbols/Symbol";
import { gsap } from "gsap";

const SPIN_SPEED = 50;
const SLOWDOWN_RATE = 0.95;
const SNAP_SPEED_THRESHOLD = 30;

export class Reel {
  public container: PIXI.Container;
  private symbols: Symbol[];
  private symbolCount: number;
  private symbolSize: number;

  private speed: number = 0;
  private isSpinning: boolean = false;

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
      symbol.sprite.y = i * this.symbolSize;
      symbol.sprite.x = 0;
      this.symbols.push(symbol);
      this.container.addChild(symbol.sprite);
    }
  }

  private createRandomSymbol(): Symbol {
    return new Symbol(this.symbolSize);
  }

  public update(delta: number): void {
    if (!this.isSpinning && this.speed === 0) return;
    for (const symbol of this.symbols) {
      symbol.sprite.y += this.speed;

      //Check if symbol is off the reel
      if (symbol.sprite.y > 300) {
        //Push the symbol to the end of the reel
        symbol.sprite.y -= this.symbolCount * this.symbolSize;
      }
    }


    if (!this.isSpinning && this.speed > 0) {
      this.speed *= SLOWDOWN_RATE;

      // Snap if speed is below threshold
      if (this.speed < SNAP_SPEED_THRESHOLD) {
        this.snapToGrid();
        this.speed = 0;
      }
    }
  }

  private snapToGrid(): void {
    console.log("snap");
    const sorted = [...this.symbols].sort((a, b) => a.sprite.y - b.sprite.y);

    sorted.forEach((symbol, i) => {
      const yto = i * this.symbolSize;
      gsap.to(symbol.sprite, { y: yto, duration: 0.3 });
    });
  }

  public startSpin(): void {
    this.isSpinning = true;
    this.speed = SPIN_SPEED;
  }

  public stopSpin(): void {
    this.isSpinning = false;
  }
}
