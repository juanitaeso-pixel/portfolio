/* setup.js — renderer, camera and the small helpers every other file uses.
   box(), cylinder(), plane()  build shapes
   canvasTexture()             draws text/art onto a texture
   makeClickable()             adds a floating label and registers a click target */
var T = THREE;
var canvas = document.getElementById("c");
var wrap = document.getElementById("wrap");
var BLACK = 0x111111;
var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
var renderer = new T.WebGLRenderer({
    canvas: canvas, antialias: true
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
var scene = new T.Scene();
scene.background = new T.Color(0x120d1f);
scene.fog = new T.Fog(0x120d1f, 9, 18);
var camera = new T.PerspectiveCamera(65, 1, 0.1, 40);
camera.position.set(0, 1.6, 3);
camera.rotation.order = "YXZ";
/* Shared lists the animation loop and click handling read from */
var CLICKABLES = [];
var LABELS = [];
var HEADS = [];
var WAVERS = [];
var SPINNERS = [];
function mat(color, emissive) {
    return new T.MeshLambertMaterial({
        color: color, emissive: emissive || 0
    });
}
function box(w, h, d, color, x, y, z, emissive, parent) {
    var mesh = new T.Mesh(new T.BoxGeometry(w, h, d), mat(color, emissive));
    mesh.position.set(x, y, z);
    (parent || scene).add(mesh);
    return mesh;
}
function cylinder(r, h, color, x, y, z, emissive, parent, alongZ) {
    var mesh = new T.Mesh(new T.CylinderGeometry(r, r, h, 20), mat(color, emissive));
    if (alongZ)
        mesh.rotation.x = Math.PI / 2;
    mesh.position.set(x, y, z);
    (parent || scene).add(mesh);
    return mesh;
}
/* Returns { t: texture, c: 2d context, fn: draw function } so it can be redrawn later */
function canvasTexture(w, h, draw) {
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d");
    draw(ctx, w, h);
    return {
        t: new T.CanvasTexture(c), c: ctx, fn: draw, w: w, h: h
    };
}
function plane(w, h, tex, x, y, z, rotY, parent) {
    var mesh = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({
        map: tex.t, transparent: true
    }));
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY || 0;
    (parent || scene).add(mesh);
    return mesh;
}
/* Floating label pill. Two textures: normal (red) and hover (turquoise). */
function pillTexture(text, bg, fg) {
    return canvasTexture(256, 80, function (ctx) {
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(40, 40, 34, Math.PI / 2, Math.PI * 1.5);
        ctx.arc(216, 40, 34, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
        ctx.fillStyle = fg;
        ctx.font = "800 34px Nunito, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 128, 42);
    }).t;
}
function makeClickable(id, group, text, lx, ly, lz) {
    var baseMap = pillTexture(text, "#e63946", "#ffffff");
    var hoverMap = pillTexture(text, "#4fd1c5", "#10203a");
    var sprite = new T.Sprite(new T.SpriteMaterial({
        map: baseMap, depthTest: false
    }));
    sprite.scale.set(1, 0.31, 1);
    sprite.renderOrder = 9;
    sprite.position.set(lx, ly, lz);
    sprite.userData = {
        id: id, baseY: ly, baseMap: baseMap, hoverMap: hoverMap
    };
    group.userData.id = id;
    scene.add(sprite);
    LABELS.push(sprite);
    CLICKABLES.push(group, sprite);
}
