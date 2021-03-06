var version;

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
  var fetchUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
  fetch(fetchUrl)
    .then(response => response.json())
    .then(fetchData => {
      version = fetchData[0];
    });
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
      setBackground(name);
      displayInArea(abilities);
    });

}

function parseChampionAbilities(champion) {  
  var passiveTemplate = `http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/{0}`;
  var spellTemplate = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/{0}`;

  var passiveText = `<div style="font-size:16px; font-weight:bold">${champion.passive.name}</div>`;
  passiveText += champion.passive.description;
  var passiveImage = passiveTemplate.replace("{0}", champion.passive.image.full);
  
  var qText = `<div style="font-size:16px; font-weight:bold">${champion.spells[0].name}</div>`;
  qText += formatAbilityTooltip(champion, champion.spells[0].tooltip, 0);
  var qImage = spellTemplate.replace("{0}", champion.spells[0].image.full);
    
  var wText = `<div style="font-size:16px; font-weight:bold">${champion.spells[1].name}</div>`;
  wText += formatAbilityTooltip(champion, champion.spells[1].tooltip, 1);
  var wImage = spellTemplate.replace("{0}", champion.spells[1].image.full);
  
  var eText = `<div style="font-size:16px; font-weight:bold">${champion.spells[2].name}</div>`;
  eText += formatAbilityTooltip(champion, champion.spells[2].tooltip, 2);
  var eImage = spellTemplate.replace("{0}", champion.spells[2].image.full);

  var rText = `<div style="font-size:16px; font-weight:bold">${champion.spells[3].name}</div>`;
  rText += formatAbilityTooltip(champion, champion.spells[3].tooltip, 3);
  var rImage = spellTemplate.replace("{0}", champion.spells[3].image.full);

    
  return `<div class="abilityBlock"><image src=${passiveImage} class="abilityImage" /> <span class="abilityText">${passiveText} </span></div>
                    <div class="abilityBlock"><image src=${qImage} class="abilityImage" /> <span class="abilityText"> ${qText} </span></div>
                    <div class="abilityBlock"><image src=${wImage} class="abilityImage" /> <span class="abilityText"> ${wText} </span></div>
                    <div class="abilityBlock"><image src=${eImage} class="abilityImage" /> <span class="abilityText"> ${eText} </span></div>
                    <div class="abilityBlock"><image src=${rImage} class="abilityImage" /> <span class="abilityText"> ${rText} </span></div>`;
}

function formatAbilityTooltip(champion, tooltip, spellType) {
  var level = 0;
  while(true) {    // replace variable instances (ex: {{ f1 }} )
    var toFormat = tooltip.match(/{{\s([^}]*)\s}}/);
    if (toFormat == null) {
      break;
    }
    
    var formatValue = "";
    if (toFormat[1].length == 2) {
      if (toFormat[1][0] == "e") {
        formatValue = champion.spells[spellType].effectBurn[parseInt(toFormat[1][1])];
      }
      else if (toFormat[1][0] == "a") {
        var filterKey = champion.spells[spellType].vars.filter(a => a.key == toFormat[1]);
        if (filterKey.length != 0) {
          formatValue = filterKey[0].coeff;    
        }
      }
      else if (toFormat[1][0] == "f") {
        var filterKey = champion.spells[spellType].vars.filter(a => a.key == toFormat[1]);
        if (filterKey.length != 0) {
          formatValue = filterKey[0].coeff;
        }
      }
   }
   if (formatValue == "") {
      formatValue = `<abbr title="${toFormat[1]}">?</abbr>`;
    }
    
    tooltip = tooltip.replace(toFormat[0], formatValue);
  }
  // Replace instances of class colors  
  tooltip = tooltip.replace(/class=/g,"style=")
  tooltip = tooltip.replace(/color/g,"color:#");;  
  
  return tooltip;
}

function displayInArea(string) {
  var area = document.getElementById("displayArea");
  area.innerHTML = string;
}

function setBackground(name) {
  var area = document.getElementsByTagName("BODY")[0];
  area.style.background = `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg)`;
  area.style.backgroundSize = "cover";
  area.style.backgroundRepeat = "no-repeat";   
}

//http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
//http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/Anivia_P.png
//http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/FlashFrost.png
