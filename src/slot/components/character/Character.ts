import * as PIXI from "pixi.js";
import { AssetLoader } from "../../../utils/AssetLoader";
import { Sound } from "../../../utils/Sound";
import { gsap } from "gsap";
import { Reel } from "../../reels/Reel";
import { sleep } from "../../../utils/Utils";

export class Character extends PIXI.Container {
  private animatedSprite: PIXI.AnimatedSprite;
  private animations: Record<string, PIXI.Texture[]> = {};

  constructor(app: PIXI.Application) {
    super();
    this.sortableChildren = true;
    this.zIndex = 5;
    const idleTexture = AssetLoader.getTexture("character/idle.png");
    const attackingTexture = AssetLoader.getTexture("character/attacking.png");

    if (!idleTexture || !attackingTexture) {
      console.error("Character textures not loaded!");
      this.animatedSprite = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
      return;
    }

    this.setupAnimations(idleTexture, attackingTexture);

    const idleFrames = this.animations["idle"] ||
      this.animations["idle1.1"] || [idleTexture];
    this.animatedSprite = new PIXI.AnimatedSprite(idleFrames);
    this.animatedSprite.anchor.set(0.5);
    this.animatedSprite.scale.set(2);
    this.animatedSprite.animationSpeed = 0.1;
    this.animatedSprite.loop = true;

    app.ticker.add(() => {
      if (
        this.animatedSprite.currentFrame >=
        this.animatedSprite.textures.length - 1
      ) {
        this.playAnimation("idle");
        this.animatedSprite.gotoAndPlay(0);
      }
    });

    this.animatedSprite.play();
    this.addChild(this.animatedSprite);
    this.position.set(520, 160);
  }

  private setupAnimations(
    idleTexture: PIXI.Texture,
    attackingTexture: PIXI.Texture
  ): void {
    this.parseSpriteSheet(idleTexture, "idle");
    this.parseSpriteSheet(attackingTexture, "attacking");
  }

  private parseSpriteSheet(texture: PIXI.Texture, name: string): void {
    const frameWidth = 100;
    const framesInTexture = Math.floor(texture.width / frameWidth);

    if (framesInTexture > 1) {
      const frames: PIXI.Texture[] = [];
      for (let i = 0; i < framesInTexture; i++) {
        const x = i * frameWidth;
        if (x + frameWidth <= texture.width) {
          frames.push(
            new PIXI.Texture({
              source: texture.source,
              frame: new PIXI.Rectangle(x, 0, frameWidth, 100),
            })
          );
        }
      }
      if (frames.length > 0) {
        this.animations[name] = frames;
        if (name === "idle") this.animations["idle1.1"] = frames;
        if (name === "attacking") this.animations["attack"] = frames;
      }
    }
  }

  public async moveToReel0() {
    await gsap.to(this.position, {
      x: 367,
      y: 285,
      duration: 2,
      ease: "power1.inOut",
    });
  }
  public async moveToReel1() {
    await gsap.to(this.position, {
      x: 367,
      y: 485,
      duration: 2,
      ease: "power1.inOut",
    });
  }
  public async moveToReel2() {
    await gsap.to(this.position, {
      x: 367,
      y: 641,
      duration: 2,
      ease: "power1.inOut",
    });
  }

  public async resetPoitionAndScale() {
    await gsap.to(this.position, {
      x: 520,
      y: 160,
      duration: 2,
      ease: "power1.inOut",
    });
    await gsap.to(this.animatedSprite.scale, {
      x: 2,
      y: 2,
      duration: 1,
      ease: "power1.inOut",
    });
  }
  public async playFeature(reels: Reel[], symbolId: number = 3) {
    Sound.play("bonusactivate");
    await gsap.to(this.animatedSprite.scale, {
      x: 5,
      y: 5,
      duration: 1,
      ease: "power1.inOut",
    });

    for (let reel of reels) {
      for (let i = 0; i < reel.symbols.length; i++) {
        const globalPos = reel.symbols[i].sprite.getGlobalPosition();
        Sound.play("ghostmove");
        await gsap.to(this.position, {
          x: globalPos.x,
          y: globalPos.y,
          duration: 1,
          ease: "power1.inOut",
        });

        await sleep(300);
        if (Math.random() < 1 / 3) {
          this.playWin();
          reel.symbols[i].createSpecificSymbol(symbolId);
        } else {
        }
      }
    }
    Sound.play("ghostmove");
    this.resetPoitionAndScale();
  }

  public playAnimation(animationName: string, loop: boolean = true): void {
    let animKey = animationName;
    if (!this.animations[animKey]) {
      if (animationName === "idle") animKey = "idle1.1";
      if (animationName === "win") animKey = "attack";
    }

    const frames = this.animations[animKey];

    this.animatedSprite.textures = frames;
    this.animatedSprite.loop = loop;

    this.animatedSprite.play();
  }

  public async playWin() {
    Sound.play("slash", 1.5);
    await this.playAnimation("win", false);
  }
}
