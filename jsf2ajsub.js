/*
 * Copyright 2015 Stephan Knitelius
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
