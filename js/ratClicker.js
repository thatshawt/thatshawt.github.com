/*
$.getJSON("https://script.google.com/macros/s/AKfycbwpUeGOlpzzFSs3Y_uyG3Pb9pUUI5FFVZGfPahgjDFjpzk-ioA/exec/user/load?callback=?",{user:"poop"})
.done(function(data){
alert(data);
});
*/

var isNull = function(a){
if(a === null || typeof(a)==="undefined")return true;
return false;
};

//this is a private function
var doRequest = function(path, parameters,success,error){
$.getJSON("https://script.google.com/macros/s/AKfycbwpUeGOlpzzFSs3Y_uyG3Pb9pUUI5FFVZGfPahgjDFjpzk-ioA/exec" +path+ "?callback=?",parameters)
.done(function(data){
success(data);
})
.fail(function(data){
error(data);
});
};

function userLoad(params,success,error){
var paramsBASE = {user:""};
for(var param in paramsBASE){
if(isNull(params[param]))return new Error(param + " is null");
}
doRequest("/user/load",params,success,error);
}

function userSave(params,success,error){
var paramsBASE = {user:"",pass:"",data:""};
for(var param in paramsBASE){
if(isNull(params[param]))return new Error(param + " is null");
}
doRequest("/user/save",params,success,error);
}

function userBackup(params,success,error){
var paramsBASE = {user:"",pass:"",pin:""};
for(var param in paramsBASE){
if(isNull(params[param]))return new Error(param + " is null");
}
doRequest("/user/backup",params,success,error);
}

function userSignup(params,success,error){
var paramsBASE = {user:"",pass:"",pin:""};
for(var param in paramsBASE){
if(isNull(params[param]))return new Error(param + " is null");
}
doRequest("/user/signup",params,success,error);
}

function error(data){
    switch (data) {
        case "user doesnt feel too good":
        case "user feels too good":
        case "how is your password null":
        case "wrong password":
            return true;
        default:
            return false;
    }
}