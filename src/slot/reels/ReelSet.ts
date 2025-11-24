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
  }

  private createReels(): void {
    for (let i = 0; i < this.numberOfReels; i++) {
      const reel = new Reel(this.symbolsPerReel, this.symbolSize);
      reel.container.y =
        i * (this.symbolSize + this.reelSpacing);
      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }
    this.addChild(this.reelContainer);
  }
}
