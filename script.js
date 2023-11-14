// Grab the currentDay p id from the HTML
var currentDayEl = document.getElementById("currentDay");
// Concatenate day text with dayjs current day
currentDayEl.textContent = " The current day is " + dayjs().format('dddd, D MMMM, YYYY') + ". Have a nice day!";

// Code to store input to local storage
document.addEventListener("DOMContentLoaded", function () {
// Retrieve saved data from local storage
    const savedData = JSON.parse(localStorage.getItem("workDayScheduler")) || {};
  
// Populate input fields with saved data
    Object.keys(savedData).forEach((hour) => {
      const inputElement = document.querySelector(`.time-block[data-hour="${hour}"] [contenteditable]`);
      if (inputElement) {
        inputElement.textContent = savedData[hour];
      }
    });

   // Function to update background color based on current time
function updateBackgroundColors() {
    const currentHour = dayjs().hour();
    document.querySelectorAll(".time-block").forEach((timeBlock) => {
      const blockHour = parseInt(timeBlock.dataset.hour);
      const inputElement = timeBlock.querySelector("[contenteditable]");
      // Compare the current hour with the time block hour
      if (currentHour < blockHour) {
        inputElement.style.backgroundColor = "green"; // Set background color for future time blocks
        inputElement.style.color = "white"; // Set text color
      } else if (currentHour === blockHour) {
        inputElement.style.backgroundColor = "red"; // Set background color for the current time block
        inputElement.style.color = "white"; // Set text color
      } else {
        inputElement.style.backgroundColor = "gray"; // Set background color for past time blocks
        inputElement.style.color = "white"; // Set text color
      }
    });
  }

  updateBackgroundColors();
  setInterval(updateBackgroundColors, 60000); // Updates text colors every minute based on dayjs time

// Event listener for save buttons
    document.querySelectorAll(".saveBtn").forEach((button) => {
      button.addEventListener("click", function () {
        const hour = this.closest(".time-block").dataset.hour;
        const inputElement = this.closest(".time-block").querySelector("[contenteditable]");
        const inputValue = inputElement.textContent.trim();

// Event listener for Clear All button
  document.getElementById("clearCalendar").addEventListener("click", function () {
// Clear all saved data from local storage
    localStorage.removeItem("workDayScheduler");

// Clear all contenteditable fields on the page
    document.querySelectorAll("[contenteditable]").forEach((inputElement) => {
      inputElement.textContent = "Enter your plans here!";
    });

// Provide a confirmation message
    alert("All data cleared!");
  });
  
// Save data to local storage
        savedData[hour] = inputValue;
        localStorage.setItem("workDayScheduler", JSON.stringify(savedData));
  
// Provide a confirmation message
        alert("Your plans have been updated. Have a productive day!");
      });
    });
  });

