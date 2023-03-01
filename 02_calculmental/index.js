window.addEventListener('load',init);

let stage;
let animArray = [];
let shapeDescriptionArray;
let containerArray = [];
let maxTotal = 60;
let maxBoule = 20;
let bouleArray = [];
let total=0;
let solutions=[];
let solu=0;
let contResult = null;
let anim=false;
let compteur=0;
let signeAnim=1;
let distance=0;


function init() {
    let canvas = document.querySelector('.myCanvas');
    stage = new createjs.Stage(canvas);
    
    shapeDescriptionArray = [
        {forme: "circle",
        rayon: 30,
        couleur: "red",
        x: 100,
        y: 205,
        hauteur: 30},
        {forme: "circle",
        rayon: 30,
        couleur: "blue",
        x:225,
        y:205,
        hauteur: 30},
        {forme: "circle",
        rayon: 30,
        couleur: "green",
        x:350,
        y:205,
        hauteur:30},
        {forme: "circle",
        rayon: 30,
        couleur: "#5D664D",
        x: 100,
        y: 305,
        hauteur: 30},
        {forme: "circle",
        rayon: 30,
        couleur: "#670BC4 ",
        x:225,
        y:305,
        hauteur: 30},
        {forme: "circle",
        rayon: 30,
        couleur: "#EC98F3 ",
        x:350,
        y:305,
        hauteur:30},
        {forme:"rectangle",
        longueur: 100,
        largeur:50,
        couleur:"yellow",
        x:100,
        y:100,
        hauteur:25,
        libelle:"rectangle 1",
        libellex:60,
        libelley:100
        },
        {forme:"rectangle",
        longueur: 100,
        largeur:50,
        couleur:"yellow",
        x:225,
        y:100,
        hauteur:25,
        libelle:"rectangle 2",
        libellex:190,
        libelley:100
        },
        {forme:"rectangle",
        longueur: 100,
        largeur:50,
        couleur:"yellow",
        x:350,
        y:100,
        hauteur:25,
        libelle:"rectangle 3",
        libellex:310,
        libelley:100
        },  
    ];
    shapeDescriptionArray.map((data)=>{
        containerFunct(data);
    })
    falseRandomPos(containerArray);    
        
        reset()
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick",()=>{
            if(anim){
                animSolu();
            }
            stage.update();
        })

}

function reset(){
    calculBoule();
    calculSolutions();
    falseRandomPos(containerArray);
    solutionsDisplay(containerArray);
    boulesDisplay(containerArray);
    rectResultDisplay();
}

function formDraw(data){
    let formObj = new createjs.Shape();
    formObj.mouve = false;
    if(data.forme=="circle")
    {
        formObj.graphics.beginFill(data.couleur).drawCircle(0, 0, data.rayon);
    } else {
        formObj.graphics.beginFill(data.couleur).drawRect(-(data.longueur/2), -(data.largeur/2), data.longueur, data.largeur);
    }
        formObj.x = 0;
        formObj.y = 0;
        formObj.hauteur = data.hauteur;
        formObj.dep = 1;
        formObj.forme = data.forme;
        formObj.libelle = data.libelle;
        formObj.libellex = data.libellex;
        formObj.libelley = data.libelley;
        animArray.push(formObj);
        stage.addChild(formObj);
        return (formObj);
    
}

function handleClick(event) {
    let e=event.currentTarget;
    console.log('clic:',e.montext.text);
    if(e.montext.text==solu){
        contResult.visible=true;
        contResult.textResult.text="Gagné";
        maxTotal+=20;
        maxBoule+=6;
        anim=true;
    } else {
        contResult.visible=true;
        contResult.textResult.text="Perdu";
        anim=true;
    };
    for (let i=6;i<9;i++){
        containerArray[i].mouseEnabled=false;
    }
    // event.currentTarget.mouve = !event.currentTarget.mouve;
}
function handleClickResult(event) {
    contResult.visible=false;
    let i=0;
    shapeDescriptionArray.map((data)=>{
        containerArray[i].y=data.y;
        containerArray[i].x=data.x;
        i++;
    })
    compteur=0;
    for (let i=6;i<9;i++){
        containerArray[i].mouseEnabled=true;
    }
    reset();
}

function animate(){
    animArray.map((data)=>{
        if(data.mouve){
            data.y+=data.dep;
            if(data.y>(450-data.hauteur)){data.dep=-(data.dep)};
            if(data.y<(0+data.hauteur)){data.dep=-(data.dep)}
        }
    })
}

