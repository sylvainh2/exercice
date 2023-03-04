import main from "./main.js";

let targetCont1 = [];
let targetCont2 = [];
let spriteSheet=[];
let animation=[];
let touches = [];
let canvas = document.getElementById("demoCanvas");
let stage = new createjs.Stage(canvas);
let temps=0;
let phase=[0,0,0,0,0,0];
let anim=[3,3,3,3,3,3];
let randj1=0;
let randj2=0;
let tir1=true;
let tir2=true;
let move=true;
let vivant1=true;
let vivant2=true;
let contResult=[];
let resultShape=[];
let resultText="";
let gagne=false;

export default function init() {

    let dataSprite ={
        images:["./assets/zombie.png"],
        frames:{width:50,height:70,regx:-25,regy:-35},
        animations:{
            stand:0,
            walk0:0,
            walk1:1,
            walk2:2,
            walk3:3,
            walk4:4,
            walk5:5,
            dead:[6,11,false,1]
        },
        framerate:5
    };
    
    for(let i=0;i<6;i++){
        spriteSheet[i] = new createjs.SpriteSheet(dataSprite);
        animation[i] = new createjs.Sprite(spriteSheet[i],"stand");
        stage.addChild(animation[i]);
        animation[i].x=30;
        animation[i].y=20+(i*90);
        animation[i].role="bot"
    }
    randj1 = Math.floor(Math.random()*6);
    randj2 = Math.floor(Math.random()*6);
    while (randj1 == randj2){
        randj2 = Math.floor(Math.random()*6);
    }
    animation[randj1].role="joueur 1";
    animation[randj2].role="joueur 2";
    // stage.addChild(spriteSheet);

    window.addEventListener("keydown",targetMouve);
    window.addEventListener("keyup",toucheUp);

    targetCont1 = createTarget(150,50,"red");
    targetCont2 = createTarget(850,50,"black");
    containerResult();
    // main();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", () => {
    let dep=2;
    if(touches[81]==true && vivant1){
        targetCont1.y+=-dep;
        if(targetCont1.y<10)targetCont1.y=10;
    }
    if(touches[87]==true && vivant1){
        targetCont1.y+=dep;
        if(targetCont1.y>540)targetCont1.y=540;
    }
    if(touches[86]==true && vivant1){
        targetCont1.x+=-dep;
        if(targetCont1.x<10)targetCont1.x=10;
    }
    if(touches[66]==true && vivant1){
        targetCont1.x+=dep;
        if(targetCont1.x>990)targetCont1.x=990;
    }
    if(touches[161]==true && vivant2){
        targetCont2.y+=-dep;
        if(targetCont2.y<10)targetCont2.y=10;
    }
    if(touches[37]==true && vivant2){
        targetCont2.y+=dep;
        if(targetCont2.y>540)targetCont2.y=540;
    }
    if(touches[96]==true && vivant2){
        targetCont2.x+=-dep;
        if(targetCont2.x<10)targetCont2.x=10;
    }
    if(touches[110]==true && vivant2){
        targetCont2.x+=dep;
        if(targetCont2.x>990)targetCont2.x=990;
    }
    if(touches[67]==true && (tir1 && vivant1)){
        tir1=false;
        let dist = distance(targetCont1,animation[randj2]);
        if(dist<35){
            animation[randj2].gotoAndPlay("dead");
            stage.update();
            vivant2=false;
        }
    }
    if(touches[13]==true  && (tir2 && vivant2)){
        tir2=false;
        let dist = distance(targetCont2,animation[randj1]);
        if(dist<35){
            animation[randj1].gotoAndPlay("dead");
            stage.update();
            vivant1=false;
        }
    }
    temps +=1;
    if(temps>15 && !gagne){
        if(touches[65]==true && vivant1){
            if(animation[randj1].x<950){
                    if(phase[randj1]>4){
                        phase[randj1]=0;
                        animation[randj1].x += 3;
                }
            }
        }
        if(touches[77]==true && vivant2){
            if(animation[randj2].x<950){
                if(phase[randj2]>4){
                    phase[randj2]=0;
                    animation[randj2].x += 3;
            }
        }
        }
        for( let j=0;j<6;j++){
            if(phase[j]<5){
                phase[j]+=1;
                if(animation[j].x<950){
                    animation[j].x += 3;
                    animation[j].gotoAndPlay("walk"+phase[j]);
                } else {
                    contResult.visible=true;
                    resultText.text= animation[j].role+' a gagné';
                    gagne=true;
                }
            }else{
                if (animation[j].role=="bot"){
                phase[j]=5;
                    if(anim[j]<3){
                        anim[j]+=1;
                    }else{
                        let calc = Math.floor(Math.random()*10);
                        if(calc<6){
                            phase[j]=0;
                            if(animation[j].x<950){
                                animation[j].x += 3;
                                animation[j].gotoAndPlay("walk"+phase[j]);
                            }else{
                                contResult.visible=true;
                                resultText.text= animation[j].role+' a gagné';
                                gagne=true;
                            }
                        }else{
                            anim[j]=0;
                        }
                    }
                }
            }
        }
        temps = 0;
    }
        stage.update();
    });
}

