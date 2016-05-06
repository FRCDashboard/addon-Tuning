// This should be added inside the definition of the 'ui' object at the starting of ui.js.

        ,
        tuning: {
            list: document.getElementById('tuning'),
            button: document.getElementById('tuningButton')
        }

// End section



// Place this after the huge switch statement with all the NetworkTables variables

    var propName = key.substring(16, key.length);
    // Check if value is new, starts with /SmartDashboard/, and doesn't have a spot on the list yet
    if (isNew && value && document.getElementsByName(propName).length === 0) {
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
            input.onchange = function() {
                switch (input.type) {
                    case 'checkbox':
                        NetworkTables.setValue(key, input.checked);
                        break;
                    case 'number':
                        NetworkTables.setValue(key, parseInt(input.value));
                        break;
                    case 'text':
                        NetworkTables.setValue(key, input.value);
                        break;
                }

                console.log(NetworkTables.getValue(key));
            };
            div.appendChild(input);
        }
    } else {
        var oldInput = document.getElementsByName(propName)[0];
        if (oldInput) {
            if (oldInput.type === 'checkbox') {
                oldInput.checked = value;
            } else {
                oldInput.value = value;
            }
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

// End section