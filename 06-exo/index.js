// import games from "./games.json" assert { type: 'json' };
let gamesArray=[];
let data="";
let temp=[];
let gamesDatas=[];
let poolDatas=[];
let oldRatios=[];
let ratios;
let itv;
let w;
init()

async function init() {
    // console.log(games[0]);
    // console.log(games[2].year);
    // console.log(games[games.length-1].title);
    // 1. Ecrire une fonction qui prend en parametre le tableau games et qui retourne un nouveau tableau de tous les noms de jeux (.title)
    // games.map((data)=>{
    //     gamesArray.push(data.title);
    // }
    // console.log(gamesArray);
    // 2. Ecrire une fonction qui prend en parametre une annee et un tableau (games), et qui retourne un nouveau tableau de noms de jeux de l'annee specifiee
    // document.querySelector('form').addEventListener('submit',arr);
    // 3. Ecrire une fonction qui prend en parametre un tableau (games) retourne un tableau de noms de jeux, a condition que leur note soit superieur ou egal a 8
    // games.map((data)=>{
    //     if(data.rate>=8){
    //         gamesArray.push(data.title);
    //     }
    // });
    // console.log(gamesArray);
    // 4. Ecrire une fonction qui prend en parametre une console et un tableau (games), et qui retourne un nouveau tableau de tous les jeux disponibles sur cette console
    // document.querySelector('form').addEventListener('submit',arr2);
    // 5. Lire API piscine de bordeaux et afficher nom, nombre de nageurs, ratio
    document.querySelector('button').addEventListener("click",refresh);
    gamesDatas= await fetchFunct();

}
function arr(e){
    e.preventDefault();
    let demand = document.querySelector('input');
    games.map((data)=>{
        if(data.year==demand.value){
            gamesArray.push(data.title);
        }
    })
}
function arr2(e){
    e.preventDefault();
    let demand = document.querySelector('input');
    games.map((data)=>{
        (data.devices).map((data2)=>{
            if(data2==demand.value){
                gamesArray.push(data.title);
            }
        })
    })
}
async function refresh(e){
    e.preventDefault();
    gamesDatas=await fetchFunct();
}
async function fetchFunct(){
    gamesArray =  await fetch("https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_frequentation_piscine_tr&q=");
    gamesDatas = await gamesArray.json();
    poolDatas =  await gamesDatas.records;
    for(let i=0;i<(poolDatas.length);i++){
        for(let j=i+1;j<(poolDatas.length)-1;j++){
            if((poolDatas[i].fields.fmicourante)<(poolDatas[j].fields.fmicourante)){
                temp=poolDatas[i]
                poolDatas[i]=poolDatas[j];
                poolDatas[j]=temp;
            }
        }
    }
    itv=setInterval(prog,300);
    w=0;
    let names = document.querySelectorAll('.title');
    let numbers = document.querySelectorAll('.datas');
    ratios = document.querySelectorAll('.ratio');
    for(let i=0;i<poolDatas.length;i++){
        names[i].textContent=poolDatas[i].fields.etablissement_etalib;
        if(poolDatas[i].fields.fmicourante<0){
            numbers[i].textContent="nombre de personne: 0/"+poolDatas[i].fields.fmizonmax;
            ratios[i].value=0;
            oldRatios[i]=0;
        }else{
            numbers[i].textContent="nombre de personnes: "+poolDatas[i].fields.fmicourante+"/"+poolDatas[i].fields.fmizonmax;
            ratios[i].value=((poolDatas[i].fields.fmicourante)/(poolDatas[i].fields.fmizonmax))*100;
            oldRatios[i]=ratios[i].value;
        }
    }
}
function prog(){
    for(let index=0;index<ratios.length;index+=1){
        if(w<oldRatios[index]){
            ratios[index].value=w;
        }
        if(w>oldRatios[0]){
            clearInterval(itv);
        }
    }
    w+=1;
}