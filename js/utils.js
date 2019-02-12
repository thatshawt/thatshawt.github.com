function isNull(obj){
    return (typeof obj === 'undefined') || (obj === null);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getRand(myArray){
    return myArray[Math.floor(Math.random() * myArray.length)];
}