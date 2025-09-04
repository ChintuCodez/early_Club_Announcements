const colorrs = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF", "#85E3FF", "#B9FBC0"];
let colorrIndex = 0;


var popupOverlay = document.querySelector('.popupoverlay');
var popup = document.querySelector('.popup');
var addButton = document.getElementById('addb');
var closeButton = document.querySelector('.close-popup');

addButton.addEventListener('click', function() {
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
});

closeButton.addEventListener('click', function(event) {
    event.preventDefault();
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});


const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF", "#85E3FF", "#B9FBC0"];
  let colorIndex = 0;

var container = document.querySelector('.container');
var submitButton = document.getElementById('submit-button');
var titleInput = document.getElementById('title');
var subtitleInput = document.getElementById('subtitle');
var descriptionInput = document.getElementById('description');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    var div = document.createElement('div');
    container.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    div.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    div.setAttribute('class', 'announcement');
    div.innerHTML = `<h2>${titleInput.value}</h2>
                    <h3>${subtitleInput.value}</h3>
                    <p>${descriptionInput.value}</p>
                    <button class="delete-announce" onclick="removeAnnouncement(event)">Delete</button>`;
    container.appendChild(div);
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});

function removeAnnouncement(event) {
    event.target.parentElement.remove();
}