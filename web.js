var version = "10.16.1";

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
  var fetchUrl = ` http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${name}.json`
  var data = "";
  fetch(fetchUrl)
    .then(response => response.json())
    .then(fetchData => {data = fetchData;
      var abilities = parseChampionAbilities(data.data[name]);
      displayInArea(abilities);             
    });

}

function parseChampionAbilities(champion) {  
  var passiveTemplate = `http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/{0}`;
  var spellTemplate = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/{0}`;

  var passiveText = champion.passive.description;
  var passiveImage = passiveTemplate.replace("{0}", champion.passive.image.full);
  
  var qText = champion.spells[0].tooltip;
  var qImage = spellTemplate.replace("{0}", champion.spells[0].image.full);
  
  var wText = champion.spells[1].tooltip;
  var wImage = spellTemplate.replace("{0}", champion.spells[1].image.full);

  var eText = champion.spells[2].tooltip;
  var eImage = spellTemplate.replace("{0}", champion.spells[2].image.full);

  var rText = champion.spells[3].tooltip;
  var rImage = spellTemplate.replace("{0}", champion.spells[3].image.full);

    
  return `<image src=${passiveImage} /> ${passiveText} <br>
                    <image src=${qImage} /> ${qText} <br>
                    <image src=${wImage} /> ${wText} <br>
                    <image src=${eImage} /> ${eText} <br>
                    <image src=${rImage} /> ${rText} <br>`;
}

function displayInArea(string) {
  var area = document.getElementById("displayArea");
  area.innerHTML = string;
}

//http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/Anivia_P.png
//http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/FlashFrost.png
