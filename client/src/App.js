import './App.css';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';

import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getProjects, getProjectsBySearch } from './actions/projects';

function App() {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    // as soon as currentId is updated (submit/clear form), the app is going to dispatch getProjects action
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            dispatch(getProjectsBySearch({ search }));
        } else {
            window.location.reload();
        }
        setSearch('');
    };

    return (
        <div className="bg-light-mode dark:bg-dark-mode min-h-screen">
            <Navbar
                search={search}
                setSearch={setSearch}
                handleSearchSubmit={handleSearchSubmit}
            />
            <div className="container mx-auto pt-8">
                <div className="flex justify-center">
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </div>

                <div className="mx-auto px-2 sm:px-5">
                    {/* <div className="col-span-5 sm:pr-4"> */}
                    <Projects setCurrentId={setCurrentId} />
                    {/* </div> */}
                    {/* <div className="col-span-2 px-2 sm:px-0">
          </div> */}
                </div>
            </div>
        </div>
    );
}

export default App;
