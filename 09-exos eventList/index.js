//exo 1
document.querySelectorAll('.btn').forEach((data)=>{data.addEventListener("click",colorChange)});
function colorChange(e){
    e.preventDefault();
    let color=e.target.textContent;
    document.querySelector('.circle').style.background=color;
}

//exo 2
document.querySelector('.form1').addEventListener("submit",textF1);
function textF1(e){
    e.preventDefault();
    let text= e.target.name.value;
    document.querySelector('.text1').textContent=text;
}
//exo 3
document.querySelector(".potar").addEventListener("change",potRange);
function potRange(e){
    e.preventDefault();
    let text="";
    text= e.target.value;
    document.querySelector("span").textContent=text;
}
//exo 4
document.querySelector(".entreeT2").addEventListener("keydown",(e)=>{
    document.querySelector(".text2").textContent=e.target.value
})
//exo 5 
document.querySelector(".potar2").addEventListener("input",potRange2);
function potRange2(e){
    e.preventDefault();
    let text="";
    text= e.target.value;
    document.querySelector("span2").textContent=text;
}
//exo 6
document.querySelector("#select1").addEventListener("change",(e)=>{
    document.querySelector(".text3").textContent=e.target.value
})
//exo 7
document.querySelector(".colorI").addEventListener("change",(e)=>{
    document.querySelector(".circle2").style.background=(e.target.value);
})
//exo 8
document.querySelectorAll(".btn3").forEach((data)=>{
    data.addEventListener("click",colorchange2)
})
function colorchange2(e){
    let color={
        "salut":"red",
        "tout":"green",
        "le monde":"blue"
    }
    let text=e.target.textContent;
    document.querySelector(".circle3").style.background=color[text]
}
//exo 9
let res=document.querySelectorAll(".box").forEach((data)=>{
    data.addEventListener('change',boxText)
    data.checked=false;
})
function boxText(e){
    let check=document.querySelectorAll('.box')
    let text="";
    if(check[0].checked){
        text+=check[0].value;
    }
    if(check[1].checked){
        text+=" "+check[1].value;
    }
    document.querySelector(".text4").textContent=text;
}