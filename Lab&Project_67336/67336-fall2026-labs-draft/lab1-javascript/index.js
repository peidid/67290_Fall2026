// ============================================================
// Lab 1: JavaScript Foundations
// 67-336 Data Visualization | Fall 2026
// ============================================================
// Instructions:
// - Read all comments carefully before writing any code.
// - Use console.log() to display and test your results.
// - Run your code with "npm start" in your terminal to see output.
// - Use Cmd+/ (Mac) or Ctrl+/ (Windows) to comment/uncomment lines.
// - Please remember to uncomment your code before submission.
// - You can use W3Schools for reference: https://www.w3schools.com/js/
// ============================================================


// ============================================================
// CHALLENGE 1 | Variables, Data Types, Functions & Loops
// ============================================================
// In JavaScript, there are three ways to declare variables:
//
//   var   — old way, avoid using it. It has confusing scoping rules.
//   let   — use when the value will change.
//   const — use when the value will NOT change.
//
// JavaScript has the following common data types:
//   string  — text, written in quotes:        "hello"
//   number  — any number:                     42, 3.14
//   boolean — true or false:                  true, false
//   null    — intentionally empty value:      null
//   undefined — variable declared but not assigned a value yet
//
// You can check the type of any value using typeof:
//   typeof "hello"  → "string"
//   typeof 42       → "number"
//   typeof true     → "boolean"
// Note: typeof always returns a STRING — so use quotes when comparing!
//   typeof x === "string"   ✅ correct
//   typeof x === string     ❌ wrong — string is not defined
// ============================================================


// Challenge 1.0
// We can write to the console (your terminal) with console.log().
// You should see "Hello, World!" in your terminal when you run npm start.
console.log("Hello, World!");

// Write JavaScript code below to display "Welcome to JavaScript!" in the console.

// Your code here


// Challenge 1.1
// The following examples illustrate how to declare variables and data types:
let firstName = "Katelyn";
let age = 20;
let isStudent = true;
console.log(firstName, age, isStudent);

// The following examples illustrate string concatenation and simple arithmetic:
let greeting = "Hello, " + firstName + "!";
let nextYearAge = age + 1;
console.log(greeting, nextYearAge);

// Declare variables to store your favorite color, your height in centimeters,
// and a boolean indicating if you like JavaScript.
// Then perform some operations with these variables and display the results.

// Your code here


// Challenge 1.2
// Here is an example of if-else statements in JavaScript:
let number = 8;
if (number > 0) {
    console.log("The number is positive.");
} else if (number < 0) {
    console.log("The number is negative.");
} else {
    console.log("The number is zero.");
}

// Write a program that checks if a string is empty, has only one character,
// or has multiple characters, and displays the result.

// Your code here


// Challenge 1.3
// typeof lets you check what data type a variable is.
// Remember: typeof returns a string, so always compare it with quotes.
// Example: typeof 42 === "number" → true

// Here is an example of a function that calculates the sum of two numbers:
function sum(a, b) {
    return a + b;
}
console.log(sum(5, 7));

// Write a function that takes two strings as arguments and returns their concatenation.
// Use typeof to check that both arguments are strings before returning (this is
// the if-else check you just practiced in Challenge 1.2).
// If either argument is not a string, return "Invalid Arguments!" instead.
// Call the function with different arguments and display the results.

// Your code here


// Challenge 1.4
// Here is an example of a for loop that prints numbers 1 to 10:
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Write a program that prints only the even numbers from 1 to 20 (ascending order),
// using a for loop.
// Tip: give your loop variable its own name for this challenge (for example "j"
// instead of "i"). If you reuse "let i" as a bare statement outside of a for-loop's
// own parentheses further down in this file, you will get a
// "SyntaxError: Identifier 'i' has already been declared" error, since every
// top-level "let" in this file shares the same scope. Variables declared inside
// a for-loop's parentheses, like the example above, do NOT have this problem.

