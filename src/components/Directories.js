import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { directoryActions } from '../redux/slices';
import { Directory } from './Directory';

const Directories = () => {
    const dispatch = useDispatch();
    const { directories, trigger } = useSelector((state) => state.directories);

    useEffect(() => {
        dispatch(directoryActions.getAll());
    }, [dispatch, trigger]);
    return (
        <div>
            {directories.map((directory) => (
                <Directory key={directory.id} directory={directory} />
            ))}
        </div>
    );
};

export { Directories };
