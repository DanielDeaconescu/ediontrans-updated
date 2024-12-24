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
