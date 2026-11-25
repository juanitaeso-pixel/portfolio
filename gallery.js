/* gallery.js — framed art on the walls. Each frame is a project (see PROJECTS in content.js).
   The label floating above each frame is its clickable name. */
var FRAME_SPOTS = [
    {
        x: 3.0, z: -3.96, rotY: 0
    },
    {
        x: 4.25, z: -3.96, rotY: 0
    },
    {
        x: -4.96, z: -2.8, rotY: Math.PI / 2
    },
    {
        x: -4.96, z: 1.2, rotY: Math.PI / 2
    }
];
var FRAME_Y = 2.35;
function drawPlaceholderArt(ctx, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,244,224,0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.4, w * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    for (var i = 0; i < 5; i++)
        ctx.fillRect(0, h * 0.66 + i * 20, w, 9);
    ctx.fillStyle = "#fff4e0";
    ctx.font = "800 30px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("your art here", w / 2, h - 22);
}
function buildFrame(index, spot) {
    var frame = new T.Group();
    frame.position.set(spot.x, FRAME_Y, spot.z);
    frame.rotation.y = spot.rotY;
    box(1.0, 1.25, 0.06, 0xcfd9e8, 0, 0, 0, 0, frame); /* chrome frame */
    var art = canvasTexture(256, 320, function (ctx, w, h) {
        drawPlaceholderArt(ctx, w, h, PROJECTS[index].color);
    });
    var canvasArt = new T.Mesh(new T.PlaneGeometry(0.84, 1.09), new T.MeshLambertMaterial({ map: art.t }));
    canvasArt.position.z = 0.035;
    frame.add(canvasArt);
    scene.add(frame);
    /* label sits above the frame, nudged out from the wall */
    var lx = spot.x + Math.sin(spot.rotY) * 0.15;
    var lz = spot.z + Math.cos(spot.rotY) * 0.15;
    makeClickable("project-" + index, frame, PROJECTS[index].name.toLowerCase(), lx, FRAME_Y + 0.95, lz);
}
FRAME_SPOTS.forEach(function (spot, i) {
    if (PROJECTS[i])
        buildFrame(i, spot);
});
