const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let playedSquares=[0,0,0,0,0,0,0,0,0];
let compt=0;
let xcomb=[];
let ycomb=[];
let arr=[];
let res1,res2,res3=false;
let player="X";
document.querySelectorAll('.square').forEach((data)=>data.addEventListener("click",play));

function play(event){
    let e=event.target;
    let playedCase=e.className;
    let played=parseInt(playedCase.substr(-1,1));
    if(playedSquares[played]==0 && compt<9){
        playedSquares[played]=1;
        compt+=1;
        if(player=="X"){
            xcomb.push(played);
            document.querySelector(".s"+played).textContent="X";
            document.querySelector(".player").textContent="Le joueur O doit jouer";
            if(xcomb.length>=3){
                compt=compare(xcomb,player);
            }
            player="O";
        }else{
            ycomb.push(played);
            document.querySelector(".s"+played).textContent="O";
            document.querySelector(".player").textContent="Le joueur X doit jouer";
            if(ycomb.length>=3){
                compt=compare(ycomb,player);
            }
            player="X";
        }
    };
    if(compt==9){
        result("");
    }

};
function result(data){
    if(data==""){
        document.querySelector(".player").textContent="Egalité!! F5 pour redémarrer une partie";
    }else{
        document.querySelector(".player").textContent="Le joueur "+data+" a gagné!! F5 pour redémarrer une partie";
    }
}
function compare(data,player){
    let res=false;
    for(let i=0;i<8;i++){
        arr=winningCombinations[i];
        res1 =data.includes(arr[0]);
        res2 =data.includes(arr[1]);
        res3 =data.includes(arr[2]);
        res = ((res1 && res2) && res3);
        if(res){
            break;
        }
    }
    if(res){
        result(player);
        compt=10;
    }
    return (compt);
}