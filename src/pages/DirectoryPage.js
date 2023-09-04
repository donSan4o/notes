import React from 'react';
import { CarForm } from '../components/CarForm';
import { Cars } from '../components/Cars';
import { useSelector } from 'react-redux';
import { DirectoriesForm } from '../components/DirectoriesForm';
import { Directories } from '../components/Directories';

const DirectoryPage = () => {
    const { error, loading } = useSelector((state) => state.cars);
    return (
        <div>
            {/* <DirectoriesForm /> */}
            <Directories />

            {/* <CarForm /> */}
            {error && <span>{JSON.stringify(error)}</span>}
            {loading && <span>Loading...</span>}
            {/* <Cars /> */}
        </div>
    );
};

export { DirectoryPage };
