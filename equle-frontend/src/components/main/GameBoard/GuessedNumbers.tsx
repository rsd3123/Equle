import React, { useState } from 'react';
import GuessedNumberBox from './GuessedNumberBox';
import './GuessedNumbers.css';

function GuessedNumbers() {
    return (
        <div className="GuessedNumbers">
           <GuessedNumberBox value = '0'></GuessedNumberBox>
           <GuessedNumberBox value = '1'></GuessedNumberBox>
           <GuessedNumberBox value = '2'></GuessedNumberBox>
           <GuessedNumberBox value = '3'></GuessedNumberBox>
           <GuessedNumberBox value = '4'></GuessedNumberBox>
           <GuessedNumberBox value = '5'></GuessedNumberBox>
           <GuessedNumberBox value = '6'></GuessedNumberBox>
           <GuessedNumberBox value = '7'></GuessedNumberBox>
           <GuessedNumberBox value = '8'></GuessedNumberBox>
           <GuessedNumberBox value = '9'></GuessedNumberBox>
           <GuessedNumberBox value = '+'></GuessedNumberBox>
           <GuessedNumberBox value = '-'></GuessedNumberBox>
           <GuessedNumberBox value = 'x'></GuessedNumberBox>
           <GuessedNumberBox value = '%'></GuessedNumberBox>
        </div>
    );
}

export default GuessedNumbers;