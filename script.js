


async function homePageContent(){
   loader.show();
   const h = document.getElementById("home");
   const b = h.querySelector('.banners');
   const l = h.querySelector('.lives');
   const u = h.querySelector('.upcomings');
   
   const res = await fetch("https://fft-registration.onrender.com/api/content");
   const result = await res.json();
   const k = result.data;
   loader.remove();

      if(k.banner) {
         b.innerHTML = '';
         if(k.banner.length > 0) {
            b.innerHTML += `
               <h2 class="section-title"> Latest News </h2>
            `;
         }
         let c = document.createElement('div');
         c.className="carousel";
         for(let i = 0; i < k.banner.length; i++){
            c.innerHTML += `
               <div class="banner slide">
                  <h2>${k.banner[i].h2}</h2>
                  <p>${k.banner[i].p}</p>
               </div>
            `;
         }
         b.appendChild(c);
      }
      
      if(k.live) {
         l.innerHTML = '';
         if(k.live.length > 0) {
            l.innerHTML += `
               <h2 class="section-title"> Live Matches </h2>
            `;
         }
         for(let i = 0; i < k.live.length; i++){
            l.innerHTML += `
               <div class="card2" style="display: block">
                  <div class="right" style="background: linear-gradient(to bottom, transparent 0%, transparent 0%, rgba(0,0,0,0.8) 70%, #000 100%), url('https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/aa959aa3d8790d3a44f7f20f16adfa01.jpg') center/cover no-repeat;">
                    <div class="tag live" style="background: #ff3b30;color:white">live</div>
                    <div class="tag">${k.live[i].mode.toUpperCase()}</div>
                    <div class="title"> ${k.live[i].h2.toUpperCase()} <br><br> SEASON ${k.live[i].s} </div>
                  </div>
                  <div class="bottomc" style="margin: 0 15px 15px 15px;">
                       <div>
                          <div class="small">Prize Pool</div>
                          <div class="prize">🪙 ${k.live[i].p}</div>
                       </div>
                       <div style="justify-content: center; align-items: flex-start;">
                          <div class="small">Players</div>
                          <div class="open">${k.live[i].players}</div>
                       </div>
                  </div>
               </div>
            `;
         }
      }
      
      if(k.upcoming) {
         u.innerHTML = '';
         if(k.upcoming.length > 0){
            u.innerHTML += `
               <h2 class="section-title"> Upcoming Matches </h2>
            `;
         }
         let s;
         for(let i = 0; i < k.upcoming.length; i++){
            if(Date.now() > new Date(k.upcoming[i].registration.endTime).getTime()){ s = `<div style="color: red;">CLOSED</div>`; }else{s="OPEN"}
            u.innerHTML += `
               <div class="card2">
                  <div class="left" style="background: url('https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/aa959aa3d8790d3a44f7f20f16adfa01.jpg'); background-size: cover; background-position: center center;"></div>
                  <div class="right">
                    <div class="tag">${k.upcoming[i].mode.toUpperCase()}</div>
                    <div class="title"> ${k.upcoming[i].h2.toUpperCase()} <br> SEASON ${k.upcoming[i].s} </div>
                    <div class="bottomc">
                       <div>
                          <div class="small">Prize Pool</div>
                          <div class="prize">🪙 ${k.upcoming[i].p}</div>
                          <div class="small" style="color:#f2f2f2; margin-top: 10px;">Entry Fee ${k.upcoming[i].fee}</div>
                       </div>
                       <div class="date">
                          <div class="small" style="color:#f2f2f2">${new Date(k.upcoming[i].time).getUTCDate()} ${getMonthName(new Date(k.upcoming[i].time).getUTCMonth())} ${getHour12(k.upcoming[i].time)} ${getAmPm(k.upcoming[i].time)}</div>
                          <div class="small" style="margin-top:10px;">Registration</div>
                          <div class="open" onclick="openForm('${k.upcoming[i].id}')">${s}</div>
                       </div>
                    </div>
                  </div>
               </div>
            `;
         }
      }
   
}
homePageContent();

async function openForm(id) {
  loader.show();
  try {
    const res = await fetch(`https://fft-registration.onrender.com/api/tournament/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch tournament.");
    }

    const result = await res.json();
    loader.remove();

    if (result.status.canRegister) {
      window.location.href = `https://webed-editor.github.io/fft/form/registration.html?id=${result.newtournament.id}`;
    } else {
      palert("alert", "Tournament is not available", []);
    }
  } catch (err) {
    console.error(err);
    loader.remove();
    palert("error", "Something went wrong. Please try again later.", []);
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

