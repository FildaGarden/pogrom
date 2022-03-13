const steamID = '76561198114032179';
const steamApi = '0AAF11FDF47FF0B61FB3FD1804E77602';
const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApi}&steamids=${steamID}`;
const url2 = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApi}&steamid=${steamID}`;


const generalStatusElement = document.getElementById("generalStatus");
const underStatusElement  = document.getElementById("underStatus");
const lastSeenElement = document.getElementById("lastSeen");
const playedOverallElement = document.getElementById("playedOverall");
const playedTwoWeeksElement = document.getElementById("playedTwoWeeks")
const gameServerElement = document.getElementById("gameServer");
console.log(url2, url);



async function fetchData(url) {

    window.scroll({
        top: 10,
        behavior: "smooth"
    })
    const response = await fetch(url, {
        mode: 'cors',
    });
    let data = await response.json();
    
    let gameStatus = data.response.players[0].gameextrainfo;
    let lastSeen = data.response.players[0].lastlogoff;
    let gameServer = data.response.players[0].gameserverip;
 
   
    if(gameStatus == "DayZ") {

        const response2 = await fetch(url2);
        let data2 = await response2.json();

      
        let playedOverall = Math.floor(data2.response.games[16].playtime_forever / 60);
        let played2weeks  = Math.floor(data2.response.games[16].playtime_2weeks / 60);

        //Subtitle Text
        underStatusElement.innerHTML = "Of course...what else would he be doing";

        //Game status Text
        generalStatusElement.innerHTML = "Yes he is!";
        generalStatusElement.style.color = "#a83131"
        
        //Hours played all time Text
        playedOverallElement.innerHTML = `<span>Time spent overall:</span> ${playedOverall} hours`;
        playedOverallElement.style.display = "block";
        playedOverallElement.style.color = "black";

        //Hours played in last two weeks Text
        playedTwoWeeksElement.innerHTML = `<span>Time spent past two weeks:</span> ${played2weeks} hours`;
        playedTwoWeeksElement.style.display = "block";
        playedTwoWeeksElement.style.color = "black";
        
        //Server Ip Text
        gameServerElement.style.display = "block";
        gameServerElement.style.color = "black";
        if(gameServer == undefined) {
            gameServerElement.innerHTML = "<span>Not connected to any server</span>"
        }
        else{
            gameServerElement.innerHTML = `<span>Server he's connected on:</span> ${gameServer}`;
        }
        //Waste of space lol
        document.getElementById("spaceWaste").style.display = "block";
    }
    else if(gameStatus == undefined) {

        //Game status Text
        generalStatusElement.innerHTML = "NOT IN GAME";
        generalStatusElement.style.color = "#a83131";

        //Subtitle Text
        underStatusElement.innerHTML = "Sheesh! Who would have known..."

        //Last seen Text
        lastSeenElement.style.display = "block";
        lastSeenElement.style.color = "black";    
        lastSeenElement.innerHTML = "Last seen: " + unixToDate(lastSeen);

    }
    else {

        //Game status Text
        generalStatusElement.innerHTML = "WELL NO, BUT.."
        generalStatusElement.style.color = "#f7b928"
        
        //Subtitle Text
        underStatusElement.innerHTML = `He is playing <span>${gameStatus}</span>...kinda weird huh?`
    }
    
}

function unixToDate(unix) {
    
    const milliseconds = unix * 1000 
    const dateObject = new Date(milliseconds)
    const dateFormat = dateObject.toLocaleString()
    return dateFormat;
}

function openIG() {
    window.open("https://www.instagram.com/bohdan.kozak.fanpage");
}
