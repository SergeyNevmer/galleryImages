"use strict";

import arrayImages from "./gallery-items.js";

const containerForGallery = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const img = document.querySelector(".lightbox__image");
const buttonClose = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const bgOverlay = document.querySelector(".lightbox__overlay");
let currentImg;

bgOverlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closeModalWindow();
  }
});

containerForGallery.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  let url = e.target.dataset.source;
  lightBox.classList.add("is-open");

  if (img.getAttribute("src") === "") {
    img.setAttribute("src", `${url}`);
  }
}

buttonClose.addEventListener("click", closeModalWindow);

function closeModalWindow() {
  if (img.getAttribute("src") !== "") {
    img.setAttribute("src", "");
  }
  lightBox.classList.remove("is-open");
}

arrayImages.forEach((item) => {
  let el = buildItemForGallery(item);
  addItemInGallery(el, containerForGallery);
});

function buildItemForGallery(item) {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${"#"}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`;
}

function addItemInGallery(elem, place) {
  place.insertAdjacentHTML("beforeend", `${elem}`);
}

function returnArrSrc() {
  const arrForSrc = [];
  const list = document.querySelectorAll(".gallery__item");

  list.forEach((item) => {
    let count = 0;
    arrForSrc.push(
      item.children[`${count}`].children[`${count}`].dataset.source
    );
    count += 1;
  });
  return arrForSrc;
}

document.addEventListener("keydown", (e) => {
  let arrImg = returnArrSrc();
  let image = img.getAttribute("src");
  if (lightBox.classList.contains("is-open")) {
    if (e.code === "ArrowRight") {
      for (let i = 0; i < arrImg.length; i += 1) {
        if (image === arrImg[i]) {
          if (i === 8) {
            currentImg = arrImg[0];
            img.setAttribute("src", `${currentImg}`);
          }
          if (i < 8) {
            currentImg = arrImg[i + 1];
            img.setAttribute("src", `${currentImg}`);
          }
        }
      }
    }
    if (e.code === "ArrowLeft") {
      for (let i = 0; i < arrImg.length; i += 1) {
        if (image === arrImg[i]) {
          if (i === 0) {
            currentImg = arrImg[8];
            img.setAttribute("src", `${currentImg}`);
          }
          if (i > 0) {
            currentImg = arrImg[i - 1];
            img.setAttribute("src", `${currentImg}`);
          }
        }
      }
    }
  }
});
