var data = {};

data.mps = "0";
data.mpc = "1";
data.multiplier = 1;
data.money = "0";
data.ratsTotal = 0;
data.rebirthRats = "0";

var localStorage = window.localStorage;
var loading = true;

class Rat {
    constructor() {
        this.total = 0;
    }
    income(a) {
        this.income = a;
        return this;
    }
    moneyPercent(a) {
        this.moneyPercent = a;
        return this;
    }
    text(a) {
        this.text = a;
        return this;
    }
    cost(a) {
        this.cost = a;
        return this;
    }
    costPercent(a) {
        this.costPercent = a;
        return this;
    }
    toJson() {
        var stuff = {};
        stuff.cost = this.cost;
        stuff.costPercent = this.costPercent;
        stuff.text = this.text;
        stuff.income = this.income;
        stuff.moneyPercent = this.moneyPercent;
        stuff.total = this.total;
        return stuff;
    }
    static fromJson(json) {
        var aRat = new Rat();
        aRat.cost = json.cost;
        aRat.costPercent = json.costPercent;
        aRat.text = json.text;
        aRat.income = json.income;
        aRat.moneyPercent = json.moneyPercent;
        aRat.total = json.total;
        return aRat;
    }
    story(a) {
        this.story = a;
    }
    getFullText() {
        return (this.text + "$" + numberWithCommas(this.cost));
    }
    getStory() {
        return this.story;
    }
    getStats() { //total,cost,money
        return "Money: " + numberWithCommas(Decimal.mul(this.income, this.total)).toString() + " Amount: " + this.total;
    }
}

data.rats = {};

data.rats.thiccRat = new Rat().cost("10").costPercent(1.05).income("1").moneyPercent(1.01).text("One Thic Ratt | ");
data.rats.hazmatRat = new Rat().cost("10000").costPercent(1.05).income("5000").moneyPercent(1.01).text("Hazmat Rat | ");
data.rats.cdcRat = new Rat().cost("1000000").costPercent(1.05).income("500000").moneyPercent(1.01).text("CDC Rat | ");
data.rats.stripperRat = new Rat().cost("999999999999").costPercent(1.05).income("499999999999.5").moneyPercent(1.01).text("Stripper Rat | ");
data.rats.obamaRat = new Rat().cost("57000").costPercent(1.05).income("28500").moneyPercent(1.01).text("President Barat | ");
data.rats.ratrump = new Rat().cost("57000").costPercent(1.05).income("28500").moneyPercent(1.01).text("President Ratrump | ");
data.rats.loanRat = new Rat().cost("1").costPercent(1.5).income("1").moneyPercent(1.1).text("son of a million rats Rat | ");
data.rats.gambinoRat = new Rat().cost("999999999999999").costPercent(1.05).income("499999999999999.5").moneyPercent(1.01).text("Gambino Rat | ");

data.rats.thiccRat.story("He thicc");
data.rats.hazmatRat.story("went sicko mode after eating a shart");
data.rats.cdcRat.story("ratTs");
data.rats.stripperRat.story("makes a living off state of the art machine learning techniques");
data.rats.obamaRat.story("pretty cool guy");
data.rats.ratrump.story("likes to build massive walls");
data.rats.loanRat.story("looks at exponential functions all day, weirdo");
data.rats.gambinoRat.story("aw rfik");

function setLogin(user, pass){
    localStorage.setItem("data",JSON.stringify({user:user,pass:pass}));
}

function getLogin(){
    var a = JSON.parse(localStorage.getItem("data"));
    if(isNull(a) || isNull(a.user)){
        return null;
    }
    return JSON.parse(localStorage.getItem("data"));
}

function loadButtons() {
    for (var key in data.rats) {
        if (isNull(data.rats[key])) continue;
        var ratName = key;
        var ratText = data.rats[key].getFullText();
        var ratCode = "<button class=\"btn btn-info ratBtn\" id=\"" + ratName + "\">" + ratText + "</button><br>";
        $(".shop").append(ratCode);
    }
}

