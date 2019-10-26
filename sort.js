let iterationCount = 0;
let comparisonCount = 0;
let sortResults = [];
let comparisonResults = [];

// Prevent unwanted signs

document
  .querySelector("#sortInput")
  .addEventListener("keypress", function(evt) {
    if (
      (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
      evt.which > 57
    ) {
      evt.preventDefault();
    }
  });

let bubbleSort = inputArr => {
  iterationCount = 0;
  comparisonCount = 0;
  let len = inputArr.length;
  let swapped;
  do {
    swapped = false;
    // compares two values and sorts by ascending values
    for (let j = 0; j < len; j++) {
      iterationCount++;
      if (inputArr[j] > inputArr[j + 1]) {
        comparisonCount++;
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
        console.log(inputArr);
        swapped = true;
      }
    }
  } while (swapped);
  sortResults.push(iterationCount);
  comparisonResults.push(comparisonCount);
  return inputArr;
};

let sortArray = [];

const renderStats = () => {
  const wrapper = document.querySelector(".iterationContainer");
  const container = document.querySelector(".iterationContainer .stats");
  const max = Math.max(...sortResults);
  const min = Math.min(...sortResults);
  const avg = Math.floor(
    sortResults.reduce((a, b) => a + b, 0) / sortResults.length
  );
  console.info(max, min, avg);
  const maxDisplay = document.createElement("h1");
  maxDisplay.classList.add("stat");
  maxDisplay.innerText = `Maximum - ${max}`;
  const minDisplay = document.createElement("h1");
  minDisplay.classList.add("stat");
  minDisplay.innerText = `Minimum - ${min}`;
  const avgDisplay = document.createElement("h1");
  avgDisplay.classList.add("stat");
  avgDisplay.innerText = `Średnio - ${avg}`;
  container.appendChild(maxDisplay);
  container.appendChild(minDisplay);
  container.appendChild(avgDisplay);
};

renderComparisons = () => {
  const wrapper = document.querySelector(".comparisonContainer");
  const container = document.querySelector(".comparisonContainer .stats");
  const max = Math.max(...comparisonResults);
  const min = Math.min(...comparisonResults);
  const avg = Math.floor(
    comparisonResults.reduce((a, b) => a + b, 0) / comparisonResults.length
  );
  console.info(max, min, avg);
  const maxDisplay = document.createElement("h1");
  maxDisplay.classList.add("stat");
  maxDisplay.innerText = `Maximum - ${max}`;
  const minDisplay = document.createElement("h1");
  minDisplay.classList.add("stat");
  minDisplay.innerText = `Minimum - ${min}`;
  const avgDisplay = document.createElement("h1");
  avgDisplay.classList.add("stat");
  avgDisplay.innerText = `Średnio - ${avg}`;
  container.appendChild(maxDisplay);
  container.appendChild(minDisplay);
  container.appendChild(avgDisplay);
};

const renderResults = inputArray => {
  const container = document.querySelector(".results");
  const result = document.createElement("div");
  result.classList.add("result");
  const unsorted = document.createElement("h1");
  unsorted.classList.add("array");
  unsorted.innerText = `Przed sortowaniem - [ ${inputArray.join(", ")} ]`;
  const sorted = document.createElement("h1");
  sorted.classList.add("array");
  sorted.innerText = `Po sortowaniu -  [ ${bubbleSort(inputArray).join(
    ", "
  )} ]`;
  const iterations = document.createElement("h1");
  iterations.innerText = `Liczba iteracji - ${iterationCount}`;
  iterations.classList.add("iterations");
  const comparisons = document.createElement("h1");
  comparisons.innerText = `Liczba zamian - ${comparisonCount}`;
  comparisons.classList.add("comparisons");
  // Append results to the DOM
  result.appendChild(iterations);
  result.appendChild(comparisons);
  result.appendChild(unsorted);
  result.appendChild(sorted);
  container.appendChild(result);
};

const createRandomValues = length => {
  for (let i = 0; i < length; i++) {
    const number = Math.floor(Math.random() * 100);
    sortArray.push(number);
  }
};

const handleSubmit = () => {
  sortResults = [];
  comparisonResults = [];
  // Clear previous results
  const container = document.querySelector(".results");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const stats = document.querySelector(".iterationContainer .stats");
  while (stats.firstChild) {
    stats.removeChild(stats.firstChild);
  }
  const comparisons = document.querySelector(".comparisonContainer .stats");
  while (comparisons.firstChild) {
    comparisons.removeChild(comparisons.firstChild);
  }
  const statHeader = document.querySelectorAll(".statHeader");
  console.info(statHeader);
  comparisons.classList.remove("visible");
  statHeader[0].classList.remove("visible");
  statHeader[1].classList.remove("visible");
  container.classList.remove("visible");
  stats.classList.remove("visible");

  // Generate new results
  const amount = document.getElementById("sortInput").value.trim();
  if (amount) {
    console.info(amount);
    for (let i = 0; i < amount; i++) {
      sortArray = [];
      createRandomValues(10);
      renderResults(sortArray);
    }
    renderStats();
    renderComparisons();
    comparisons.classList.add("visible");
    statHeader[0].classList.add("visible");
    statHeader[1].classList.add("visible");
    container.classList.add("visible");
    stats.classList.add("visible");
  } else {
    document.querySelector("#sortInput").classList.remove("shake");
    setTimeout(() => {
      document.querySelector("#sortInput").classList.add("shake");
    }, 100);
  }
};
