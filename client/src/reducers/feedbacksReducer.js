import { FETCH_FEEDBACKS } from "../actions/types";

export default function (state = [], action){

    switch (action.type) {
        case FETCH_FEEDBACKS:
            return action.payload;
        
        default: 
        return state;
    }
}