import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { directoryActions } from '../redux/slices';

const DirectoriesForm = () => {
    const dispatch = useDispatch();
    const { reset, handleSubmit, register, setValue } = useForm();
    const { directoryForUpdate } = useSelector(state => state.directories);

    useEffect(() => {
        if (directoryForUpdate) {
            setValue('name', directoryForUpdate.name)
        }
    }, [directoryForUpdate, setValue]);

    const save = async (directory) => {
        await dispatch(directoryActions.create({directory}))
        reset();
    };

    const update = async (directory) => {
        await dispatch(directoryActions.update({id: directoryForUpdate.id, directory}))
        reset();
    };

    return (
        <form onSubmit={handleSubmit(directoryForUpdate ? update : save)}>
            <input type="text" placeholder={'Name'} {...register('name')} />
            <button>{directoryForUpdate ? 'Rename' : 'Add Directory'}</button>
        </form>
    );
};

export { DirectoriesForm };
