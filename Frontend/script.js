
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
    const title = titleInput.value.trim();
    const subtitle = subtitleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title || !subtitle || !description) {
        alert('Please fill in all fields.');
        return;
    }

    const data = {
        title: title,
        subtitle: subtitle,
        description: description
    };
    fetch('http://127.0.0.1:5000/add_announcement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData.message);
        popupOverlay.style.display = 'none';
        popup.style.display = 'none';
        titleInput.value = '';
        subtitleInput.value = '';
        descriptionInput.value = '';
        loadannouncements();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function loadannouncements() {
    fetch('http://127.0.0.1:5000/get_announcements')
    .then(response => response.json())
    .then(data => {
        container.innerHTML = '';
        data.forEach((announcement, index) => {
            const div = document.createElement('div');
            div.style.backgroundColor = colors[index % colors.length];
            div.setAttribute('class', 'announcement');
            div.innerHTML = `
                <h2>${announcement.title}</h2>
                <h4>${announcement.subtitle}</h4>
                <p>${announcement.description}</p>
                <button class="delete-button" onclick="deleteAnnouncement(${announcement.id})">Delete</button>
            `;
            container.appendChild(div);
        });
    });
}

function deleteAnnouncement(id) {
    fetch(`http://127.0.0.1:5000/delete_announcement/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData.message);
        loadannouncements();
    });
}

window.onload = loadannouncements;