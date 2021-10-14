import {RigidShape} from "./RigidShape";
import {Vec2} from "./Vec2";

let Circle = function (center, radius, fix, gEngine) {
  RigidShape.call(this, center, gEngine);
  this.mType = "Circle";
  this.mRadius = radius;
  this.mBoundRadius = radius;
  // The start point of line in circle
  this.mStartpoint = new Vec2(center.x, center.y - radius);
};


let prototype = Object.create(RigidShape.prototype);
prototype.constructor = Circle;
Circle.prototype = prototype;

Circle.prototype.move = function (s) {
  this.mStartpoint = this.mStartpoint.add(s);
  this.mCenter = this.mCenter.add(s);
  return this;
};

Circle.prototype.rotate = function (angle) {
  this.mAngle += angle;
  this.mStartpoint = this.mStartpoint.rotate(this.mCenter, angle);
  return this;
};

Circle.prototype.draw = function (context) {
  context.beginPath();
  //draw a circle
  context.arc(this.mCenter.x, this.mCenter.y, this.mRadius, 0, Math.PI *  2, true);
  //draw a line from start point toward center
  context.moveTo(this.mStartpoint.x, this.mStartpoint.y);
  context.lineTo(this.mCenter.x, this.mCenter.y);
  context.closePath();
  context.stroke();
};

Circle.prototype.collisionTest = function (otherShape, collisionInfo) {
  let status = false;
  if (otherShape.mType === "Circle") {
    status = this.collidedCircCirc(this, otherShape, collisionInfo);
    if (status){
      console.log("circles collide")
    }
  } else {
    status = otherShape.collidedRectCirc(this, collisionInfo);
    if (status){
      console.log("rect circ collide")
    }
  }
  return status;
};

Circle.prototype.collidedCircCirc = function (c1, c2, collisionInfo) {
  let vFrom1to2 = c2.mCenter.subtract(c1.mCenter);
  let rSum = c1.mRadius + c2.mRadius;
  let dist = vFrom1to2.length();
  if (dist > Math.sqrt(rSum * rSum)) {
    return false; //not overlapping
  }
  if (dist !== 0) {
    // overlapping bu not same position
    let normalFrom2to1 = vFrom1to2.scale(-1).normalize();
    let radiusC2 = normalFrom2to1.scale(c2.mRadius);
    collisionInfo.setInfo(rSum - dist, vFrom1to2.normalize(), c2.mCenter.add(radiusC2));
  } else {
    //same position
    if (c1.mRadius > c2.mRadius) {
      collisionInfo.setInfo(rSum, new Vec2(0, -1), c1.mCenter.add(new Vec2(0, c1.mRadius)));
    } else {
      collisionInfo.setInfo(rSum, new Vec2(0, -1), c2.mCenter.add(new Vec2(0, c2.mRadius)));
    }
  }
  return true;
};

export {Circle}
