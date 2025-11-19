import * as PIXI from "pixi.js";
import { AssetLoader } from "./utils/AssetLoader";
import { SlotMachine } from "./slot/SlotMachine";
//We need this so PIXI.js debbuger works
declare global {
  var __PIXI_APP__: PIXI.Application;
}

export class Game {
  private app: PIXI.Application;
  private slotMachine!: SlotMachine;
  private assetLoader: AssetLoader;

  constructor() {
    this.app = new PIXI.Application();
    this.assetLoader = new AssetLoader();
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
    this.init = this.init.bind(this);
  }

  public async init(): Promise<void> {
    try {
      globalThis.__PIXI_APP__ = this.app;

      await this.app.init({
        width: 1980,
        height: 1080,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      const gameContainer = document.getElementById("game-container");
      if (gameContainer) {
        gameContainer.appendChild(this.app.canvas);
      }
      await this.assetLoader.loadAssets();
      this.slotMachine = new SlotMachine(this.app);
      this.app.stage.addChild(this.slotMachine.container);
      this.resize();

    } catch (error) {
      console.error("Error:", error);
    }
  }

  private resize(): void {
    if (!this.app || !this.app.renderer) return;

  }
}
