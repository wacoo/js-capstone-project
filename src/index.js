//import pikachu from './images/pikachu.jpg';
import DOMManipulator from './modules/dom.js';
import './style.css';

const dom = new DOMManipulator();
//const img = document.getElementById('pok-image');

//img.src = pikachu;
//img.alt = "Placeholder";

dom.displayItems();
const data = {
    "item_id": "Under the dome",
    "username": "Bish",
    "comment": "This is a test comment"
}
dom.addComment(data);
//dom.createApp();