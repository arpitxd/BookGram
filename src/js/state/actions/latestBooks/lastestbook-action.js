import {getEvent} from 'basePath/views/component/common/crudoperation';
import {LATEST_JOB_SCUCCESS,LATEST_JOB_FAILURE} from "basePath/state/actions/latestBooks/action-types.js";

function dispatchSuccess(data){
    return {
        type: LATEST_JOB_SCUCCESS,
        payload : {
            isLoaded:true,
            data,
        }
    }
}

function dispatchFailure(error){
    return {
        type: LATEST_JOB_FAILURE,
        payload : {
            isLoaded:true,
            data: error,
        }
    }
}
export function getLatestBook(){
    let url = "http://localhost:9090/books/latest/";
    return function(dispatch){
        getEvent(url)
        .then(res =>{
            if (res.status == '200' || res.status == '201') {
                return res.data;
            } else {
                throw Error(`Request rejected with status ${res.status}`);
            }
        })
        .then(response => {
            dispatch(dispatchSuccess(response));
        })
        .catch(error => {
            dispatch(dispatchFailure(error));
        });

    }
}