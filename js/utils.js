function isNull(obj){
    return (typeof obj === 'undefined') || (obj === null);
}
function numberWithCommas(x) {
    return x.toLocaleString("en-US",{minimumFractionDigits: 1, maximumFractionDigits: 1});
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