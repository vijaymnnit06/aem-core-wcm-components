/***************************************************************************
 *  Copyright 2016 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 **************************************************************************/
(function($, window, document) {

    /* Adapting window object to foundation-registry */
    var registry = $(window).adaptTo("foundation-registry");

    /*Validator for TextField - Validation for duplicate HTML ID authored through dialog */
    registry.register("foundation.validation.validator", {
        selector: "[data-validation=html-unique-id-validator]",
        validate: function(el) {
            var compPath = $(el.closest(".foundation-layout-form")).attr("action");
            var jsonData = CQ.shared.HTTP.get(compPath+'.json');
            var preConfiguredVal = CQ.shared.HTTP.eval(jsonData)['id'];
            var element = $(el);
            var currentVal = element.val();
            /* Handle re dialog submission */
            if(currentVal === preConfiguredVal){
                return;
            }
            var url = window.location.pathname + "?wcmmode=disabled";
            url = url.replace("/editor.html", "");
            var idCount = 0;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                async: false,
                success: function(data) {
                    var idList;
                    if (data) {
                        idList = $(data).find("[id='" + currentVal + "']");
                        if(idList) {
                            idCount = idList.length;
                        }
                    }
                }
            });
            if (idCount > 0) {
                return "This ID already exist on the page, please enter a unique ID.";
            }
        }
    });
})
($, window, document);