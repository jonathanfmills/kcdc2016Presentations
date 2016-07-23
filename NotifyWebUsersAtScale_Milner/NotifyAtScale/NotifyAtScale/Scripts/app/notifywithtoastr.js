'use strict'

function notifyToastr(details) {
    // Html encode display name and message.
    toastr.info(details.Details, "Zombie spotted");
}

