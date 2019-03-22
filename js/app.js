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
    moneyIncrease(a) {
        this.moneyIncrease = a;
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
    costIncrease(a) {
        this.costIncrease = a;
        return this;
    }
    toJson() {
        var stuff = {};
        stuff.cost = this.cost;
        stuff.costIncrease = this.costIncrease;
        stuff.text = this.text;
        stuff.income = this.income;
        stuff.moneyIncrease = this.moneyIncrease;
        stuff.total = this.total;
        return stuff;
    }
    static fromJson(json) {
        var aRat = new Rat();
        aRat.cost = json.cost;
        aRat.costIncrease = json.costIncrease;
        aRat.text = json.text;
        aRat.income = json.income;
        aRat.moneyIncrease = json.moneyIncrease;
        aRat.total = json.total;
        return aRat;
    }
    story(a) {
        this.story = a;
    }
    getFullText() {
        return (this.text + "$" + numberWithCommas(Decimal.mul(this.cost, getBuyCount())));
    }
    getStory() {
        return this.story;
    }
    getStats() { //total,cost,money
        return "Money: " + numberWithCommas(Decimal.mul(this.income, this.total)).toString() + " Amount: " + this.total;
    }
}

data.rats = {};

data.rats.thiccRat = new Rat().cost("10").costIncrease(10).income("1").moneyIncrease("1").text("One Thic Ratt | ");
data.rats.hazmatRat = new Rat().cost("10000").costIncrease(10000).income("5000").moneyIncrease("1000").text("Hazmat Rat | ");
data.rats.cdcRat = new Rat().cost("1000000").costIncrease(1000000).income("500000").moneyIncrease("100000").text("CDC Rat | ");
data.rats.stripperRat = new Rat().cost("999999999999").costIncrease(999999999999).income("499999999999").moneyIncrease("99999999999.9").text("Stripper Rat | ");
data.rats.obamaRat = new Rat().cost("57000").costIncrease(57000).income("28500").moneyIncrease("5700").text("President Barat | ");
data.rats.ratrump = new Rat().cost("57000").costIncrease(57000).income("28500").moneyIncrease("5700").text("President Ratrump | ");
data.rats.loanRat = new Rat().cost("1").costIncrease(1).income("1").moneyIncrease("0.10").text("son of a million rats Rat | ");
data.rats.gambinoRat = new Rat().cost("999999999999999").costIncrease(999999999999999).income("49999999999999").moneyIncrease("99999999999999.9").text("Gambino Rat | ");

data.rats.thiccRat.story("He thicc");
data.rats.hazmatRat.story("went sicko mode after eating a shart");
data.rats.cdcRat.story("ratTs");
data.rats.stripperRat.story("makes a living off state of the art machine learning techniques");
data.rats.obamaRat.story("pretty cool guy");
data.rats.ratrump.story("likes to build massive walls");
data.rats.loanRat.story("looks at exponential functions all day, weirdo");
data.rats.gambinoRat.story("aw rfik");

var dataCopy = copy(data);

function getBuyCount() {
    var a = $("#ratBuyerCount").val();
    if (isNull(a) || isEmpty(a) || a < 1) {
        return 1;
    } else {
        return a;
    }
}

function setLogin(user, pass) {
    localStorage.setItem("data", JSON.stringify({
        user: user,
        pass: pass
    }));
}

