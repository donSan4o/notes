const carsAPI = 'http://owu.linkpc.net/carsAPI/v1';
const directoriesAPI = 'http://localhost:3000';


const cars = '/cars';
const directories = '/directories';
const notices = '/notices';

const urls = {
    cars: {
        cars,
        byId: (id) => `${cars}/${id}`
    },
    directories: {
        directories,
        byId: (id) => `${directories}/${id}`
    },
    notices: {
        notices,
        byId: (id) => `${notices}/${id}`
    }
};

export {
    carsAPI,
    directoriesAPI,
    urls
}