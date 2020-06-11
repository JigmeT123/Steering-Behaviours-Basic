function Pipe() {
    this.spacing = 160;
    this.x = innerWidth;
    this.top = random(innerHeight / 6, (3 / 4) * innerHeight);
    this.bottom = innerHeight - (this.top + this.spacing);
    this.width = 40;
    this.speed = 7;
    this.flag = false;
}
Pipe.prototype.show = function () {
    fill(255);
    if (this.flag) {
        fill(255, 0, 0);
    }

    image(pipeImg, this.x, 0, this.width, this.top);
    image(pipeImg, this.x, innerHeight - this.bottom, this.width, this.bottom);
}

Pipe.prototype.update = function () {
    this.x -= this.speed;
}

Pipe.prototype.hits = function (bird) {
    if ((bird.y < this.top) || (bird.y > (innerHeight - this.bottom))) {
        if (bird.x > this.x && bird.x < this.width + this.x) {
            this.flag = true;
            return true;
        }
    }
}