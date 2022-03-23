//for array object
export const alphaSort = (array: any[], field:string) =>{
    // return array.sort((a, b) => a.firstname.localeCompare(b.firstname, 'es', {sensitivity: 'base'}))
    return array.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()));
}
export const sizeSort = (array: any[], field: any) => {
    return array.sort((a, b) =>  a.field - b.field);   //field: 1354412087000 =  Sat, Dec 1 2012
}
export const nameSort = (array: any[], field:any) => {
    var byName = array.slice(0);
    byName.sort(function(a,b) {
        var x = a.field.toLowerCase();
        var y = b.field.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
}

//for array normal
// export const numberSort = (array: any[]) =>{
//     // return Object.entries(array).sort(([,a],[,b]) => a-b)
//     return Object.entries(array).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
// }
// export const keySort = (array: any[]) => {
//     return Object.keys(array).sort((a: any, b: any) => array[a] - array[b])
// }

//https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/

//Sort ESCMA 2017
// let obj = {"you": 100, "me": 75, "foo": 116, "bar": 15};
// let entries = Object.entries(obj);      // [["you",100],["me",75],["foo",116],["bar",15]]
// let sorted = entries.sort((a, b) => a[1] - b[1]);       // [["bar",15],["me",75],["you",100],["foo",116]]


//Sort ES6
// function sortObject(obj: any[]) {
//     var arr = [];
//     for (var prop in obj) {
//         if (obj.hasOwnProperty(prop)) {
//             arr.push({
//                 'key': prop,
//                 'value': obj[prop]
//             });
//         }
//     }
//     arr.sort(function(a, b) { return a.value - b.value; });
//     //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
//     return arr;
// }
// const list:any = {"you": 100, "me": 75, "foo": 116, "bar": 15};
// const arr = sortObject(list);
// console.log(arr);
