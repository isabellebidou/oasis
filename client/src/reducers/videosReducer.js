import { FETCH_USER_VIDEOS } from "../actions/types";

export default function (state = [], action){

    switch (action.type) {
        case FETCH_USER_VIDEOS:
            return action.payload;
        default: 
        return state;
    }
}