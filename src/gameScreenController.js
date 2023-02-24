
const { ipcRenderer } = require('electron');

const bg="./assets/back.png"
let limiter=[];
let active1=null;
let active2=null;

const marked=[];


function clear(){
    var cards=document.getElementsByTagName('img');

    Array.from(cards).forEach(card=>{
        marked.forEach(marker=>{
            if(card.alt!=marker){
                console.log(marker)
                card.src=bg;
            }
        })
    })
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
        clear();
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
    const limit=4;
    
    for(var i=0; i<limit;i++){
        limiter[i]=cards[i];
    };
    shuffle(limiter);
    console.log(limiter);

    for(var i=0; i<limiter.length;i++){
        playmat.innerHTML+=`<img src='${bg}' alt='${limiter[i].card_id}' id='${i}'>`;
        console.log('git');
    };
    const images = document.getElementsByTagName('img');
    Array.from(images).forEach(img => {
    img.addEventListener('click', activate);
});
});

