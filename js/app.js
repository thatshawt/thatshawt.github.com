var mps = 0;
var mpc = 1;
var multiplier = 1;
var money = 0;
var ratsTotal = 0;

class Rats{
    constructor(){}
    money(a){
        this.money = a;
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
        this.cost = a;
        return this;
    }
    costPercent(a){
        this.costPercent = a;
        return this;
    }
}

var vals = {};

vals.thiccRat = new Rats().cost(10).costPercent(1.05).money(1).moneyPercent(1.01).text("One Thic Ratt | ");
vals.hazmatRat = new Rats().cost(10000).costPercent(1.05).money(1).moneyPercent(1.01).text("Hazmat Rat | ");
vals.cdcRat = new Rats().cost(1000000).costPercent(1.05).money(1).moneyPercent(1.01).text("CDC Rat | ");
vals.stripperRat = new Rats().cost(999999999999).costPercent(1.05).money(1).moneyPercent(1.01).text("Stripper Rat | ");
vals.obamaRat = new Rats().cost(57000).costPercent(1.05).money(1).moneyPercent(1.01).text("President Barat | ");
vals.loanRat = new Rats().cost(1).costPercent(1.5).money(1).moneyPercent(1.1).text("Small loan of a million rats Rat | ");
vals.gambinoRat = new Rats().cost(999999999999999).costPercent(1.05).money(1).moneyPercent(1.01).text("Gambino Rat | ");

$(function(){
$("#rat").click(function(){
    money += mpc;
});
$(".ratBtn").click(function(e){
    var clickedRat = vals[e.target.id];
    if(clickedRat.cost > money){
        alertify.error("ur broke sir");
    }else{
        money -= clickedRat.cost;
        mps += clickedRat.money;
        clickedRat.cost *= clickedRat.costPercent;
        clickedRat.money *= clickedRat.moneyPercent;
        ratsTotal++;
        $(e.target).text(clickedRat.text + clickedRat.cost.toFixed(1).toString() + "$");
    }
});
});

function main(){
    $("#money").text("Moneis: " + money.toFixed(1).toString());
    $("#mps").text("Moneies per second: " + mps.toFixed(1).toString());
    //$("#mpc").text("Money clicke :" + mpc.toFixed(1).toString());
    $("#rats").text("u got " + ratsTotal.toString() + " rats");
    money += mps/10;
}
new AdjustingInterval(main, 50).start();//10 fps pretty much