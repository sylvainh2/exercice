window.addEventListener('load',init);

let stage;
let animArray = [];

function init() {
    let canvas = document.querySelector('.myCanvas');
    stage = new createjs.Stage(canvas);
    
    let objet = [
        {forme: "circle",
        rayon: 30,
        couleur: "red",
        x: 100,
        y: 100,
        hauteur: 30},
        {forme: "rectangle",
        longueur: 50,
        largeur:70,
        couleur: "blue",
        x:225,
        y:100,
        hauteur: 35},
        {forme: "circle",
        rayon: 40,
        couleur: "green",
        x:350,
        y:100,
        hauteur:40}];
        
        objet.map((data)=>{
            formDraw(data);
        })
        
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick",()=>{
            animate();
            stage.update();
        })

}
//*****************************************************************************************************************/
//                          creation des formes avec création des écouteurs d'évènements                           /
//*****************************************************************************************************************/
function formDraw(data){
    let formObj = new createjs.Shape();
    formObj.mouve = false;
    if(data.forme=="circle")
    {
        formObj.graphics.beginFill(data.couleur).drawCircle(0, 0, data.rayon);
    } else {
        formObj.graphics.beginFill(data.couleur).drawRect(-(data.longueur/2), -(data.largeur/2), data.longueur, data.largeur);
    }
        formObj.x = data.x;
        formObj.y = data.y;
        formObj.hauteur = data.hauteur;
        formObj.dep = 1;
        formObj.addEventListener("click", handleClick);
        data.myShape = formObj;
        animArray.push(formObj);
        stage.addChild(formObj);
        return (formObj);
    
}
//*****************************************************************************************************************/
//                              fonction qui stoppe ou met en mouvement chaque forme                               /
//*****************************************************************************************************************/
function handleClick(event) {
    console.log(event.currentTarget);
    event.currentTarget.mouve = !event.currentTarget.mouve;
}
//*****************************************************************************************************************/
//                    fonction qui se charge de l'animation des formes et de les faire rebondire                   /
//*****************************************************************************************************************/
function animate(){
    animArray.map((data)=>{
        if(data.mouve){
            data.y+=data.dep;
            if(data.y>(450-data.hauteur)){data.dep=-(data.dep)};
            console.log(data.hauteur);
            if(data.y<(0+data.hauteur)){data.dep=-(data.dep)}
        }
    })
}