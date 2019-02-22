var mps = new Decimal("0");
var mpc = new Decimal("1");
var multiplier = 1;
var money = new Decimal("0");
var ratsTotal = 0;

var localStorage = window.localStorage;

class Rats{
    constructor(){
        this.total = 0;
    }
    money(a){
        this.money = new Decimal(a);
        return this;
    }
    moneyPercent(a){
        this.moneyPercent = a;
        return this;
    }
    text(a){
        this.text = a;
        return this;
    }
    cost(a){
        this.cost = new Decimal(a);
        return this;
    }
    costPercent(a){
        this.costPercent = a;
        return this;
    }
    toJson(){
        var data = {};
        data.cost = this.cost;
        data.costPercent = this.costPercent;
        data.text = this.text;
        data.money = this.money;
        data.moneyPercent = this.moneyPercent;
        data.total = this.total;
        return data;
    }
    story(a){
        this.story = a;
    }
    static fromJson(data){
        try{
            var rat = new Rats().cost(data.cost.toString())
            .costPercent(data.costPercent)
            .money(data.money.toString())
            .moneyPercent(data.moneyPercent)
            .text(data.text);
            rat.total = data.total;
            return rat;
        }catch(error){
            return vals[data];
        }
    }
    getFullText(){
        return (this.text + "$" + numberWithCommas(this.cost));
    }
    getStory(){
        return this.story;
    }
    getStats(){//total,cost,money
        return "Money: " + this.money.toString() + " Amount: "+this.total;
    }
}

var vals = {};

vals.thiccRat = new Rats().cost("10").costPercent(1.05).money("1").moneyPercent(1.01).text("One Thic Ratt | ");
vals.hazmatRat = new Rats().cost("10000").costPercent(1.05).money("5000").moneyPercent(1.01).text("Hazmat Rat | ");
vals.cdcRat = new Rats().cost("1000000").costPercent(1.05).money("500000").moneyPercent(1.01).text("CDC Rat | ");
vals.stripperRat = new Rats().cost("999999999999").costPercent(1.05).money("499999999999.5").moneyPercent(1.01).text("Stripper Rat | ");
vals.obamaRat = new Rats().cost("57000").costPercent(1.05).money("28500").moneyPercent(1.01).text("President Barat | ");
vals.ratrump = new Rats().cost("57000").costPercent(1.05).money("28500").moneyPercent(1.01).text("President Ratrump | ");
vals.loanRat = new Rats().cost("1").costPercent(1.5).money("1").moneyPercent(1.1).text("son of a million rats Rat | ");
vals.gambinoRat = new Rats().cost("999999999999999").costPercent(1.05).money("499999999999999.5").moneyPercent(1.01).text("Gambino Rat | ");

vals.thiccRat.story("He thicc");
vals.hazmatRat.story("went sicko mode after eating a shart");
vals.cdcRat.story("ratTs");
vals.stripperRat.story("makes a living off state of the art machine learning techniques");
vals.obamaRat.story("pretty cool guy");
vals.ratrump.story("likes to build massive walls");
vals.loanRat.story("looks at exponential functions all day, weirdo");
vals.gambinoRat.story("aw rfik");

function loadButtons(){
    for(var key in vals){
        if (isNull(vals[key])) continue;
        var ratName = key;
        var ratText = vals[key].getFullText();
        var ratCode = "<button class=\"ratBtn\" id=\""+ratName+"\">"+ratText+"</button><br>";
        $(".shop").append(ratCode);
    }
}

function getJsonData(){
    var json = {};
    json.mps = mps;
    json.mpc = mpc;
    json.multiplier = multiplier;
    json.money = money;
    json.ratsTotal = ratsTotal;
    return json;
}

function getRatsJson(){
    var ratTotalJson = {};
    for (var key in vals) {
        if (isNull(vals[key])) continue;
        var ratDataJson = vals[key].toJson();
        ratTotalJson[key] = ratDataJson;
    }
    return ratTotalJson;
}

function saveData(){
    var json = getJsonData();
    json.ratData = getRatsJson();
    console.log(json.ratData);
    localStorage.setItem('data',btoa(JSON.stringify(json)));
}

