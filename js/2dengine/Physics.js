import {CollisionInfo} from "./CollisionInfo";
import {Vec2} from "./Vec2";

let mPositionalCorrectionFlag = true;
let mRelaxationCount = 15;                  // number of relaxation iteration
let mPosCorrectionRate = 0.8;               // percentage of separation to project objects


function Physics(gEngine){
  this.collision = function(){ _collision(gEngine)};
  this.mPositionalCorrectionFlag = mPositionalCorrectionFlag;
}

function positionalCorrection (s1, s2, collisionInfo) {
  let s1InvMass = s1.mInvMass;
  let s2InvMass = s2.mInvMass;

  let num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * mPosCorrectionRate;
  let correctionAmount = collisionInfo.getNormal().scale(num);

  s1.move(correctionAmount.scale(-s1InvMass));
  s2.move(correctionAmount.scale(s2InvMass));
}

function resolveCollision(s1, s2, collisionInfo, gEngine) {

  if ((s1.mInvMass === 0) && (s2.mInvMass === 0)) {
    return;
  }

  //  correct positions
  if (gEngine.Physics.mPositionalCorrectionFlag) {
    positionalCorrection(s1, s2, collisionInfo);
  }

  let n = collisionInfo.getNormal();

  //the direction of collisionInfo is always from s1 to s2
  //but the Mass is inversed, so start scale with s2 and end scale with s1
  let start = collisionInfo.mStart.scale(s2.mInvMass / (s1.mInvMass + s2.mInvMass));
  let end = collisionInfo.mEnd.scale(s1.mInvMass / (s1.mInvMass + s2.mInvMass));
  let p = start.add(end);
  //r is vector from center of object to collision point
  let r1 = p.subtract(s1.mCenter);
  let r2 = p.subtract(s2.mCenter);

  //newV = V + mAngularVelocity cross R
  let v1 = s1.mVelocity.add(new Vec2(-1 * s1.mAngularVelocity * r1.y, s1.mAngularVelocity * r1.x));
  let v2 = s2.mVelocity.add(new Vec2(-1 * s2.mAngularVelocity * r2.y, s2.mAngularVelocity * r2.x));
  let relativeVelocity = v2.subtract(v1);

  // Relative velocity in normal direction
  let rVelocityInNormal = relativeVelocity.dot(n);

  //if objects moving apart ignore
  if (rVelocityInNormal > 0) {
    return;
  }

  // compute and apply response impulses for each object
  let newRestituion = Math.min(s1.mRestitution, s2.mRestitution);
  let newFriction = Math.min(s1.mFriction, s2.mFriction);

  //R cross N
  let R1crossN = r1.cross(n);
  let R2crossN = r2.cross(n);

  // Calc impulse scalar
  // the formula of jN can be found in http://www.myphysicslab.com/collision.html
  let jN = -(1 + newRestituion) * rVelocityInNormal;
  jN = jN / (s1.mInvMass + s2.mInvMass +
    R1crossN * R1crossN * s1.mInertia +
    R2crossN * R2crossN * s2.mInertia);

  //impulse is in direction of normal ( from s1 to s2)
  let impulse = n.scale(jN);
  // impulse = F dt = m * ?v
  // ?v = impulse / m
  s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
  s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));

  s1.mAngularVelocity -= R1crossN * jN * s1.mInertia;
  s2.mAngularVelocity += R2crossN * jN * s2.mInertia;

  let tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));

  //relativeVelocity.dot(tangent) should less than 0
  tangent = tangent.normalize().scale(-1);

  let R1crossT = r1.cross(tangent);
  let R2crossT = r2.cross(tangent);

  let jT = -(1 + newRestituion) * relativeVelocity.dot(tangent) * newFriction;
  jT = jT / (s1.mInvMass + s2.mInvMass + R1crossT * R1crossT * s1.mInertia + R2crossT * R2crossT * s2.mInertia);

  //friction should less than force in normal direction
  if (jT > jN) {
    jT = jN;
  }

  //impulse is from s1 to s2 (in opposite direction of velocity)
  impulse = tangent.scale(jT);

  s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
  s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));
  s1.mAngularVelocity -= R1crossT * jT * s1.mInertia;
  s2.mAngularVelocity += R2crossT * jT * s2.mInertia;
}


function _collision(gEngine) {
  let i, j, k;
  let collisionInfo = new CollisionInfo();
  for (k = 0; k < mRelaxationCount; k++) {
    for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
      for (j = i + 1; j < gEngine.Core.mAllObjects.length; j++) {
        if (gEngine.Core.mAllObjects[i].boundTest(gEngine.Core.mAllObjects[j])) {
          if (gEngine.Core.mAllObjects[i].collisionTest(gEngine.Core.mAllObjects[j], collisionInfo)) {
            //make sure the normal is always from object[i] to object[j]
            if (collisionInfo.getNormal().dot(gEngine.Core.mAllObjects[j].mCenter.subtract(gEngine.Core.mAllObjects[i].mCenter)) < 0) {
              collisionInfo.changeDir();
            }

            //draw collision info (a black line that shows normal)
            //drawCollisionInfo(collisionInfo, gEngine.Core.mContext);

            resolveCollision(gEngine.Core.mAllObjects[i], gEngine.Core.mAllObjects[j], collisionInfo, gEngine);
          }
        }
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

