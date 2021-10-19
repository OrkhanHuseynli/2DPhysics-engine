import {Physics} from "./Physics";
import {Vec2} from "./Vec2";

let gEngine = {};
let mCanvas, mContext, mWidth = 800, mHeight = 450;
mCanvas = document.getElementById('canvas');
mContext = mCanvas.getContext('2d');
mCanvas.height = mHeight;
mCanvas.width = mWidth;
let  mAllObjects = [];
let mGravity = new Vec2(0, 10);
let mMovement = false;
// engine loop params
let mCurrentTime, mElapsedTime, mPreviousTime = Date.now(), mLagTime = 0;
let kFPS = 60;          // Frames per second
let kFrameTime = 1 / kFPS;
let mUpdateIntervalInSeconds = kFrameTime;
let kMPF = 1000 * kFrameTime; // Milliseconds per frame.
let selectedObjectNum  =  0;

gEngine.Core = {
      initializeEngineCore: initializeEngineCore,
      mAllObjects: mAllObjects,
    mWidth: mWidth,
    mHeight: mHeight,
    mContext: mContext,
    mGravity: mGravity,
    mUpdateIntervalInSeconds: mUpdateIntervalInSeconds,
    mMovement: mMovement
  };

gEngine.Physics = new Physics(gEngine);

function initializeEngineCore(userInputs) {
    runGameLoop(userInputs);
}

function runGameLoop(userInputs){
  requestAnimationFrame(function () {
    runGameLoop(userInputs);
  });
  //compute how much time has elapsed since the last RunLoop
  mCurrentTime = Date.now();
  mElapsedTime = mCurrentTime - mPreviousTime;
  mPreviousTime = mCurrentTime;
  mLagTime += mElapsedTime;
  //Update the game the appropriate number of times.
  //Update only every Milliseconds per frame.
  //If lag larger then update frames, update until caught up.
  updateUIEcho(userInputs.gObjectNum, gEngine.Core.mAllObjects);
  draw(userInputs.gObjectNum);

  while (mLagTime >= kMPF) {
    mLagTime -= kMPF;
    gEngine.Physics.collision();
    update();
  }
}

function updateUIEcho(gObjectNum, mAllObjects) {
  document.getElementById("uiEchoString").innerHTML =
    "<p><b>Selected Object:</b>:</p>" +
    "<ul style=\"margin:-10px\">" +
    "<li>Id: " + gObjectNum + "</li>" +
    "<li>Center: " + mAllObjects[gObjectNum].mCenter.x.toPrecision(3) + "," + mAllObjects[gObjectNum].mCenter.y.toPrecision(3) + "</li>" +
    "<li>Angle: " + mAllObjects[gObjectNum].mAngle.toPrecision(3) + "</li>" +
    "<li>Velocity: " + mAllObjects[gObjectNum].mVelocity.x.toPrecision(3) + "," + mAllObjects[gObjectNum].mVelocity.y.toPrecision(3) + "</li>" +
    "<li>AngluarVelocity: " + mAllObjects[gObjectNum].mAngularVelocity.toPrecision(3) + "</li>" +
    "<li>Mass: " + 1 / mAllObjects[gObjectNum].mInvMass.toPrecision(3) + "</li>" +
    "<li>Friction: " + mAllObjects[gObjectNum].mFriction.toPrecision(3) + "</li>" +
    "<li>Restitution: " + mAllObjects[gObjectNum].mRestitution.toPrecision(3) + "</li>" +
    "<li>Positional Correction: " + gEngine.Physics.mPositionalCorrectionFlag + "</li>" +
    "<li>Movement: " + gEngine.Core.mMovement + "</li>" +
    "</ul> <hr>" +
    "<p><b>Control</b>: of selected object</p>" +
    "<ul style=\"margin:-10px\">" +
    "<li><b>Num</b> or <b>Up/Down Arrow</b>: Select Object</li>" +
    "<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>" +
    "<li><b>IJKL</b> + <b>UO</b>: Velocities [Linear + Angular]</li>" +
    "<li><b>Z/X</b>: Mass [Decrease/Increase]</li>" +
    "<li><b>C/V</b>: Frictrion [Decrease/Increase]</li>" +
    "<li><b>B/N</b>: Restitution [Decrease/Increase]</li>" +
    "<li><b>M</b>: Positional Correction [On/Off]</li>" +
    "<li><b>,</b>: Movement [On/Off]</li>" +
    "</ul> <hr>" +
    "<b>F/G</b>: Spawn [Rectangle/Circle] at selected object" +
    "<p><b>H</b>: Excite all objects</p>" +
    "<p><b>R</b>: Reset System</p>" +
    "<hr>";
}

function update() {
  let i;
  for (i = 0; i < mAllObjects.length; i++) {
    mAllObjects[i].update(mContext);
  }
}

let draw = function (gObjectNum) {
  mContext.clearRect(0, 0, mWidth, mHeight);
  let i;
  for (i = 0; i < mAllObjects.length; i++) {
    mContext.strokeStyle = 'blue';
    if (i === gObjectNum)
      mContext.strokeStyle = 'red';
    mAllObjects[i].draw(mContext);
  }
};

export {gEngine};
