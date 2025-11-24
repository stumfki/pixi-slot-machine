import * as PIXI from "pixi.js";
import { Reel } from "./Reel";
import { ReelFrame } from "./ReelFrame";

export class ReelSet extends PIXI.Container {
  private numberOfReels: number;
  private symbolsPerReel: number;
  private symbolSize: number;
  private reelSpacing: number;

  private reels: Reel[];
  private reelContainer: PIXI.Container;
  private reelFrame: ReelFrame;
  constructor(
    numberOfReels: number,
    symbolsPerReel: number,
    symbolSize: number,
    reelSpacing: number
  ) {
    super();
    this.numberOfReels = numberOfReels;
    this.symbolsPerReel = symbolsPerReel;
    this.symbolSize = symbolSize;
    this.reelSpacing = reelSpacing;
    this.reelContainer = new PIXI.Container();
    this.reels = [];
    this.createReels();
    this.reelFrame = new ReelFrame();
    this.addChild(this.reelFrame);
    this.x = 600;
    this.y = 270;
    
    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyP") {
        console.log("P key pressed - spinning!");
        this.startSpinning();
      }
    });
  }

  private createReels(): void {
    for (let i = 0; i < this.numberOfReels; i++) {
      const reel = new Reel(this.symbolsPerReel, this.symbolSize);
      reel.container.x = i * (this.symbolSize + this.reelSpacing);
      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }
    this.addChild(this.reelContainer);
  }

  public update(delta: number): void {
    for (const reel of this.reels) {
      reel.update(delta);
    }
  }

  public startSpinning() {
    for (let i = 0; i < this.reels.length; i++) {
      setTimeout(() => {
        this.reels[i].startSpin();
      }, i * 200);
    }

    setTimeout(() => {
      this.stopSpin();
    }, 500 + (this.reels.length - 1) * 100);
  }

  private stopSpin(): void {
    for (let i = 0; i < this.reels.length; i++) {
      setTimeout(() => {
        this.reels[i].stopSpin();

        if (i === this.reels.length - 1) {
          setTimeout(() => {}, 500);
        }
      }, i * 400);
    }
  }
}
