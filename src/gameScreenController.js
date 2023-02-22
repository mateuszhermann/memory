const { ipcRenderer } = require('electron');

window.onload=()=>{
    ipcRenderer.send('cards-data-request');
}
ipcRenderer.on('cards-data-response', (event, data) => {
    const playmat=document.getElementById('gameArea');
    var cards=[];
    data.forEach(row=>{
        card={
            "id":row.id,
            "path":row.path
        };
        cards.push(card);
        cards.push(card);
        console.log(cards);
        
    })
    
});

