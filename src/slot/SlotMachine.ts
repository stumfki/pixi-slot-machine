import * as PIXI from "pixi.js";
import { Background } from "./components/background/Background";
import { Character } from "./components/character/Character";
import { ReelSet } from "./reels/ReelSet";
import { BetSpinButtons } from "./components/bet-spin-buttons/BetSpinButtons";
import { Sound } from "../utils/Sound";

export class SlotMachine {
  public container: PIXI.Container;
  private app: PIXI.Application;
  private background: Background;
  private character: Character;
  private reelSet: ReelSet;
  private betSpinButtons: BetSpinButtons;

  public balance: number = 100;
  public bet: number = 1;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.name = "Slot machine";

    this.background = new Background();
    this.container.addChild(this.background);

    this.character = new Character(this.app);
    this.container.addChild(this.character);

    
    this.reelSet = new ReelSet(this, this.character, 5, 3, 150, 0);
    this.container.addChild(this.reelSet);

    this.betSpinButtons = new BetSpinButtons(this.reelSet, this);
    this.container.addChild(this.betSpinButtons);
    Sound.loop("music");
  }

  public update(delta: number): void {
    this.reelSet.update(delta);
    this.betSpinButtons.update();
  }
}
