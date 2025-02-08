import React, { use, useEffect, useState } from "react";
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

const names = {
    [TypeVegetables.CARROT]: "Морковь",
    [TypeVegetables.TOMATO]: "Томат",
    [TypeVegetables.POTATO]: "Картофель",
    [TypeVegetables.CUCUMBER]: "Огурец",
    [TypeVegetables.EMPTY]: "",
    [TypeVegetables.BLOCK]: "",
}

const Game = () => {
    
    const [items, setItems] = useState([
        {
            label: `Морковь - x${field.seeds[TypeVegetables.CARROT]}`, 
            value: TypeVegetables.CARROT, 
            disabled: field.seeds[TypeVegetables.CARROT] <= 0
        },
        {
            label: <span>Томат - x{field.seeds[TypeVegetables.TOMATO]}</span>, 
            value: TypeVegetables.TOMATO, 
            disabled: field.seeds[TypeVegetables.TOMATO] <= 0
        },
        {
            label: <span>Картофель - x{field.seeds[TypeVegetables.POTATO]}</span>, 
            value: TypeVegetables.POTATO, 
            disabled: field.seeds[TypeVegetables.POTATO] <= 0
        },
        {
            label: `Огурец - x${field.seeds[TypeVegetables.CUCUMBER]}`, 
            value: TypeVegetables.CUCUMBER, 
            disabled: field.seeds[TypeVegetables.CUCUMBER] <= 0
        },
    ])

    const [cells, setCells] = useState<CellVegetable[]>(field.field)
    const [index, setIndex] = useState(-1)
    const [type, setType] = useState<TypeVegetables>(TypeVegetables.EMPTY)
    const [showPopup, setShowPopup] = useState(false)
    const [isBlockCell, setIsBlockCell] = useState(false)

    useEffect(
        () => {
            const intervalId = setInterval(
                () => {
                    for(const cell of field.cells){
                        cell.incStage()
                    }
                    setCells(field.field)
                },
                1000
            )

            return () => {
                clearInterval(intervalId)
            }
        },
        []
    )

    const updateItems = () => {
        const newItems = [...items]
        for(const item of newItems){
            item.label = <span>{names[item.value]} - x{field.seeds[item.value]}</span>
            item.disabled = field.seeds[item.value] <= 0
        }
        setItems(newItems)
    }

    const onSeed = () => {
        field.seed(type, index)
        setCells(field.field)
        updateItems()
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
        <main className="game">
            <section className="field">
                {cells.map((cell, index) => (
                    <div className="cell" 
                         onClick={() => onClick(index)}
                         style={{backgroundColor: cell.color}}>
                            {cell.currentStage}
                    </div>
                ))}
            </section>

            <section className="dog"></section>
            <section className="animal"></section>
            <section className="house"></section>
            <section className="farmer"></section>

            <Popup isShow={showPopup} onCancel={onCancel} onSubmit={onSubmit}>
                {
                    isBlockCell ? popupBlockBody() : popupSeedBody() 
                }
            </Popup>
        </main>
    )
}

export default Game