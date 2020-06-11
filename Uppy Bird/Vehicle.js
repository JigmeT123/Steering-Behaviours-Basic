function Vehicle(x, y){
    this.position = createVector(random(innerWidth), random(innerHeight));
    this.target = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.accelearation = createVector();
    this.r = 8;
    this.maxSpeed = 10;
}

Vehicle.prototype.show = function (){
    stroke(255);
    strokeWeight(this.r);
    point(this.position.x, this.position.y);
}
Vehicle.prototype.update = function(){
    this.position.add(this.velocity);
    this.velocity.add(this.accelearation);
    this.accelearation.mult(0);
}
Vehicle.prototype.behaviours = function(){
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    arrive.mult(0.05)
    flee.mult(2)
    this.applyForce(arrive);
    this.applyForce(flee);
}
Vehicle.prototype.arrive = function(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    let speed = this.maxSpeed;
    let distance = desiredVelocity.mag();
    if(distance < 100){
        speed = map(distance, 0 , 100, 0, this.maxSpeed);
    }
    desiredVelocity.setMag(speed);
    let steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
    return steeringForce;
}
Vehicle.prototype.flee = function(target){
    let desiredVelocity = p5.Vector.sub(target, this.position);
    
    let distance = desiredVelocity.mag();
    if(distance < 50){
        desiredVelocity.mult(-1);
        desiredVelocity.setMag(this.maxSpeed);
        let steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
        return steeringForce;
    }else{
        return createVector(0, 0);
    }
    
}
Vehicle.prototype.applyForce = function(steeringForce){
    this.accelearation.add(steeringForce);
}