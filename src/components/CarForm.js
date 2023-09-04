import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { carActions } from '../redux/slices';

const CarForm = () => {
    const dispatch = useDispatch();
    const { reset, handleSubmit, register, setValue } = useForm();
    const { carForUpdate } = useSelector(state => state.cars);

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate, setValue]);

    const save = async (car) => {
        await dispatch(carActions.create({car}))
        reset();
    };

    const update = async (car) => {
        await dispatch(carActions.update({id: carForUpdate.id, car}))
        reset();
    };

    return (
        <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
            <input type="text" placeholder={'brand'} {...register('brand')} />
            <input type="text" placeholder={'price'} {...register('price')} />
            <input type="text" placeholder={'year'} {...register('year')} />
            <button>{carForUpdate ? 'Update' : 'Save'}</button>
        </form>
    );
};

export { CarForm };
