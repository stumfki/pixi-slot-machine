import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";
import { ReelSet } from "../../reels/ReelSet";
import { SlotMachine } from "../../SlotMachine";

export class BetSpinButtons extends PIXI.Container {
  private reelSet: ReelSet;
  private slotMachine: SlotMachine;
  private spinButton!: PIXI.Graphics;
  private betPlusButton!: PIXI.Graphics;
  private betMinusButton!: PIXI.Graphics;
  private betText!: PIXI.Text;
  private balance!: PIXI.Text;

  constructor(reelSet: ReelSet, slotMachine: SlotMachine) {
    super();
    const background = AssetLoader.getTexture("buttons.png");
    const sprite = new PIXI.Sprite(background);
    const overlay = new PIXI.Graphics();
    this.scale.set(0.26);
    this.x = 693;
    this.y = 626;

    this.addChild(sprite);

    this.reelSet = reelSet;
    this.slotMachine = slotMachine;
    this.createButtons();
  }

  public spin() {
    if (this.reelSet.isSpinning && this.reelSet.areAllReelsSpinning()) {
      this.reelSet.abortSpin();
      return;
    }
    if (this.reelSet.isSpinning) return;
    this.reelSet.startSpinning();
    this.slotMachine.balance -= this.slotMachine.bet;
    this.balance.text = this.slotMachine.balance.toString();
  }

  public updateBalanceText() {
    this.balance.text = this.slotMachine.balance.toString();
  }

  private createButtons(): void {
    // Create spin button
    this.spinButton = new PIXI.Graphics();
    this.spinButton.beginFill(0x00ff00, 0.5);
    this.spinButton.drawRect(50, 50, 900, 400);
    this.spinButton.endFill();
    this.spinButton.eventMode = "static";
    this.spinButton.cursor = "pointer";
    this.spinButton.x = 257;
    this.spinButton.y = 92;

    this.spinButton.on("pointerdown", this.spin, this);
    this.addChild(this.spinButton);

    this.betPlusButton = new PIXI.Graphics();
    this.betPlusButton.beginFill(0x00ff00, 0);
    this.betPlusButton.drawRect(50, 50, 200, 200);
    this.betPlusButton.endFill();
    this.betPlusButton.eventMode = "static";
    this.betPlusButton.cursor = "pointer";
    this.betPlusButton.x = 1014;
    this.betPlusButton.y = 652;

    this.betPlusButton.on("pointerdown", this.increaseBet, this);
    this.addChild(this.betPlusButton);

    this.betMinusButton = new PIXI.Graphics();
    this.betMinusButton.beginFill(0x00ff00, 0);
    this.betMinusButton.drawRect(50, 50, 200, 200);
    this.betMinusButton.endFill();
    this.betMinusButton.eventMode = "static";
    this.betMinusButton.cursor = "pointer";
    this.betMinusButton.x = 222;
    this.betMinusButton.y = 652;
    this.betMinusButton.on("pointerdown", this.decreaseBet, this);

    this.addChild(this.betMinusButton);

    this.betText = new PIXI.Text("20", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    this.betText.x = 714;
    this.betText.y = 605;
    this.addChild(this.betText);

    this.balance = new PIXI.Text("1000", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    this.balance.x = 657;
    this.balance.y = 745;
    this.addChild(this.balance);
  }

  private increaseBet() {
    if (this.slotMachine.balance > this.slotMachine.bet) {
      this.slotMachine.bet += 20;
      this.betText.text = this.slotMachine.bet.toString();
    }
  }

  private decreaseBet() {
    if (this.slotMachine.bet > 20) {
      this.slotMachine.bet -= 20;
      this.betText.text = this.slotMachine.bet.toString();
    }
  }
}
