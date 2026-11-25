/* panels.js — the pop-up cards (menu, jukebox, projects, payphone) */
var panel = document.getElementById("pnl");
var card = document.getElementById("card");
function menuRow(name, note) {
    return '<div class="it">' + name + "<i></i><span>" + note + "</span></div>";
}
function tagList(tags) {
    return '<div class="tags">' + tags.map(function (t) {
        return "<span>" + t + "</span>";
    }).join("") + "</div>";
}
function aboutHTML() {
    return "<h2>" + ABOUT.title + '</h2><p class="sub">' + ABOUT.subtitle + "</p>" +
        "<h3>Starters</h3><p>" + ABOUT.intro + "</p>" +
        "<h3>Mains</h3>" + ABOUT.skills.map(function (s) {
        return menuRow(s[0], s[1]);
    }).join("") +
        "<h3>Dessert</h3><p>" + ABOUT.dessert + "</p>";
}
function jukeboxHTML() {
    var tracks = PROJECTS.map(function (p, i) {
        return '<button class="trk" data-track="' + i + '"><b>' + p.tag + "</b>" + p.name + "</button>";
    }).join("");
    return '<h2>The Jukebox</h2><p class="sub">my projects, pick a track</p>' + tracks +
        '<div id="np"><b>Now playing:</b> <span id="npt">press a track to start</span></div>';
}
function projectHTML(i) {
    var p = PROJECTS[i];
    return "<h2>" + p.name + '</h2><p class="sub">track ' + p.tag + "</p>" +
        '<div class="swatch" style="background:' + p.color + '">your art here</div>' +
        "<p>" + p.blurb + "</p>" + tagList(p.tags);
}
function phoneHTML() {
    return '<h2>Ring, ring!</h2><p class="sub">leave a message after the beep</p>' +
        "<p>" + CONTACT.intro + "</p>" +
        '<p>email: <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a></p>" +
        "<p>linkedin: <b>" + CONTACT.linkedin + "</b></p>" +
        "<p>github: <b>" + CONTACT.github + "</b></p>" +
        '<p style="margin-top:14px"><button class="btn" data-close="1">hang up</button></p>';
}

function projectPickerHTML() {
  return '<h2>Projects</h2><p class="sub">which one do you want to see?</p>' +
    PROJECTS.map(function (p, i) {
      return '<button class="trk" data-pick="' + i + '"><b>' + p.tag + "</b>" + p.name + "</button>";
    }).join("");
}


function openPanel(id) {
    var html;
    if (id === "menu")
        html = aboutHTML();
    else if (id === "juke")
        html = jukeboxHTML();
    else if (id === "phone")
        html = phoneHTML();
    else if (id.indexOf("project-") === 0)
        html = projectHTML(+id.split("-")[1]);
    else if (id === "projects") html = projectPickerHTML();
    else
        return;
    card.innerHTML = '<button id="x" aria-label="Close" data-close="1">✕</button>' + html;
    panel.classList.add("on");
    var first = card.querySelector(".trk, .btn, #x");
    if (first)
        first.focus();
}
function closePanel() {
    panel.classList.remove("on");
}
panel.addEventListener("click", function (e) {
    var pick = e.target.closest("[data-pick]");
if (pick) { goToProject(+pick.dataset.pick); return; }
    var track = e.target.closest(".trk");
    if (track) {
        var p = PROJECTS[+track.dataset.track];
        [].forEach.call(card.querySelectorAll(".trk"), function (b) {
            b.classList.toggle("on", b === track);
        });
        document.getElementById("npt").textContent = p.name + " — " + p.blurb;
        return;
    }
    if (e.target === panel || e.target.closest("[data-close]"))
        closePanel();
});
addEventListener("keydown", function (e) {
    if (e.key === "Escape")
        closePanel();
});
