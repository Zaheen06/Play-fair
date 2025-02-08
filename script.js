function generateMatrix(key) {
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 'J' is merged with 'I'
    let keySet = new Set(key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, ''));
    let matrixArr = [];

    for (let char of keySet) {
        if (char === 'I') {
            matrixArr.push("I / J"); // Replace 'I' with 'I/J'
        } else {
            matrixArr.push(char);
        }
    }

    for (let char of alphabet) {
        if (!keySet.has(char)) {
            if (char === 'I') {
                matrixArr.push("I / J");
            } else {
                matrixArr.push(char);
            }
        }
    }

    let matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix.push(matrixArr.slice(i * 5, (i + 1) * 5));
    }
    return matrix;
}

function displayMatrix(matrix) {
    let table = document.getElementById("matrix");
    table.innerHTML = "";
    for (let row of matrix) {
        let tr = document.createElement("tr");
        for (let cell of row) {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
function preprocessText(text) {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let processedText = "";
    for (let i = 0; i < text.length; i++) {
        if (i > 0 && text[i] === text[i - 1] && processedText.length % 2 === 1) {
            processedText += 'X';
        }
        processedText += text[i];
    }
    if (processedText.length % 2 === 1) processedText += 'X';
    return processedText;
}

function findPosition(matrix, letter) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === letter) {
                return [row, col];
            }
        }
    }
}

function encryptText() {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    if (!plaintext || !key) {
        alert("Please enter both plaintext and key.");
        return;
    }

    let matrix = generateMatrix(key);
    displayMatrix(matrix);
    let text = preprocessText(plaintext);
    let encryptedText = "";

    for (let i = 0; i < text.length; i += 2) {
        let [r1, c1] = findPosition(matrix, text[i]);
        let [r2, c2] = findPosition(matrix, text[i + 1]);

        if (r1 === r2) {
            encryptedText += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) {
            encryptedText += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else {
            encryptedText += matrix[r1][c2] + matrix[r2][c1];
        }
    }

    document.getElementById("output").innerHTML = "Encrypted Text: <span style='color:lime'>" + encryptedText + "</span>";
}
