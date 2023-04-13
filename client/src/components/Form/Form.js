import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, updateProject } from '../../actions/projects';

// Get the current id
const Form = ({ currentId, setCurrentId }) => {
    const [showForm, setShowForm] = useState(false);

    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        github: '',
        domain: '',
        members: '',
        active: false,
    });

    const dispatch = useDispatch();

    const project = useSelector((state) =>
        currentId ? state.projects.find((p) => p._id === currentId) : null
    );
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (project) setProjectData(project);
        if (currentId) setShowForm(true);
    }, [currentId, project]);

    const clear = () => {
        setCurrentId(null); //?
        setProjectData({
            title: '',
            description: '',
            github: '',
            domain: '',
            members: '',
            active: false,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(
                updateProject(currentId, {
                    ...projectData,
                    name: user?.result?.name,
                })
            );
        } else {
            dispatch(createProject({ ...projectData }));
        }
        setShowForm(false);
        clear();
    };

    const inputStyle =
        'mt-1 block w-full rounded-md dark:text-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';

    if (!user?.result?.name) {
        return (
            <div>
                <div className="text-2xl font-bold flex justify-center mb-6">
                    Welcome to Project Management System!
                </div>
                <div className="text-base flex justify-center mb-6">
                    Sign in to share your project with others!
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full text-center">
                <div className="text-2xl font-bold flex justify-center mb-2">
                    Welcome to Project Management System!
                </div>
                <div className="text-base flex justify-center mb-4">
                    Share something with others!
                </div>
                <button
                    type="button"
                    className="btn btn-primary px-4 sm:px-6 min-h-0 h-10 mb-4"
                    onClick={() => {
                        setShowForm(true);
                    }}
                >
                    Create New Project
                </button>
            </div>

            {showForm && (
                <div>
                    <div
                        tabIndex="-1"
                        aria-hidden="true"
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    onClick={() => {
                                        setShowForm(false);
                                        clear();
                                    }}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button> */}
                                <div className="py-6 px-6 lg:px-4">
                                    <div className="text-2xl font-bold">
                                        {currentId ? 'Editing' : 'Creating'} a
                                        Project
                                    </div>
                                    <div className="mt-4 w-full">
                                        <form
                                            autoComplete="off"
                                            noValidate
                                            onSubmit={handleSubmit}
                                            className="grid grid-cols-1"
                                        >
                                            <label className="block mb-6">
                                                <span>Title</span>
                                                <textarea
                                                    className={
                                                        inputStyle +
                                                        ' resize-none'
                                                    }
                                                    type="text"
                                                    rows="1"
                                                    value={projectData.title}
                                                    onChange={(e) =>
                                                        setProjectData({
                                                            ...projectData,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </label>
                                            <label className="block mb-6">
                                                <span>Description</span>
                                                <textarea
                                                    className={
                                                        inputStyle +
                                                        ' resize-none'
                                                    }
                                                    value={
                                                        projectData.description
                                                    }
                                                    rows="3"
                                                    onChange={(e) =>
                                                        setProjectData({
                                                            ...projectData,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                ></textarea>
                                            </label>
                                            <label className="block mb-6">
                                                <span>GitHub Link</span>
                                                <textarea
                                                    className={
                                                        inputStyle +
                                                        ' resize-none'
                                                    }
                                                    type="text"
                                                    rows="1"
                                                    value={projectData.github}
                                                    onChange={(e) =>
                                                        setProjectData({
                                                            ...projectData,
                                                            github: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </label>
                                            <label className="block mb-6">
                                                <span>
                                                    Domains(Separate them using
                                                    commas ',')
                                                </span>
                                                <textarea
                                                    className={
                                                        inputStyle +
                                                        ' resize-none'
                                                    }
                                                    type="text"
                                                    rows="1"
                                                    value={projectData.domain}
                                                    placeholder="domain 1, domain 2, domain 3..."
                                                    onChange={(e) =>
                                                        setProjectData({
                                                            ...projectData,
                                                            domain: e.target.value.split(
                                                                ','
                                                            ),
                                                        })
                                                    }
                                                />
                                            </label>

                                            <div className="relative flex flex-col items-left justify-left block mb-6">
                                                <div className="flex">
                                                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={
                                                                projectData.active
                                                            }
                                                            readOnly
                                                        />
                                                        <div
                                                            onClick={(e) => {
                                                                setProjectData({
                                                                    ...projectData,
                                                                    active: !projectData.active,
                                                                });
                                                            }}
                                                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                                        ></div>
                                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                                            Active Project or
                                                            not?
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <label className="block mb-2">
                                                <span className="sr-only">
                                                    Submit Button
                                                </span>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-full"
                                                >
                                                    Submit
                                                </button>
                                            </label>
                                            <label className="block">
                                                <span className="sr-only">
                                                    Clear Button
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={clear}
                                                    className="btn btn-ghost w-full"
                                                >
                                                    Clear
                                                </button>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </div>
            )}
        </>
    );
};

export default Form;
