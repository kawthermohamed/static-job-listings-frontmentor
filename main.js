// //spinners
// let spinners = document.querySelector(".sp-overlay");
// setTimeout(() => {
//   spinners.style.display = "none";
// }, 10000);

//######################################
let Container = document.querySelector(".main-page .container");
let searchKeyword = document.querySelector(".in-filter input");
let clickedItemsContainer = document.querySelector(".clicked-item");
let KeyWords = [];
let clearBtn = document.querySelector(".clear-btn");

//
// let Role = ["Frontend", "Backend", "Fullstack"];
// let Level = ["Junior", "Midweight", "Senior"];
// let Languages = ["Python", "Ruby", "JavaScript", "HTML", "CSS"];
// let Tools = ["React", "Sass", "Vue", "Django", " RoR"];
fetchAndSort();
function fetchAndSort() {
  fetch("https://api.jsonbin.io/v3/b/64204e5febd26539d09cca29")
    .then((solve) => {
      return solve.json();
      console.log(solve.json());
    })
    .then((data2) => {
      let jobs = data2.record;
      jobs.forEach((eleJob) => {
        getdata(eleJob);
      });
      let AllJobs = document.querySelectorAll(".job");
      let filterItems = document.querySelectorAll(".filters span");

      //keyword onclick
      filterItems.forEach((item) => {
        item.onclick = function () {
          if (item.classList.contains("added")) {
          } else {
            KeyWords.push(item.innerHTML);
            console.log(KeyWords);
            // add class "added" to all span contain same text
            addedClass(filterItems, item);
            apperarClicked(item);

            AllJobs.forEach((jo) => {
              filteration(jo, KeyWords);
            });
          }
        };
      });

      //remove icon
      document.addEventListener("click", function (e) {
        if (e.target.classList == "remove-me") {
          //removeitem and update keywords
          removeItem(e, filterItems);
          //filteration again
          AllJobs.forEach((jo) => {
            jo.style.display = "flex";
            filteration(jo, KeyWords);
          });
        }
      });
      //clear
      clearBtn.onclick = function () {
        AllJobs.forEach((e) => {
          e.style.display = "flex";
        });
        clickedItemsContainer.innerHTML = "";
        filterItems.forEach((ele) => {
          ele.classList.remove("added");
        });
        KeyWords = [];
      };
    });
}

