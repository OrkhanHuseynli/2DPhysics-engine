import { gEngine } from './2dengine/Core.js'

import {InitUserControl} from "./2dengine/UserControl";
import {Rectangle} from "./2dengine/Rectangle";
import {Vec2} from "./2dengine/Vec2";
import {Circle} from "./2dengine/Circle";

let userInputs = {
  gObjectNum : 0
}
InitUserControl(userInputs,gEngine);

function MyGame() {
  let width = gEngine.Core.mWidth;
  let height = gEngine.Core.mHeight;

  let r1 = new Rectangle(new Vec2(500, 200), 400, 20, 0, 0.3, 0, gEngine);
  r1.rotate(2.8);
  let r2 = new Rectangle(new Vec2(200, 400), 400, 20,  0, 1, 0.5, gEngine);
  let r3 = new Rectangle(new Vec2(100, 200), 200, 20,  0, 0, 0,  gEngine);
  let r4 = new Rectangle(new Vec2(10, 360),  20,  100, 0, 0, 1, gEngine);

  for (let i = 0; i < 10; i++) {
    let r1 = new Rectangle(new Vec2(Math.random() * gEngine.Core.mWidth, Math.random() * gEngine.Core.mHeight / 2), Math.random() * 50 + 10, Math.random() * 50 + 10, Math.random() * 30, Math.random(), Math.random(), gEngine);
    r1.mVelocity = new Vec2(Math.random() * 60 - 30, Math.random() * 60 - 30);
    let c1 = new Circle(new Vec2(Math.random() * gEngine.Core.mWidth, Math.random() * gEngine.Core.mHeight / 2), Math.random() * 20 + 10, Math.random() * 30, Math.random(), Math.random(), gEngine);
    r1.mVelocity = new Vec2(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }
}

let mgame = new MyGame();
gEngine.Core.initializeEngineCore(userInputs)
