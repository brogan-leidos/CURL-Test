

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
  fetchChampions();
}

function getInputs() {
  var ChampName = document.getElementById("champName").value;
  var AP = document.getElementById("apInput").value;
  var MagicPen = document.getElementById("mpInput").value;
  var UseOffCd = document.getElementById("useOffCd").value;  
}

// fetch url: http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/<champname>.json
function fetchChampions() {
  var fetchUrl = ` http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${ChampName}.json`
  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => console.log(data));
}
