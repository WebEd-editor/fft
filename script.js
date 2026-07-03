
const home = [
   {
      banner: [
         {
            h2: "Weekend Champions League",
            time: "30 Jun 2026 15:09:48 GMT",
            p: "Win ₹200 Price Pool",
            button: "Register Now"
         },
         {
            h2: "Weekend Champions League",
            time: "30 Jun 2026 15:09:48 GMT",
            p: "Win ₹200 Price Pool",
            button: "Register Now"
         },
      ],
      
      live: [
         {
            h2: "Infinity Champions League",
            p: "Win ₹7200 Price Pool",
         },
      ],
      
      upcoming: [
         {
            h2: "Week Champions League",
            p: "Win ₹200 Price Pool",
            time: "30 Jun 2026 15:09:48 GMT",
            button: "Register Now"
         },
         {
            h2: "month Champions League",
            p: "Win ₹200 Price Pool",
            time: "3 July 2026 15:09:48 GMT",
            button: "Register Now"
         },
         {
            h2: "Universal Champions League",
            p: "Win ₹200 Price Pool",
            time: "6 July 2026 15:09:48 GMT",
            button: "Register Now"
         },
      ],
      
      registration: [
         {
            live: true,
            map: "bermuda",
            name: "FF Champions Cup",
            type: "squad",
            price: 200,
            fee: 10,
            seat: 40,
            available: 10
         }
      ],
   }
];

function homePageContent(){
   const h = document.getElementById("home");
   const b = h.querySelector('.banners');
   const l = h.querySelector('.lives');
   const u = h.querySelector('.upcomings');
   
   home.forEach(k => {
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
               <div class="card">
                  <div class="badge live"> LIVE </div>
                  <h3>${k.live[i].h2}</h3>
                  <p class="price" style="margin-top: 10px;">${k.live[i].p}</p>
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
         for(let i = 0; i < k.upcoming.length; i++){
            u.innerHTML += `
               <div class="card">
                  <h3>${k.upcoming[i].h2}</h3>
                  <p style="margin-top: 10px;"> ${new Date(k.upcoming[i].time).getUTCDate()} ${getMonthName(new Date(k.upcoming[i].time).getUTCMonth())} • ${getHour12(k.upcoming[i].time)} ${getAmPm(k.upcoming[i].time)}</p>
                  <p style="color: var(--gold)">${k.upcoming[i].p}</p>
                  <button>Register Now</button>
               </div>
            `;
         }
      }
   });
   
}
homePageContent();

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

