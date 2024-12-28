// Replace Text In Header
const checkReplace = document.querySelector(".replace-me");

if (checkReplace !== null) {
  const replace = new ReplaceMe(checkReplace, {
    animation: "animated fadeIn",
    speed: 2000,
    separator: ",",
    loopCount: "infinite",
    autoRun: true,
  });
}

// User Scroll For Navbar
// function userScroll() {
//   const navbar = document.querySelector('.navbar');

//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//       navbar.classList.add('bg-dark');
//       navbar.classList.add('border-bottom');
//       navbar.classList.add('border-secondary');
//       navbar.classList.add('navbar-sticky');
//     } else {
//       navbar.classList.remove('bg-dark');
//       navbar.classList.remove('border-bottom');
//       navbar.classList.remove('border-secondary');
//       navbar.classList.remove('navbar-sticky');
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", userScroll);

// Video Modal
const videoBtn = document.querySelector(".video-btn");
const videoModal = document.querySelector("#videoModal");
const video = document.querySelector("#video");
let videoSrc;

if (videoBtn !== null) {
  videoBtn.addEventListener("click", () => {
    videoSrc = videoBtn.getAttribute("data-bs-src");
  });
}

if (videoModal !== null) {
  videoModal.addEventListener("shown.bs.modal", () => {
    video.setAttribute(
      "src",
      videoSrc + "?autoplay=1;modestbranding=1;showInfo=0"
    );
  });

  videoModal.addEventListener("hide.bs.modal", () => {
    video.setAttribute("src", videoSrc);
  });
}

// Testimonials Functionality
const showMoreReviewsButton = document.querySelector(
  ".show-more-reviews-button"
);
const testimonialsContainer = document.querySelector(".testimonials-container");

let allReviews = [];
let initialDisplayCount = 3;
let isShowingAll = false;

function clearReviews() {
  testimonialsContainer.innerHTML = "";
}

clearReviews();

function displayReviews(reviews) {
  reviews.forEach((review) => {
    console.log(review);
    // create the testimonial-single
    const testimonialSingle = document.createElement("div");
    testimonialSingle.classList.add("testimonial-single");
    // create the testimonial-picture
    const testimonialPicture = document.createElement("div");
    testimonialPicture.classList.add("testimonial-picture");
    // create testimonial-picture-inner
    const testimonialPictureInner = document.createElement("img");
    testimonialPictureInner.classList.add("testimonial-picture-inner");
    testimonialPictureInner.setAttribute("src", `${review.src}`);
    // create the testimonial-quote
    const testimonialQuote = document.createElement("div");
    testimonialQuote.classList.add("testimonial-quote");
    testimonialQuote.innerHTML = `${review.comment}`;
    // create the testimonial-details
    const testimonialDetails = document.createElement("div");
    testimonialQuote.classList.add("testimonial-details");
    // create user-info
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    // create user-info-user
    const userInfoUser = document.createElement("span");
    userInfoUser.classList.add("user-info-user");
    userInfoUser.innerText = "Utilizator:";
    // create user-info-name
    const userInfoName = document.createElement("span");
    userInfoName.classList.add("user-info-name");
    userInfoName.innerText = `${review.name}`;
    // create google-review
    const googleReview = document.createElement("div");
    googleReview.classList.add("google-review");

    // create google-review-review
    const googleReviewReview = document.createElement("div");
    googleReviewReview.classList.add("google-review-review");
    googleReviewReview.innerText = "REVIEW GOOGLE:";
    // create google-review-stars
    const googleReviewStars = document.createElement("div");
    googleReviewStars.classList.add("google-review-stars");

    for (let i = 0; i < review.rating; i++) {
      const starIcon = document.createElement("i");
      starIcon.classList.add("fas", "fa-star", "star-custom");
      googleReviewStars.appendChild(starIcon);
    }

    // appending
    testimonialSingle.appendChild(testimonialPicture);
    testimonialSingle.appendChild(testimonialQuote);
    testimonialSingle.appendChild(testimonialDetails);
    testimonialPicture.appendChild(testimonialPictureInner);
    testimonialDetails.appendChild(userInfo);
    testimonialDetails.appendChild(googleReview);
    userInfo.appendChild(userInfoUser);
    userInfo.appendChild(userInfoName);
    googleReview.appendChild(googleReviewReview);
    googleReview.appendChild(googleReviewStars);
    if (testimonialsContainer) {
      testimonialsContainer.appendChild(testimonialSingle);
    }
  });
}

