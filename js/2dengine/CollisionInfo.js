const {Vec2} = require("./Vec2");

function CollisionInfo() {
  this.mDepth = 0;
  this.mNormal = new Vec2(0, 0);
  this.mStart = new Vec2(0, 0);
  this.mEnd = new Vec2(0, 0);
}

/**
 * Set the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} d how much penetration
 * @returns {void}
 */
CollisionInfo.prototype.setDepth = function (d) {  this.mDepth = d; };

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {Number} how much penetration
 */
CollisionInfo.prototype.getDepth = function () {   return this.mDepth; };

/**
 * Set the normal of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Vec2} s vector upon which collision interpenetrates
 * @returns {void}
 */
CollisionInfo.prototype.setNormal = function (s) {   this.mNormal = s; };

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {Vec2} vector upon which collision interpenetrates
 */
CollisionInfo.prototype.getNormal = function () {   return this.mNormal; };


/**
 * Set the all value of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} d the depth of the CollisionInfo
 * @param {Vec2} n the normal of the CollisionInfo
 * @param {Vec2} s the startpoint of the CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.setInfo = function (d, n, s) {
  this.mDepth = d;
  this.mNormal = n;
  this.mStart = s;
  this.mEnd = s.add(n.scale(d));
};


/**
 * change the direction of normal
 * @memberOf CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.changeDir = function () {
  this.mNormal = this.mNormal.scale(-1);
  let n = this.mStart;
  this.mStart = this.mEnd;
  this.mEnd = n;
}

export {CollisionInfo}
