// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    console.log(tab.url);
    // No tabs or host permissions needed!   
    chrome.tabs.executeScript(null, { file: "jquery_1.8.3.min.js" }, function () {
        chrome.tabs.executeScript({
            code: '$("._n_p").remove();$("._n_i").children().siblings().last().css({ right: "0px" });$("._n_h").remove();$(".conductorContent").parent().css({ right: "0px" });'
        });
    });
});