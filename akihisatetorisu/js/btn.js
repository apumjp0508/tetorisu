
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
