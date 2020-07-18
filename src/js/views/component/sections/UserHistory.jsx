import React from 'react';
import {getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
export default function UserHistory(props){
    const userName = getDataFromLocalStorage('login').value;
    let userDetailObj = getDataFromLocalStorage(userName).value;
    let userHistory = userDetailObj.lastHistory;
    //this class will give user history for upload books
    return (
        <React.Fragment>
            {Object.keys(userHistory).length > 0 && (
                <div>
                    <spane>User History</spane>
                    <ul>
                    {Object.keys(userHistory).map((key, index) => (
                        <li>
                            {userHistory[key]}
                        </li>
                    )
                    )}
                    </ul>
                </div>
            )}
            
        </React.Fragment>
    );
}