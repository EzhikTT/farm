import React, { use, useState } from "react";
import FieldVegetables from "../../modules/Field";
import './Game.css'
import CellVegetable, { TypeVegetables } from "../../modules/Cell";
import Popup from "../../components/Popup/Popup";
import Select from "../../components/Select/Select";

const field = new FieldVegetables(16)

const colors = {
    [TypeVegetables.EMPTY]: "white",
    [TypeVegetables.CARROT]: "orange",
    [TypeVegetables.TOMATO]: "red",
    [TypeVegetables.POTATO]: "yellow",
    [TypeVegetables.CUCUMBER]: "green",
    [TypeVegetables.BLOCK]: "black",
}

const Game = () => {
    
    const items = [
        {label: "Морковь", value: TypeVegetables.CARROT},
        {label: "Томат", value: TypeVegetables.TOMATO},
        {label: "Картофель", value: TypeVegetables.POTATO},
        {label: "Огурец", value: TypeVegetables.CUCUMBER},
    ]

    const [cells, setCells] = useState<CellVegetable[]>(field.field)
    const [index, setIndex] = useState(-1)
    const [type, setType] = useState<TypeVegetables>(TypeVegetables.EMPTY)
    const [showPopup, setShowPopup] = useState(false)
    const [isBlockCell, setIsBlockCell] = useState(false)

    const onSeed = () => {
        field.seed(type, index)
        setCells(field.field)
    }

    const onSelect = (value: TypeVegetables) => {
        setType(value)
    }

    const onClick = (index: number) => {
        setIsBlockCell(cells[index].type === TypeVegetables.BLOCK)
        setIndex(index)
        setShowPopup(true)
    }

    const onCancel = () => {
        setShowPopup(false)
    }
    const onSubmit = () => {
        setShowPopup(false)
        onSeed()
    }

    const popupSeedBody = () => {
        return (
            <>
                <h2>Выберите СЕМЯ</h2>
                <div>
                    <Select items={items} onSelect={onSelect}/>
                </div>
            </> 
        )
    }
    const popupBlockBody = () => {
        return (
            <>
                <h2>Разблокировать слот?</h2>
            </>
        )
    }

    return (
        <main>
            <section>
                {cells.map((cell, index) => (
                    <div className="cell" 
                         onClick={() => onClick(index)}
                         style={{backgroundColor: colors[cell.type]}}>
                    </div>
                ))}
            </section>

            <Popup isShow={showPopup} onCancel={onCancel} onSubmit={onSubmit}>
                {
                    isBlockCell ? popupBlockBody() : popupSeedBody() 
                }
            </Popup>
        </main>
    )
}

export default Game