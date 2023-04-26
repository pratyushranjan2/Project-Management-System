import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    SET_CANDIDATE,
    REMOVE_CANDIDATE,
} from '../constants/actionTypes';

const projects = (projects = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        case CREATE_PROJECT:
            return [...projects, action.payload];

        case UPDATE_PROJECT:
            return projects.map((project) =>
                project._id === action.payload._id ? action.payload : project
            );
        case DELETE_PROJECT:
            return projects.filter((project) => project._id !== action.payload);
        case SET_CANDIDATE:
            return projects.map((project) =>
                project._id === action.payload._id ? action.payload : project
            );
        case REMOVE_CANDIDATE:
            return projects.map((project) =>
                project._id === action.payload._id ? action.payload : project
            );
        default:
            return projects;
    }
};

export default projects;
