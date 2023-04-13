import React, { useState } from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
    deleteProject,
    applyProject,
    updateProject,
} from '../../actions/projects';

const Project = ({ project, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [p, setP] = useState(project);
    const [form, setForm] = useState(project);

    const handleAdd = (candidate) => {
        console.log(candidate);
        dispatch(updateProject(project._id, form));
    };

    const handleRemove = (candidate) => {
        console.log(candidate);
        dispatch(updateProject(project._id, form));
    };

    return (
        <div className="card w-full glass">
            {/* <figure>
                <img src={project.selectedFile} alt={project._id} />
            </figure> */}
            <div className="card-body p-2 sm:p-3">
                <p className="text-lg lg:text-xl card-title text-gray-700 dark:text-gray-100">
                    {project.title}
                </p>
                <div className="flex flex-row justify-between text-sm lg:text-base text-gray-500 font-medium dark:text-gray-400">
                    <div>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {project.github}
                        </a>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-100 hidden md:block text-sm lg:text-base">
                    {project.description}
                </p>
                {project.creator === user?.result?._id && (
                    <div>
                        <br />
                        <p className="text-gray-700 dark:text-gray-100 hidden md:block text-sm lg:text-base">
                            <b>Candidates Interested:{'\n'}</b>

                            {project.candidatesInterested.map((i) => (
                                <form onSubmit={handleAdd({ i })}>
                                    &ensp;&ensp;&ensp;
                                    {i}
                                    &ensp;{' '}
                                    <button
                                        type="button"
                                        className="btn btn-green px-2 sm:px-6 min-h-0 h-6 mb-1"
                                    >
                                        Select
                                    </button>
                                    {'\n'}
                                </form>
                            ))}

                            <br />

                            <b>Candidates Working:{'\n'}</b>
                            {project.members.map((i) => (
                                <form onSubmit={handleRemove({ i })}>
                                    &ensp;&ensp;&ensp;
                                    {i}
                                    &ensp;{' '}
                                    <button
                                        type="button"
                                        className="btn btn-green px-2 sm:px-6 min-h-0 h-6 mb-1"
                                    >
                                        Remove
                                    </button>
                                    {'\n'}
                                </form>
                            ))}

                            <br />
                        </p>
                    </div>
                )}
                <div className="card-actions justify-end">
                    {project.domain.map((d) => (
                        <div
                            key={d}
                            className="badge badge-outline text-xs lg:text-sm"
                        >
                            {d}
                        </div>
                    ))}
                </div>
                <div className="card-actions flex flex-row justify-between mt-2">
                    <div className="">
                        {user?.result._id !== project.creator && (
                            <button
                                className="btn btn-primary no-animation px-2 md:px-3"
                                onClick={() => {
                                    dispatch(applyProject(project._id));
                                }} //Dispatch Interested action here.
                                disabled={!user?.result}
                            >
                                {project.candidatesInterested.find(
                                    (interested) =>
                                        interested === user?.result?.email
                                )
                                    ? 'Applied'
                                    : 'Apply'}
                                &nbsp;&nbsp;
                                <div className="text-sm md:text-base">
                                    {project.candidatesInterested.length}
                                </div>
                            </button>
                        )}
                    </div>

                    {user?.result?._id === project?.creator && (
                        <div>
                            <button
                                className="btn px-2 sm:px-3 mr-1 md:mr-2 no-animation"
                                onClick={() => setCurrentId(project._id)}
                            >
                                <RiEdit2Line className="text-base md:text-lg" />
                            </button>
                            <button
                                className="btn btn-error px-2 sm:px-3 no-animation"
                                onClick={() => {
                                    dispatch(deleteProject(project._id));
                                }}
                            >
                                <RiDeleteBin6Line className="text-base md:text-lg" />
                            </button>
                        </div>
                    )}

                    {/* <button className="mt-2 btn btn-primary">Read More</button> */}
                </div>
            </div>
        </div>
    );
};

export default Project;
