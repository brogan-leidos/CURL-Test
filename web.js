var ChampName = "";
var AP = "";
var MagicPen = "";
var UseOffCd = "";

export default () => {
  document.getElementById("calcButton").addEventListener('click', () => {
    fetchData();
  });

  
  firstRun();
}

function firstRun() {
  return;
}

function fetchData() {
  getInputs();
  fetchChampion(ChampName);
}

function getInputs() {
  ChampName = document.getElementById("champName").value;
  AP = document.getElementById("apInput").value;
  MagicPen = document.getElementById("mpInput").value;
  UseOffCd = document.getElementById("useOffCd").value;  
}

// fetch url: http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/<champname>.json
function fetchChampion(name) {
  var fetchUrl = ` http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${name}.json`
  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => console.log(data));
}