function loadSaveData(){
    var json64 = localStorage.getItem('data');
    if(json64 === null) return;
    var json = JSON.parse(atob(json64));
    mps = json.mps;
    mpc = json.mpc;
    multiplier = json.multiplier;
    money = json.money;
    ratsTotal = json.ratsTotal;

    var ratData = json.ratData;//we will not load corrupted data so yea
    for (var key in vals) {
        if (isNull(ratData[key])) continue;
        var text = vals[key].text;
        var story = vals[key].story;
        vals[key] = Rats.fromJson(ratData[key]);
        vals[key].text = text;
        vals[key].story = story;
    }
}

function updateStats(stats){
    $("#ratName").text(stats.name);
    $("#ratStory").text(stats.story);
    $("#ratStats").text(stats.stats);
}

function updateVals(){
    for (var key in vals) {
        if (isNull(vals[key])) continue;
        var rat = vals[key];
        $("#"+key).text(rat.getFullText());
    }
}

/*TODO: make achievements class for an array of achievements for saveing/loading
function checkAchievements(){
    for(var achievement in achievements){
        
    }
}
*/
loadSaveData();

var brokeMessages = ["ur broke sir","no monei","no","frikin heck","stop","bruh moment","E","F","cmon dood", "no u"];
var timePassed = 0;
var d;
var oldTime;
$(function(){
    $(window).focus(function() {
        d = new Date();
        timePassed = d.getTime() - oldTime;
    }).blur(function() {
        d = new Date();
        oldTime = d.getTime();
    });
    loadButtons();
    updateVals();
    $("#rat").click(function(){
        money = money.add(mpc);
    });
    $(".ratBtn").click(function(e){
        var clickedRat = vals[e.target.id];
        if(clickedRat.cost.gt(money)){
            alertify.error(getRand(brokeMessages));
        }else{
            money = money.sub(clickedRat.cost);
            mps = Decimal.add(mps,clickedRat.money);
            clickedRat.cost = clickedRat.cost.times(clickedRat.costPercent);
            clickedRat.money = clickedRat.money.times(clickedRat.moneyPercent);
            clickedRat.total += 1;
            ratsTotal++;
            $(e.target).text(clickedRat.getFullText());
        }
    });
    $(".ratBtn").hover(function(e){//hover in
        var clickedRat = vals[e.target.id];
        updateStats({name:e.target.id,
                    story:clickedRat.getStory(),
                    stats:clickedRat.getStats()});
    },function(e){//hover out
        updateStats({name:"",story:"",stats:""});
    });
    $("#saveBtn").click(function(e){
        saveData();
    });
    
});

var topMsg = ["ur rats are worldwide buddy", "rats are taking all our jobs",
 "rat epidemic threatens humanity", "ratS",
 "somebody once told me","сука крыса","indefinite integral of the cube root of tan x, dx. have fun with that",
"the rats are in ur house and they stinkyy","i shouldd make roblox rat simulator", "sub to pewdiepie","poor russians dont have internet",
"cuba needs to be blessed with da rats","Unchi ratto?","Ich bin ein Rat","We are rats. We love rats. Rats love us.",
"Ratosis - natural phenomenon when rat quantum tunnels through physical realm and transcends all other rats and grants him God-like power",
"Cheese - a rats favorite meal","chEesey",
"rat shart - similar to cheese except many times stronger. CAUTION do not overdose rats with sharts"];
function changeMessage(){
    $("#topbar").text(getRand(topMsg));
}

var fps = new Decimal(1000/50);
function main(){
    $("#money").text("Moneis: $" + numberWithCommas(money));
    $("#mps").text("Moneies per second: $" + numberWithCommas(mps));
    $("#mpc").text("Money clicke : $" + numberWithCommas(mpc));
    $("#rats").text("u got " + numberWithCommas(ratsTotal) + " rats");
    if(timePassed === 0){
        money = Decimal.add(money,(Decimal.div(mps,fps)));
    }else{
        money = Decimal.add(money,mps*(timePassed/1000)).div(fps);
        timePassed = 0;
    }
    //checkAchievements();
}
new AdjustingInterval(changeMessage, 1000*30).start();
new AdjustingInterval(main, fps.toNumber()).start();//50 fps pretty much
new AdjustingInterval(saveData, 1000*60*3).start();
