let user = JSON.parse(sessionStorage.getItem("user"));
// console.log(user)
let userid, token, name, type, serverip;

if (sessionStorage.getItem("user") != null) {
    userid = user.user.name;
    name = user.user.name;
    token = user.user.token;
    type = user.user.type;
    serverip = user.user.server_ip;
} else {
    // console.log('user Null');
}

export { userid, token, name, type, serverip }
