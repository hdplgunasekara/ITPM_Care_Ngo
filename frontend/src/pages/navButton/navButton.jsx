import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navButton.css';
import Login from '../login/Login';


function NavigationButtons() {
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const buttonRows = document.querySelectorAll('.button-row');

        // Animate buttons on page load
        setTimeout(() => {
            buttonRows[0].classList.add('animate-top-left');
            buttonRows[1].classList.add('animate-bottom-right');
        }, 100);
    }, []);

    switch (selectedButton) {
        case 0:
            return <Login />
        case 1:
            return <Login />
        case 2:
            return <Login />
        case 3:
            return <Login />
        default:
            return (

                <div className="button-container">
                    <div>
                        <div className="button-row">
                            <button className="button button-blue" onClick={() => setSelectedButton(0)}>Tech</button>
                            <button className="button button-green" onClick={() => setSelectedButton(1)}>Health</button>
                        </div>
                        <div className="button-row">
                            <button className="button button-red" onClick={() => setSelectedButton(2)}>Gender</button>
                            <button className="button button-yellow" onClick={() => setSelectedButton(3)}>Education</button>
                        </div>
                    </div>
                </div>

            );
    }
}

export default NavigationButtons;
