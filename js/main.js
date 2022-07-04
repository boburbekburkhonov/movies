"use strict";
const elList = document.querySelector(".list");

// const renderUsers = function (arr, htmlElement) {
//   setTimeout(function () {

// };

const renderUsers = function(arr, html){

  setTimeout(() => {
    if (arr.length > 0) {
      elList.innerHTML = null;

      arr.forEach((item) => {
        const newLi = document.createElement("li");

        newLi.textContent = item.name;

        html.appendChild(newLi);
    })
    }
  }, 1000)

}


const getUsers = async function () {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/");

  const data = await response.json();

  renderUsers(data, elList)

};

getUsers()