function getdata(e) {
  let jobelement = document.createElement("div");
  jobelement.className = "job";

  let jobLeft = document.createElement("div");
  jobLeft.className = "job-left";

  let logImg = document.createElement("img");
  logImg.className = "logo";
  logImg.src = e.logo;
  let jobInfo = document.createElement("div");
  jobInfo.className = "job-info";

  let first = document.createElement("div");
  first.className = "f-line";
  let company = document.createElement("span");
  company.className = "company";
  company.innerHTML = e.company;

  let status = document.createElement("span");
  status.className = "new";
  status.innerHTML = e.new == true ? "new!" : "";
  e.new == true
    ? status.classList.add("active")
    : status.classList.remove("active");
  let featured = document.createElement("span");
  featured.className = "featured";
  featured.innerHTML = e.featured == true ? "featured" : "";
  e.featured == true
    ? featured.classList.add("active")
    : featured.classList.remove("active");

  e.featured == true ? jobelement.classList.add("featured") : "";
  ///
  first.appendChild(company);
  first.appendChild(status);
  first.appendChild(featured);

  let seconed = document.createElement("div");
  seconed.className = "s-line";
  let position = document.createElement("span");
  position.className = "position";
  position.innerHTML = e.position;
  seconed.appendChild(position);

  let third = document.createElement("div");
  third.className = "t-line";
  let date = document.createElement("span");
  date.className = "date";
  date.innerHTML = e.postedAt;
  let contract = document.createElement("span");
  contract.className = "contract";
  contract.innerHTML = e.contract;
  let joblocation = document.createElement("span");
  joblocation.className = "location";
  joblocation.innerHTML = e.location;
  third.appendChild(date);
  third.appendChild(contract);
  third.appendChild(joblocation);
  ///
  jobInfo.appendChild(first);
  jobInfo.appendChild(seconed);
  jobInfo.appendChild(third);
  ///
  jobLeft.appendChild(logImg);
  jobLeft.appendChild(jobInfo);

  //
  let filters = document.createElement("div");
  filters.className = "filters";
  let jobrole = document.createElement("span");
  jobrole.className = "role";
  jobrole.innerHTML = e.role;
  let joblevel = document.createElement("span");
  joblevel.className = "level";
  joblevel.innerHTML = e.level;
  let joblanguages = document.createElement("div");
  joblanguages.className = "languages";
  let neededLanguages = e.languages;
  neededLanguages.forEach((lang) => {
    let joblanguage = document.createElement("span");
    joblanguage.className = "language";
    joblanguage.innerHTML = lang;
    // data-role="frontend" data-level="junior" data-languages="javascript" data-tools="react"
    joblanguages.appendChild(joblanguage);
  });
  let jobtools = document.createElement("div");
  jobtools.className = "Alltools";

  let neededTools = e.tools;
  neededTools.forEach((tool) => {
    let jobtool = document.createElement("span");
    jobtool.innerHTML = tool;
    jobtool.className = "tools";

    jobtools.appendChild(jobtool);
  });
  ///
  filters.appendChild(jobrole);
  filters.appendChild(joblevel);
  filters.appendChild(joblanguages);
  filters.appendChild(jobtools);
  //
  jobelement.appendChild(jobLeft);
  jobelement.appendChild(filters);
  //
  jobelement.dataset.role = e.role;
  jobelement.dataset.level = e.level;
  jobelement.dataset.languages = e.languages.join(" ");
  jobelement.dataset.tools = e.tools.join(" ");

  //
  Container.appendChild(jobelement);
}

// ##########################################3

function apperarClicked(e) {
  let itemClicked = document.createElement("div");
  let itemContent = document.createElement("span");
  itemContent.innerHTML = e.innerHTML;
  itemContent.className = "key";
  let removeitem = document.createElement("img");
  removeitem.classList = "remove-me";
  removeitem.src = "images/icon-remove.svg";
  itemClicked.appendChild(itemContent);
  itemClicked.appendChild(removeitem);
  clickedItemsContainer.appendChild(itemClicked);
}
// ##########################################3
function addedClass(array, e) {
  array.forEach((ele) => {
    if (ele.innerHTML == e.innerHTML) {
      ele.classList.add("added");
    }
  });
}
// ##########################################3
function removeItem(e, array) {
  //update keywordes
  let itemTODelete = KeyWords.indexOf(e.target.previousSibling.innerHTML);
  KeyWords.splice(itemTODelete, 1);
  console.log(KeyWords);
  //
  e.target.parentElement.remove();
  array.forEach((el) => {
    if (e.target.previousSibling.innerHTML == el.innerHTML) {
      el.classList.remove("added");
    }
  });
}

///////////////
function filteration(e, keysArray) {
  let attrArray = [
    e.dataset.role,
    e.dataset.level,
    e.dataset.languages.split(" "),
    e.dataset.tools.split(" "),
  ].flat();
  //   keysArray.every((ele) => attrArray.includes(ele));
  if (keysArray.every((ele) => attrArray.includes(ele))) {
    e.style.display = "";
  } else {
    e.style.display = "none";
  }
}
/////
// let k = [0, 1];
// let m = [2, 4, 0, 3, 1];
// console.log(k.every((element) => m.includes(element)));

fetch("https://api.jsonbin.io/v3/b/64204e5febd26539d09cca29")
  .then((data) => {
    return data.json();
  })
  .then((jobs) => {
    console.log(jobs.record);
  });