// Your code here


// Challenge 1.5
// Here is an example of a while loop that prints numbers 1 to 10:
let count = 1;
while (count <= 10) {
    console.log(count);
    count++;
}

// Write a program that prints the even numbers from 20 down to 1 (descending order),
// using a while loop.

// Your code here


// Challenge 1.6 — Bonus: for...of loop
// A for...of loop is a cleaner way to loop through arrays.
// You will see this pattern constantly in Observable and data visualization code.
// Here is an example:
const colors = ["red", "green", "blue"];
for (const color of colors) {
    console.log(color);
}

// Write a for...of loop that prints each number in this array:
const temperatures = [72, 85, 90, 68, 77];

// Your code here


// ============================================================
// CHALLENGE 2 | Arrays & Objects
// ============================================================
// An ARRAY is an ordered list of values. It can hold any mix of types.
//   const fruits = ["apple", "banana", "cherry"];
//   fruits[0]        → "apple"  (zero-indexed)
//   fruits.length    → 3
//
// Common array methods:
//   .push(value)     — add item to end
//   .pop()           — remove last item
//   .join(separator) — combine all items into a string
//   .forEach()       — loop through each item
//   .filter()        — return a new array with only items that pass a test
//   .map()           — return a new array with each item transformed
//
// An OBJECT stores data as key-value pairs, like a dictionary.
//   const person = { name: "Alex", age: 21 };
//   person.name      → "Alex"   (dot notation)
//   person["age"]    → 21       (bracket notation)
//
// Template literals use backticks (`) instead of quotes and let you
// embed variables directly in a string using ${}:
//   `Hello, ${person.name}!`  → "Hello, Alex!"
// ============================================================


// Challenge 2.1
// Here is a function that sums all numbers in an array:
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num));

function arraySum(arr) {
    let sum = 0;
    arr.forEach(num => sum += num);
    return sum;
}
console.log(arraySum(numbers));

// Create an array of your five favorite foods and print each one.
// Then write a function that takes an array of foods and returns
// a string listing all the foods separated by commas.
// Hint: use .join(", ") — this method combines every item in an array into a
// single string, placing whatever separator you pass it (here, ", ") between
// each item. Example: ["apple", "banana", "cherry"].join(", ") returns the
// string "apple, banana, cherry".

// Your code here


// Challenge 2.2
// Here is an object representing a person:
const person = {
    name: "Joe",
    age: 21,
    job: "Software Developer"
};
console.log(person);

function printPerson(p) {
    console.log(`Name: ${p.name}, Age: ${p.age}, Job: ${p.job}`);
}
printPerson(person);

// Create an object representing a car with make, model, and year properties.
// Then write a function that takes a car object and prints its properties
// using a template literal.

// Your code here


// Challenge 2.3
// Here is a function that adds an item to an array:
function addItem(arr, item) {
    arr.push(item);
    return arr;
}
console.log(addItem([1, 2, 3], 4));

// Here is a function that updates a property of an object:
function updateJob(p, newJob) {
    p.job = newJob;
    return p;
}
console.log(updateJob({ name: "Peter", age: 21, job: "Engineer" }, "Manager"));

// Write a function that removes the last item from an array using .pop().
// Then write a function that updates the year of a car object.

// Your code here


// Challenge 2.4 — .filter() and .map()
// These two methods are essential for data visualization work.
// You will use them constantly in Observable to process datasets.
//
// .filter() returns a NEW array containing only items that pass a test:
const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = allNumbers.filter(n => n % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]
//
// .map() returns a NEW array with each item transformed:
const doubled = allNumbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Given this array of temperatures in Celsius:
const celsiusTemps = [0, 20, 37, 100];

// 1. Use .filter() to return only temperatures above 30 degrees Celsius.
// 2. Use .map() to convert all temperatures to Fahrenheit.
//    Formula: (C × 9/5) + 32

