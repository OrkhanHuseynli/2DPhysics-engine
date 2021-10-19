import {Rectangle} from "./Rectangle";
import {Circle} from "./Circle";
import {Vec2} from "./Vec2";
import {gEngine} from "./Core";

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


    //

    if (keycode === "i") { //73
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mVelocity.y -= 1;
    }
    if (keycode === "k") { //75
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mVelocity.y += 1;
    }
    if (keycode === "j") { //j 74
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mVelocity.x -= 1;
    }
    if (keycode === "l") { //l
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mVelocity.x += 1;
    }
    if (keycode === "u") { //85
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mAngularVelocity -= 0.1;
    }
    if (keycode === "o") { //O
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mAngularVelocity += 0.1;
    }
    if (keycode === "z") { //Z
      gEngine.Core.mAllObjects[userInputs.gObjectNum].updateMass(-1);
    }
    if (keycode === "x") { //X
      gEngine.Core.mAllObjects[userInputs.gObjectNum].updateMass(1);
    }
    if (keycode === "c") { //C
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mFriction -= 0.01;
    }
    if (keycode === "v") { //V
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mFriction += 0.01;
    }
    if (keycode === "b") { //B
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mRestitution -= 0.01;
    }
    if (keycode === "n") { //N
      gEngine.Core.mAllObjects[userInputs.gObjectNum].mRestitution += 0.01;
    }
    if (keycode === ",") { //,
      gEngine.Core.mMovement = !gEngine.Core.mMovement;
    }


    if (keycode === "f") {    // f
      let r1 = new Rectangle(new Vec2(gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.x, gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.y),
        Math.random() * 30 + 10, Math.random() * 30 + 10, 1,1,1, gEngine);
    }
    if (keycode === "g") { //g
      let c1 = new Circle(new Vec2(gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.x, gEngine.Core.mAllObjects[userInputs.gObjectNum].mCenter.y),
        Math.random() * 10 + 20, 1,1, 1, gEngine);
    }

    // Toggle gravity with the H key
    if (keycode === "h") {
      //H
      let i;
      for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
        if (gEngine.Core.mAllObjects[i].mInvMass !== 0) {
          gEngine.Core.mAllObjects[i].mVelocity = new Vec2(Math.random() * 20 - 10, Math.random() * 20 - 10);
        }
      }
    }

    // reset scene
    if (keycode === "r") { //R
      gEngine.Core.mAllObjects.splice(5, gEngine.Core.mAllObjects.length);
      userInputs.gObjectNum = 0;
    }
  })
}

export {InitUserControl}
