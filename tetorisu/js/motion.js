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
let currentBlockIndex = null;
let nextBlockIndex = Math.floor(Math.random() * blocks.length); // 最初の "次のブロック"

const coloring = () => {
    nextItems.forEach(item => {
        item.style.backgroundColor = 'white';
    });
    // 現在のブロックを次のブロックに更新
    currentBlockIndex = nextBlockIndex;

    // 新しい次のブロックを生成
    nextBlockIndex = Math.floor(Math.random() * blocks.length);

    const colorName = blocks[currentBlockIndex].name;

    // グリッドに現在のブロックを描画
    blocks[currentBlockIndex].values.forEach((index, i) => {
        gridItems[index].style.backgroundColor = colorName;
    });

    // 次のブロックを描画
    nextBlocks[nextBlockIndex].values.forEach((index, i) => {
        nextItems[index].style.backgroundColor = blocks[nextBlockIndex].name;
    });

    // 現在のブロックのインデックスを返す
    return currentBlockIndex;
};



const fixedBlocks = Array(200).fill(null);
//操作ボタン
const leftbtn=document.getElementById('leftbtn');
const rightbtn=document.getElementById('rightbtn');
const rotatebtn=document.getElementById('rotatebtn');
const fallbtn=document.getElementById('blockFallbtn');
const getScore=document.getElementById('score');
const scoreName=document.getElementById('scoreName');

let score=0;


const initControls = () => {
    // 左移動ボタン
    leftbtn.addEventListener('click', () => {
        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = 'white';
        });

        const leftedBlock = leftBlock(currentBlockPositions);
        currentBlockPositions = leftedBlock;

        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = colorName;
        });
    });

    rightbtn.addEventListener('click', () => {
        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = 'white';
        });

        const rightedBlock = rightBlock(currentBlockPositions);
        currentBlockPositions = rightedBlock;

        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = colorName;
        });
    });

    // 回転ボタン
    rotatebtn.addEventListener('click', () => {
        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = 'white';
        });

        const rotatedPositions = rotateBlock(currentBlockPositions, 1); // ピボットインデックスは仮
        currentBlockPositions = rotatedPositions;

        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = colorName;
        });
    });

    //ブロック落下ボタン
    fallbtn.addEventListener('click',()=>{
        currentBlockPositions.forEach((index,i)=>{
            gridItems[index].style.backgroundColor='white';
        });

        while(currentBlockPositions.map(index => index + 10).every(index => index < 200 && fixedBlocks[index] === null)){
            currentBlockPositions=currentBlockPositions.map(index => index + 10);
        };
        currentBlockPositions.forEach(index => {
            fixedBlocks[index] = colorName;
            gridItems[index].style.backgroundColor = colorName; 
        });
    });
};


//ブロックが落ちていく動作
const drop=()=>{

    const id=setInterval(()=>{
        currentBlockPositions.forEach((index,i)=>{
        gridItems[index].style.backgroundColor='white';
    });

    const nextPositions = currentBlockPositions.map(index => index + 10);
    
    const isValidDrop = nextPositions.every(index => {
        return index < 200 && fixedBlocks[index] === null;
    });
    
    
    if (isValidDrop) {
        currentBlockPositions = nextPositions;
        currentBlockPositions.forEach(index => {
            gridItems[index].style.backgroundColor = colorName;
        });
    } else {
        // ブロックを固定
        console.log('イベント終了');
        currentBlockPositions.forEach(index => {
            fixedBlocks[index] = colorName;
            gridItems[index].style.backgroundColor = colorName; 
        });

        erase();
        gameOver();

        clearInterval(id); // 現在のブロックの落下を停止
        spawnNewBlock(); // 次のブロックを生成
    }

    },500);
};

const spawnNewBlock = () => {
    const randomIndex = coloring();
    currentBlockPositions = blocks[randomIndex].values.slice();
    colorName = blocks[randomIndex].name;

    currentBlockPositions.forEach(index => {
        gridItems[index].style.backgroundColor = colorName;
    });

    drop();
};

const rotateBlock = (blockPositions, pivotIndex) => {
    const pivot = blockPositions[pivotIndex]; // 中心点
    const pivotX = pivot % 10; // x座標
    const pivotY = Math.floor(pivot / 10); // y座標

    const rotatedPositions = blockPositions.map(index => {
        const x = index % 10;
        const y = Math.floor(index / 10);

        const newX = pivotX - (y - pivotY);
        const newY = pivotY + (x - pivotX);

        return newY * 10 + newX;
    });

    // 範囲外判定：グリッド外や左右の壁を超えない
    const isValidRotation = rotatedPositions.every(index => {
        const x = index % 10;
        return index >= 0 && index < 200 && fixedBlocks[index] === null && x >= 0 && x < 10;
    });

    return isValidRotation ? rotatedPositions : blockPositions;
};


const leftBlock = (blockPositions) => {
    const leftedBlock = blockPositions.map(index => index - 1);

    const isValidLeft = leftedBlock.every(index => {
        return index >= 0 && index < 200 && fixedBlocks[index] === null && index % 10 !== 9;
    });

    return isValidLeft ? leftedBlock : blockPositions;
};

const rightBlock = (blockPositions) => {
    const rightedBlock = blockPositions.map(index => index + 1);

    const isValidRight = rightedBlock.every(index => {
        return index >= 0 && index < 200 && fixedBlocks[index] === null && index % 10 !== 0;
    });
    //条件式 ? 条件が真の場合の値 : 条件が偽の場合の値;
    return isValidRight ? rightedBlock : blockPositions;
};

const gameOver=()=>{
    const isGameOver=fixedBlocks.slice(0,9).some(value=>value!==null)
    
    if(isGameOver){
        const alertmessage=`スコアは${score}です\n【OK】リトライ / 【キャンセル】終了`;
        const result=confirm(alertmessage);
        if(result==true){
            window.location.reload();
        };
        scoreName.style.display='none';
        getScore.style.display='none';
    }
};


const erase = () => {
   
    const rows = 20;
    const columns = 10;

    for (let row = 0; row < rows; row++) {
   
        const start = row * columns;
        const end = start + columns;

  
        const isFullRow = fixedBlocks.slice(start, end).every(value => value !== null);

        if (isFullRow) {
           
            score++;

            getScore.textContent=score;
    
            for (let i = start; i < end; i++) {
                fixedBlocks[i] = null; // 配列の値をリセット
                gridItems[i].style.backgroundColor = 'white'; 
            }


            for (let i = start - 1; i >= 0; i--) {
                const targetIndex = i + columns; 
                fixedBlocks[targetIndex] = fixedBlocks[i]; 
                gridItems[targetIndex].style.backgroundColor = fixedBlocks[i] || 'white'; 
                fixedBlocks[i] = null; 
                gridItems[i].style.backgroundColor = 'white'; 
            }
        }
    }
};
spawnNewBlock();
initControls();
