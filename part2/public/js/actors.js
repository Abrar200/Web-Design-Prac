document.addEventListener('DOMContentLoaded', function () {

    loadActors();


    document.querySelector('button.pure-button-primary').addEventListener('click', addActor);
});

// Function to load all actors from the database
function loadActors() {
    fetch('/api/actors')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch actors');
            }
            return response.json();
        })
        .then(actors => {
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing rows

            // Add each actor to the table
            actors.forEach(actor => {
                const row = document.createElement('tr');

                const firstNameCell = document.createElement('td');
                firstNameCell.textContent = actor.first_name;

                const lastNameCell = document.createElement('td');
                lastNameCell.textContent = actor.last_name;

                row.appendChild(firstNameCell);
                row.appendChild(lastNameCell);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading actors:', error);
        });
}

// Function to add a new actor
function addActor() {
    const firstNameInput = document.getElementById('actor-first-name');
    const lastNameInput = document.getElementById('actor-last-name');

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
        alert('Please enter both first name and last name');
        return;
    }

    fetch('/api/actors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add actor');
            }
            return response.json();
        })
        .then(data => {
            // Clear input fields
            firstNameInput.value = '';
            lastNameInput.value = '';

            // Reload the actor list
            loadActors();
        })
        .catch(error => {
            console.error('Error adding actor:', error);
        });
}