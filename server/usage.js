
//import module
import {LocalStorage} from 'node-localstorage'

// constructor function to retrieve localStorage Items from the previously declared directory.
var localStorage = new LocalStorage('./scratch');

//console.log localStorage item with the key Name
console.log(localStorage.getItem('Name'))