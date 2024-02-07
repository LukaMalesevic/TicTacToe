let resetButton = document.getElementsByClassName('resetGame');

function createPlayer (name, sign)
{
    const PlayerName = name;
    const changeSign = () =>{
        if(sign === 'X')
        sign = 'O';
        else if(sign === 'O')
        sign = 'X';

    }

    return {PlayerName, sign, changeSign};
}

function intro()
{
    let board = document.getElementsByClassName('board');
    let inputs = document.getElementsByTagName('input');
    let form = document.getElementsByClassName('setPlayer');
    let startBtn = document.getElementById('start');

    startBtn.addEventListener('click', ()=>{
        const p1 = createPlayer(inputs[0].value, 'X');
        const p2 = createPlayer(inputs[1].value, 'O');

        if(p1.PlayerName === '')
        p1.PlayerName = 'Player 1';
        
        if(p2.PlayerName === '')
        p2.PlayerName = 'Player 2';

        form[0].style.visibility = 'hidden';
        board[0].style.visibility = 'visible';

        GameStart(p1,p2);

    });

}
function GameStart (p1, p2)
{
    let fields = document.getElementsByClassName('field');
    let gameOverTxt = document.getElementsByClassName('gameOver');

    fields = [
        [fields[0], fields[1], fields[2]],
        [fields[3], fields[4], fields[5]],
        [fields[6], fields[7], fields[8]]
    ]; 

    let gameLogic = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]; 

    let counter = 0;

    function playerTurn()
    {
        if(counter%2 === 0)
        {
            counter++;
            return p1;
        }
        else{
            counter++;
            return p2;
        }
    }

    resetButton[0].addEventListener('click', ()=>{
        for(let i = 0 ; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                fields[i][j].classList.remove('X');
                fields[i][j].classList.remove('O');
            }
        }

        gameOverTxt[0].innerHTML = '';
        resetButton[0].style.visibility = 'hidden';
        gameLogic = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        counter = 0;
    });

    
    fields.forEach(function(innerArray, x){
        innerArray.forEach(function(element, y)
        {
            element.addEventListener('click', ()=>
            {
                if(gameLogic[x][y] === 0)
                gameLogic[x][y] = playerTurn().sign;
                fields[x][y].classList.add(gameLogic[x][y]);
                if(gameOver(gameLogic, p1, p2) === p1)
                {   
                    resetButton[0].style.visibility = 'visible';
                    gameOverTxt[0].innerHTML = p1.PlayerName + ' won the game!';

                }else if(gameOver(gameLogic, p1, p2) === p2)
                {
                    resetButton[0].style.visibility = 'visible';
                    gameOverTxt[0].innerHTML = p2.PlayerName + ' won the game!';
                }else if(gameOver(gameLogic, p1, p2) === true)
                {
                    resetButton[0].style.visibility = 'visible';
                    gameOverTxt[0].innerHTML = 'The game is tie!';

                }

            })
        });
    });


}


function gameOver(gameLogic, p1, p2)
{
    let gameWinner = false;
    let X = 0; let O = 0;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(gameLogic[i][j] === 'X')
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[i][j] === 'O')
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            }
        }
        X = 0;
        O = 0;
    }
    
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(gameLogic[j][i] === 'X')
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[j][i] === 'O')
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            }
        }
        X = 0;
        O = 0;
    }

    
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(gameLogic[i][j] === 'X' && j === i)
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[i][j] === 'O' && j === i)
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            }   
        }

    }

    X = 0;
    O = 0;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(gameLogic[i][j] === 'X' && i === 0 && j === 2)
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[i][j] === 'O' && i === 0 && j === 2)
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            } 
            
            if(gameLogic[i][j] === 'X' && j === i && i != 0 && i != 2)
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[i][j] === 'O' && j === i && i != 0 && i != 2)
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            }   

            if(gameLogic[i][j] === 'X' && i === 2 && j === 0)
            {
                X++;
                if(X === 3)
                gameWinner = 'X';
            }

            if(gameLogic[i][j] === 'O' && i === 2 && j === 0)
            {
                O++;
                if(O === 3)
                gameWinner = 'O';
            }   
        }

    }

    X = 0;
    O = 0;

    if(p1.sign === gameWinner)
    {
        return p1;
    }

    if(p2.sign === gameWinner)
    {
        return p2;
    }

    let tie = false;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(gameLogic[i][j] != 0)
            {
                tie = true;

            }else
            {
                tie = false;
                return false;    
            }

        }
    }

    if(tie === true)
    {
        return tie;
    }

    return false;
}



intro();