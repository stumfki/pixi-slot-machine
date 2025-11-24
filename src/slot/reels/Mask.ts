import * as PIXI from "pixi.js";
export class Mask {
    public reelMask = new PIXI.Graphics();
    constructor(width: number, height: number) {
    this.reelMask.beginFill(0x1099bb);
    this.reelMask.drawRect(0, 0, width, height);
    this.reelMask.endFill();

    this.reelMask.x = 0;
    this.reelMask.y = 0;
    }
}