import React, {useState} from 'react';
import bomb from '../../public/bomb.svg';

function Minesweeper() {
    let timerId;
    const [bombs, setBombs] = useState([]);


    let timer = 0;
    let bombCounter = 10;
    let renderCells = createCells();


    function convertTime(value) {
        let minutes = Math.floor(value / 60);
        let seconds = value - minutes * 60;
        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    function updateTimer() {
        let timerEl = document.querySelector('.timer');
        let timer = timerEl.innerHTML.split(':');
        timer = Number(timer[0]) * 60 + Number(timer[1]);
        timerEl.innerHTML = convertTime(timer + 1);
    }

    function win(){
        document.querySelector('.reset').innerHTML = '🥳';
    }


    function RenderRows(props) {
        let rows = props.rows;
        const [state, setState] = useState('cell');


        function flagField(event) {
            let arrBombs = props.bombs;

            event.preventDefault();
            let counterEl = document.querySelector('.counter');

            if (event.target.className === 'cell') {
                if (counterEl.innerHTML >= 1) {
                    event.target.className = state + ' target';
                    counterEl.innerHTML--;
                }
            } else if (event.target.className === 'cell target') {
                event.target.className = 'cell';
                counterEl.innerHTML++;
            }

            if(document.querySelectorAll('.fired').length===0 && document.querySelectorAll('.target').length>=9){

                let correctCount = 0;
                for (let i = 0; i < 72; i++) {
                    if (arrBombs.includes(i)) {
                        if (document.querySelectorAll('.field .row button')[i].className==='cell target') {
                            correctCount++
                        }
                    }
                }
                if(correctCount===10){
                    win();
                    clearInterval(timerId);
                }
            }

        }


        function singleCheck(elemNumber, arrBombs) {

            if (!document.querySelectorAll('.cell')[elemNumber] || document.querySelectorAll('.cell')[elemNumber].className !== 'cell') {
                return;
            }

            if (elemNumber < 0 || elemNumber > 71) {
                return;
            }
            let mineCount = '';
            if (arrBombs.includes(elemNumber - 1)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber + 1)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber + 7)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber + 8)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber + 9)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber - 7)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber - 8)) {
                mineCount++;
            }
            if (arrBombs.includes(elemNumber - 9)) {
                mineCount++;
            }
            document.querySelectorAll('.cell')[elemNumber].innerHTML = mineCount;
            document.querySelectorAll('.cell')[elemNumber].className = state + ' checked';
            if (mineCount <= 0) {
                if (document.querySelectorAll('.cell')[elemNumber - 8] && document.querySelectorAll('.cell')[elemNumber - 8].className === 'cell') {
                    singleCheck(elemNumber - 8, arrBombs);
                }
                if (document.querySelectorAll('.cell')[elemNumber + 8] && document.querySelectorAll('.cell')[elemNumber + 8].className === 'cell') {
                    singleCheck(elemNumber + 8, arrBombs);
                }
                if (document.querySelectorAll('.cell')[elemNumber - 1] && document.querySelectorAll('.cell')[elemNumber - 1].className === 'cell') {
                    singleCheck(elemNumber - 1, arrBombs);
                }
                if (document.querySelectorAll('.cell')[elemNumber + 1] && document.querySelectorAll('.cell')[elemNumber + 1].className === 'cell') {
                    singleCheck(elemNumber + 1, arrBombs);
                }
            }

        }

        function revealAllMines(arrBombs) {
            for (let i = 0; i < 72; i++) {
                if (arrBombs.includes(i)) {
                    if (document.getElementsByClassName('cell')[i]) {
                        document.getElementsByClassName('cell')[i].className = 'cell fired';
                    }
                }
            }
        }



        function checkField(event) {

            let elemNumber = Number(event.target.attributes[0].value);
            let arrBombs = props.bombs;
            if(document.querySelectorAll('.field .row button')[elemNumber].className==='cell target'){
                return;
            }
            if(document.querySelectorAll('.fired').length===0 && document.querySelectorAll('.target').length===10){

                let correctCount = 0;
                for (let i = 0; i < 72; i++) {
                    if (arrBombs.includes(i)) {
                        if (document.querySelectorAll('.field .row button')[i].className==='.cell target') {
                            correctCount++
                        }
                    }
                }
                if(correctCount===10){
                    win();
                }
            }
            if (document.querySelectorAll('.checked').length === 0 && document.querySelectorAll('.fired').length === 0) {
                if (arrBombs.includes(elemNumber)) {
                    reset();
                }
                timerId = setInterval(updateTimer, 1000);
            }

            if (arrBombs.includes(elemNumber)) {

                clearInterval(timerId);
                revealAllMines(arrBombs);
                document.querySelector('.reset').innerHTML='😕';
                event.target.className = state + ' fired';
            } else {
                document.querySelector('.reset').innerHTML='🤩';

                let mineCount = '';
                for (let i = 0; i < 72; i++) {

                    if (elemNumber === 0) {

                        if (
                            i === elemNumber + 1
                            || i === elemNumber + 8
                            || i === elemNumber + 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }

                    } else if (elemNumber === 7) {

                        if (
                            i === elemNumber - 1
                            || i === elemNumber + 8
                            || i === elemNumber + 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }

                    } else if (elemNumber === 71) {
                        if (
                            i === elemNumber - 1
                            || i === elemNumber - 8
                            || i === elemNumber - 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }
                    } else if (elemNumber === 64) {
                        if (
                            i === elemNumber + 1
                            || i === elemNumber - 8
                            || i === elemNumber - 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }
                    } else if (
                        elemNumber === 8
                        || elemNumber === 16
                        || elemNumber === 24
                        || elemNumber === 32
                        || elemNumber === 40
                        || elemNumber === 48
                        || elemNumber === 56
                    ) {
                        if (
                            i === elemNumber + 1
                            || i === elemNumber - 7
                            || i === elemNumber - 8
                            || i === elemNumber + 8
                            || i === elemNumber + 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }
                    } else if (
                        elemNumber === 15
                        || elemNumber === 23
                        || elemNumber === 31
                        || elemNumber === 39
                        || elemNumber === 47
                        || elemNumber === 55
                        || elemNumber === 63
                    ) {
                        if (
                            i === elemNumber - 1
                            || i === elemNumber + 7
                            || i === elemNumber + 8
                            || i === elemNumber - 8
                            || i === elemNumber - 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }
                    } else if (
                        elemNumber === 1
                        || elemNumber === 2
                        || elemNumber === 3
                        || elemNumber === 4
                        || elemNumber === 5
                        || elemNumber === 6
                    ) {

                        if (
                            i === elemNumber - 1
                            || i === elemNumber + 1
                            || i === elemNumber + 7
                            || i === elemNumber + 8
                            || i === elemNumber + 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }

                    } else if (
                        elemNumber === 65
                        || elemNumber === 66
                        || elemNumber === 67
                        || elemNumber === 68
                        || elemNumber === 69
                        || elemNumber === 70
                    ) {

                        if (
                            i === elemNumber - 1
                            || i === elemNumber + 1
                            || i === elemNumber - 7
                            || i === elemNumber - 8
                            || i === elemNumber - 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }

                    } else {
                        if (
                            i === elemNumber - 1
                            || i === elemNumber + 1
                            || i === elemNumber + 7
                            || i === elemNumber + 8
                            || i === elemNumber + 9
                            || i === elemNumber - 7
                            || i === elemNumber - 8
                            || i === elemNumber - 9
                        ) {
                            if (arrBombs.includes(i)) {
                                mineCount++;
                            }

                        }
                    }


                    event.target.innerHTML = mineCount;
                }
                if (mineCount === '') {
                    //openCells(elemNumber, arrBombs);
                    if (elemNumber === 0) {
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);

                    } else if (elemNumber === 7) {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);
                    } else if (elemNumber === 71) {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                    } else if (elemNumber === 64) {
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                    } else if (
                        elemNumber === 8
                        || elemNumber === 16
                        || elemNumber === 24
                        || elemNumber === 32
                        || elemNumber === 40
                        || elemNumber === 48
                        || elemNumber === 56
                    ) {
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                    } else if (
                        elemNumber === 15
                        || elemNumber === 23
                        || elemNumber === 31
                        || elemNumber === 39
                        || elemNumber === 47
                        || elemNumber === 55
                        || elemNumber === 63
                    ) {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                    } else if (
                        elemNumber === 1
                        || elemNumber === 2
                        || elemNumber === 3
                        || elemNumber === 4
                        || elemNumber === 5
                        || elemNumber === 6
                    ) {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);
                    } else if (
                        elemNumber === 65
                        || elemNumber === 66
                        || elemNumber === 67
                        || elemNumber === 68
                        || elemNumber === 69
                        || elemNumber === 70
                    ) {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                    } else {
                        singleCheck(elemNumber - 1, arrBombs);
                        singleCheck(elemNumber + 1, arrBombs);
                        singleCheck(elemNumber - 8, arrBombs);
                        singleCheck(elemNumber + 8, arrBombs);
                    }

                }
                event.target.className = state + ' checked';
            }


        }

        const items = rows.map((value, index) => {
            let i = props.index * 8 + index;
            return (
                <button data-id={i} onContextMenu={flagField} onClick={checkField} className={state}
                        key={i}></button>
            );
        });
        return (<div className="row">{items}</div>);
    }

    function bombsArr(count) {
        let arr = [];
        while (arr.length < count) {
            let number = Math.floor(Math.random() * 71);
            if (!arr.includes(number)) {
                arr.push(number);
            }
        }
        return arr;
    }

    const reset = () => {
        createCells();
        setBombs(bombsArr);
        clearInterval(timerId);
        document.querySelector('.reset').innerHTML='🙂';
        document.querySelector('.timer').innerHTML = '0:00';
        document.querySelector('.counter').innerHTML = '10';
    }


    function createCells() {

        const rows = new Array(8).fill('');
        const columns = new Array(9).fill('');
        const bombsArray = bombsArr(10).sort(function (a, b) {
            return a - b;
        });

        return columns.map((value, index) => {
            return (<RenderRows bombs={bombsArray} key={index} index={index} rows={rows}/>);
        });
    }


    return (
        <div className="minesweeper">
            <div className="control-panel">
                <div className="description">
                    Minesweeper <img className="bomb" width="30" height="30" alt="Minesweeper" src={bomb}/>
                </div>
                <div className="controls">
                    💣<span className="counter">{bombCounter}</span>
                    <button onClick={reset} className="reset">🙂</button>
                    <span className="timer">{convertTime(timer)}</span>
                </div>
            </div>
            <div className="field">{renderCells}</div>
        </div>
    );
}

export default Minesweeper;