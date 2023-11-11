import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {

    const [pizza, setPizza] = useState()

    const {pizzaId} = useParams()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://35f681bb0d44f86d.mokky.dev/items/' + pizzaId)
                setPizza(data)
            } catch (error) {
                alert('ошибка при получении пиццы')
            }
        }
        fetchPizza()
    }, [])
    

    if(!pizza) {
        return 'Загрузка...'
    }

    return (
        <div className='container'>
             <img src={pizza.imageUrl} />
             <h2>{pizza.title}</h2>
             <h4>{pizza.price} rub</h4>
        </div>
    );
};

export default FullPizza;