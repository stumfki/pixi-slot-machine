import * as PIXI from "pixi.js";
//We need this so PIXI.js debbuger works
declare global {
  var __PIXI_APP__: PIXI.Application;
}

export class Game {
  private app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application({
      width: 1280,
      height: 800,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // Enable PixiJS debugger in browsers
    globalThis.__PIXI_APP__ = this.app;

    const gameContainer = document.getElementById("game-container");
    if (gameContainer) {
      gameContainer.appendChild(this.app.view as HTMLCanvasElement);
    }

    this.resize = this.resize.bind(this);

    window.addEventListener("resize", this.resize);

    this.resize();
  }

  public async init(): Promise<void> {
    try {
      console.log("Game initialized successfully");
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }

  private resize(): void {
    if (!this.app || !this.app.renderer) return;
  }
}
