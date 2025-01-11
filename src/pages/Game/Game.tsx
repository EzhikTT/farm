import React, { useState } from "react";
import FieldVegetables from "../../modules/Field";
import './Game.css'

const field = new FieldVegetables(16)

const Game = () => {
    
    const [cells, setCells] = useState(field.field)

    const onClick = (event, par) => {
        field.seed()
    }

    return (
        <main>
            <section>
                {cells.map((cell, index) => (
                    <div className="cell" onClick={event => onClick(event, 1)}></div>
                ))}
            </section>
        </main>
    )
}

export default Game