// Fetch all the reviews
async function fetchReviews() {
  try {
    const response = await fetch("data/reviews.json");
    if (!response.ok) throw new Error("Could not load reviews");

    const data = await response.json();
    allReviews = data;
    // display only the first 3 reviews initially
    displayReviews(allReviews.slice(0, initialDisplayCount));
  } catch (err) {
    console.error("There was a problem during the fetch operation", err);
  }
}

fetchReviews();

// Toggle function
function toggleReviews() {
  const spanText = showMoreReviewsButton.querySelector(
    ".show-more-reviews-button-text"
  );
  if (!isShowingAll) {
    // show all reviews
    displayReviews(allReviews.slice(initialDisplayCount));
    spanText.textContent = "Vezi mai puțin";
    isShowingAll = true;
  } else {
    // revert to showing only the initial 3 reviews
    clearReviews();
    displayReviews(allReviews.slice(0, initialDisplayCount));
    spanText.textContent = "Vezi mai multe recenzii Google";
    isShowingAll = false;
  }
}

if (showMoreReviewsButton) {
  showMoreReviewsButton.addEventListener("click", function (e) {
    e.preventDefault();
    toggleReviews();
  });
}

// Display the corresponding buttons
const modalBody = document.querySelector(".modal-body");

function cleanModalBody() {
  modalBody.innerHTML = "";
}

// create initial buttons function
function createInitialButtons() {
  const initialButtonsContainer = document.createElement("div");
  initialButtonsContainer.classList.add("initial-buttons-container");
  // transport-people button
  const button1 = document.createElement("button");
  button1.classList.add("button-form", "button-transport-people");
  button1.innerText = "Transport persoane";
  initialButtonsContainer.appendChild(button1);
  // flight tickets button
  const button2 = document.createElement("button");
  button2.classList.add("button-form", "button-flight-tickets");
  button2.innerText = "Bilete de avion";
  initialButtonsContainer.appendChild(button2);
  // send parcel button
  const button3 = document.createElement("button");
  button3.classList.add("button-form", "button-send-parcel");
  button3.innerText = "Trimite colet";
  initialButtonsContainer.appendChild(button3);

  modalBody.appendChild(initialButtonsContainer);
}

// create the initial buttons when displaying the modal
document
  .querySelector(".call-to-action-button")
  .addEventListener("click", function () {
    cleanModalBody();
    createInitialButtons();
  });

// function to create the back button
function createBackBtn() {
  modalBody.insertAdjacentHTML(
    "afterbegin",
    `<button class="back-button"><i class="fas fa-arrow-circle-left fa-2x"></i></button>`
  );
}

// function to create the buttons for transport-people
function createTransportPeopleBtns() {
  cleanModalBody();
  // transport-people-italy container
  const transportPeopleContainer = document.createElement("div");
  transportPeopleContainer.classList.add("transport-people-container");

  // transport-people italy
  const button1 = document.createElement("button");
  button1.innerText = "Transport persoane Italia";
  button1.classList.add("transport-people-italy");

  // transport-people france-germany
  const button2 = document.createElement("button");
  button2.innerText = "Transport persoane Franța/Germania";
  button2.classList.add("transport-people-france-germany");

  // transfer-airport
  const button3 = document.createElement("button");
  button3.innerText = "Transfer aeroport";
  button3.classList.add("transfer-airport");

  // transport people locally
  const button4 = document.createElement("button");
  button4.innerText = "Transport local persoane";
  button4.classList.add("transport-people-locally");

  transportPeopleContainer.appendChild(button1);
  transportPeopleContainer.appendChild(button2);
  transportPeopleContainer.appendChild(button3);
  transportPeopleContainer.appendChild(button4);

  modalBody.appendChild(transportPeopleContainer);

  // create the back button
  createBackBtn();
}

// function to create the buttons for send-parcel
function createSendParcelBtns() {
  cleanModalBody();
  const sendParcelContainer = document.createElement("div");
  sendParcelContainer.classList.add("send-parcel-container");

  // send parcel Italy
  const button1 = document.createElement("button");
  button1.innerText = "Trimite colet Italia";
  button1.classList.add("send-parcel-italy");
  sendParcelContainer.appendChild(button1);

  // send parcel france-germany
  const button2 = document.createElement("button");
  button2.innerText = "Trimite colet Franta/Germania";
  button2.classList.add("send-parcel-france-germany");
  sendParcelContainer.appendChild(button2);

  modalBody.appendChild(sendParcelContainer);

  // create the back button
  createBackBtn();
}

