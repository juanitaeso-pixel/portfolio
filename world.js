/* world.js — the diner itself: room, counter, neon sign, menu board, jukebox, payphone */
/* ROOM: floor, walls, ceiling */
var floorTexture = canvasTexture(128, 128, function (x) {
    x.fillStyle = '#2b2b33';
    x.fillRect(0, 0, 128, 128);
    x.fillStyle = '#f7f3ea';
    x.fillRect(0, 0, 64, 64);
    x.fillRect(64, 64, 64, 64);
});
floorTexture.t.wrapS = floorTexture.t.wrapT = T.RepeatWrapping;
floorTexture.t.repeat.set(5, 4);
var floor = new T.Mesh(new T.PlaneGeometry(10, 8), new T.MeshLambertMaterial({ map: floorTexture.t }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
box(10, 4.2, .2, 0xf3e3c3, 0, 2.1, -4.1);
box(10, 1.2, .25, 0x56c7b5, 0, .6, -4.02);
box(10, .06, .3, 0xe63946, 0, 1.23, -4, 0xe63946);
[-5.1, 5.1].forEach(function (x) {
    box(.2, 4.2, 8.2, 0xf3e3c3, x, 2.1, 0);
    box(.25, 1.2, 8, 0x56c7b5, x * .99, .6, 0);
    box(.3, .06, 8, 0xe63946, x * .98, 1.23, 0, 0xe63946);
});
box(10.4, .2, 8.4, 0x70655a, 0, 4.3, 0);
[-2.5, 0, 2.5].forEach(function (z, i) {
    box(3, .08, .15, i % 2 ? 0x4fd1c5 : 0xe63946, 0, 4.15, z, i % 2 ? 0x4fd1c5 : 0xe63946);
});
/* COUNTER + STOOLS */
box(6, 1, .8, 0xd62839, 0, .5, -1.9);
box(6.2, .1, 1, 0xfff7fb, 0, 1.05, -1.9);
box(6, .08, .82, 0xcfd9e8, 0, .1, -1.9);
box(6, .08, .5, 0xcfd9e8, 0, 2.1, -3.8);
[-2, 0, 2].forEach(function (x) {
    cylinder(.04, .75, 0xcfd9e8, x, .38, -1);
    cylinder(.27, .1, 0xe63946, x, .78, -1);
});
/* NEON SIGN (Juanita’s Portfolio) */
function sign(x) {
    x.clearRect(0, 0, 1024, 256);
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.lineJoin = 'round';
    x.strokeStyle = '#4fd1c5';
    x.lineWidth = 8;
    x.shadowColor = '#4fd1c5';
    x.shadowBlur = 28;
    x.beginPath();
    x.moveTo(60, 20);
    x.lineTo(964, 20);
    x.lineTo(964, 236);
    x.lineTo(60, 236);
    x.closePath();
    x.stroke();
    x.font = '110px Pacifico,cursive';
    x.shadowColor = '#e63946';
    x.shadowBlur = 36;
    x.fillStyle = '#e63946';
    x.fillText('Juanita’s Portfolio', 512, 132);
    x.fillText('Juanita’s Portfolio', 512, 132);
    x.shadowBlur = 6;
    x.fillStyle = '#fff4e0';
    x.fillText('Juanita’s Portfolio', 512, 132);
}
box(4.9, 1.4, .08, 0x1b1218, 0, 3.3, -4, 0);
var signTexture = canvasTexture(1024, 256, sign), signMesh = plane(4.6, 1.15, signTexture, 0, 3.3, -3.95);
document.fonts.load('110px Pacifico').then(function () {
    sign(signTexture.c);
    signTexture.t.needsUpdate = true;
});
/* MENU BOARD → about me */
var menuBoard = new T.Group();
box(2.3, 1.8, .06, 0xb87a3d, -3.2, 2.3, -4, 0, menuBoard);
var menuTexture = canvasTexture(512, 400, function (x) {
    x.fillStyle = '#1d3b34';
    x.fillRect(0, 0, 512, 400);
    x.fillStyle = '#f4f1e8';
    x.textAlign = 'center';
    x.font = '70px Pacifico,cursive';
    x.fillText('Menu', 256, 100);
    x.font = '700 30px Nunito,sans-serif';
    x.fillText('starters ~ mains ~ dessert', 256, 170);
    x.fillText('all about Juanita', 256, 225);
    x.fillStyle = '#ffd166';
    x.font = '700 26px Nunito,sans-serif';
    x.fillText('(click to read)', 256, 300);
});
plane(2.1, 1.6, menuTexture, -3.2, 2.3, -3.96, 0, menuBoard);
scene.add(menuBoard);
document.fonts.load('70px Pacifico').then(function () {
    menuTexture.fn(menuTexture.c, 512, 400);
    menuTexture.t.needsUpdate = true;
});
makeClickable('menu', menuBoard, 'menu', -3.2, 3.4, -3.8);
/* JUKEBOX → projects */
var jukebox = new T.Group();
jukebox.position.set(4.6, 0, -1.2);
jukebox.rotation.y = -Math.PI / 2;
box(1.3, 1.9, .7, 0xd62839, 0, .95, 0, 0, jukebox);
cylinder(.65, .72, 0xd62839, 0, 1.9, 0, 0, jukebox, 1);
box(.9, .8, .05, 0xffd23f, 0, 1.5, .36, 0xffb300, jukebox);
var rec = cylinder(.3, .03, 0x111111, 0, 1.5, .4, 0, jukebox, 1);
cylinder(.1, .04, 0xe63946, 0, 1.5, .41, 0xe63946, jukebox, 1);
SPINNERS.push(rec);
box(.8, .4, .05, 0x2b1b17, 0, .7, .36, 0, jukebox);
[0x4fd1c5, 0xe63946, 0xffd23f].forEach(function (c, i) {
    box(.7, .05, .06, c, 0, .55 + .12 * i, .4, c, jukebox);
});
[-1, 1].forEach(function (s) {
    box(.07, 1.8, .07, 0x4fd1c5, s * .64, .95, .36, 0x4fd1c5, jukebox);
});
cylinder(.5, .06, 0x4fd1c5, 0, 2.3, .36, 0x4fd1c5, jukebox, 1);
scene.add(jukebox);
makeClickable('juke', jukebox, 'jukebox', 4.4, 3.05, -1.2);
/* PAYPHONE → contact */
var payphone = new T.Group();
payphone.position.set(-4.85, 1.5, -.8);
payphone.rotation.y = Math.PI / 2;
box(.9, 1.3, .05, 0x2a2a4a, 0, 0, -.1, 0, payphone);
box(.5, .9, .25, 0xe63946, 0, 0, 0, 0, payphone);
box(.1, .5, .1, 0x1b1b1b, -.34, .1, .04, 0, payphone);
box(.3, .3, .03, 0xd9d9d9, 0, -.12, .14, 0, payphone);
box(.1, .03, .03, BLACK, .1, .25, .14, 0, payphone);
box(.3, .1, .03, 0xffd23f, 0xffb300 & 0, .25, .14, 0xffb300, payphone);
scene.add(payphone);
makeClickable('phone', payphone, 'call me', -4.6, 2.7, -.8);
var sayHiTexture = canvasTexture(512, 128, function (x) {
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.font = '80px Pacifico,cursive';
    x.shadowColor = '#4fd1c5';
    x.shadowBlur = 24;
    x.fillStyle = '#4fd1c5';
    x.fillText('say hi', 256, 66);
    x.shadowBlur = 4;
    x.fillStyle = '#e8ffff';
    x.fillText('say hi', 256, 66);
});
plane(1.4, .35, sayHiTexture, -4.95, 2.35, -.8, Math.PI / 2);
document.fonts.load('80px Pacifico').then(function () {
    sayHiTexture.fn(sayHiTexture.c, 512, 128);
    sayHiTexture.t.needsUpdate = true;
});
