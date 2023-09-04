import { urls } from '../constants';
import { carsAPIService } from './axios.service';

const carService = {
    getAll: () => carsAPIService.get(urls.cars.cars),
    create: (car) => carsAPIService.post(urls.cars.cars, car),
    updateById: (id, car) => carsAPIService.put(urls.cars.byId(id), car),
    deleteById: (id) => carsAPIService.delete(urls.cars.byId(id)),
};

export { carService };
