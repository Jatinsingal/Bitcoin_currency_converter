const btn = document.querySelector('#btnn');
const dropdowns = document.querySelector(".dropdown select");
const message = document.querySelector('.msg');
let newchangeval = "usd";

for (let currcode in countryList) {
  let newoption = document.createElement("option");
  newoption.innerText = currcode.toUpperCase();
  newoption.value = currcode;
  dropdowns.append(newoption);
  if (currcode === "usd") {
    newoption.selected = "selected";
  }
  dropdowns.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  newchangeval = currCode;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

async function convertEurToJpy(amountEur) {
  const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.json";

  
  const response = await fetch(url);


  if (!response.ok) {
    console.error(`Failed to fetch data: ${response.statusText}`);
    return;
  }

 
  const data = await response.json();
  const exchangeRate = data.btc[newchangeval];


  const amountJpy = amountEur * exchangeRate;


  message.innerText = `${amountEur} Bitcoin is equal to ${amountJpy} ${newchangeval.toUpperCase()}`;
}

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  convertEurToJpy(amtval);
});
