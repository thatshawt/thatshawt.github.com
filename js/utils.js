function isNull(obj) {
    return (typeof obj === 'undefined') || (obj === null) || (obj !== obj);
}

function isEmpty(data) {
    return (data.trim() === "");
}
var garbageCommas = function (x) {
    return x.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); //so ugly plox
};

function numberWithCommas(x) {
    if (x instanceof Decimal) return garbageCommas(x.truncated().toString());
    if(typeof x === "string") return numberWithCommas(new Decimal(x));
    return x.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function getRand(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function backgroundTask(task) {
    var button = $("body").add("button");
    button.css("display:none;");
    button.click(task);
    button.click();
}

function consoleLog(data) {
    console.log(data);
}

function copy(src) {
    return Object.assign({}, src);
}