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
//操作ボタン
const leftbtn=document.getElementById('leftbtn');
const rightbtn=document.getElementById('rightbtn');
const rotatebtn=document.getElementById('rotatebtn');

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

    const rotate=()=>{
        //回転動作
        let currentBlockPivotIndex = 1; 
        
        rotatebtn.addEventListener('click', () => {
            // 現在のブロックを白に戻す
            currentBlockPositions.forEach(index => {
                gridItems[index].style.backgroundColor = 'white';
            });
        
            // 回転後の座標を取得
            const rotatedPositions = rotateBlock(currentBlockPositions, currentBlockPivotIndex);
        
            // 新しい座標でブロックを塗り直す
            currentBlockPositions = rotatedPositions;
            currentBlockPositions.forEach(index => {
                gridItems[index].style.backgroundColor = colorName; // 現在のブロックの色
            });
        })
        
        const rotateBlock = (blockPositions, pivotIndex) => {
            const pivot = blockPositions[pivotIndex]; // 中心点
            const pivotX = pivot % 10; // x座標
            const pivotY = Math.floor(pivot / 10); // y座標
        
            // 回転後の座標を計算
            const rotatedPositions = blockPositions.map(index => {
                const x = index % 10; // x座標
                const y = Math.floor(index / 10); // y座標
        
                // 90度回転（中心点を基準に回転）
                const newX = pivotX - (y - pivotY);
                const newY = pivotY + (x - pivotX);
        
                // 新しい位置に変換して返す
                return newY * 10 + newX;
            });
        
            // グリッドの範囲外または固定ブロックとの衝突がないかを確認
            const isValidRotation = rotatedPositions.every(index => {
                return index >= 0 && index < 200 && fixedBlocks[index] === null;
            });
        
            // 有効なら回転後の座標を返す
            return isValidRotation ? rotatedPositions : blockPositions;
        };
        
        };
    rotate();

    const leftBlock = (blockPositions) => {
        const leftedBlock = blockPositions.map(index => index - 1);
    
        const isValidLeft = leftedBlock.every(index => {
            return index >= 0 && index < 200 && fixedBlocks[index] === null && index % 10 !== 9;
        });
    
        return isValidLeft ? leftedBlock : blockPositions;
    };
    
    const left = () => {
        leftbtn.addEventListener('click', () => {
            // 現在のブロックを白に戻す
            currentBlockPositions.forEach(index => {
                gridItems[index].style.backgroundColor = 'white';
            });
    
            // 左に移動したブロックを取得
            const leftedBlock = leftBlock(currentBlockPositions);
    
            // 現在のブロックの位置を更新
            currentBlockPositions = leftedBlock;
    
            // 新しい位置に色を塗る
            currentBlockPositions.forEach(index => {
                gridItems[index].style.backgroundColor = colorName;
            });
        });
    };
    
    // イベントリスナーを設定
    left();

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