import React, { useEffect, useState } from "react";
import FieldVegetables from "../../modules/Field";
import './Game.css'
import CellVegetable, { TypeVegetables } from "../../modules/Cell";
import Popup from "../../components/Popup/Popup";
import Select from "../../components/Select/Select";
import { Animal, Animals, Food, FoodType, Yard } from "../../modules/Animal";

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

const foodClasses = {
    [FoodType.GRASS]: "grass",
    [FoodType.APPLE]: "apple",
    [FoodType.FOOD]: ""
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
    ANIMALS = "animals",
    FOOD = "feed",
    AOF = "aof"
}

enum Tabs {
    FOOD,
    ANIMALS
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

    const itemsFood = [
        {
            label: "Трава",
            value: FoodType.GRASS
        },
        {
            label: "Яблоко",
            value: FoodType.APPLE
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

    const [food, setFood] = useState<Food[]>(yard.newFeed)
    const [feed, setFeed] = useState<FoodType>(FoodType.FOOD)
    const [activeTab, setActiveTab] = useState<Tabs | undefined>()

    useEffect(
        () => {
            const intervalId = setInterval(
                () => {
                    for(const cell of field.cells){
                        cell.incStage()
                    }
                    yard.feeding()
                    yard.getHungry()
                    
                    setCells(field.field)
                    setAnimals(yard.newAnimals)
                    setFood(yard.newFeed)
                },
                1000
            )

            return () => {
                clearInterval(intervalId)
            }
        },
        []
    )

    // useEffect(
    //     () => {
    //         const intervalId = setInterval(
    //             () => {
    //                 yard.growingUp()
    //                 setAnimals(yard.newAnimals)
    //             },
    //             10000
    //         )

    //         return () => {
    //             clearInterval(intervalId)
    //         }
    //     },
    //     []
    // )

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
        setTypePopup(Type.AOF)
        setShowPopup(true)
    }

    const onCancel = () => {
        setShowPopup(false)
    }
    const onSubmit = () => {
        setShowPopup(false)
        setActiveTab(undefined)

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

    const onSelectFeed = (value: FoodType) => {
        setFeed(value)
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

    const popupAnimalOrFoodBody = () => {
        let title = ""
        switch(typePopup){
            case Type.ANIMALS:
                title = "Выбери своего зверя"
                break;
            case Type.FOOD:
                title = "Какой еды добавить?"
                break;
        }

        return (
            <>
                {title && <h2>{title}</h2>}
                <div className="tabs">
                    <div className={activeTab === Tabs.FOOD ? "active" : ""} onClick={() => changeTab(Tabs.FOOD)}>Feed</div>
                    <div className={activeTab === Tabs.ANIMALS ? "active" : ""} onClick={() => changeTab(Tabs.ANIMALS)}>Animals</div>
                </div>
                <div className="tab-content">
                    {activeTab === Tabs.ANIMALS && <Select items={itemsAnimals} onSelect={onSelectAnimal}/>}
                    {activeTab === Tabs.FOOD && <Select items={itemsFood} onSelect={onSelectFeed}/>}
                </div>
            </>
        )
    }

    const changeTab = (tab: Tabs) => {
        setActiveTab(tab)
        switch(tab){
            case Tabs.ANIMALS:
                setTypePopup(Type.ANIMALS)
                break
            case Tabs.FOOD:
                setTypePopup(Type.FOOD)
                break
        }
    }

    const popupBody = () => {
        switch(typePopup){
            case Type.AOF:
            case Type.ANIMALS:
            case Type.FOOD:
                return popupAnimalOrFoodBody()
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
                <div className="animals">
                    {animals.map(animal => <div className={`animal ${animalClasses[animal.type]}`}></div>)}
                </div>
                <div className="food">
                    {food.map(food => <div className={`food ${foodClasses[food.type]}`}></div>)}
                </div>
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