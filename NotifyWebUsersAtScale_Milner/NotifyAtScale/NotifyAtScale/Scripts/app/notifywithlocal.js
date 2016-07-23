'use strict'

function notifyLocal(details) {
    var baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    var imgUrl = baseUrl + "/content/images/brain.png";

    // Html encode display name and message.
    if (!window.Notification) {

        alert("this browser does not support notifications");
    }
    else if (Notification.permission === "granted") {
        var notification = new Notification("Zombie Sighted!", { "body": details.Details, "icon": imgUrl, "data":details.Type});
        notification.onclick = notificationClicked;
    }
    else if(Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

            // Whatever the user answers, we make sure we store the information
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Zombie Sighted!", { "body": details.Details, "icon": imgUrl, "data":details.Type });
                notification.onclick = notificationClicked;
            }
        });
    }
}

function notificationClicked(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    var iconUrl = event.currentTarget.icon;
    var imageName = getImageFromEnum(event.currentTarget.data);

    var imgUrl = iconUrl.replace("brain.png", imageName);
    window.open(imgUrl, '_blank');
}

function getImageFromEnum(enumValue) {
    switch (enumValue) {
        case 0:
            return "Game.jpg";
        case 1:
            return "Cartoon.jpg";
        case 2: 
            return "Movie.jpg";
        case 3:
            return "RealLife.jpg";
    }
}

