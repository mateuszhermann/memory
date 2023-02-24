
const { ipcRenderer } = require('electron');

const bg="./assets/back.png"
let limiter=[];
let active1=null;
let active2=null;

let marked=[];
let limit;

function clear(){
    var cards=document.getElementsByClassName('card');

    Array.from(cards).forEach(card=>{
        if (!marked.includes(card.alt)) {
            card.src=bg;
        }
    });
}
function endcheck(){
    var cards=document.getElementsByClassName('card');
    let counter=0;
    Array.from(cards).forEach(card=>{
        if(card.getAttribute('src')!=bg){
            counter++;
            console.log(`counter=${counter}`)
        };
        if(counter==limit){
            window.location.replace('./gameOver.html')
        }
    });
}
function activate(e){
    var card=e.target;

    limiter.forEach(obj=>{
        if(card.alt==obj.card_id){
            card.src=obj.path;
            console.log(active1+" "+active2);
        }
    })
    if(active1==null){
        active1=card.alt;
        
    }else if(active2==null){
        active2=card.alt;
        
        if(active1==active2){
            console.log("marking");
            marked.push(card.alt);
        }
        endcheck();
        setTimeout(clear, 500);
        active1=null;
        active2=null;
    }

}

window.onload=()=>{
    ipcRenderer.send('cards-data-request');
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



ipcRenderer.on('cards-data-response', (event, data) => {
    const playmat=document.getElementById('gameArea');
    var cards=[];
    data.forEach(row=>{
        const card={
            "card_id":row.id,
            "path":row.path
        };
        cards.push(card);
        cards.push(card);
    })
    console.log(cards);
    limit=8;
    
    for(var i=0; i<limit;i++){
        limiter[i]=cards[i];
    };
    shuffle(limiter);
    console.log(limiter);

    for(var i=0; i<limiter.length;i++){
        playmat.innerHTML+=`<img src='${bg}' alt='${limiter[i].card_id}' class='card' id='${i}'>`;
        console.log('git');
    };


    if(limit<=4){
        playmat.style.gridTemplateColumns = 'repeat(2, auto)';
        const elements = document.getElementsByClassName('card');
        playmat.style.width="420px"
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.width = '200px';
        }
    };


    if(limit>=16){
        playmat.style.gridTemplateColumns = 'repeat(6, auto)';
        playmat.style.width="915px"

        
    };
    const images = document.getElementsByTagName('img');
    Array.from(images).forEach(img => {
    img.addEventListener('click', activate);
});
});