function saveData() {
    var loginInfo = getLogin();
    loginInfo.data = btoa(JSON.stringify(data));
    if(isNull(loginInfo)){
        alertify.error("login/signup before saving");
        return;
    }
    userSave(loginInfo, function(data){
        alertify.success("saved!");
    },function(){
        alertify.error("error!");
    });
    //localStorage.setItem('data', LZString.compress(btoa(JSON.stringify(data))) );
    console.log("saved");
}

function loadSaveData(json64) {
    loading = true;
    console.log(json64);
    if (isNull(json64) || isEmpty(json64) || json64 === "[object Object]") {
        loading = false;
        return;
    }
    var json;
    try {
        json = JSON.parse(atob(json64));
    } catch (rartedError) { //we are going to assume that the thing isnt LZString or something idk
        try {
            json = JSON.parse(atob((json64)));
        } catch (megaError) {
            console.log(megaError);
            loading = false;
            return;
        }
    }
    console.log(json);

    for (var key in json) {
        if (key === "rats") continue;
        if (isNull(isNull(json[key]))) continue;
        data[key] = json[key];
    }
    var ratData = json.rats;
    if (isNull(ratData)) return;
    for (var key2 in data.rats) {
        if (isNull(ratData[key2])) continue;
        if (isNull(ratData[key2].income)) ratData[key2].income = "0";
        var text = data.rats[key2].text;
        var story = data.rats[key2].story;
        data.rats[key2] = Rat.fromJson(ratData[key2]);
        data.rats[key2].text = text;
        data.rats[key2].story = story;
    }
    loading = false;
}

function updateStats(stats) {
    $("#ratName").text(stats.name);
    $("#ratStory").text(stats.story);
    $("#ratStats").text(stats.stats);
}

function updateVals() {
    for (var key in data.rats) {
        if (isNull(data.rats[key])) continue;
        var rat = data.rats[key];
        $("#" + key).text(rat.getFullText());
    }
}

function login(user, pass, status){
    userLoad({
        user: user,
        pass: pass
    }, function (data) {
        console.log(data);
        if(error(data)){
            status.text(data);
            return;
        }
        loadSaveData(data);
        setLogin(user, pass);
        alertify.success("loaded!");
    }, function(){
        status.text("baddy no no");
    });
}

var brokeMessages = ["ur broke sir", "no monei", "no", "frikin heck",
    "stop", "bruh moment", "E", "F", "cmon dood", "no me", "frike", "deletus moneyus"
];
var timePassed = 0;
var d;
var oldTime;
$(function () {
    $(window).focus(function () {
        d = new Date();
        timePassed = d.getTime() - oldTime;
    }).blur(function () {
        d = new Date();
        oldTime = d.getTime();
    });
    loadButtons();
    updateVals();
    $("#randomRat").click(function () {
        data.money = Decimal.add(data.money, data.mpc);
    });
    $(".ratBtn").click(function (e) {
        var clickedRat = data.rats[e.target.id];
        var dRatIncome = new Decimal(clickedRat.income);
        var dRatCost = new Decimal(clickedRat.cost);
        var dMoney = new Decimal(data.money);

        if (dRatCost.gt(data.money)) {
            alertify.error(getRand(brokeMessages));
        } else {
            data.money = dMoney.sub(clickedRat.cost);
            data.mps = Decimal.add(data.mps, clickedRat.income);
            clickedRat.cost = dRatCost.times(clickedRat.costPercent);
            clickedRat.income = dRatIncome.times(clickedRat.moneyPercent);
            clickedRat.total += 1;
            data.ratsTotal++;
            $(e.target).text(clickedRat.getFullText());
        }
    });
    $(".ratBtn").hover(function (e) { //hover in
        var clickedRat = data.rats[e.target.id];
        updateStats({
            name: e.target.id,
            story: clickedRat.getStory(),
            stats: clickedRat.getStats()
        });
    }, function (e) { //hover out
        updateStats({
            name: "",
            story: "",
            stats: ""
        });
    });
    var lastSave = 0;
    $("#saveBtn").click(function () {
        var now = Date.now();
        if(((now - lastSave)/1000)>5){//5 second delay
            saveData();
        }else{
            alertify.error("a little too fast mah boi");
        }
        lastSave = Date.now();
    });

    $("#loginHelp").click(function () {
        alertify.confirm("When you make a new account(signup) you have to supply everything, username, password, and pin. But when you are just logging in all you need is your username and password, no pin needed.");
    });

    $("#submitLogin").click(function () {
        var status = $("#loginStatus");

        var pass = $("#pass").val();
        var user = $("#username").val();

        if (isEmpty(user)) {
            console.log(user);
            status.text("username is empty");
        } else if (isEmpty(pass)) {
            status.text("password is empty");
        } else {
            login(user,pass,status);
        }
    });

    $("#submitSignup").click(function () {
        var status = $("#loginStatus");

        var pass = $("#pass").val();
        var rePass = $("#rePass").val();
        var username = $("#username").val();
        var pin = $("#pin").val();

        if (isEmpty(pass)) {
            status.text("password is empty");
        } else if (isEmpty(rePass)) {
            status.text("confirm the password");
        } else if (isEmpty(username)) {
            status.text("username is empty");
        } else if (isEmpty(pin)) {
            status.text("pin is empty");
        } else if (rePass !== pass) {
            status.text("passwords dont match");
        } else {
            console.log(pass, pin);
            userSignup({
                user: username,
                pass: pass,
                pin: pin
            }, function (data) {
                setLogin(user,login);
                status.text(data);
            }, consoleLog);
        }
    });

    $("#logout").click(function(){
        setLogin();
    });

});

