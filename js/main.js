import { gEngine } from './2dengine/Core.js'

import {InitUserControl} from "./2dengine/UserControl";
import {Rectangle} from "./2dengine/Rectangle";
import {Vec2} from "./2dengine/Vec2";

let userInputs = {
  gObjectNum : 0
}
InitUserControl(userInputs,gEngine);

function MyGame() {
  let width = gEngine.Core.mWidth;
  let height = gEngine.Core.mHeight;
  let r1 = new Rectangle(new Vec2(width / 2, height / 2), 3, 3, 0, gEngine);

  let up = new Rectangle(new Vec2(width / 2, 0), width, 3, 0, gEngine);
  let down = new Rectangle(new Vec2(width / 2, height), width, 3, 0, gEngine);
  let left = new Rectangle(new Vec2(0, height / 2), 3, height, 0, gEngine);
  let right = new Rectangle(new Vec2(width, height / 2), 3, height, 0, gEngine);
}

let mgame = new MyGame();
gEngine.Core.initializeEngineCore(userInputs)
