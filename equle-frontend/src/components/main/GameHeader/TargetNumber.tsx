import React, { useState } from 'react';
import './TargetNumber.css';

function TargetNumber(props:any) {
    
    return (
        <div className="TargetNumber">
           <text>{props.number}</text>
        </div>
    );
}

export default TargetNumber;