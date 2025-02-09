import React, { useEffect, useState } from "react";
import FieldVegetables from "../../modules/Field";
import './Game.css'
import CellVegetable, { TypeVegetables } from "../../modules/Cell";
import Popup from "../../components/Popup/Popup";
import Select from "../../components/Select/Select";
import { Animal, Animals, Yard } from "../../modules/Animal";

const field = new FieldVegetables(16)
const yard = new Yard()

const colors = {
    [TypeVegetables.EMPTY]: "white",
    [TypeVegetables.CARROT]: "orange",
    [TypeVegetables.TOMATO]: "red",
    [TypeVegetables.POTATO]: "yellow",
    [TypeVegetables.CUCUMBER]: "green",
    [TypeVegetables.BLOCK]: "black",
}

const animalClasses = {
    [Animals.COW]: "cow",
    [Animals.PIG]: "pig",
    [Animals.ANIMAL]: ""
}

const names = {
    [TypeVegetables.CARROT]: "Морковь",
    [TypeVegetables.TOMATO]: "Томат",
    [TypeVegetables.POTATO]: "Картофель",
    [TypeVegetables.CUCUMBER]: "Огурец",
    [TypeVegetables.EMPTY]: "",
    [TypeVegetables.BLOCK]: "",
}

enum Type {
    VEGETABLES = "vegetables",
    ANIMALS = "animals"
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

    const itemsAnimals = [
        {
            label: "Корова",
            value: Animals.COW
        },
        {
            label: "Свинья",
            value: Animals.PIG
        },
    ]

    const [cells, setCells] = useState<CellVegetable[]>(field.field)
    const [index, setIndex] = useState(-1)
    const [type, setType] = useState<TypeVegetables>(TypeVegetables.EMPTY)
    const [showPopup, setShowPopup] = useState(false)
    const [isBlockCell, setIsBlockCell] = useState(false)

    const [animals, setAnimals] = useState<Animal[]>(yard.newAnimals)
    const [animal, setAnimal] = useState<Animals>(Animals.ANIMAL)
    const [typePopup, setTypePopup] = useState<Type>() 

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

    const onAddAnimal = () => {
        yard.addAnimal(animal)
        setAnimals(yard.newAnimals)
    }

    const onSelect = (value: TypeVegetables) => {
        setType(value)
    }

    const onClick = (index: number) => {
        setTypePopup(Type.VEGETABLES)
        setIsBlockCell(cells[index].type === TypeVegetables.BLOCK)
        setIndex(index)
        setShowPopup(true)
    }

    const onClickYard = () => {
        setTypePopup(Type.ANIMALS)
        setShowPopup(true)
    }

    const onCancel = () => {
        setShowPopup(false)
    }
    const onSubmit = () => {
        setShowPopup(false)

        if(typePopup === Type.VEGETABLES){
            onSeed()
        }
        else if(typePopup === Type.ANIMALS){
            onAddAnimal()
        }
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

    const onSelectAnimal = (value: Animals) => {
        setAnimal(value)
    }

    const popupAnimalBody = () => {
        return (
            <>
                <h2>Выбери своего зверя</h2>
                <div>
                    <Select items={itemsAnimals} onSelect={onSelectAnimal}/>
                </div>
            </>
        )
    }

    const popupBody = () => {
        switch(typePopup){
            case Type.ANIMALS:
                return popupAnimalBody()
            case Type.VEGETABLES:
                return isBlockCell ? popupBlockBody() : popupSeedBody()
        }
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
            <section className="yard" onClick={onClickYard}>
                {animals.map(animal => <div className={`animal ${animalClasses[animal.type]}`}></div>)}
            </section>
            <section className="house"></section>
            <section className="farmer"></section>

            <Popup isShow={showPopup} onCancel={onCancel} onSubmit={onSubmit}>
                {popupBody()}
            </Popup>
        </main>
    )
}

export default Game