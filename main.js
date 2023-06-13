const canvas = document.getElementById("myCanvas");
//
const maxSpeedLane=2;
//
canvas.width = 600;

const ctx = canvas.getContext("2d");

const road =new Road(canvas.width/2,canvas.width/3);
const car =new Car(road.getLaneCenter(0),100, 30,60,"KEYS");
const manips =[];
for (let i = 1; i<10; i++){
manips.push( new Manipulator(road.right, -100, 20, 150));
}
const traffic =[
    new Car(road.getLaneCenter(1),300,30,50,"DUMMY",maxSpeedLane)
]

animate();

function animate(){
    for (let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for (let i=0;i<traffic.length;i++){
        manips[i].update([],traffic);
    }
    car.update(road.borders,traffic);
    //manip.update([],traffic);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx);
    for (let i=0;i<traffic.length;i++){
        
        traffic[i].draw(ctx,"red");
    }
   
    car.draw(ctx,"blue");
     for (let i=1;i<manips.length-1;i++){
        
        manips[i].draw(ctx);
    }
   // manip.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}