window.addEventListener('load', init)

function targetMouve(event){
    let e=event.keyCode;
    // console.log('touche:',e);
    touches[e]=true
    
}
function toucheUp(event){
    let e=event.keyCode;
    touches[e]=false;
}
function createTarget(datax,datay,datac){
    let contain = new createjs.Container();
    let target1 = new createjs.Shape();
    let targ = target1.graphics;
    targ.beginStroke(datac).drawCircle(0,0,40);
    targ.beginStroke(datac).drawCircle(0,0,22);
    targ.beginFill(datac).drawRect(0,-45,2,35);
    targ.beginFill(datac).drawRect(0,45,2,-35);
    targ.beginFill(datac).drawRect(-45,0,35,2);
    targ.beginFill(datac).drawRect(45,0,-35,2);
    stage.addChild(target1);
    contain.addChild(target1);
    contain.x=datax;
    contain.y=datay;
    target1.alpha=0.7;
    stage.addChild(contain);
    return (contain);
}
function distance(target,joueur){
    let dx=(target.x)-(joueur.x);
    let dy=(target.y)-(joueur.y);
    let distance = Math.sqrt((dx**2+dy**2));
    return(distance);
}
function reset(){
    targetCont1.x=150;
    targetCont1.y=50;
    targetCont2.x=850;
    targetCont2.y=50;
    temps=0;
    phase=[0,0,0,0,0,0];
    anim=[3,3,3,3,3,3];
    for(let i=0;i<6;i++){
        animation[i].role="bot";
        animation[i].x=30;
        animation[i].y=20+(i*90);
        animation[i].gotoAndPlay("stand");
    }
    randj1 = Math.floor(Math.random()*6);
    randj2 = Math.floor(Math.random()*6);
    while (randj1 == randj2){
        randj2 = Math.floor(Math.random()*6);
    }
    animation[randj1].role="joueur 1";
    animation[randj2].role="joueur 2";
    tir1=true;
    tir2=true;
    vivant1=true;
    vivant2=true;
    gagne=false;
    contResult.visible=false;
}
function containerResult() {
    contResult = new createjs.Container();
    resultShape = new createjs.Shape();
    resultShape.graphics.beginFill("red").drawRect(-100,-50,200,100);
   
    resultText = new createjs.Text("","bold 20px Arial","white");
    resultText.textAlign="center";
    resultText.textBaseline="middle";
    contResult.addEventListener('click',clicResult);
    contResult.x=500;
    contResult.y=300;
    contResult.visible=false;
    contResult.addChild(resultShape, resultText)
    stage.addChild(contResult);
    return
}
function clicResult(){
    console.log('RESET RESET');
    reset();
}