import React from 'react'
import './Main.css'
import {useNavigate, NavLink} from 'react-router'

const Main = () => {

    const navigate = useNavigate()

    return (
        <main className='main'>
            <nav>
                <span onClick={() => navigate('/game')}>Новая игра</span>
                <NavLink to="/auth"><span>Войти</span></NavLink>
                <span onClick={() => navigate('/creators')}>Создатели</span>
                <span onClick={() => navigate('/settings')}>Настройки</span>
            </nav>
        </main>
    )
}

export default Main