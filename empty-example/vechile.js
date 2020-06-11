function Vechile(x, y) {
    this.position = createVector(random(innerWidth), random(innerHeight));
    this.target = createVector(x, y);
    this.velocity = p5
        .Vector
        .random2D();
    this.acceleration = createVector();
    this.r = 4;
    this.maxSpeed = 10;
    this.maxForce = 0.9;
}
Vechile.prototype.behaviours = function () {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let away = this.flee(mouse);
    arrive.mult(1);
    away.mult(6.5);
    let accelerationArrivial = this.applyForce(arrive);
    let accelerationAway = this.applyForce(away);
}
Vechile.prototype.update = function () {
    this
        .position
        .add(this.velocity);
    this
        .velocity
        .add(this.acceleration);
    this
        .acceleration
        .mult(0);
}

Vechile.prototype.show = function () {
    stroke(100);
    strokeWeight(this.r);
    point(this.position.x, this.position.y);
}
Vechile.prototype.arrive = function (target) {
    let desiredVelocity = p5
        .Vector
        .sub(target, this.position);
    let distance = desiredVelocity.mag();
    let speed = this.maxSpeed;
    if (distance < 100) {
        speed = map(distance, 0, 100, 0, this.maxSpeed)
    }
    desiredVelocity.setMag(speed);
    let steeringForce = p5
        .Vector
        .sub(desiredVelocity, this.velocity);
    steeringForce.limit(this.maxForce);
    return steeringForce;
}
Vechile.prototype.flee = function (target) {
    let desiredVelocity = p5
        .Vector
        .sub(target, this.position);
    let distance = desiredVelocity.mag();

    if (distance < 50) {
        desiredVelocity.setMag(this.maxSpeed);
        desiredVelocity.mult(-1);
        let steeringForce = p5
            .Vector
            .sub(desiredVelocity, this.velocity);
        steeringForce.limit(this.maxForce);
        return steeringForce;
    }else{
        return createVector(0,0);
    }

}
Vechile.prototype.applyForce = function (arrive) {
    this
        .acceleration
        .add(arrive);
}