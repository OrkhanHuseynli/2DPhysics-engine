import {Vec2} from "./Vec2";


"use strict";

/* global mAllObjects, dt, gEngine */

function RigidShape(center,  mass, friction, restitution, gEngine) {

  this.mCenter = center;
  this.mInertia = 0;
  if (mass !== undefined) {
    this.mInvMass = mass;
  } else {
    this.mInvMass = 1;
  }

  if (friction !== undefined) {
    this.mFriction = friction;
  } else {
    this.mFriction = 0.8;
  }

  if (restitution !== undefined) {
    this.mRestitution = restitution;
  } else {
    this.mRestitution = 0.2;
  }

  this.mVelocity = new Vec2(0, 0);

  if (this.mInvMass !== 0) {
    this.mInvMass = 1 / this.mInvMass;
    this.mAcceleration = gEngine.Core.mGravity;
  } else {
    this.mAcceleration = new Vec2(0, 0);
  }

  //angle
  this.mAngle = 0;

  //negetive-- clockwise
  //positive-- counterclockwise
  this.mAngularVelocity = 0;

  this.mAngularAcceleration = 0;

  this.mBoundRadius = 0;

  gEngine.Core.mAllObjects.push(this);

  this.gEngine = gEngine;

}

RigidShape.prototype.updateMass = function (delta) {
  let mass;
  if (this.mInvMass !== 0) {
    mass = 1 / this.mInvMass;
  } else {
    mass = 0;
  }

  mass += delta;
  if (mass <= 0) {
    this.mInvMass = 0;
    this.mVelocity = new Vec2(0, 0);
    this.mAcceleration = new Vec2(0, 0);
    this.mAngularVelocity = 0;
    this.mAngularAcceleration = 0;
  } else {
    this.mInvMass = 1 / mass;
    this.mAcceleration = this.gEngine.Core.mGravity;
  }
  this.updateInertia();
};


RigidShape.prototype.updateInertia = function () {
  // subclass must define this.
  // must work with inverted this.mInvMass
};

RigidShape.prototype.update = function () {
  if (this.gEngine.Core.mMovement) {
    let dt = this.gEngine.Core.mUpdateIntervalInSeconds;
    //v += a*t
    this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));
    //s += v*t
    this.move(this.mVelocity.scale(dt));

    this.mAngularVelocity += this.mAngularAcceleration * dt;
    this.rotate(this.mAngularVelocity * dt);
  }

  let width = this.gEngine.Core.mWidth;
  let height = this.gEngine.Core.mHeight;
  if (this.mCenter.x < 0 || this.mCenter.x > width || this.mCenter.y < 0 || this.mCenter.y > height) {
    let index = this.gEngine.Core.mAllObjects.indexOf(this);
    if (index > -1)
      this.gEngine.Core.mAllObjects.splice(index, 1);
  }

};

RigidShape.prototype.boundTest = function (otherShape) {
  let vFrom1to2 = otherShape.mCenter.subtract(this.mCenter);
  let rSum = this.mBoundRadius + otherShape.mBoundRadius;
  let dist = vFrom1to2.length();
  //is  overlapping?
  return dist <= rSum;
};

export {RigidShape}
