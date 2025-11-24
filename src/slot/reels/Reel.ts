import * as PIXI from "pixi.js";
import { SlotSymbol } from "./symbols/Symbol";
import { gsap } from "gsap";

const SPIN_SPEED = 50;
const SLOWDOWN_RATE = 0.95;
const SNAP_SPEED_THRESHOLD = 30;

export class Reel {
  public container: PIXI.Container;
  public symbols: SlotSymbol[];
  private symbolCount: number;
  private symbolSize: number;

  private speed: number = 0;
  public isSpinning: boolean = false;

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
      this.container.addChild(symbol.sprite);
      this.symbols.push(symbol);
    }
  }

  private createRandomSymbol(): SlotSymbol {
    return new SlotSymbol(this.symbolSize);
  }

  public update(delta: number): void {
    if (!this.isSpinning && this.speed === 0) return;
    for (let symbol of this.symbols) {
      symbol.sprite.y += this.speed;

      //Check if symbol is off the reel
      if (symbol.sprite.y > 400) {
        //Push the symbol to the end of the reel and create a new random symbol
        symbol.createRandomSymbol();
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

  public snapToGrid(): void {
    console.log("snap");
    this.symbols.sort((a, b) => a.sprite.y - b.sprite.y);

    this.symbols.forEach((symbol, i) => {
      const yPos = i * this.symbolSize;
      gsap.to(symbol.sprite, { y: yPos, duration: 0.3 });
    });
  }

  //Hard snap for faststop
  public hardSnapToGrid(): void {
    this.symbols.sort((a, b) => a.sprite.y - b.sprite.y);

    this.symbols.forEach((symbol, i) => {
      symbol.sprite.y = i * this.symbolSize;
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
