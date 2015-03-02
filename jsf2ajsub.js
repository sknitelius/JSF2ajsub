/**
 * Created by SKnitelius on 02.03.2015.
 */

var deferedSubmit = function(){}
var ajaxBusy = false;

jsf.ajax.addOnEvent(function(data) {
    var status = data.status;
    switch (status) {
        case "begin":
            ajaxBusy = true;
            break;
        case "complete":
            // invoked after AJAX response is returned.
            ajaxBusy = false;
            deferedSubmit();
            break;
    }
});

function deferSubmit(event) {
    $.blockUI({message: '', overlayCSS: {opacity: 0, cursur: 'wait'}});
    if (ajaxBusy) {
        deferedSubmit = function () {
            var element = event.srcElement;
            element.click();
        };
        return false;
    }
    return true;
}