function getLogin() {
    var a = JSON.parse(localStorage.getItem("data"));
    if (isNull(a) || isNull(a.user)) {
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
    if (loading) {
        alertify.error("cannot save while loading");
        return;
    }
    var loginInfo = getLogin();
    loginInfo.data = btoa(JSON.stringify(data));
    if (isNull(loginInfo)) {
        alertify.error("login/signup before saving");
        return;
    }
    $("#saveBtn").text("saving...");
    userSave(loginInfo, function (data) {
        alertify.success("saved!");
        $("#saveBtn").text("Save rat progress");
    }, function () {
        alertify.error("error!");
    });
    //localStorage.setItem('data', LZString.compress(btoa(JSON.stringify(data))) ); good old days
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
        json = JSON.parse(atob((json64)));
    } catch (megaError) {
        console.log(megaError);
        loading = false;
        return;
    }
    console.log(json);
    for (var key in json) {
        if (key === "rats") continue;
        if (isNull(json[key])) continue;
        data[key] = json[key];
    }
    console.log(json, data);
    var ratData = json.rats;
    if (isNull(ratData)) return;
    for (var key2 in data.rats) {
        if (isNull(ratData[key2])) continue;
        if (isNull(ratData[key2].income)) ratData[key2].income = "0";
        var text = dataCopy.rats[key2].text;
        var story = dataCopy.rats[key2].story;
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
    for (var key in dataCopy.rats) {
        if (isNull(dataCopy.rats[key])) continue;
        var rat = dataCopy.rats[key];
        $("#" + key).text(rat.getFullText());
    }
}

function login(user, pass, status) {
    userLoad({
        user: user,
        pass: pass
    }, function (data) {
        if (error(data)) {
            alertify.error(data);
            return;
        }
        loadSaveData(data);
        setLogin(user, pass);
        alertify.success("loaded!");
    }, function () {
        alertify.error("naw");
    });
    $("#pass").text("yuhyuhyuh");
}

var brokeMessages = ["ur broke sir", "no monei", "no", "frikin heck",
    "stop", "bruh moment", "E", "F", "cmon dood", "no me", "frike", "deletus moneyus",
    "hola hola get dolla", "share with ur freidns", "this is a typo", "step on a crack break moma's back",
    "cligga", "squigga", "u dont want da smok", "drugs are bad", "do think", "watch ads or something",
    "buy something cheaper", "happy(t)=dminecraft(t)/dbad(t)"
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
        var buyCount = getBuyCount();
        var resultCost = Decimal.mul(dRatCost, Decimal.pow("1.01",buyCount-1));
        if (buyCount < 1) buyCount = 1;

        //console.log(clickedRat, buyCount);

        if (dRatCost.times(buyCount).gt(data.money)) {
            alertify.error(getRand(brokeMessages));
        } else {
            data.money = dMoney.sub(resultCost); //subtract your money by rat cost
            data.mps = Decimal.add(data.mps, dRatIncome.times(buyCount)); //increase your mps by rat income
            clickedRat.cost = resultCost; //make the rats cost
            //clickedRat.income = dRatIncome.add(Decimal.mul(clickedRat.moneyIncrease, buyCount),dRatIncome);
            clickedRat.total = Decimal.add(clickedRat.total, buyCount);
            data.ratsTotal = Decimal.add(data.ratsTotal, buyCount);
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
        if (((now - lastSave) / 1000) > 5) { //5 second delay
            saveData();
        } else {
            alertify.error("a little too fast mah boi");
        }
        lastSave = Date.now();
    });

    $("#loginHelp").click(function () {
        alertify.confirm("When you make a new account(signup) you have to supply everything, username, password, and pin. But when you are just logging in all you need is your username and password, no pin needed.");
    });

    $("#submitLogin").click(function () {
        var pass = $("#pass").val();
        var user = $("#username").val();

        if (isEmpty(user)) {
            console.log(user);
            alertify.error("username is empty");
        } else if (isEmpty(pass)) {
            alertify.error("password is empty");
        } else {
            login(user, pass);
        }
    });

    $("#submitSignup").click(function () {
        var pass = $("#pass").val();
        var rePass = $("#rePass").val();
        var username = $("#username").val();
        var pin = $("#pin").val();

        if (isEmpty(pass)) {
            alertify.error("password is empty");
        } else if (isEmpty(rePass)) {
            alertify.error("confirm the password");
        } else if (isEmpty(username)) {
            alertify.error("username is empty");
        } else if (isEmpty(pin)) {
            alertify.error("pin is empty");
        } else if (rePass !== pass) {
            alertify.error("passwords dont match");
        } else {
            console.log(pass, pin);
            userSignup({
                user: username,
                pass: pass,
                pin: pin
            }, function (data) {
                login(username, pass);
                alertify.success(data);
            }, consoleLog);
        }
    });

    $("#logout").click(function () {
        setLogin();
    });

});

var topMsg = ["ur rats are worldwide buddy", "rats are taking all our jobs",
    "rat epidemic threatens humanity", "ratS",
    "somebody once told me", "сука крыса", "indefinite integral of the cube root of tan x, dx. have fun with that",
    "the rats are in ur house and they stinkyy", "i shouldd make roblox rat simulator", "sub to pewdiepie", "poor russians dont have internet",
    "cuba needs to be blessed with da rats", "Unchi ratto?!", "Ich bin ein Rat", "We are rats. We love rats. Rats love us.",
    "Ratosis - natural phenomenon when rat quantum tunnels through physical realm and transcends all other rats and grants him God-like power",
    "Cheese - a rats favorite meal", "chEesey", "May the rAt be with you...", "T-Frik",
    "rat shart - similar to cheese except many times stronger. CAUTION do not overdose rats with sharts",
    "make sewers great again", "rat care",
    "go to college for biggest brain", "big brain care", "see rat, say rat", "Ill seE YOu, aROUNd thE ReEF",
    "cant wait till pi day", "pi is pretty big", "somehow i wilt be tracking you",
    "get good grades please", "merch", "jake paul more like boiled frop", "rarted fropsticle",
    "S in front of G", "this is the culmination of hours of coding", "3d tic tac toe is lit",
    "try strategy its cool", "think bout it", "bruh emoji", "the Rat giveth, he also taketh",
    "how does a rat democracy sound?", "why does my dog keep eating the sofa",
    "rats fill you with determination!", "thiNK", "idk bout that", "just add: 'idk tho'",
    "dont tell strangers where you sleep please", "how to be ironically ironic",
    "the minions are immortal curses", "minions are yellow and pill shaped",
    "organized government in minecraft", "invest your money please",
    "supply and demand rule the nine rat realms", "do rats know about a possible multiverse?",
    "rats may just be deformations in space caused by the minions", "ik this sounds crazy but...E",
    "if einstein is so smart then why is he dead? huh tell me?", "exercise helps a big brain out",
    "idk why but watermelon tastes good", "why does light run so fast, like slow down lol",
    "light starts with an L thats why i never open my eyes", "B R A I N E X P A N D"
];

function changeMessage() {
    $("#topbar").text(getRand(topMsg));
}

var ratImgs = ["Chef_Rat.png", "howard.png", "mockey.jpg", "MOCKEYRAT.jpg", "Party_Rat.png", "Rat.png",
    "ratTrump.jpg", "Yeehaw_Rat.png"
];

function changePicture() {
    $("#randomRat").attr("src", "images/" + getRand(ratImgs));
}

if (!isNull(getLogin())) {
    var loginInfo = getLogin();
    login(loginInfo.user, loginInfo.pass);
}

var fps = 1000 / 30;

function main() {
    if (loading) {
        $("#money").text("loading...");
        return;
    }
    var loginInfo = getLogin();
    if (!isNull(loginInfo)) {
        $("#loggedIn").text("logged in as " + loginInfo.user);
        $("#logoutDiv").attr("style", "");
    } else {
        $("#logoutDiv").attr("style", "visibility: hidden;");
    }
    $(".ratBtn").each(function () {
        var clickedRat = data.rats[this.id];
        $(this).text(clickedRat.getFullText());
    });
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
