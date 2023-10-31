export const checkUserUrl = (url) => {
    if(url){
        var mainURL = 'authkey.io';
        var localHost = 'localhost:3000';
        if (url.indexOf(localHost) !== -1 || url.indexOf(mainURL) !== -1) {
            return true
        } else {
            return false
        }
    }

}

export const dateFormate = (date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
}