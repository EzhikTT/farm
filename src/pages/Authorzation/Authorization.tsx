import React from "react";
import { useNavigate } from "react-router";

const Authorization = () => {
    const navigate = useNavigate()

    return (
        <main className="stub">
            Упс, страница еще в разработке
            <br/>
            <span onClick={() => navigate(-1)}>Назад</span>
        </main>
    )
}

export default Authorization