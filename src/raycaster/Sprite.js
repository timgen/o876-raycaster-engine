/**
 * A Sprite is an object that is visible inside the Raycaster Environment
 */

import TileAnimation from './TileAnimation';

class Sprite {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.h = 0;

        this._visible = true;
        this._scale = 1;

        this._tileWidth = 0;
        this._tileHeight = 0;

        this._animations = [];
        this._animation = null;
        this._tileset = null;

        this._children = []; // these sprites will be rendered above the current sprite

        this._flags = 0;
    }

    get flags() {
        return this._flags;
    }

    set flags(v) {
        this._flags = v;
    }

    addFlag(v) {
        this._flags |= v;
    }

    removeFlag(v) {
        this._flags = this._flags & ~v;
    }

    hasFlag(v) {
        return (this._flags & v) !== 0
    }

    get animation() {
        return this._animation;
    }

    set animation(value) {
        this._animation = value;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
    }

    get scale() {
        return this._scale;
    }

    set scale(value) {
        this._scale = value;
    }

    buildAnimation(start, count, delay, loop) {
        const a = new TileAnimation();
        a.base = start;
        a.count = count;
        a.duration = delay;
        a.loop = loop;
        this._animations.push(a);
        if (this._animation === null) {
            this._animation = a;
        }
    }

    /**
     * Adds a new animations into the sprite's animation collection
     * @param a {TileAnimation}
     */
    addAnimation(a) {
        this._animations.push(a);
    }

    /**
     * Defines the current animation
     * @param iAnim {number} index of the new current animation
     */
    setCurrentAnimation(iAnim) {
        const animations = this._animations;
        if (iAnim >= 0 && iAnim < animations.length) {
            this._animation = this._animations[iAnim];
        } else {
            throw new Error('cannot select "' + iAnim + '" as new current animation : this sprite has "' + animations.length + '" animations');
        }
    }

    /**
     * Defines the sprite tileset
     * @param ts {ShadedTileSet}
     */
    setTileSet(ts) {
        this._tileset = ts;
    }

    getTileSet() {
        return this._tileset;
    }

    getCurrentFrame() {
        return !!this._animation ? this._animation.frame() : 0;
    }


    /**
     * proxy method for current animation animate method
     * @param time {number}
     */
    animate(time) {
        if (this._animation) {
            this._animation.animate(time);
        }
        const c = this._children;
        for (let i = 0, l = c.length; i < l; ++i) {
            c[i].animate(time);
        }
    }
}


export default Sprite;