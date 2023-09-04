import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts';
import { DirectoryPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'directories'}/>}/>
                <Route path={'directories'} element={<DirectoryPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
