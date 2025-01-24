//div200個生成
const container = document.getElementById('grid-container');
for (let i = 0; i < 200; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    container.appendChild(gridItem);
}

//nextのブロック作成
const nextcontainer=document.getElementById('nextcontainer');
for(let i=0;i<25;i++){
    const nextItem=document.createElement('div');
    nextItem.className='nextItem';
    nextcontainer.appendChild(nextItem);
}

//ブロック定義

const gridItems=document.querySelectorAll('.grid-item');
const nextItems=document.querySelectorAll('.nextItem');

const blocks = [
    { name: 'red', values: [4, 5, 15,16] },
    { name: 'blue', values: [5, 6, 14, 15,] },
    { name: 'green', values: [4, 5, 6, 15] },
    { name: 'yellow', values: [4, 5, 14, 15] },
    { name: 'pink', values: [4, 14, 24, 25, 26] },
    { name: 'orange', values: [4, 14, 24] },
    { name: 'yellowgreen', values: [4, 14, 24, 25] },
    { name: 'lightblue', values: [5, 15, 24, 25] },
    { name: 'purple', values: [5] }
];

const nextBlocks = [
    { name: 'red', values: [6, 7, 12, 13] },
    { name: 'blue', values: [7, 8, 11, 12] },
    { name: 'green', values: [6, 7, 8, 12] },
    { name: 'yellow', values: [6, 7, 11, 12] },
    { name: 'pink', values: [6, 11, 16, 17, 18] },
    { name: 'orange', values: [7, 12, 17] },
    { name: 'yellowgreen', values: [7, 12, 17, 18] },
    { name: 'lightblue', values: [7, 12, 16, 17] },
    { name: 'purple', values: [12] }
];