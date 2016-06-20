// This should be added inside the definition of the 'ui' object at the starting of ui.js.

    ,
    tuning: {
        list: document.getElementById('tuning'),
        button: document.getElementById('tuning-button'),
        name: document.getElementById('name'),
        value: document.getElementById('value'),
		set: document.getElementById('set'),
		get: document.getElementById('get')
    }

// End section



// Place this after the huge switch statement with all the NetworkTables variables

    // The following code manages tuning section of the interface.
    // This section displays a list of all NetworkTables variables (that start with /SmartDashboard/) and allows you to directly manipulate them.
    var propName = key.substring(16, key.length);
    // Check if value is new, starts with /SmartDashboard/, and doesn't have a spot on the list yet
    if (isNew && !document.getElementsByName(propName)[0]) {
        if (key.substring(0, 16) === '/SmartDashboard/') {
            // Make a new div for this value
            var div = document.createElement('div'); // Make div
            ui.tuning.list.appendChild(div); // Add the div to the page

            var p = document.createElement('p'); // Make a <p> to display the name of the property
            p.innerHTML = propName; // Make content of <p> have the name of the NetworkTables value
            div.appendChild(p); // Put <p> in div

            var input = document.createElement('input'); // Create input
            input.name = propName; // Make its name property be the name of the NetworkTables value
            input.value = value; // Set
            // The following statement figures out which data type the variable is.
            // If it's a boolean, it will make the input be a checkbox. If it's a number,
            // it will make it a number chooser with up and down arrows in the box. Otherwise, it will make it a textbox.
            if (value === true || value === false) { // Is it a boolean value?
                input.type = 'checkbox';
                input.checked = value; // value property doesn't work on checkboxes, we'll need to use the checked property instead
            } else if (!isNaN(value)) { // Is the value not not a number? Great!
                input.type = 'number';
            } else { // Just use a text if there's no better manipulation method
                input.type = 'text';
            }
            // Create listener for value of input being modified
            input.onchange = function() {
                switch (input.type) { // Figure out how to pass data based on data type
                    case 'checkbox':
                        // For booleans, send bool of whether or not checkbox is checked
                        NetworkTables.setValue(key, input.checked);
                        break;
                    case 'number':
                        // For number values, send value of input as an int.
                        NetworkTables.setValue(key, parseInt(input.value));
                        break;
                    case 'text':
                        // For normal text values, just send the value.
                        NetworkTables.setValue(key, input.value);
                        break;
                }
            };
            // Put the input into the div.
            div.appendChild(input);
        }
    } else { // If the value is not new
        // Find already-existing input for changing this variable
        var oldInput = document.getElementsByName(propName)[0];
        if (oldInput) { // If there is one (there should be, unless something is wrong)
            if (oldInput.type === 'checkbox') { // Figure out what data type it is and update it in the list
                oldInput.checked = value;
            } else {
                oldInput.value = value;
            }
        } else {
            console.log('Error: Non-new variable ' + key + ' not present in tuning list!');
        }
    }

// End section

// Add this at the bottom of ui.js with the other listeners.

// Open tuning section when button is clicked
ui.tuning.button.onclick = function() {
	if (ui.tuning.list.style.display === 'none') {
		ui.tuning.list.style.display = 'block';
	} else {
		ui.tuning.list.style.display = 'none';
	}
};

// Manages get and set buttons at the top of the tuning pane
ui.tuning.set.onclick = function() {
    if (ui.tuning.name.value && ui.tuning.value.value) { // Make sure the inputs have content
        NetworkTables.setValue(ui.tuning.name.value, ui.tuning.value.value);
    }
};
ui.tuning.get.onclick = function() {
	ui.tuning.value.value = NetworkTables.getValue(ui.tuning.name.value);
};

// End section
