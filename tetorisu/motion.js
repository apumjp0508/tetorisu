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

//ランダムでブロック出現

const coloring=()=>{
    const randomIndex=Math.floor(Math.random()*blocks.length);
    const colorName=blocks[randomIndex].name;
    blocks[randomIndex].values.forEach((index,i)=>{
        gridItems[index].style.backgroundColor=colorName
    });
    nextBlocks[randomIndex].values.forEach((index,i)=>{
        nextItems[index].style.backgroundColor=colorName
    });
   
    //return randomIndexを戻り値として返すことほかの関数でrandomIndexの値が使えるようになる。
    return randomIndex;
}

const fixedBlocks = Array(200).fill(null);

//ブロックが落ちていく動作
const drop=()=>{
    const randomIndex=coloring();
    const colorName=blocks[randomIndex].name;
    let currentBlockPositions = blocks[randomIndex].values.slice();
    let currentBlockColor=blocks[randomIndex].name;

    const id=setInterval(()=>{
        currentBlockPositions.forEach((index,i)=>{
        gridItems[index].style.backgroundColor='white';
    });

    currentBlockPositions = currentBlockPositions.map(index => index + 10);
    //この行では回転や横移動が許される
    currentBlockPositions.forEach((index,i)=>{
        gridItems[index].style.backgroundColor=colorName;
    });



    const maxPosition = Math.max(...currentBlockPositions);

    const judgeNums=currentBlockPositions.map(index => index + 10);

    const isNextGridOccupied = (judgeNums) => {
        return judgeNums.some(index => fixedBlocks[index] !== null);
    };
    isNextGridOccupied(judgeNums);


    //setInterval止めるための条件式
    if(maxPosition>=189 || isNextGridOccupied(judgeNums)===true){
        currentBlockPositions.forEach((index,i)=>{
            fixedBlocks[index]=colorName;
        });
        clearInterval(id);
        drop();
        console.log('カウント終了');
    }
    
    },500);
};

//操作盤
const leftbtn=document.getElementById('leftbtn');
const rightbtn=document.getElementById('rightbtn');
const rotatebtn=document.getElementById('rotatebtn');



