import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";
import { ReelSet } from "../../reels/ReelSet";
import { SlotMachine } from "../../SlotMachine";
import { gsap } from "gsap/gsap-core";

export class BetSpinButtons extends PIXI.Container {
  private reelSet: ReelSet;
  private slotMachine: SlotMachine;
  private spinButton!: PIXI.Sprite;
  private buyBonusButton!: PIXI.Sprite;
  private buyBonusText!: PIXI.Text;

  private betPlusButton!: PIXI.Graphics;
  private betMinusButton!: PIXI.Graphics;
  private betButton!: PIXI.Sprite;
  private betText!: PIXI.Text;
  private balance!: PIXI.Text;
  private winText!: PIXI.Text;

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
    gsap.globalTimeline.timeScale(5);
    if (this.slotMachine.balance < this.slotMachine.bet) return;
    if (this.reelSet.isSpinning && this.reelSet.areAllReelsSpinning()) {
      this.reelSet.abortSpin();
      return;
    }
    if (this.reelSet.isSpinning) return;
    this.reelSet.startSpinning();
    this.slotMachine.balance -= this.slotMachine.bet;
  }

  public buyBonus() {
    if (this.slotMachine.balance < this.slotMachine.bet * 6) return;
    this.reelSet.startSpinning(true);
    this.slotMachine.balance -= this.slotMachine.bet * 6;
  }

  private increaseBet() {
    if (
      this.slotMachine.balance > this.slotMachine.bet &&
      !this.reelSet.isSpinning
    ) {
      this.slotMachine.bet += 1;
      this.betText.text = this.slotMachine.bet.toString();
    }
  }

  private decreaseBet() {
    if (this.slotMachine.bet > 1 && !this.reelSet.isSpinning) {
      this.slotMachine.bet -= 1;
      this.betText.text = this.slotMachine.bet.toString();
    }
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

    const buyBonusTexture = AssetLoader.getTexture("buybonusbutton.png");
    this.buyBonusButton = new PIXI.Sprite(buyBonusTexture);
    this.buyBonusButton.scale.set(0.8);
    this.addChild(this.buyBonusButton);
    this.buyBonusButton.eventMode = "static";
    this.buyBonusButton.cursor = "pointer";
    this.buyBonusButton.x = -767;
    this.buyBonusButton.y = 250;

    this.buyBonusButton.on("pointerdown", this.buyBonus, this);
    this.addChild(this.buyBonusButton);

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
      align: "center",
    });
    this.betText.x = 650;
    this.betText.y = 448;
    this.addChild(this.betText);

    this.balance = new PIXI.Text("1000", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
      align: "center",
    });
    this.balance.x = 598;
    this.balance.y = 588;
    this.addChild(this.balance);

    this.buyBonusText = new PIXI.Text("COSTS: 1000", {
      fontFamily: "Arial",
      fontSize: 100,
      fill: 0xffffff,
      fontWeight: "bold",
      align: "center",
    });
    this.buyBonusText.x = -591;
    this.buyBonusText.y = 172;
    this.addChild(this.buyBonusText);

    this.winText = new PIXI.Text("WIN: 1000", {
      fontFamily: "Arial",
      fontSize: 180,
      fill: 0xffffff,
      fontWeight: "bold",
      align: "center",
    });
    this.winText.x = 460;
    this.winText.y = -1882;
    this.addChild(this.winText);
  }

  public update() {
    let texture: PIXI.Texture | undefined;
    this.betText.text = this.slotMachine.bet.toString();
    this.balance.text = this.slotMachine.balance.toString();
    this.buyBonusText.text = "COSTS: " + (this.slotMachine.bet * 6).toString();
    if (this.slotMachine.lastWinAmount > 0) {
      this.winText.text = "WIN: " + this.slotMachine.lastWinAmount.toString();
    } else {
      this.winText.text = "";
    }

    if (
      this.reelSet.isSpinning ||
      this.slotMachine.balance < this.slotMachine.bet
    ) {
      texture = AssetLoader.getTexture("spindisabled.png");
    } else {
      texture = AssetLoader.getTexture("spinbuttonenabled.png");
    }
    if (
      this.slotMachine.balance < this.slotMachine.bet * 6 ||
      this.reelSet.isSpinning
    ) {
      this.buyBonusButton.alpha = 0.5;
    } else {
      this.buyBonusButton.alpha = 1;
    }

    if (!texture) {
      return;
    }

    this.spinButton.texture = texture;
  }
}
