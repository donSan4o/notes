import React from 'react';
import css from './Header.module.css';
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className={css.Header}>
            <button onClick={()=> navigate('cars')}>cars</button>
            <button >Add</button>
            <button>Add Note</button>
            <button >Remove Directory</button>
        </div>
    );
}

export {Header};
