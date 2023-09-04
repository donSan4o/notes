import axios from 'axios';
import { carsAPI } from '../constants';
import { directoriesAPI } from '../constants';

const carsAPIService = axios.create({ baseURL: carsAPI });
const directoriesAPIservice = axios.create({baseURL: directoriesAPI});

export {
    carsAPIService,
    directoriesAPIservice
}