// Contact Section Subscribe Button
const subscribeBtn = document.getElementById("subscribeBtn");

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function() {
        const emailInput = document.querySelector(".contact-form input");
        if(emailInput && emailInput.value !== "") {
            alert("Thank you! You are now subscribed to NutriTrack.");
            emailInput.value = ""; 
        } else {
            alert("Please enter a valid email address first.");
        }
    });
}