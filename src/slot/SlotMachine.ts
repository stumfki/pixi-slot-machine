import * as PIXI from "pixi.js";
import { Background } from "./background/Background";


export class SlotMachine {
  public container: PIXI.Container;
  private app: PIXI.Application;
  private background: Background;


  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.name = "Slot machine";
    this.background = new Background();
    this.container.addChild(this.background);

  }




}
