// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all the necessary elements from the DOM
    const dobInput = document.getElementById('dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const errorMsg = document.getElementById('error-msg');
    
    // Set the max date to today's date (to prevent future dates)
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    dobInput.setAttribute('max', maxDate);
    
    // Add click event listener to the calculate button
    calculateBtn.addEventListener('click', calculateAge);
    
    // Function to calculate age
    function calculateAge() {
        // Hide any previous error messages
        errorMsg.classList.remove('show');
        
        // Get the selected date of birth
        const dobValue = dobInput.value;
        
        // Validate if a date was selected
        if (!dobValue) {
            showError('Please select your date of birth');
            return;
        }
        
        // Convert the input string to a Date object
        const dob = new Date(dobValue);
        const today = new Date();
        
        // Validate that the date is not in the future
        if (dob > today) {
            showError('Date of birth cannot be in the future');
            return;
        }
        
        // Calculate the age in years, months, and days
        let ageYears = today.getFullYear() - dob.getFullYear();
        let ageMonths = today.getMonth() - dob.getMonth();
        let ageDays = today.getDate() - dob.getDate();
        
        // Adjust for negative months or days
        if (ageDays < 0) {
            // Borrow days from the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
            ageMonths--;
        }
        
        if (ageMonths < 0) {
            // Borrow months from the previous year
            ageMonths += 12;
            ageYears--;
        }
        
        // Display the calculated age
        yearsElement.textContent = ageYears;
        monthsElement.textContent = ageMonths;
        daysElement.textContent = ageDays;
        
        // Show the results with animation
        resultsContainer.classList.add('show');
    }
    
    // Function to show error messages
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
        
        // Hide the results if they were previously shown
        resultsContainer.classList.remove('show');
    }
});
