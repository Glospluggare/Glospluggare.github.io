document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var classInput = document.getElementById('classInput').value || "DefaultClass";

    // Check if the email, password, and classInput are set via console commands
    if (window.consoleEmail) {
        email = window.consoleEmail;
        console.log('Email set via console:', email);
    }

    if (window.consolePassword) {
        password = window.consolePassword;
        console.log('Password set via console:', password);
    }

    if (window.consoleClass) {
        classInput = window.consoleClass;
        console.log('Class set via console:', classInput);
    }

    // Sign in with email and password using Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            console.log('User signed in successfully');

            // Extract user information from the authentication result
            var user = userCredential.user;

            // Generate user-specific data
            var userData = {
                "name": user.displayName || "DefaultName",
                "password": generateRandomPassword(),
                "class": classInput, // Use the classInput value
                "userid": scrambleString(user.displayName || "DefaultString"),
                "auth": "signed by glospluggare",
            };

            // Convert the user data to a JSON string
            var glosContent = JSON.stringify(userData, null, 2);

            // Create a Blob with the content
            var blob = new Blob([glosContent], { type: 'application/json' });

            // Create a link element
            var link = document.createElement('a');

            // Set the download attribute and filename
            link.download = 'config.glos';

            // Create a URL for the Blob and set it as the href attribute
            link.href = window.URL.createObjectURL(blob);

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Redirect to passwordPage.html
            window.location.href = 'passwordPage.html?password=' + userData.password;
        })
        .catch(function (error) {
            console.error('Error signing in:', error.message);
            // Display an error message
            document.getElementById('error-message').innerText = error.message;
        });
});

// Function to generate a random password
function generateRandomPassword() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < 12; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

// Function to scramble a string
function scrambleString(str) {
    var array = str.split('');
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}
