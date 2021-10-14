import {Physics} from "./Physics";

let gEngine = {};
let mCanvas, mContext, mWidth = 800, mHeight = 450;
mCanvas = document.getElementById('canvas');
mContext = mCanvas.getContext('2d');
mCanvas.height = mHeight;
mCanvas.width = mWidth;
let  mAllObjects = [];

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
  updateUIEcho(userInputs.gObjectNum);
  draw(userInputs.gObjectNum);

  while (mLagTime >= kMPF) {
    mLagTime -= kMPF;
    gEngine.Physics.collision();
    update();
  }
}

function updateUIEcho(gObjectNum) {
  document.getElementById("uiEchoString").innerHTML =
    // ... identical to previous project
    mAllObjects[gObjectNum].mCenter.y.toPrecision(3) + "</li>"  +
    "<li>Angle: " + mAllObjects[gObjectNum].mAngle.toPrecision(3) + "</li>"  +
    "</ul> <hr>" +
    "<p><b>Control</b>: of selected object</p>" +
    "<ul style=\"margin:-10px\">" +
    "<li><b>Num</b> or <b>Up/Down Arrow</b>: SelectObject</li>" +
    "<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>" +
    "</ul> <hr>" +
    "<b>F/G</b>: Spawn [Rectangle/Circle] at selected object" +
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
