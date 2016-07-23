var imgUrl = "";

// Returns a new notification ID used in the notification.
function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function messageReceived(message) {

  // Concatenate all key-value pairs to form a display string.
  var title = message.data.title;
  var messageString = message.data.message;
  imgUrl = message.data.imgUrl;
  
  // Pop up a notification to show the GCM message.
  chrome.notifications.create(getNotificationId(), {
    title: title,
    iconUrl: 'brain.png',
    type: 'basic',
    message: messageString
  }, function() {});
}

var registerWindowCreated = false;

function firstTimeRegistration() {
  chrome.storage.local.get("registered", function(result) {
	
			registerWindowCreated = true;
			chrome.app.window.create(
				"register.html",
				{  width: 520,
					 height: 500,
					 frame: 'chrome'
				},
				function(appWin) {}
			);
	});
}

//setup click handler for the notification
chrome.notifications.onClicked.addListener(function(notificationId){
	if(imgUrl!== '') {
		window.open(imgUrl);
	}
	else {
		alert("No imgUrl");
		}
});

// Set up a listener for GCM message event.
chrome.gcm.onMessage.addListener(messageReceived);

// Set up listeners to trigger the first time registration.
chrome.runtime.onInstalled.addListener(firstTimeRegistration);
chrome.runtime.onStartup.addListener(firstTimeRegistration);