// function to go back to the initial buttons
// function goBackBtn() {
//   cleanModalBody();
//   createInitialButtons();
// }

// function to create transport-people-italy-form
function createTransportPeopleItalyForm() {
  const transportItalyForm = document.createElement("form");
  transportItalyForm.classList.add("transport-people-italy-form");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "text-dark", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  transportItalyForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row1.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "name");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "name");
  input2.classList.add("form-control", "text-dark", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  transportItalyForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "phone");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "text-dark", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  transportItalyForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  transportItalyForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  transportItalyForm.appendChild(row5);

  modalBody.appendChild(transportItalyForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  transportItalyForm.appendChild(row6);
}

function cleanInitialButtons() {
  document.querySelector(".initial-buttons-container").innerHTML = "";
}

// event handler for initial buttons
modalBody.addEventListener("click", function (e) {
  const clickedBtn = e.target;
  if (!clickedBtn.classList.contains("button-form")) return;
  console.log(clickedBtn);
  // people-transport
  if (
    clickedBtn.classList.contains("button-transport-people") &&
    document.querySelector(".transport-people-italy") === null
  ) {
    createTransportPeopleBtns();
    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createInitialButtons();
        console.log("test");
      });
  }

  if (
    clickedBtn.classList.contains("button-flight-tickets") &&
    document.querySelector(".create-flight-tickets-form") === null
  ) {
    createFlightTicketsForm();
    cleanInitialButtons();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createInitialButtons();
      });
  }

  if (
    clickedBtn.classList.contains("button-send-parcel") &&
    document.querySelector(".send-parcel-italy") === null
  ) {
    createSendParcelBtns();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createInitialButtons();
      });
  }
});

// function to remove the transport-people buttons
function cleanTransportPeopleButtons() {
  document.querySelector(".transport-people-container").remove();
}

