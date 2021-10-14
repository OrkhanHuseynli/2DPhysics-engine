import {Rectangle} from "./Rectangle";
import {Circle} from "./Circle";
import {Vec2} from "./Vec2";

function UserControl(gEngine){
  this.width = gEngine.Core.mWidth;
  this.height = gEngine.Core.mHeight;
  this.context = gEngine.Core.mContext;

  this.printHeight = function (){
    console.log("height = " + this.height)
  }
}

function InitUserControl(userInputs, gEngine){
  let userControl = new UserControl(gEngine);
  let width = userControl.width, height = userControl.height;
  window.addEventListener("keydown", keyCodeEvent=>{
    let keycode=keyCodeEvent.key
    if(keycode==="p"){
      userControl.printHeight();
    }


    if (keycode === "f") {    // f
      let r1 = new Rectangle(new Vec2(gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.x, gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.y),
        Math.random() * 30 + 10, Math.random() * 30 + 10, 0, gEngine);
    }
    if (keycode === "g") { //g
      let r1 = new Circle(new Vec2(gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.x, gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.y),
        Math.random() * 10 + 20, 0, gEngine);
    }

    // if (keycode >= 48 && keycode <= 57) {  //number
    //   if (keycode - 48 < gEngine.Core.mAllObjects.length)
    //     gObjectNum = keycode - 48;
    // }
    if (keycode === "ArrowUp") {   //up arrow
      if (userInputs.gObjectNum > 0)
        userInputs.gObjectNum--;
    }
    if (keycode === "ArrowDown") {   // down arrow
      if (userInputs.gObjectNum < gEngine.Core.mAllObjects.length-1)
        userInputs.gObjectNum++;
    }


    // move with WASD keys
    if (keycode === "w") { //W
      gEngine.Core.mAllObjects[userInputs.gObjectNum].move(new Vec2(0, -10));
    }
    if (keycode === "s") { // S
      gEngine.Core.mAllObjects[userInputs.gObjectNum].move(new Vec2(0, +10));
    }
    if (keycode === "a") { //A
      gEngine.Core.mAllObjects[userInputs.gObjectNum].move(new Vec2(-10, 0));
    }
    if (keycode === "d") { //D
      gEngine.Core.mAllObjects[userInputs.gObjectNum].move(new Vec2(10, 0));
    }

// Rotate with QE keys
    if (keycode === "q") { //81
      gEngine.Core.mAllObjects[userInputs.gObjectNum].rotate(-0.1);
    }
    if (keycode === "e") { //69
      gEngine.Core.mAllObjects[userInputs.gObjectNum].rotate(0.1);
    }

// Toggle gravity with the H key
    if (keycode === "h") { //H
      if(gEngine.Core.mAllObjects[userInputs.gObjectNum].mFix === 0)
        gEngine.Core.mAllObjects[userInputs.gObjectNum].mFix = 1;
      else gEngine.Core.mAllObjects[userInputs.gObjectNum].mFix = 0;
    }

    // reset scene
    if (keycode === "r") { //R
      gEngine.Core.mAllObjects.splice(5, gEngine.Core.mAllObjects.length);
      userInputs.gObjectNum = 0;
    }
  })
}

export {InitUserControl}
