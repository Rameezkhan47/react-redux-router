//import module
import {LocalStorage} from 'node-localstorage' 

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage('./scratch'); 

//Setting localStorage Item
localStorage.setItem('Name', 'Manish Mandal') 