//  Check If There'r A Main Color In Local Storg
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Rebove Active Class From All Colors List Items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //  Add Active Class On ELement With Data Color === Local Storage Items
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check  If There'r Local Storg Random Backgroung Item
let backgroundLocaleItem = localStorage.getItem("bacground_option");
//  Check If Random Background Local Storg Random Backgroung Item Is Not Empty
if (backgroundLocaleItem !== null) {
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");
// Loob On All List Items
colorLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storg
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove Active Class From All Childrens
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    //  Add Active Class On Self
    e.target.classList.add("active");
  });
});

// Switch Random Background Option
const randomBackground = document.querySelectorAll(".random-background span");
// Loob On All List Span
randomBackground.forEach((span) => {
  // Click On Every Span Items
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "enable") {
      backgroundOption = true;
      randomizeImgs(localStorage.setItem("background_option", true));
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Function TO Randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    // Select Landing Page Element
    let page = document.querySelector(".landing-page");
    // Get Array Of Imgs
    let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * images.length);
      // Change Background Image Url
      page.style.backgroundImage = 'url("images/' + images[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let SkillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  // Calc
  if (windowScrollTop > SkillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let Overlay = document.createElement("div");
    // Add Class To Overlay
    Overlay.className = "popup-overlay";
    // Append Overlay To The Body
    document.body.appendChild(Overlay);
    // Create The Popup
    let popupBox = document.createElement("div");
    // Add Class TO The Popup Box
    popupBox.className = "popup-box";
    // Add Heading
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heasing
      imgHeading.appendChild(imgText);
      // Append The Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Sourcee
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Apped Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To CLose Button
    closeButton.className = "close-button";
    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links
const allLinks = document.querySelectorAll(".links a");
// Function For Scroll Smooth To The Sections
function scrollToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //  Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .enable").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .disable").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bacground_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// Click Anywhre Outside To Close The Menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
