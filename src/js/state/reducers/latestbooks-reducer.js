import {LATEST_JOB_SCUCCESS,LATEST_JOB_FAILURE} from "basePath/state/actions/latestBooks/action-types.js";

const initialState = {
    data : {},
    isLoaded: false
};

function LatestBookReducer(state = initialState , {type,payload}){
    let data = state;
    switch (type) {
        case LATEST_JOB_SCUCCESS:
            data = Object.assign({},state,{...payload});
        break;

        case LATEST_JOB_FAILURE:
            data = Object.assign({},state,{...payload});
        break;

        default:
            break;

    }

    return data;
}

export default LatestBookReducer;