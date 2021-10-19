import {RigidShape} from "./RigidShape";
import {Vec2} from "./Vec2";

let Circle = function (center, radius, mass, friction, restitution, gEngine) {
  RigidShape.call(this, center, mass, friction, restitution, gEngine);
  this.mType = "Circle";
  this.mRadius = radius;
  this.mBoundRadius = radius;
  //The start point of line in circle
  this.mStartpoint = new Vec2(center.x, center.y - radius);
  this.updateInertia();
};


let prototype = Object.create(RigidShape.prototype);
prototype.constructor = Circle;
Circle.prototype = prototype;

Circle.prototype.move = function (s) {
  this.mStartpoint = this.mStartpoint.add(s);
  this.mCenter = this.mCenter.add(s);
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

//rotate angle in counterclockwise
Circle.prototype.rotate = function (angle) {
  this.mAngle += angle;
  this.mStartpoint = this.mStartpoint.rotate(this.mCenter, angle);
  return this;
};

Circle.prototype.updateInertia = function() {
  if (this.mInvMass === 0) {
    this.mInertia = 0;
  } else {
    // this.mInvMass is inverted!!
    // Inertia=mass * radius^2
    // 12 is a constant value that can be changed
    this.mInertia = (1 / this.mInvMass) * (this.mRadius * this.mRadius) / 12;
  }
};


// COLLISION


Circle.prototype.collisionTest = function (otherShape, collisionInfo) {
  let status = false;
  if (otherShape.mType === "Circle") {
    status = this.collidedCircCirc(this, otherShape, collisionInfo);
  } else {
    status = otherShape.collidedRectCirc(this, collisionInfo);
  }
  return status;
};

Circle.prototype.collidedCircCirc = function (c1, c2, collisionInfo) {
  let vFrom1to2 = c2.mCenter.subtract(c1.mCenter);
  let rSum = c1.mRadius + c2.mRadius;
  let dist = vFrom1to2.length();
  if (dist > Math.sqrt(rSum * rSum)) {
    //not overlapping
    return false;
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
