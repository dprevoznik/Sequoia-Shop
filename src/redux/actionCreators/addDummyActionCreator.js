import {ADD_DUMMY} from './actionTypes.js';
import store from "../store.js"; // DO NOT NORMALLY LOAD STORE <- DONE FOR DEMONSTRATION PURPOSES

function addToArrayDummy(text) {
    console.log('Current State before Action is Created: ', store.getState());
    return {
        type: ADD_DUMMY,
        text: text
    }
}

export default addToArrayDummy;