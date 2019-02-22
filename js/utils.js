function isNull(obj){
    return (typeof obj === 'undefined') || (obj === null);
}
var garbageCommas = function(x){
    return x.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");//so ugly plox
};

function numberWithCommas(x) {
    if(x instanceof Decimal)return garbageCommas(x.truncated().toString());
    return x.toLocaleString("en-US",{minimumFractionDigits: 0, maximumFractionDigits: 0});
}
function getRand(myArray){
    return myArray[Math.floor(Math.random() * myArray.length)];
}
function backgroundTask(task){
    var button = $("body").add("button");
    button.css("display:none;");
    button.click(task);
    button.click();
}