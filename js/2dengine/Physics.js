import {CollisionInfo} from "./CollisionInfo";

function Physics(gEngine){
  this.collision = function(){ _collision(gEngine)};
}

function _collision(gEngine) {
  let i, j;
  let collisionInfo = new CollisionInfo();
  for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
    for (j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
      if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
        if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
          //make sure the normal is always from object[i] to object[j]
          let normal = collisionInfo.getNormal().dot(gEngine.Core.mAllObjects[j].mCenter.subtract(gEngine.Core.mAllObjects[i].mCenter));
          if( normal < 0) {
            collisionInfo.changeDir();
          }
        }
          //draw collision info (a black line that shows normal)
          drawCollisionInfo(collisionInfo, gEngine.Core.mContext);
        }
      }
    }
  }

let drawCollisionInfo = function (collisionInfo, context) {
  context.beginPath();
  context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
  context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
  context.closePath();
  context.strokeStyle = "orange";
  context.stroke();
};

export {Physics}