var topMsg = ["ur rats are worldwide buddy", "rats are taking all our jobs",
    "rat epidemic threatens humanity", "ratS",
    "somebody once told me", "сука крыса", "indefinite integral of the cube root of tan x, dx. have fun with that",
    "the rats are in ur house and they stinkyy", "i shouldd make roblox rat simulator", "sub to pewdiepie", "poor russians dont have internet",
    "cuba needs to be blessed with da rats", "Unchi ratto?!", "Ich bin ein Rat", "We are rats. We love rats. Rats love us.",
    "Ratosis - natural phenomenon when rat quantum tunnels through physical realm and transcends all other rats and grants him God-like power",
    "Cheese - a rats favorite meal", "chEesey", "May the rAt be with you...", "T-Gay",
    "rat shart - similar to cheese except many times stronger. CAUTION do not overdose rats with sharts"
];

function changeMessage() {
    $("#topbar").text(getRand(topMsg));
}

var ratImgs = ["Chef_Rat.png","howard.png","mockey.jpg","MOCKEYRAT.jpg","Party_Rat.png","Rat.png",
"ratTrump.jpg","Yeehaw_Rat.png"];
function changePicture() {
    $("#randomRat").attr("src", "images/"+getRand(ratImgs));
}


if(!isNull(getLogin())){
    var loginInfo = getLogin();
    login(loginInfo.user, loginInfo.pass, $("#loginStatus"));
}

var fps = 1000 / 30;
function main() {
    if (loading) return;
    var loginInfo = getLogin();
    if(!isNull(loginInfo)){
        $("#loggedIn").text("logged in as " + loginInfo.user);
        $("#logoutDiv").attr("style","");
    }else{
        $("#logoutDiv").attr("style","visibility: hidden;");
    }
    $("#money").text("Moneis: $" + numberWithCommas(data.money));
    $("#mps").text("Moneies per second: $" + numberWithCommas(data.mps));
    $("#mpc").text("Money clicke : $" + numberWithCommas(data.mpc));
    $("#rats").text("u got " + numberWithCommas(data.ratsTotal) + " rats");
    if (timePassed === 0) {
        data.money = Decimal.add(data.money, (Decimal.div(data.mps, fps)));
    } else {
        console.log("time passed");
        data.money = Decimal.add(data.money, Decimal.div(data.mps * (timePassed / 1000), fps));
        timePassed = 0;
    }
}
new AdjustingInterval(changePicture, 1000 * 25).start();
new AdjustingInterval(changeMessage, 1000 * 30).start();
new AdjustingInterval(main, fps).start();
new AdjustingInterval(saveData, 1000 * 60 * 3).start();