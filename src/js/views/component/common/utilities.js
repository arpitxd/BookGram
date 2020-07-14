let manuiplationObject = {
initialKey: 'bookgram',


getKey: function (key) {
    let self = this;
    let  data = JSON.parse(localStorage.getItem(`${self.initialKey}_${key}`));
    return data;
},
setKey: function () {
    let self = this;
    return function (key, value) {
        let data = {
            time: (new Date()).getTime(),
            value: value
        }
        localStorage.setItem(`${self.initialKey}_${key}`, JSON.stringify(data))
    }
},
removeKey: function (key) {
    localStorage.removeItem(`${this.initialKey}_${key}`);
    }
}

export function setDataToLocalStorge(key, value) {
    manuiplationObject.setKey()(key, value);
}

export function getDataFromLocalStorage(key) {
    return manuiplationObject.getKey(key);
}

export function isLoginValid() {
    const currentTime = (new Date()).getTime();
    let status = false;
    if(getDataFromLocalStorage('login')){
        const lastLoggedInTime = getDataFromLocalStorage('login').time;
        status = (currentTime -  lastLoggedInTime)/ (1000 * 3600 * 24) > 1 ? false: true; 
    }
    return status;
}

export function invalidateKey(key) {
    manuiplationObject.removeKey(key);
}