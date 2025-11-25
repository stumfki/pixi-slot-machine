import * as PIXI from "pixi.js";
import { AssetLoader } from "../../utils/AssetLoader";

export class ReelBackground extends PIXI.Container {
    constructor() {
        super();
        const background = AssetLoader.getTexture("reelbackground.png");
        const sprite = new PIXI.Sprite(background);
        this.x = -55;
        this.y = -80;
        this.scale.set(0.7);
        this.sortableChildren = true;
        this.zIndex = -1;
        this.addChild(sprite);
    }

}