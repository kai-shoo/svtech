"use strict";

const navToggle = document.querySelector(".header__toggle-table");
const products = document.querySelector(".products__container");

navToggle.addEventListener("mouseover", () => {
  products.classList.toggle("products__table");
  products.classList.toggle("products__cards");
});

const titles = document.querySelectorAll(".products__title-link");

// change title

const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

const popupTemplate = document
  .querySelector("#popup")
  .content.querySelector(".popup");

products.addEventListener("click", (e) => {
  e.preventDefault();
  const titleContainer = e.target.closest(".products__title");
  if (
    !e.target.classList.contains("products__title-link") ||
    titleContainer.classList.contains("popuped")
  )
    return;

  const popupItem = popupTemplate.cloneNode(true);
  titleContainer.classList.toggle("popuped");

  const title = titleContainer.querySelector(".products__title-link");
  titleContainer.append(popupItem);

  const input = popupItem.querySelector(".popup__input");
  input.value = title.textContent;

  input.focus();
  input.select();

  popupItem
    .querySelector(".popup__button")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      title.textContent = input.value;
      popupItem.remove();
      titleContainer.classList.toggle("popuped");

      // const data = await AJAX('someUrl', titleContainer)
    });
});

// Drag n Drop

document.addEventListener("DOMContentLoaded", (event) => {
  let dragSrcEl = null;

  const handleDragStart = function (e) {
    this.style.opacity = "0.7";

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  };

  const handleDragOver = function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = "move";

    return false;
  };

  const handleDragEnter = function (e) {
    this.classList.toggle("over");
  };

  const handleDragLeave = function (e) {
    this.classList.toggle("over");
  };

  const handleDrop = function (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }

    return false;
  };

  const handleDragEnd = function (e) {
    this.style.opacity = "1";

    items.forEach((item) => {
      item.classList.remove("over");
    });
  };

  let items = document.querySelectorAll(".products__item");
  items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart, false);
    item.addEventListener("dragenter", handleDragEnter, false);
    item.addEventListener("dragover", handleDragOver, false);
    item.addEventListener("dragleave", handleDragLeave, false);
    item.addEventListener("drop", handleDrop, false);
    item.addEventListener("dragend", handleDragEnd, false);
  });
});

////////////////////////////////////////////////////////

const isValid = function (s) {
  const stack = [];
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (char of s) {
    if (Object.keys(map).includes(char)) stack.push(char);

    console.log(stack, char);

    if (!Object.keys(map).includes(char) && map[stack.pop()] !== char)
      return false;
  }

  return stack.length ? false : true;
};
