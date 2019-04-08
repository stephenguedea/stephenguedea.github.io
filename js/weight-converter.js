"use strict";

document.getElementById('output').style.visibility = 'hidden';

document.getElementById('lbsInput').addEventListener('input', function (e) {
    console.log(123);
    document.getElementById('output').style.visibility = 'visible';

    let lbs = e.target.value;
    document.getElementById('gramsOutput').innerHTML = (lbs * 453.592).toFixed(4);
    document.getElementById('kgOutput').innerHTML = (lbs * 0.453592).toFixed(6);
    document.getElementById('ozOutput').innerHTML = lbs*16;



});