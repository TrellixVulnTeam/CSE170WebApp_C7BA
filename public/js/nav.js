function getCurrentUser() {
    var users = localStorage.getItem("users");
    var curruser = localStorage.getItem("user");
    // check for undefined users
    if (users != undefined) 
        users = JSON.parse(users);
        return users[curruser];
}
function getUsers() {
    var users = localStorage.getItem("users");
    // check for undefined notes
    if (users != undefined) 
        return JSON.parse(users);
}

$(document).ready(function(){
    document.getElementById("nav-username").innerHTML = getCurrentUser()["name"];
})