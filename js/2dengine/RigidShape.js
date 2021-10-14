function RigidShape(center, gEngine) {
  this.mCenter = center;
  this.mAngle = 0;
  this.mBoundRadius = 0;
  this.coreMHeight = gEngine.Core.mHeight;
  gEngine.Core.mAllObjects.push(this);
}

RigidShape.prototype.update = function () {
}

RigidShape.prototype.boundTest = function (otherShape) {
  let vFrom1to2 = otherShape.mCenter.subtract(this.mCenter);
  let rSum = this.mBoundRadius + otherShape.mBoundRadius;
  let dist = vFrom1to2.length();
  return dist <= rSum;
};
export {RigidShape}
