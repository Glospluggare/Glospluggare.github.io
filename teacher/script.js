let wordCount = 1;

function addInputField() {
    wordCount++;

    // Clone the existing input fields
    const column1 = document.querySelector('.column:nth-child(1)');
    const column2 = document.querySelector('.column:nth-child(2)');
    const input1 = column1.querySelector('input:last-child');
    const input2 = column2.querySelector('input:last-child');

    const newInput1 = input1.cloneNode();
    const newInput2 = input2.cloneNode();

    // Remove placeholders for the new input fields
    newInput1.placeholder = '';
    newInput2.placeholder = '';

    // Append the new input fields to the wordForm container
    column1.appendChild(newInput1);
    column2.appendChild(newInput2);
}

async function generateAndUploadFile() {
    // Gather words from input fields of each column
    const wordsColumn1 = Array.from(document.querySelectorAll('.column:nth-child(1) input')).map(input => input.value);
    const wordsColumn2 = Array.from(document.querySelectorAll('.column:nth-child(2) input')).map(input => input.value);

    // Combine the words of each column with the separator
    const combinedWords = wordsColumn1.map((word, index) => `${word} % ${wordsColumn2[index]}`).join(' ');

    // Add the final separator
    const formattedWords = `${combinedWords} &`;

    // Create a blob with the formatted words
    const blob = new Blob([formattedWords], { type: 'text/plain' });

    // Create a FormData object and append the blob
    const formData = new FormData();
    formData.append('file', blob, 'words.txt');

    // Fetch URL of the repository
    const repoUrl = 'https://api.github.com/repos/Glospluggare/glosor/';


    // Fetch current branch (optional)
    const response = await fetch(repoUrl);
    const data = await response.json();
    const branch = data.find(item => item.name === '.git')?.default_branch || 'main';

    // Construct the API URL for creating a new file
    const apiUrl = `${repoUrl}?ref=${branch}`;

// Fetch personal access token from a secure location
const { REPO_TOKEN } = process.env;

// Make a request to GitHub API to create a new file
const apiResponse = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${REPO_TOKEN}`,  // Corrected from 'Bearer ${token}'
    },
    body: formData,
});


    // Check if the file was successfully created
    if (apiResponse.ok) {
        alert('File successfully uploaded to GitHub Pages!');
    } else {
        alert('Failed to upload the file. Please check your personal access token and repository information.');
    }
}