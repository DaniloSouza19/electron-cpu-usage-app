const path = require('path');
 
function clicked() {
  const listElement = document.getElementById('list');

  const children = listElement.children;

  const counter = children.length;

  const newItem = document.createElement('li');

  const textItem = document.createTextNode(`Item: ${counter+1}`)

  newItem.appendChild(textItem);

  listElement.append(newItem);
}

console.log(path.join(__dirname, 'preload.js'));