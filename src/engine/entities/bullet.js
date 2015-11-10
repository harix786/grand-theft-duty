let debug = require('debug')('game:engine/entities/bullet');

import Entity from './entity';

class Bullet extends Entity {
    constructor (x, y, z, width, height) {
        super(x, y, z, width, height);

        this.dead = true;
        this.firedBy = null;
        this.speed = 400;
        this.maxDistance = 500;
        this.traveledDistance = 0;
    }

    update (delta) {
        super.update(delta);

        this.traveledDistance += this.speed * delta;

        if (this.traveledDistance > this.maxDistance) {
            this.dead = true;
            this.traveledDistance = 0;
        } else {
            this.move('up');
        }
    }
}

export default Bullet;