// Your code here


// ============================================================
// CHALLENGE 3 | DOM Manipulation
// ============================================================
// IMPORTANT: From this point forward, the code will NOT run in your terminal.
// Instead, you need to open index.html in a browser.
//
// To do this in VSCode:
//   Right-click index.html in the Explorer sidebar
//   → "Open with Live Server"
//   We recommend using Chrome as your browser.
//
// To open the browser console in Chrome:
//   Mac:     Cmd + Option + J
//   Windows: Ctrl + Shift + J
//
// The DOM (Document Object Model) is how JavaScript interacts with
// a webpage. It treats the HTML as a tree of elements that you can
// select, read, and modify with JavaScript.
//
// Common ways to select elements:
//   document.getElementById("myId")      — select by id
//   document.querySelector(".myClass")   — select by class
//   document.querySelector("h1")         — select by tag
// ============================================================


// Challenge 3.1
// Here are examples of selecting elements from index.html:
let myDiv = document.getElementById("myDiv");
let myP = document.querySelector(".myP");
let myH1 = document.querySelector("h1");
console.log(myDiv, myP, myH1);

// Write JavaScript code to select the elements marked
// "Challenge 3.1 | Your Turn" in index.html.
// Use both getElementById() and querySelector() for practice.

// Your code here


// Challenge 3.2
// Here is an example of changing the content of a selected element:
myDiv.textContent = "Hello, World!";

// Write a program that changes the content of the element
// you selected in Challenge 3.1 (this only needs the variable you already
// have, no button or click needed).

// Your code here

// Note: index.html ALSO has its own Challenge 3.2 sections (a button that
// changes a div's text when clicked), now split into "Challenge 3.2.1 |
// Example" and "Challenge 3.2.2 | Your Turn" so it's clear those are two
// separate steps to look for in Live Server, not one section. That button
// version is a separate part of this same challenge, showing the same idea
// (changing an element's content) a different way: through a button click
// instead of running immediately. Do this part here in index.js first, then
// go finish the button version in index.html's "Challenge 3.2.2 | Your Turn"
// section.


// Challenge 3.3
// Challenge 3.3.1 — Creating new elements
// Here is an example of creating a new element and adding it to the page:
let newElement = document.createElement("p");
newElement.textContent = "This is a paragraph added to the DOM.";
document.body.appendChild(newElement);

// Write code that creates a new element and adds it to the DOM.

// Your code here


// See "Challenge 3.3.2 | Example" in index.html for a more advanced
// example of creating a dynamic grocery list using these same techniques.


// ============================================================
// CHALLENGE 4 | Event Listeners
// ============================================================
// Events are things that "happen" to HTML elements — a click, a keypress,
// a form submission, a mouse movement, etc.
//
// addEventListener() lets you run code when an event occurs:
//   element.addEventListener("click", function() {
//       // code to run when clicked
//   });
//
// Common event types:
//   "click"    — user clicks the element
//   "submit"   — user submits a form
//   "keydown"  — user presses a key
//   "mouseover"— user hovers over the element
// ============================================================


// Challenge 4.1
// See "Challenge 4.1 | Example" in index.html for an example of
// reacting to a button click by displaying an alert.
//
// Under "Challenge 4.1 | Your Turn" in index.html, write the event
// handling for a button that changes the background color of colorDiv
// when clicked. Use element.style.backgroundColor (camelCase, one word,
// capital C) — this is the JavaScript name for the CSS "background-color"
// property. There is no plain ".style.background" property for this;
// using that name will not work.

// Your code here


// Optional/bonus: see "Challenge 4.1.2 | Example" in index.html for a bonus
// example of listening for mouse clicks and reading their (X, Y) coordinates
// on the page. No "Your Turn" code is required for this one, it's just there
// for extra practice with events if you want it.


