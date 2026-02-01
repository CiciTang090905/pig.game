const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0;
let scoreP1 = 0;
let scoreP2 = 0;
let turn = 1;


function hold() {

  if (turn === 1) {
    scoreP1 += holdValue;
    document.getElementById(`p1-score`).style.width = scoreP1 + "%";
    document.getElementById(`p1-score`).setAttribute("aria-valuenow", scoreP1);
    document.getElementById(`p1-score`).innerText = scoreP1;
  } else {
    scoreP2 += holdValue;
    document.getElementById(`p2-score`).style.width = scoreP2 + "%";
    document.getElementById(`p2-score`).setAttribute("aria-valuenow", scoreP2);
    document.getElementById(`p2-score`).innerText = scoreP2;
  }
  clearHoldValue();
  switchTurn();
}

function endGame(winner) {
  holdBtn.disabled = true;
  rollBtn.disabled = true;
  clearHoldValue();

  const scoreBar = document.getElementById(`p${winner}-score`)
  scoreBar.style.width = "100%";
  scoreBar.setAttribute("aria-valuenow", 100);
  scoreBar.innerText = 100;

  scoreBar.style.backgroundColor = "#198754";
  scoreBar.style.color = "#fff";
  scoreBar.style.fontWeight = "700";

  scoreBar.innerText = "100 🎉";

  return;
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  if (faceValue === 1) {
    clearHoldValue();
    switchTurn();
    return;
  }

  holdValue += faceValue;
  const total = (turn === 1 ? scoreP1 : scoreP2) + holdValue;

  if (total >= 100) {
    if (turn === 1) scoreP1 += holdValue;
    else scoreP2 += holdValue;
    endGame(turn);
    return;
  }


  if (turn === 1) {
    document.getElementById("p1-hold").style.width = holdValue + "%"; //lightblue
    document.getElementById("p1-hold").setAttribute("aria-valuenow", holdValue);
    document.getElementById("p1-hold").innerText = holdValue;
  } else {
    document.getElementById(`p2-hold`).style.width = holdValue + "%";
    document.getElementById(`p2-hold`).setAttribute("aria-valuenow", holdValue);
    document.getElementById(`p2-hold`).innerText = holdValue;
  }

}

function clearHoldValue() {
  holdValue = 0;
  document.getElementById(`p${turn}-hold`).style.width = holdValue + "%"; //lightblue
  document.getElementById(`p${turn}-hold`).setAttribute("aria-valuenow", holdValue);
  document.getElementById(`p${turn}-hold`).innerText = holdValue;
}

function switchTurn() {
  turn = turn === 1 ? 2 : 1;
  document.getElementById("result").textContent = `Player-${turn} turn!`;
}
