import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { directoryActions } from '../redux/slices';


const Directory = ({directory}) => {
    const dispatch = useDispatch();
    const { reset, handleSubmit, register, setValue } = useForm();

    const { name, id } = directory;

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

    const deleteDirectory = async () => {
        dispatch(directoryActions.deleteDirectory({id}))
    }

    return (
        <form onSubmit={handleSubmit(directoryForUpdate ? update : save)}>
            <div>{id}</div>
            <div>{name}</div>
            <input type="text" placeholder={'Directory Name'} {...register('name')} />
            <button>{directoryForUpdate ? 'Rename' : 'Add Directory'}</button>
            <br/>
            <button onClick={()=> dispatch(directoryActions.setDirectoryForUpdate(directory))}>Rename</button>
            <button onClick={deleteDirectory}>Delete</button>
        </form>
    );
}

export {Directory};



