import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
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
            return projects.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        case DELETE_PROJECT:
            return projects.filter((post) => post._id !== action.payload);
        default:
            return projects;
    }
};

export default projects;
