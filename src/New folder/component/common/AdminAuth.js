let admin =  JSON.parse(sessionStorage.getItem("admin")) || JSON.parse(sessionStorage.getItem("manager"))
// console.log(admin);
let userid, token, name, type;

if (sessionStorage.getItem("admin") || sessionStorage.getItem("manager") != null) {
    userid = admin.user.userId;
    name = admin.user.name;
    token = admin.user.token;
    type = admin.user.type;
} else {
    //console.log('admin Null');
}

export { userid, token, name, type }
