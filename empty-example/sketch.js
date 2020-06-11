let font;
let vehicles = [];
function preload(){
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup(){
    createCanvas(innerWidth, innerHeight);
    let points = font.textToPoints("Jigme Tashi Namgyal :)", (innerWidth/18), innerHeight/2, 120, {
        sampleFactor: 0.18
    })
    points.forEach(result=>{
        let vechile = new Vechile(result.x, result.y);
        vehicles.push(vechile);
        
    })
}
function draw(){
    background('#f6b365');
    vehicles.forEach(result=>{
        result.behaviours();
        result.update();
        result.show();
    })
}