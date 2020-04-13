
// Importing this module registers <mwc-button> as an element that you
// can use in this page.
//
// Note this import is a bare module specifier, so it must be converted
// to a path using a server such as es-dev-server.
//import * as babel from '@babel/core';


import * as MWCTopAppBar from 'https://unpkg.com/@material/mwc-top-app-bar-fixed@latest/mwc-top-app-bar-fixed.js?module';
import * as MWCTextField  from 'https://unpkg.com/@material/mwc-textfield@latest/mwc-textfield.js?module';
import * as MWCButton from 'https://unpkg.com/@material/mwc-button@latest/mwc-button.js?module';

// Standard DOM APIs work with Web Components just like they do for
// built-in elements.
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
alert('You clicked!');
});