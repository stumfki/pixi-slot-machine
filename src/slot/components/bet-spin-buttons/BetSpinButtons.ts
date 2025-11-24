import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";

export class BetSpinButtons extends PIXI.Container {
    constructor() {
        super();
        const background = AssetLoader.getTexture("buttons.jpg");
        const sprite = new PIXI.Sprite(background);
        const overlay = new PIXI.Graphics();

        this.addChild(sprite);
    }

}