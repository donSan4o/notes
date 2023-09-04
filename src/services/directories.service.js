import { urls } from '../constants';
import { directoriesAPIservice } from './axios.service';

const directoryService = {
    getAll: () => directoriesAPIservice.get(urls.directories.directories),
    create: (directory) => directoriesAPIservice.post(urls.directories.directories, directory),
    updateById: (id, directory) => directoriesAPIservice.put(urls.directories.byId(id), directory),
    deleteById: (id) => directoriesAPIservice.delete(urls.directories.byId(id)),
};

export { directoryService };
