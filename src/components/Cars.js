import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carActions } from '../redux/slices';
import { Car } from './Car';

const Cars = () => {
    const dispatch = useDispatch();
    const { cars, trigger } = useSelector((state) => state.cars);

    useEffect(() => {
        dispatch(carActions.getAll());
    }, [dispatch, trigger]);
    return (
        <div>
            {cars.map((car) => (
                <Car key={car.id} car={car} />
            ))}
        </div>
    );
};

export { Cars };
