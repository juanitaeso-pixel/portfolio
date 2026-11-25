/* main.js — looking around, hover + click, nav buttons and the animation loop */
var yaw = 0, pitch = 0, targetYaw = 0, targetPitch = 0;
var dragging = false, moved = false, startX = 0, startY = 0, lastX = 0, lastY = 0;
var hoveredId = null;
var raycaster = new T.Raycaster();
var pointer = new T.Vector2();
/* Bottom buttons: where to turn, and whether to open a card once there */
var NAV = [
  { id: "menu", label: "Menu", yaw: 0.42, pitch: 0.12, open: true },
  { id: "juke", label: "Jukebox", yaw: -0.83, pitch: 0, open: true },
  { id: "projects", label: "Projects", choose: true }, /* opens the picker, no pan */
  { id: "phone", label: "Payphone", yaw: 0.89, pitch: 0, open: true }
];

var PAN_DELAY = 650; /* ms to wait while turning before the card opens. Use 0 to open instantly. */

/* Work out where to turn for each frame from its position in gallery.js */
function viewForProject(i) {
  var s = FRAME_SPOTS[i];
  return { yaw: Math.atan2(-s.x, -(s.z - camera.position.z)), pitch: 0.1 };
}

function goToProject(i) {
  closePanel();
  lookAt(viewForProject(i), function () {
    openPanel("project-" + i);
  });
}
function resize() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 88 : 65;
    camera.updateProjectionMatrix();
}
/* Which clickable thing is under the pointer? (returns its id or null) */
function pickId(e) {
    var r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    var hits = raycaster.intersectObjects(CLICKABLES, true);
    if (!hits.length)
        return null;
    var obj = hits[0].object;
    while (obj && !obj.userData.id)
        obj = obj.parent;
    return obj ? obj.userData.id : null;
}
/* Hover: the label turns turquoise and grows a little */
function setHover(id) {
    if (id === hoveredId)
        return;
    hoveredId = id;
    LABELS.forEach(function (label) {
        var on = label.userData.id === id;
        label.material.map = on ? label.userData.hoverMap : label.userData.baseMap;
        label.scale.set(on ? 1.15 : 1, on ? 0.355 : 0.31, 1);
    });
    canvas.style.cursor = id ? "pointer" : "grab";
}
function lookAt(view, then) {
    targetYaw = view.yaw;
    targetPitch = view.pitch;
    if (then)
        setTimeout(then, reduceMotion ? 0 : PAN_DELAY);
}
canvas.addEventListener("pointerdown", function (e) {
    dragging = true;
    moved = false;
    startX = lastX = e.clientX;
    startY = lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove", function (e) {
    if (!dragging) {
        setHover(pickId(e));
        return;
    }
    if (Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) > 6)
        moved = true;
    targetYaw = Math.max(-1.5, Math.min(1.5, targetYaw + (e.clientX - lastX) * 0.005));
    targetPitch = Math.max(-0.5, Math.min(0.5, targetPitch + (e.clientY - lastY) * 0.004));
    lastX = e.clientX;
    lastY = e.clientY;
});
canvas.addEventListener("pointerup", function (e) {
    dragging = false;
    if (!moved) {
        var id = pickId(e);
        if (id)
            openPanel(id);
    }
});
canvas.addEventListener("pointerleave", function () {
    setHover(null);
});
var navEl = document.getElementById("nav");
navEl.innerHTML = NAV.map(function (n) {
    return '<button class="chip" data-nav="' + n.id + '">' + n.label + "</button>";
}).join("");
navEl.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-nav]");
  if (!btn) return;
  var view = NAV.filter(function (n) {
    return n.id === btn.dataset.nav;
  })[0];
  closePanel();
  if (view.choose) { openPanel("projects"); return; }
  lookAt(view, view.open ? function () { openPanel(view.id); } : null);
});
document.getElementById("go").onclick = function () {
    document.getElementById("intro").style.display = "none";
};
addEventListener("resize", resize);
resize();
function tick(ms) {
    var t = ms / 1000;
    yaw += (targetYaw - yaw) * 0.09;
    pitch += (targetPitch - pitch) * 0.09;
    camera.rotation.set(pitch, yaw, 0);
    if (!reduceMotion) {
        camera.position.y = 1.6 + Math.sin(t * 1.3) * 0.012;
        HEADS.forEach(function (h) {
            h.head.rotation.y = Math.sin(t * 0.9 + h.phase) * 0.45;
            h.head.rotation.z = Math.sin(t * 1.7 + h.phase) * 0.06;
        });
        WAVERS.forEach(function (arm) {
            arm.rotation.z = 2.5 + Math.sin(t * 7) * 0.3;
        });
        SPINNERS.forEach(function (s) {
            s.rotation.z += 0.03;
        });
        LABELS.forEach(function (l, i) {
            l.position.y = l.userData.baseY + Math.sin(t * 2 + i) * 0.06;
        });
        signMesh.material.opacity = Math.sin(t * 1.7) * Math.sin(t * 13) > 0.94 ? 0.55 : 1;
        /* party light drifts around the ceiling and slowly changes colour */
        partyLight.position.set(Math.cos(t * 0.4) * 2.8, 3.6, Math.sin(t * 0.4) * 2.8 - 1);
        partyLight.color.setHSL((t * 0.04) % 1, 0.85, 0.55);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
