function Bird() {
    this.x = 100;
    this.y = innerHeight / 2.4;
    this.radius = 62;
    this.gravity = 0.7;
    this.velocity = 0;
    this.airResistance = 0.9;
    this.lift = 15;
}

Bird.prototype.show = function () {
    fill(255);
    image(birdImg, this.x, this.y - 20, this.radius, this.radius);
}
Bird.prototype.up = function () {
    this.velocity -= this.lift;
}
Bird.prototype.update = function () {
    this.velocity += this.gravity;
    this.velocity *= this.airResistance;
    this.y += this.velocity;

    if (this.y > innerHeight) {
        this.y = innerHeight;
        this.velocity = 0;
    }
    if (this.y < 0) {
        this.y = 0;
    }
}
