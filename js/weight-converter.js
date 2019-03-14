"use strict";

document.getElementById('output').style.visibility = 'hidden';

document.getElementById('lbsInput').addEventListener('input', function (e) {
    console.log(123);
    document.getElementById('output').style.visibility = 'visible';

    let lbs = e.target.value;
    document.getElementById('gramsOutput').innerHTML = (lbs/0.0022046).toFixed(2);
    document.getElementById('kgOutput').innerHTML = (lbs/2.2046).toFixed(2);
    document.getElementById('ozOutput').innerHTML = lbs*16;



});