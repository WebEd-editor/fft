const params = new URLSearchParams(window.location.search);
const tournamentId = params.get("id");

alert("id is  "+tournamentId);

let formData;

const loader = new webpopup({
   title: "please wait",
   description: "",
   type:"loading",
   animation:"fadedown",
   cancelable:false,
   theme: "dark",
   buttons:[],
   position:"center center",
});

async function loadForm(){
  loader.show();
  try {
    const res = await fetch(`https://fft-registration.onrender.com/api/tournament/${tournamentId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch tournament.");
    }

    const result = await res.json();
    formData = result.newtournament;
    alert("formData: \n"+JSON.stringify(formData, null, 2));
    document.getElementById("tt").innerText = formData.h2;
    document.getElementById("pp").innerText = formData.p;
    document.getElementById("ef").innerText = formData.fee;
    document.getElementById("md").innerText = formData.mode;
    document.getElementById("dt").innerHTML = `${new Date(formData.time).getUTCDate()} ${getMonthName(new Date(formData.time).getUTCMonth())} ${getHour12(formData.time)} ${getAmPm(formData.time)}`;
    
    const mode = formData.mode;
    printForm(mode);
    
    loader.remove();

    if (result.status.canRegister) {
      loader.remove();
    } else {
      palert("alert", "Tournament is not available", []);
      document.querySelector('.form').innerHTML = `<h2>Tournament Not Available</h2>`;
    }
  } catch (err) {
    console.error(err);
    loader.remove();
    palert("error", "Something went wrong. Please try again later.", []);
    alert("error\n"+err);
  }
}
loadForm();

const modes = {
    "solo match": 1,
    "duo match": 2,
    "trio match": 3,
    "squad match": 4
};

function printForm(mode) {
    const playersDiv = document.querySelector(".players");
    playersDiv.innerHTML = "";

    const totalPlayers = modes[mode.toLowerCase().trim()];
    if (!totalPlayers) return;

    for (let i = 1; i <= totalPlayers; i++) {
        playersDiv.innerHTML += `
            <div class="player">
                <h3>Player ${i}</h3>
                <input class="uid${i}" type="text" name="uid${i}" placeholder="UID" required>
                <input class="ffid${i}" type="text" name="ffid${i}" placeholder="FFID" required>
            </div>
        `;
    }
}

function palert(type, text, buttons = []) {
  const popup = new webpopup({
    title: text,
    description: "",
    type: type,
    animation: "fadedown",
    cancelable: true,
    theme: "dark",
    buttons: buttons,
    position: "center center",
  });
  popup.show();
}

function getAmPm(utc) {
    return new Date(utc).getUTCHours() >= 12 ? "PM" : "AM";
}

function getHour12(utc) {
    const hour = new Date(utc).getUTCHours();
    return hour % 12 || 12;
}

function getMonthName(month) {
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    return months[month - 1] || "";
}
