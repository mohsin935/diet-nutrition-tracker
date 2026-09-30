// Hero Section Button
const startButton = document.getElementById("getStartedBtn");

startButton.addEventListener("click", function() {
    alert("System Check: Redirecting to your nutrition dashboard!");
});

// Contact Section Button
const subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener("click", function() {
    const emailInput = document.querySelector(".contact-form input");
    if(emailInput.value !== "") {
        alert("Thank you! You are now subscribed to NutriTrack.");
        emailInput.value = ""; // Clear input after clicking
    } else {
        alert("Please enter a valid email address first.");
    }
});