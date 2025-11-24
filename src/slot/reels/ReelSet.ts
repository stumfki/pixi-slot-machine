import * as PIXI from "pixi.js";
import { Reel } from "./Reel";
import { ReelFrame } from "./ReelFrame";
import { Mask } from "./Mask";
import { SlotSymbol } from "./symbols/Symbol";

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
    const mask = new Mask(this.reelContainer.width, this.reelContainer.height);
    mask.reelMask.x = -70;
    mask.reelMask.y = -82;
    this.reelContainer.addChild(mask.reelMask);
    this.reelContainer.mask = mask.reelMask;
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
          setTimeout(() => {
                 this.checkWin(this.reels);
          }, 500);
        }
      }, i * 400);
    }
  }

private checkWin(reels: Reel[]) {
    // Build rows
    const rows: SlotSymbol[][] = [[], [], []];
    for (let reel of reels) {
                console.log(reel.symbols)
        for (let r = 0; r < 3; r++) {
            rows[r].push(reel.symbols[r]);
        }
    }
    console.log("ROWS", rows)
    const payouts: number[] = [];

    for (const row of rows) {
        const firstSymbol = row[0];
        let matchCount = 1;

        for (let i = 1; i < row.length; i++) {
            if (row[i].symbolId === firstSymbol.symbolId) {
                matchCount++;
            } else {
                break;
            }
        }

        // payout only if 3 or more matches
        let multiplier = 0;
        if (matchCount === 3) multiplier = 5;
        else if (matchCount === 4) multiplier = 10;
        else if (matchCount === 5) multiplier = 100;

        payouts.push(multiplier);

        // win animation on winning symbols
        if (multiplier > 0) {
            for (let i = 0; i < matchCount; i++) {
                row[i].playWin();
            }
        }
    }
}
}
