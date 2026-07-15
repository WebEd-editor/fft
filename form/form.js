const params = new URLSearchParams(window.location.search);
const tournamentId = params.get("id");

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
    document.getElementById("tt").innerText = formData.h2;
    document.getElementById("pp").innerText = formData.p;
    document.getElementById("ef").innerText = formData.fee;
    document.getElementById("md").innerText = formData.mode;
    document.getElementById("dt").innerHTML = `${new Date(formData.time).getUTCDate()} ${getMonthName(new Date(formData.time).getUTCMonth())} ${getHour12(formData.time)} ${getAmPm(formData.time)}`;
    
    const mode = formData.mode;
    document.getElementById("getFormBtn").onclick = () => registerTournament(formData);
    printForm(mode);
    
    loader.remove();

    if (result.status.canRegister) {
      loader.remove();
    } else {
      palert("alert", "Tournament is not available", []);
      document.querySelector('.form').innerHTML = `<h2>Tournament Not Available</h2>`;
    }
  } catch (err) {
    alert(err);
    loader.remove();
    palert("error", "Something went wrong. Please try again later.", []);
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

async function registerTournament(d) {

    let data = {
       tournament: {
          id: d.id,
          title: d.h2,
          mode: d.mode,
          entryFee: d.fee
       },
       users: getFormData(d.mode)
    }
    console.log(JSON.stringify(data, null, 2));

    loader.show();
    const res = await fetch("https://fft-user.onrender.com/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
        registerTeam(d);
        return;
    }
    
    // duplicate users
    if (result.duplicateUsers) {
       let message = "";
       result.duplicateUsers.forEach(user => {
           message += `Player ${user.player} has duplicate UID (${user.uid}).\n`;
       });
       alert(message);
       return;
    }

    // Invalid users
    if (result.invalidUsers) {
        let message = "";
        result.invalidUsers.forEach(user => {
            message += `Player ${user.player} (UID: ${user.uid}) is invalid.\n`;
        });
        alert(message);
        return;
    }

    // Other errors
    alert(result.message || "Something went wrong."); 
}

async function registerTeam(d) {

    const data = {
        tournamentId: d.id,
        user: getFormData(d.mode)
    };
    console.log(JSON.stringify(data, null, 3));

    const res = await fetch("https://fft-registration.onrender.com/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
        loader.remove();
        alert("Registration Successful");
        return;
    } else {
        loader.remove();
        alert(result.message);
    }
}

function getFormData(mode) {
    const totalPlayers = modes[mode.toLowerCase().trim()];
    const data = [];

    for (let i = 1; i <= totalPlayers; i++) {
        data.push({
            uid: document.querySelector(`.uid${i}`).value,
            ffid: document.querySelector(`.ffid${i}`).value
        });
        if(document.querySelector(`.uid${i}`).value === "" || document.querySelector(`.ffid${i}`).value === ""){return;};
    }

    return data;
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
