import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import todoListIcon from '../../assets/todo-list-icon.png';
import './home-page.styles.css';

import Loader from '../../components/shared/loader/Loader.component';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleIconClick = () => {
        navigate('tasks');
    };

    return isLoading ? (
        <Loader />
    ) : (
        <main className="home-page">
            <h1>Welcome!</h1>
            <button onClick={handleIconClick}>
                <img src={todoListIcon} alt="" />
            </button>
        </main>
    );
};

export default HomePage;
