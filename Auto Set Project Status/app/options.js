var projectOptions = [];
// Saves options to chrome.storage
function save_options() {
    var optionlabel = document.getElementById('optionlabel').value;
    var optionvalue = document.getElementById('optionvalue').value;
    restore_options();
    projectOptions.push({ label: optionlabel, value: optionvalue });
    chrome.storage.local.set({
        projectOptions: projectOptions
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        document.getElementById('optionlabel').value = '';
        document.getElementById('optionvalue').value = '';
        restore_options();
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
        projectOptions: []
    }, function (items) {
        projectOptions = items.projectOptions;
        refershprojectoptions();
        var val = '';
        for (var i = 0; i < projectOptions.length; i++) {
            val += projectOptions[i].label + '<br />';
        }
        document.getElementById('itemlist').innerHTML = val;
    });
}

function clear_options() {
    restore_options();

    chrome.storage.local.set({
        projectOptions: []
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'All options deleted.';
        restore_options();
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });

}

document.addEventListener('DOMContentLoaded', function () {
    restore_options();
});

function refershprojectoptions() {
    var bodyitems = document.getElementById('bodyitems');
    if (bodyitems && projectOptions) {
        while (bodyitems.firstChild) {
            bodyitems.removeChild(bodyitems.firstChild);
        }
        if (projectOptions.length > 1) {
            for (var i = 0; i < projectOptions.length; i++) {
                createBodyItem(bodyitems, projectOptions[i]);
            }
            var divs = document.querySelectorAll('div');
            for (var i = 0; i < divs.length; i++) {
                divs[i].addEventListener('click', click);
            }
        } else if (projectOptions.length == 1) {
            chrome.tabs.executeScript(null, { file: "jquery_1.8.3.min.js" }, function () {
                chrome.tabs.executeScript({
                    code: '$("#cbProjectsList").val("' + projectOptions[0].value + '");$("#pbGo").removeAttr("disabled");$("#pbGo").trigger("click");'
                });
                window.close();
            });
        }
    }
}


function click(e) {
    chrome.tabs.executeScript(null, { file: "jquery_1.8.3.min.js" }, function () {
        chrome.tabs.executeScript({
            code: '$("#cbProjectsList").val("' + e.target.id + '");$("#pbGo").removeAttr("disabled");$("#pbGo").trigger("click");'
        });
        window.close();
    });
}

function createBodyItem(bodyitems, projectOptions) {
    var node = document.createElement("DIV");
    var att = document.createAttribute("id");
    att.value = projectOptions.value;
    node.setAttributeNode(att);
    var t = document.createTextNode(projectOptions.label);
    node.appendChild(t);
    bodyitems.appendChild(node);
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);