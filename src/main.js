import {mount} from 'svelte';
import App from './App.svelte';
import './reader.css';
const data=JSON.parse(document.querySelector('#reading-data').textContent);
const shell=document.querySelector('#book-shell');
const html=shell.innerHTML;
shell.replaceChildren();
mount(App,{target:shell,props:{initial:{...data,html}}});