// function to create transport-people-italy-form
function createTransportPeopleFranceGermanyForm() {
  const transportFranceGermanyForm = document.createElement("form");
  transportFranceGermanyForm.classList.add(
    "transport-people-france-germany-form"
  );

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  transportFranceGermanyForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  transportFranceGermanyForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  transportFranceGermanyForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  transportFranceGermanyForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  transportFranceGermanyForm.appendChild(row5);

  modalBody.appendChild(transportFranceGermanyForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  transportFranceGermanyForm.appendChild(row6);
}

// function to create transfer-airport-form
function createAirportForm() {
  const transportLocalForm = document.createElement("form");
  transportLocalForm.classList.add("transport-airport-form");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  transportLocalForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  transportLocalForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  transportLocalForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  transportLocalForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  transportLocalForm.appendChild(row5);

  modalBody.appendChild(transportLocalForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  transportLocalForm.appendChild(row6);
}

// function to create transport-people-locally
function createTransportPeopleLocallyForm() {
  const transportPeopleLocallyForm = document.createElement("form");
  transportPeopleLocallyForm.classList.add("transport-people-locally-form");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  transportPeopleLocallyForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  transportPeopleLocallyForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  transportPeopleLocallyForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  transportPeopleLocallyForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  transportPeopleLocallyForm.appendChild(row5);

  modalBody.appendChild(transportPeopleLocallyForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  transportPeopleLocallyForm.appendChild(row6);
}

// function to create flight-tickets-form
function createFlightTicketsForm() {
  const flightTicketsForm = document.createElement("form");
  flightTicketsForm.classList.add("flight-tickets-form");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  flightTicketsForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  flightTicketsForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  flightTicketsForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  flightTicketsForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  flightTicketsForm.appendChild(row5);

  modalBody.appendChild(flightTicketsForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  flightTicketsForm.appendChild(row6);

  createBackBtn();
}

// function to remove the send-parcel buttons
function cleanSendParcelButtons() {
  document.querySelector(".send-parcel-container").innerHTML = "";
}

// function to create send-parcel-italy
function sendParcelItalyForm() {
  const sendParcelItalyForm = document.createElement("form");
  sendParcelItalyForm.classList.add("send-parcel-italy");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  sendParcelItalyForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  sendParcelItalyForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  sendParcelItalyForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  sendParcelItalyForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  sendParcelItalyForm.appendChild(row5);

  modalBody.appendChild(sendParcelItalyForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  sendParcelItalyForm.appendChild(row6);
}

// function to create send-parcel-france-germany
function sendParcelFranceGermanyForm() {
  const sendParceFranceGermanyForm = document.createElement("form");
  sendParceFranceGermanyForm.classList.add("send-parcel-france-germany-form");

  // create row 1
  const row1 = document.createElement("div");
  row1.classList.add("mb-4");
  const label1 = document.createElement("label");
  label1.classList.add("form-label");
  label1.setAttribute("for", "name");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "name");
  input1.classList.add("form-control", "input-custom");
  row1.appendChild(label1);
  row1.appendChild(input1);
  sendParceFranceGermanyForm.appendChild(row1);

  // create row 2
  const row2 = document.createElement("div");
  row2.classList.add("mb-4");
  const label2 = document.createElement("label");
  label2.classList.add("form-label");
  label2.setAttribute("for", "phone");
  label2.innerText = "Numar de telefon: ";
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "phone");
  input2.classList.add("form-control", "input-custom");
  row2.appendChild(label2);
  row2.appendChild(input2);
  sendParceFranceGermanyForm.appendChild(row2);

  // create row 3
  const row3 = document.createElement("div");
  row1.classList.add("mb-4");
  const label3 = document.createElement("label");
  label3.classList.add("form-label");
  label3.setAttribute("for", "date");
  label3.innerText = "Alege data plecarii: ";
  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("name", "departure-date");
  input3.classList.add("form-control", "input-custom");
  row3.appendChild(label3);
  row3.appendChild(input3);
  sendParceFranceGermanyForm.appendChild(row3);

  // create row 4
  const row4 = document.createElement("div");
  row4.classList.add("mb-4");
  const label4 = document.createElement("label");
  label4.setAttribute("for", "departure-place");
  label4.classList.add("form-label");
  label4.innerText = "Punctul de plecare";
  const selectDeparture = document.createElement("select");
  selectDeparture.setAttribute("name", "departure-place");
  selectDeparture.classList.add("form-select");
  const option1 = document.createElement("option");
  option1.setAttribute("value", "null");
  option1.innerText = "Alege punctul de plecare";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "Loc plecare 2");
  option2.innerText = "Loc plecare 2";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "Loc plecare 3");
  option3.innerText = "Loc plecare 3";
  const option4 = document.createElement("option");
  option4.setAttribute("value", "Loc plecare 4");
  option4.innerText = "Loc plecare 4";
  selectDeparture.appendChild(option1);
  selectDeparture.appendChild(option2);
  selectDeparture.appendChild(option3);
  selectDeparture.appendChild(option4);
  row4.appendChild(label4);
  row4.appendChild(selectDeparture);
  sendParceFranceGermanyForm.appendChild(row4);

  // create row 5
  const row5 = document.createElement("div");
  row5.classList.add("mb-4");
  const labelArrival = document.createElement("label");
  labelArrival.setAttribute("for", "arrival-place");
  labelArrival.classList.add("form-label");
  labelArrival.innerText = "Punctul de sosire";
  const selectArrival = document.createElement("select");
  selectArrival.setAttribute("name", "arrival-place");
  selectArrival.classList.add("form-select");
  const optionArrival1 = document.createElement("option");
  optionArrival1.setAttribute("value", "null");
  optionArrival1.innerText = "Alege punctul de sosire";
  const optionArrival2 = document.createElement("option");
  optionArrival2.setAttribute("value", "Punct sosire 1");
  optionArrival2.innerText = "Punct sosire 1";
  const optionArrival3 = document.createElement("option");
  optionArrival3.setAttribute("value", "Punct sosire 2");
  optionArrival3.innerText = "Punct sosire 2";
  const optionArrival4 = document.createElement("option");
  optionArrival4.setAttribute("value", "Punct sosire 3");
  optionArrival4.innerText = "Punct sosire 3";
  const optionArrival5 = document.createElement("option");
  optionArrival5.setAttribute("value", "Punct sosire 5");
  optionArrival5.innerText = "Punct sosire 5";

  selectArrival.appendChild(optionArrival1);
  selectArrival.appendChild(optionArrival2);
  selectArrival.appendChild(optionArrival3);
  selectArrival.appendChild(optionArrival4);
  selectArrival.appendChild(optionArrival5);
  row5.appendChild(labelArrival);
  row5.appendChild(selectArrival);
  sendParceFranceGermanyForm.appendChild(row5);

  modalBody.appendChild(sendParceFranceGermanyForm);

  // row 6 - submit/cancel buttons
  const row6 = document.createElement("div");
  row6.classList.add("mb-4", "d-flex", "justify-content-center", "gap-4");
  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Trimite";
  submitContainer.appendChild(submitButton);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.innerText = "Anuleaza";
  cancelContainer.appendChild(cancelButton);

  row6.appendChild(submitContainer);
  row6.appendChild(cancelContainer);

  sendParceFranceGermanyForm.appendChild(row6);
}

// event handler for transport-people
document.querySelector(".modal-body").addEventListener("click", function (e) {
  const clickedButton = e.target;
  // transport people italy
  if (
    clickedButton.classList.contains("transport-people-italy") &&
    document.querySelector(".transport-people-italy-form") === null
  ) {
    createTransportPeopleItalyForm();
    cleanTransportPeopleButtons();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createTransportPeopleBtns();
      });

    // document
    // .querySelector(".back-button")
    // .addEventListener("click", function () {
    //   cleanModalBody();
    //   createTransportPeopleBtns();
    // });
  }
  // transport people france-germany
  if (
    clickedButton.classList.contains("transport-people-france-germany") &&
    document.querySelector(".transport-people-france-germany-form") === null
  ) {
    createTransportPeopleFranceGermanyForm();
    cleanTransportPeopleButtons();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createTransportPeopleBtns();
      });
  }
  // transport airport
  if (
    clickedButton.classList.contains("transfer-airport") &&
    document.querySelector(".transport-airport-form") === null
  ) {
    createAirportForm();
    cleanTransportPeopleButtons();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createTransportPeopleBtns();
      });
  }
  // transport-people-locally
  if (
    clickedButton.classList.contains("transport-people-locally") &&
    document.querySelector(".transport-people-locally-form") === null
  ) {
    createTransportPeopleLocallyForm();
    cleanTransportPeopleButtons();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createTransportPeopleBtns();
      });
  }
});

