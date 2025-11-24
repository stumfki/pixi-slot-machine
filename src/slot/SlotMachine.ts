import * as PIXI from "pixi.js";
import { Background } from "./components/background/Background";
import { Character } from "./components/character/Character";
import { ReelSet } from "./reels/ReelSet";


export class SlotMachine {
  public container: PIXI.Container;
  private app: PIXI.Application;
  private background: Background;
  private character: Character;
  private reelSet: ReelSet


  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.name = "Slot machine";

    this.background = new Background();
    this.container.addChild(this.background);

    this.character = new Character(this.app);
    this.container.addChild(this.character);

    this.reelSet = new ReelSet(3,5,150,0);
    this.container.addChild(this.reelSet);

  }




}
