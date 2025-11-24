import * as PIXI from "pixi.js";
import { AssetLoader } from "../../utils/AssetLoader";
export class ReelFrame extends PIXI.Container {
    constructor() {
        super();
        const frame = AssetLoader.getTexture("reel.png");
        const sprite = new PIXI.Sprite(frame);
        this.scale.set(0.55);
        this.x = -116.5;
        this.y = -133.5;
        this.addChild(sprite);
    }

}