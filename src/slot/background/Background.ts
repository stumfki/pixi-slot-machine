import * as PIXI from "pixi.js";
import { AssetLoader } from "../../utils/AssetLoader";

export class Background extends PIXI.Container {
    constructor() {
        super();
        const background = AssetLoader.getTexture("BACKGROUND_FIELD.png");
        const sprite = new PIXI.Sprite(background);
        this.addChild(sprite);
    }

}