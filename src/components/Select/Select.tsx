import React, { useEffect, useState } from "react";
import './Select.css'

type Item = {
    label: string
    value: any
}

type Props = {
    items: Item[]
    onSelect: (value: any) => void
}

const Select = (props: Props) => {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState()
    const [label, setLabel] = useState("")

    useEffect(
        () => {
            props.onSelect(value)
        },
        [value]
    )

    const onSelect = (item: Item) => {
        setValue(item.value)
        setLabel(item.label)
        setShow(false)
    }

    return (
        <div className="select">
            <div className="main" onClick={() => setShow(!show)}>{label}</div>
            <div className={"list " + (show ? "" : "hidden")}>
                {props.items.map((item, index) => (
                    <div key={`item_${index}`} 
                         onClick={() => onSelect(item)}>
                            {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select