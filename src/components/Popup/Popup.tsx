import React, { PropsWithChildren } from "react";
import "./Popup.css"

type Props = {
    isShow: boolean
    onCancel: () => void
    onSubmit: () => void
} & PropsWithChildren

const Popup = (props: Props) => {
    return (
        <div className={"background " + (props.isShow ? "" : "hidden")}>
            <div className="popup">
                <div className="body">
                    {props.children}
                </div>
                <footer>
                    <button onClick={props.onCancel}>cancel</button>
                    <button onClick={props.onSubmit}>submit</button>
                </footer>
            </div>
        </div>
    )
}

export default Popup