function containerFunct(data){
    let container = new createjs.Container();

    let sh = formDraw(data)

    let text = new createjs.Text("", "bold 15px Arial", "#000000");
    text.textAlign = 'center'
    text.textBaseline = 'middle'
    console.log('shff',sh);
    if (sh.forme=="rectangle"){
        container.addEventListener("click", handleClick);
    }
    container.addChild(sh,text);
    container.x = data.x;
    container.y = data.y;
    container.montext = text;
    container.libelle = data.libelle;
    containerArray.push(container);
    stage.addChild(container)

    return(container);
}

function calculBoule(){
    total = 0
    for(let i=0;i<6;i++){
        bouleArray[i]= (Math.floor(Math.random()*maxBoule))+1;
        total+=bouleArray[i];
    }
    return;
}

function calculSolutions(){
    let i = Math.floor(Math.random()*3);
    let signe = +1;
    solutions = [null,null,null];
    solutions[i]=total;
    solu=total;
    for(let j=0;j<3;j++){
        if (solutions[j] == null){
            let calc=0;
            while (calc==0){
                calc =((Math.floor(Math.random()*10))*signe);
            }
            solutions[j] = total+calc;
            signe=-signe;
        }
    }
    console.log(solutions);
    return;
}

function solutionsDisplay(container){
    for(let i=0;i<3;i++){
        container[i+6].montext.text=solutions[i];
    }
}
function boulesDisplay(container){
    for(let i=0;i<6;i++){
        container[i].montext.text=bouleArray[i];
        container[i].montext.color="#FFFFFF";
    }
}

function rectResultDisplay(){
    let container = new createjs.Container();
    let rectRes = new createjs.Shape();
    rectRes.graphics.beginFill("#CFF1B8").drawRect(-60, -25, 120, 50);
    stage.addChild(rectRes);
    let text = new createjs.Text("", "bold 15px Arial", "#000000");
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    container.addEventListener("click", handleClickResult);
    container.addChild(rectRes,text);
    container.x=225;
    container.y=400;
    container.visible=false;
    container.textResult = text;
    contResult=container;
    stage.addChild(container);
    return
}
function animSolu() {
    if(compteur<6){
        let depla = containerArray[compteur].y;
        let deplax = containerArray[compteur].x;
        if(depla<=480){
            (containerArray[compteur].y) +=4;
            if(deplax%20 == 0){signeAnim=-signeAnim};
            (containerArray[compteur].x) +=(2*signeAnim);
        } else {
            compteur+=1;
            if(compteur==6){
                anim=false;
            }
        }
    }
}
function calculPosition() {
    shapeDescriptionArray[0].x=100;
    shapeDescriptionArray[0].y=205;
    for (let i=1;i<6;i++){
        (shapeDescriptionArray[i].x)=(shapeDescriptionArray[i-1].x)+125;
        (shapeDescriptionArray[i].y)=(shapeDescriptionArray[i-1].y);
        if((shapeDescriptionArray[i].x)>350){
            (shapeDescriptionArray[i].x)=(shapeDescriptionArray[0].x);
            (shapeDescriptionArray[i].y)=(shapeDescriptionArray[i-1].y)+100;
        }
    }
}
function randomPosition(data) {
    data[0].x=(Math.floor(Math.random()*390))+30;
    data[0].y=(Math.floor(Math.random()*215))+205;
    for(let i=1;i<6;i++){
        data[i].x=(Math.floor(Math.random()*390))+30;
        data[i].y=(Math.floor(Math.random()*215))+205;
        for(let j=0;j<=(i-1);j+=1){
            console.log('j',j,'i',i);
            let dx2=(((data[j].x)-(data[i].x))**2);
            let dy2=(((data[j].y)-(data[i].y))**2);
            let dx2dy2=dx2+dy2;
            let racine=Math.sqrt(dx2dy2);
            distance =racine-60;
            console.log('distance:',distance);
            if( distance<0){
                data[i].x=(Math.floor(Math.random()*390))+30;
                data[i].y=(Math.floor(Math.random()*215))+205;
                console.log('recalcul');
                j=-1;
            }
        }
    }
    for(let i=0;i<6;i++){
        console.log('coord:', data[i].x, data[i].y);

    }
    
}
function falseRandomPos(data) {
    for(let i=0;i<6;i++){
        let depx=Math.floor(Math.random()*80);
        let depy=Math.floor(Math.random()*60);
        if(depx>=60){
            depx=-depx/2;
        } else {
            depx=depx/2;
        }
        if(depy<40){
            depy=-depy/2;
        } else {
            depy=depy/2;
        }
        data[i].x=(data[i].x)+depx;
        data[i].y=(data[i].y)+depy;
    }
}