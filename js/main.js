


const cells = document.querySelectorAll(".cell");
const resetbtn = document.querySelector(".reset");
const currentturn = document.querySelector(".current-turn")
const player1score = document.querySelector(".score1")
const player2score = document.querySelector(".score2")
const draw = document.querySelector(".draw")
const messagecontent = document.querySelector(".content")
const overlay = document.getElementById("overlay")
const closebtn = document.getElementById("close")

const wincombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let turn = true;
let usedcells = [];
let winner = false;
let ties = 0;

let player1 = {
    Symbol: `<i class="fa fa-close"></i>`,
    played: [],
    score: 0
}

let player2 = {
    Symbol: `<i class="fa fa-circle-o"></i>`,
    played: [],
    score: 0
}

checkturn();

for(let i=0 ; i<9 ; i++)
{
    cells[i].addEventListener('click', () =>{
        if(isempty(i))
        {
            if(turn)
            {
                addsymbol(player1,i);
                turn = false;
                checkwin(player1);
                checkturn();
            }else{
                addsymbol(player2,i);
                turn = true;
                checkwin(player2);
                checkturn();
            }
        }else{
            alert("choose an empty cell");
        };
    });
};

function addsymbol(player, i)
{
    cells[i].innerHTML = player.Symbol;
    player.played.push(i);
    usedcells.push(i);
};

function checkwin(player)
{
    if(!winner){
        wincombos.some(combo => {
            if(combo.every(index => player.played.includes(index))){
                winner = true
                player.score++;
                showscore();
                setTimeout(showmesssage, 500, player, winner)
                reset();
            };
        });
    }

    if(!winner && usedcells.length === 9)
    {
        ties++;
        showscore();
        setTimeout(showmesssage, 500, player);
    }
};

function isempty(i)
{
    if(usedcells.includes(i)){
        return false;
    }
    return true;
}

function reset()
{
    cells.forEach(cell => {
        cell.innerHTML = '';
    });

    winner = false
    usedcells= [];
    player1.played = [];
    player2.played = [];
    turn = true;
    checkturn();
}

resetbtn.addEventListener('click', reset);

function checkturn()
{
    if(turn)
    {
        currentturn.innerHTML = player1.Symbol;
    }else{
        currentturn.innerHTML = player2.Symbol;
    }
};

function showscore()
{
    player1score.innerHTML = player1.score;
    player2score.innerHTML = player2.score;
    draw.innerHTML = ties;
};

closebtn.addEventListener('click', ()=> {
    overlay.style.display = "none";
});

function showmesssage(player, winner)
{
    overlay.style.display = "block";
    if(winner)
    {
        messagecontent.innerHTML = player.Symbol + ` is the <h2>winner</h2>`;
    }else{
        messagecontent.innerHTML = `it is a <h2>Draw</h2>`;   
    }
    reset();
};