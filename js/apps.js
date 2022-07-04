"use strict";

const elList = document.querySelector(".list")
const elInput = document.querySelector(".input")
const elTemplate = document.querySelector(".template").content
const elPagiTemplate = document.querySelector(".pagi-temlate").content
const elTotalResult = document.querySelector(".total-result");
const elResult = document.querySelector(".result");
const elPage = document.querySelector(".page");
const elPagination = document.querySelector(".pagination");
const elContainer = document.querySelector(".container");
const elSpin = document.querySelector(".spin");


const API_KEY = "b1566df1";
let search = "hulk";
let page = 1;

const pagination = [];


const renderMovies = function(arr, htmlElement){
  const fragment = document.createDocumentFragment();
  const fragmentPagination = document.createDocumentFragment();
  elPagination.innerHTML = null;
  elList.innerHTML = null;

  for(let i = 1; i <= pagination[pagination.length -1]; i++){

    const cloneFragmentPagination = elPagiTemplate.cloneNode(true);

    cloneFragmentPagination.querySelector(".page-link").textContent = i;

    fragmentPagination.appendChild(cloneFragmentPagination)
  }

  setTimeout(() => {
    if(arr.length > 0){
      elSpin.innerHTML = null;

      arr.forEach(item => {
        const cloneFragment = elTemplate.cloneNode(true);

        cloneFragment.querySelector(".film__img").src = item.Poster;
        cloneFragment.querySelector(".film__title").textContent = item.Title;
        cloneFragment.querySelector(".film__year").textContent = item.Year;
        cloneFragment.querySelector(".film__category").textContent = item.Type;

        fragment.appendChild(cloneFragment);
      })

      htmlElement.appendChild(fragment);
      elPagination.appendChild(fragmentPagination)
    };
  }, 1000)
}

const getMovies = async function(){
  const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`);


  const data = await request.json();

  console.log(data.Search);

  pagination.push(Math.ceil(data.totalResults / 10 ))

  elTotalResult.textContent = data.totalResults;
  elResult.textContent = data.Search.length;
  elPage.textContent = page;

  if(page <= 1){
    prevBtn.disabled = true;
  } else if(page > 1){
    prevBtn.disabled = false;
  }


  if(Math.ceil(data.totalResults / 10 ) == page ){
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  if(data.Response = "True" && data.Search.length > 0){
    renderMovies(data.Search, elList)
  }
}

getMovies()

elInput.addEventListener("change", () => {
  const inputValue = elInput.value;
  elInput.value = null;
  search = inputValue;
  page = 1;
  elList.innerHTML = null;
  getMovies();
})

prevBtn.addEventListener("click", () => {
  page--;
  getMovies()
})

nextBtn.addEventListener("click", () => {
  page++;
  getMovies();
})

elPagination.addEventListener("click", (evt) => {
  page = evt.target.textContent;
  getMovies()
})