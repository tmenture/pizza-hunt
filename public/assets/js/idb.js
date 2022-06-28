// A variable to hold the connection
let db;

// Establishes a connection to IndexedDB daabase called 'pizza_hunt' and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// This event emits if the database version changes (nonexistant to version 1, v1 to v2, etc)
request.onupgradeneeded = function (event) {
    // Saved a reference to the database
    const db = event.target.result;
    // Created an objet store (table) called 'new_pizza', with an auto-incrementing primary key of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// On success
request.onsuccess = function(event) {
    // When db successfully created, with connection, this saves a reference to the db in a global variable
    db = event.target.result;
    // Checks i app is online, if yes run uploadPizza() to send all local db data to api
    if (navigator.online) {
        uploadPizza();
    }
};

// On failure
request.onerror = function(event) {
    // logs error to console
    console.log(event.target.errorCode);
};

// This executes when a user attempts to submit a new pizza with no internet
function saveRecord(record) {
    // opens a new transaction with the database giving user read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    // access to the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // adds record to store with add method
    pizzaObjectStore.add(record);
};

function uploadPizza() {
    // opens a transaction to the db 
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    // accesses the object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    // gets all records from the store and sets it to a variable
    const getAll = pizzaObjectStore.getAll();

    // upon a successful .getAll() execution, this function runs
    getAll.onsuccess = function() {
        // if there is data, send it to the api
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                } 
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                const transaction = db.transaction(['new_pizza'], 'readwrite');
                const pizzaObjectStore = transaction.objectStore('new_pizza');

                pizzaObjectStore.clear();

                alert('All saved pizza has been submitted!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
};

// listen for connection status change
window.addEventListener('online', uploadPizza);