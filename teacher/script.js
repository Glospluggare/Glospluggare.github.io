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

function downloadFile() {
    // Gather words from input fields of each column
    const wordsColumn1 = Array.from(document.querySelectorAll('.swedish-input')).map(input => input.value);
    const wordsColumn2 = Array.from(document.querySelectorAll('.german-input')).map(input => input.value);

    // Check if all input fields are filled
    if (wordsColumn1.some(word => !word) || wordsColumn2.some(word => !word)) {
        alert('Please fill all input fields before downloading.');
        return;
    }

    // Combine the words of each column with one % separator
    const formattedWords = wordsColumn1.join(' ') + ' % ' + wordsColumn2.join(' ');

    // Add the final separator
    const finalOutput = `${formattedWords} &`;

    // Create a blob with the formatted words
    const blob = new Blob([finalOutput], { type: 'text/plain' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'words.txt';

    // Append the link to the body and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
}
