document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin, SlowMo);
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Listen for the 'scroll' event and log the event data to the console
    lenis.on("scroll", (e) => {
        console.log(e);
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    document.querySelector(".pcTransition").style.height = "0";
});

function goTo(destination) {
    const pcTransition = document.querySelector(".pcTransition");

    pcTransition.style.height = "100vh";

    setTimeout(() => {
        window.open(`${destination}`, "_self");
    }, 1000);
}

function searchItems() {
    // Get the search bar input value
    let input = document.getElementById("searchBar").value.toLowerCase();
    // Get all the content items
    let items = document.getElementsByClassName("content-item");

    // Loop through all the items
    for (let i = 0; i < items.length; i++) {
        // Get the text content of the current item
        let itemText = items[i].textContent || items[i].innerText;

        // Check if the item matches the search query
        if (itemText.toLowerCase().indexOf(input) > -1) {
            items[i].style.display = ""; // Show the item
        } else {
            items[i].style.display = "none"; // Hide the item
        }
    }
}

function copyScript(type, url) {
    if (type === 'css') {
        navigator.clipboard.writeText(`<link rel='import' href='${url}'>`);
        createAlertBox('CSS script import for HTML has been copied.')
    } else if (type === 'js') {
        navigator.clipboard.writeText(`<script src='${url}'>`);
        createAlertBox('JS script import for HTML has been copied.')
    }
} 

function createAlertBox(message, timeout) {
    const alertContainer = document.getElementById('alertContainer');

    // Create the alert box
    const alertBox = document.createElement('div');
    alertBox.classList.add('alertBox');
    alertBox.innerText = message;

    // Append it to the alert container
    alertContainer.appendChild(alertBox);

    // Set a timeout to fade out the alert box smoothly
    setTimeout(() => {
        alertBox.classList.add('fadeOut');
        // Remove the alert box from the DOM after the fade-out transition
        setTimeout(() => {
            alertBox.remove();
        }, 4000); // This matches the CSS transition duration
    }, timeout);
}