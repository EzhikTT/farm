import React, { useEffect, useState } from "react";
import './Select.css'

type Item = {
    label: string | React.ReactNode
    value: any
    disabled?: boolean
}

type Props = {
    items: Item[]
    onSelect: (value: any) => void
}

const Select = (props: Props) => {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState()
    const [label, setLabel] = useState<string | React.ReactNode>("")

    useEffect(
        () => {
            setValue(undefined)
            setLabel("")
            setShow(false)
        },
        [props.items]
    )

    useEffect(
        () => {
            if(value){
                props.onSelect(value)
            }
        },
        [value]
    )

    const onSelect = (item: Item) => {
        if(!item.disabled){
            setValue(item.value)
            setLabel(item.label)
            setShow(false)
        }
    }

    return (
        <div className="select">
            <div className="main" onClick={() => setShow(!show)}>{label}</div>
            <div className={"list " + (show ? "" : "hidden")}>
                {props.items.map((item, index) => (
                    <div key={`item_${index}`} 
                         className={item.disabled ? "disabled" : ""}
                         onClick={() => onSelect(item)}>
                            {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select