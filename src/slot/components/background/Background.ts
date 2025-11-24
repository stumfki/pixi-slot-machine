import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";

export class Background extends PIXI.Container {
    constructor() {
        super();
        const background = AssetLoader.getTexture("background.jpg");
        const sprite = new PIXI.Sprite(background);
        const overlay = new PIXI.Graphics();
        overlay.beginFill(0x000000, 0.7);
        overlay.drawRect(0, 0, sprite.width, sprite.height);
        overlay.endFill();

        this.addChild(sprite);
        this.addChild(overlay);
    }

}