// ============================================================
// CHALLENGE 5 | Promises & Fetch API
// ============================================================
// JavaScript is asynchronous — it can start a task and move on
// to the next line without waiting for that task to finish.
// This is useful for things like fetching data from an API,
// which can take a second or two.
//
// A PROMISE is an object that represents a value that is not
// available yet but will be at some point. It has three states:
//   pending  — still waiting
//   resolved — finished successfully → handled by .then()
//   rejected — something went wrong  → handled by .catch()
//
// The FETCH API lets you make HTTP requests to get data from
// external sources (APIs). It returns a Promise.
//
// Basic pattern:
//   fetch("https://some-api.com/data")
//     .then(response => response.json())   // convert to JSON
//     .then(data => console.log(data))     // use the data
//     .catch(error => console.error(error)) // handle errors
//
// API stands for Application Programming Interface — it lets
// two pieces of software communicate and share data.
// ============================================================


// Challenge 5.1
// Why this matters: right now "success" in the example below is hardcoded
// to true, so the Promise always resolves. In real code, that condition is
// usually something you can't know the answer to immediately, like "did the
// server respond in time?" or "did the file finish uploading?". A Promise
// lets your code say "run this other code once we know the answer, whichever
// way it goes" without freezing the page while it waits. This is exactly the
// pattern the Fetch API below uses for real network requests, so getting
// comfortable with .then()/.catch() here will make Challenge 5.2 much easier.
//
// See "Challenge 5.1 | Example" in index.html for an example of
// writing a Promise that resolves or rejects based on a condition.
//
// Under "Challenge 5.1 | Your Turn" in index.html:
// Write a function that returns a Promise that resolves if a random
// number is greater than 0.5 and rejects otherwise.
// Use .then() and .catch() to handle it.
// Display the result in the element with id "yourResult".
// Set the text color to green for success and red for failure.

// Your code here


// Challenge 5.2.1
// Here is an example of using the Fetch API to get raw data from an API.
// Tip: to test an API endpoint quickly in your terminal, use:
//   curl https://jsonplaceholder.typicode.com/users

function fetchRawData() {
    console.log("Button clicked, starting fetch...");
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayRawData(data);
        })
        .catch(error => console.error("Error:", error));
}

function displayRawData(data) {
    const dataDisplay = document.getElementById("rawDataDisplay");
    dataDisplay.innerHTML = "";
    const rawData = JSON.stringify(data, null, 2);
    // Note: "pre" (not "raw") is the real HTML tag here. "raw" isn't a tag at
    // all, so the browser would just ignore it and collapse all the JSON's
    // whitespace/line breaks. "pre" ("preformatted text") tells the browser
    // to preserve whitespace and line breaks exactly as written, which is
    // what makes the JSON below readable.
    const rawElement = document.createElement("pre");
    rawElement.textContent = rawData;
    dataDisplay.appendChild(rawElement);
}


// Challenge 5.2.2
// Now that we can see what the raw JSON looks like, we can process
// it into something more readable. See the example below:

function fetchData() {
    console.log("Button clicked, starting fetch...");
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => console.error("Error:", error));
}

function displayData(data) {
    const dataDisplay = document.getElementById("dataDisplay");
    dataDisplay.innerHTML = "";
    data.forEach(user => {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `<p>Name: ${user.name} | Username: ${user.username} | Email: ${user.email} | Phone: ${user.phone}</p>`;
        dataDisplay.appendChild(userElement);
    });
}


// Challenge 5.2.3 | Your Turn
// Write a program that makes a GET request to https://api.github.com/users
// using the Fetch API and displays the results in a readable format.
// Display the login and url of each user.
// Hint: use the curl tip from Challenge 5.2.1 to preview the JSON first.

function fetchYourData() {
    // Your code here
}

function displayYourData(data) {
    // Your code here
}


// ============================================================
// Yay! You have completed the JavaScript Foundations lab.
// Deploy your project to Vercel by following the instructions in the README.
// ============================================================