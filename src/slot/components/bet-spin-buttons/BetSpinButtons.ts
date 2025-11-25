import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";
import { ReelSet } from "../../reels/ReelSet";
import { SlotMachine } from "../../SlotMachine";

export class BetSpinButtons extends PIXI.Container {
  private reelSet: ReelSet;
  private slotMachine: SlotMachine;
  private spinButton!: PIXI.Sprite;

  private betPlusButton!: PIXI.Graphics;
  private betMinusButton!: PIXI.Graphics;
  private betButton!: PIXI.Sprite;
  private betText!: PIXI.Text;
  private balance!: PIXI.Text;

  constructor(reelSet: ReelSet, slotMachine: SlotMachine) {
    super();
    this.scale.set(0.26);
    this.x = 693;
    this.y = 626;

    this.reelSet = reelSet;
    this.slotMachine = slotMachine;
    this.createButtons();
  }

  public spin() {
    if(this.slotMachine.balance < this.slotMachine.bet) return;
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
    const spinButtonTexture = AssetLoader.getTexture("spinbuttonenabled.png");
    this.spinButton = new PIXI.Sprite(spinButtonTexture);
    this.spinButton.scale.set(0.8);
    this.addChild(this.spinButton);
    this.spinButton.eventMode = "static";
    this.spinButton.cursor = "pointer";
    this.spinButton.x = 282;
    this.spinButton.y = 94;

    this.spinButton.on("pointerdown", this.spin, this);
    this.addChild(this.spinButton);

    const betTexture = AssetLoader.getTexture("betbuttons.png");
    this.betButton = new PIXI.Sprite(betTexture);
    this.betButton.x = 175;
    this.betButton.y = 433;
    this.addChild(this.betButton);
    this.betPlusButton = new PIXI.Graphics();
    this.betPlusButton.beginFill(0x00ff00, 0);
    this.betPlusButton.drawRect(50, 50, 200, 200);
    this.betPlusButton.endFill();
    this.betPlusButton.eventMode = "static";
    this.betPlusButton.cursor = "pointer";
    this.betPlusButton.x = 943;
    this.betPlusButton.y = 490;

    this.betPlusButton.on("pointerdown", this.increaseBet, this);
    this.addChild(this.betPlusButton);

    this.betMinusButton = new PIXI.Graphics();
    this.betMinusButton.beginFill(0x00ff00, 0);
    this.betMinusButton.drawRect(50, 50, 200, 200);
    this.betMinusButton.endFill();
    this.betMinusButton.eventMode = "static";
    this.betMinusButton.cursor = "pointer";
    this.betMinusButton.x = 151;
    this.betMinusButton.y = 492;
    this.betMinusButton.on("pointerdown", this.decreaseBet, this);

    this.addChild(this.betMinusButton);

    this.betText = new PIXI.Text("20", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    this.betText.x = 650;
    this.betText.y = 448;
    this.addChild(this.betText);

    this.balance = new PIXI.Text("1000", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    this.balance.x = 598;
    this.balance.y = 588;
    this.addChild(this.balance);
  }

  private increaseBet() {
    if (this.slotMachine.balance > this.slotMachine.bet) {
      this.slotMachine.bet += 20;
      this.betText.text = this.slotMachine.bet.toString();
    }
  }

  public updateSpinButtonTexture() {
    let texture: PIXI.Texture | undefined;

    if (this.reelSet.isSpinning || this.slotMachine.balance < this.slotMachine.bet) {
      texture = AssetLoader.getTexture("spindisabled.png");
    } else {
      texture = AssetLoader.getTexture("spinbuttonenabled.png");
    }

    if (!texture) {
      return;
    }

    this.spinButton.texture = texture; // ✅ guaranteed non-undefined
  }

  private decreaseBet() {
    if (this.slotMachine.bet > 20) {
      this.slotMachine.bet -= 20;
      this.betText.text = this.slotMachine.bet.toString();
    }
  }
}