// event handler for send-parcel
document.querySelector(".modal-body").addEventListener("click", function (e) {
  const clickedButton = e.target;
  // send parcel italy
  if (clickedButton.classList.contains("send-parcel-italy")) {
    cleanSendParcelButtons();
    sendParcelItalyForm();

    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createSendParcelBtns();
      });
  }
  // send parcel france-germany
  if (clickedButton.classList.contains("send-parcel-france-germany")) {
    cleanSendParcelButtons();
    sendParcelFranceGermanyForm();
    // in case the user wants to go back
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        cleanModalBody();
        createSendParcelBtns();
      });
  }
});

const fillFormBtn = document.querySelector(".fill-form-btn");
const modalBodyFillForm = document.querySelector(".modal-body-fill-form");

// function to create ask-a-question-form
function createAskQuestionForm() {
  const askQuestionForm = document.createElement("form");
  askQuestionForm.classList.add("ask-question-form");

  const row1 = document.createElement("div");
  row1.classList.add("row-1");
  const label1 = document.createElement("label");
  label1.innerText = "Nume: ";
  const input1 = document.createElement("input");
  input1.classList.add("form-control");
  row1.appendChild(label1);
  row1.appendChild(input1);
  askQuestionForm.appendChild(row1);

  const row2 = document.createElement("div");
  row2.classList.add("row-2");
  const label2 = document.createElement("label");
  label2.innerText = "Numar de telefon: ";
  label2.setAttribute("for", "name");
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.classList.add("form-control");
  row2.appendChild(label2);
  row2.appendChild(input2);
  askQuestionForm.appendChild(row2);

  const row3 = document.createElement("div");
  row3.classList.add("row-3");
  const label3 = document.createElement("label");
  label3.innerText = "Mesajul dumneavoastră: ";
  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.setAttribute("rows", "3");
  row3.appendChild(label3);
  row3.appendChild(textarea);
  askQuestionForm.appendChild(row3);

  const row4 = document.createElement("div");
  row4.classList.add("row-4", "form-actions");
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("btn", "btn-success", "btn-submit-custom");
  submitBtn.innerText = "Submit";
  submitBtn.setAttribute("type", "submit");
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "btn-danger", "btn-cancel-custom");
  cancelBtn.innerText = "Cancel";
  cancelBtn.setAttribute("type", "submit");
  row4.appendChild(submitBtn);
  row4.appendChild(cancelBtn);
  askQuestionForm.appendChild(row4);

  modalBodyFillForm.appendChild(askQuestionForm);
}

fillFormBtn.addEventListener("click", function () {
  if (document.querySelector(".ask-question-form") !== null) return;
  createAskQuestionForm();
});

// go-back functionality
const backButton = document.querySelector(".back-button");
if (backButton && document.querySelector(".transport-people-container")) {
  cleanModalBody();
  createInitialButtons();
}
