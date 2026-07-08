class webpopup {
  constructor(options = {}) {
    this.type = options.type;
    this.title = options.title;
    this.description = options.description;
    //this.buttons = options.buttons || [{ text: "ok", onClick: () => { console.log('ok button clicked.'); } }, { text: "cancel" }];
    this.buttons = options.buttons;
    this.position = options.position || "center bottom";
    this.animation = options.animation || "fadeup";
    this.theme = options.theme || "light";
    this.toast = options.toast || false;
    this.cancelable = options.cancelable ?? true;
  }

  show() {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.onclick = () => document.body.removeChild(overlay);
    if (this.type === "loading") { overlay.onclick = () => "" }
    this.getPos(overlay);

    const model = document.createElement("div");
    model.className = `popup-model ${this.theme}`;
    model.onclick = (e) => { e.stopPropagation(); };
    model.style.animation= `${this.getAnimation()}`;
    
    const content = document.createElement("div");
    content.className = "popup-content";
    
    const closeH = document.createElement("div");
    closeH.style = "width: 90%; display: flex; justify-content: flex-end; align-items: flex-end;";
    const closeBtn = document.createElement("div");
    closeBtn.innerText = "X";
    closeBtn.onclick = () => document.body.removeChild(overlay);
    if(this.cancelable){ closeH.appendChild(closeBtn); }
    
    const icon = document.createElement("div");
    icon.id="icon";
    icon.innerHTML = `${this.getIcon()}`; // popup icon
    
    const h = document.createElement('h2');
    h.innerHTML = `${this.title}`;
    const p = document.createElement('p');
    p.innerHTML = `${this.description}`;

    const btns = document.createElement("div");
    btns.id = "popup-button";
    
    this.buttons.forEach(btn => {
      const b = document.createElement("button");
      b.innerText = btn.text;
      let txt = btn.text;
      if(txt==="cancel"){b.style.background="#22c55e"}else if(txt==="delete"){b.style.background="#ef4444"}else if(txt==="ok"){b.style.background="#6366f1"}else{b.style.background="#111"}
      b.onclick = () => {
         if(btn.onClick) {
            btn.onClick();
         }
         document.body.removeChild(overlay);
      };
      btns.appendChild(b);
    });
    
    if(this.toast) {
       content.appendChild(closeH);
      // content.appendChild(icon);
      // content.appendChild(h);
       content.appendChild(p);
       content.appendChild(btns);
       model.appendChild(content);
    }else{
       content.appendChild(closeH);
       content.appendChild(icon);
       content.appendChild(h);
       content.appendChild(p);
       content.appendChild(btns);
       model.appendChild(content);
    }

    overlay.appendChild(model);
    document.body.appendChild(overlay);
  }
  
  remove() {
     let overlay = document.querySelector('.popup-overlay');
     document.body.removeChild(overlay);
  }

  // 👇 icon system
  getIcon() {
    switch (this.type) {
      case "alert": return `<svg id="alert" viewBox="0 0 100 100"><path class="path warning" d="M50 20 L80 75 L20 75 Z"/><line class="line warning" x1="50" y1="38" x2="50" y2="58"/><line class="mark warning" x1="50" y1="66" x2="50" y2="67"/></svg>`;
      case "info": return `<svg id="info" viewBox="0 0 100 100"><circle class="circle info" cx="50" cy="50" r="30"/> <line class="line info" x1="50" y1="45" x2="50" y2="62"/><line class="mark info" x1="50" y1="35" x2="50" y2="36"/></svg>`;
      case "success": return `<svg id="success" viewBox="0 0 100 100"><circle class="circle success" cx="50" cy="50" r="30"/><path class="path success" d="M38 50 L48 60 L65 40"/></svg>`;
      case "loading": return `<svg id="loading" class="loading" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="none" stroke="#6366f1" stroke-width="6" stroke-linecap="round" stroke-dasharray="120 80"/></svg>`;
      case "error": return `<svg id="error" viewBox="0 0 100 100"><circle class="circle error" cx="50" cy="50" r="30"/><path class="path error" d="M40 40 L60 60"/><path class="path error" d="M60 40 L40 60"/></svg>`;
      default: return "";
    }
  }
  
  getAnimation(){
     switch (this.animation){
        case "fadeup": return "fadeup .6s ease forwards"; break;
        case "fadedown": return "fadedown .6s ease forwards"; break;
        case "faderight": return "faderight .6s ease forwards"; break;
        case "fadeleft": return "fadeleft .6s ease forwards"; break;
        default: break;
     }
  }
  
 getPos(overlay) {
  const pos = this.position
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // extra spaces remove

  const aliases = {
    "center bottom": "center bottom",
    "bottom center": "center bottom",

    "left bottom": "left bottom",
    "bottom left": "left bottom",

    "right bottom": "right bottom",
    "bottom right": "right bottom",

    "center center": "center center",

    "center left": "center left",
    "left center": "center left",

    "center right": "center right",
    "right center": "center right",

    "center top": "center top",
    "top center": "center top",

    "left top": "left top",
    "top left": "left top",

    "right top": "right top",
    "top right": "right top",
  };
  
  switch (aliases[pos] || "center bottom") {
    case "center bottom":
      overlay.style.justifyContent="flex-end";
      overlay.style.alignItems="center";
      break;

    case "left bottom":
      overlay.style.justifyContent="flex-end";
      overlay.style.alignItems="flex-start";
      break;

    case "right bottom":
      overlay.style.justifyContent="flex-end";
      overlay.style.alignItems="flex-end";
      break;

    case "center center":
      overlay.style.justifyContent="center";
      overlay.style.alignItems="center";
      break;

    case "center left":
      overlay.style.justifyContent="center";
      overlay.style.alignItems="flex-start";
      break;

    case "center right":
      overlay.style.justifyContent="center";
      overlay.style.alignItems="flex-end";
      break;

    case "center top":
      overlay.style.justifyContent="flex-start";
      overlay.style.alignItems="center";
      break;

    case "left top":
      overlay.style.justifyContent="flex-start";
      overlay.style.alignItems="flex-start";
      break;

    case "right top":
      overlay.style.justifyContent="flex-start";
      overlay.style.alignItems="flex-end";
      break;

    default:
      break;
  }
 }

}



