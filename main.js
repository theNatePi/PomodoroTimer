
// this function handles the actual timer, the outer_function is the function executed when you start the timer
function outer_function() {
    work_number = 0;

    function break_function() {
        if (proceed === true) {
            alert("Break's over! Lets get back to work.");
            // will repeat the function depending on the length of the break
            setTimeout(alert_function, length_mill);
        } else {
            // if proceed != true clear the loop and stop the timer
            clearTimeout();
        }
    }
    function long_break_function () {
        if (proceed === true) {
            alert('Time for a long break, step away and press "ok"');
            // will repeat the function depending on the length of the break
            setTimeout(alert_function, length_mill);
        } else {
            // if proceed != true clear the loop and stop the timer
            clearTimeout();
        }
    }
    function alert_function() {
        clearTimeout();
        // checking if the user provided a time for the timer
        if (!isNaN(length)) {
            if (proceed === true) {
                work_number = work_number + 1;
                console.log(work_number);
                // will repeat the function depending on the length the user provided
                if (work_number >= 4) {
                    alert('Nice job, you\'ve been working hard I\'m sure! Time to take a longer break');
                    work_number = 0;
                    setTimeout(long_break_function, length_long_break_mill);
                }
                else {
                    alert('Nice job, you\'ve been working hard I\'m sure! Time to take a break, hit "ok" and come back when you get another popup');
                    setTimeout(break_function, length_break_mill);
                }
            } else {
                // if proceed != true clear the loop and stop the timer
                clearTimeout();
            }
        } else {
            alert("You didnt provide a time for the reminder");
        }
        // after this function is defined, turn the amount of minutes the user provided into milliseconds
        length_mill = length * 60000;
        length_break_mill = length_break * 60000;
        length_long_break_mill = length_break_mill * 3;
    }
    // call the function
    alert_function();
    // after the function is called the first time, now set proceed to true. The function had to be called to check if a timer was provided
    proceed = true;
    if (!isNaN(length)) {
        alert("Your timer is starting!");
        setTimeout(alert_function, length_mill);
    }
}

// This is the script inserted to end the loop
function outer_end_function() {
    // function to end the loop
    function end_script() {
        clearTimeout();
        var id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        proceed = false;
        length = NaN;
    }
    // running the function
    end_script();
}

// Function to prompt for the time
function outer_start_function() {
    function start_script() {
        length = prompt("How long do you want your work period?", "25");
        length = parseFloat(length);
        length_break = prompt("How long do you want your break to be?\n(Longer breaks will be x3 this number)", "5");
        length_break = parseFloat(length_break);
        alert('Now click "ok" and reopen the extension to start');
        proceed = false;
    }
    start_script();
}

// Following functions insert the outer functions into the file of the website
function start() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_function,
            }
        );
    });
}

function end_loop() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_end_function,
            }
        );
    });
}

function starting() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_start_function,
            }
        );
    });
}

// calls each of the functions when the buttons are clicked
document.getElementById("test1").addEventListener("click", start);
document.getElementById("test2").addEventListener("click", end_loop);
document.getElementById("test3").addEventListener("click", starting);
