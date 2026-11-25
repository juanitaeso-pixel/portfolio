/* lights.js — "club, but still a diner":
   a dim violet fill, a warm lamp over the counter, red + turquoise neon washes,
   an amber jukebox glow, and one slow colour-cycling party light (moved in main.js). */
var partyLight;
var LIGHTS = [
    {
        color: 0xffb26b, intensity: 1.0, range: 9, x: 0, y: 3.7, z: -1.5
    }, /* warm lamp over the counter */
    {
        color: 0xe63946, intensity: 1.3, range: 10, x: 0, y: 3.4, z: -3
    }, /* red neon wash from the sign */
    {
        color: 0x4fd1c5, intensity: 1.0, range: 10, x: -3.6, y: 3, z: 0.5
    }, /* turquoise wash, left side */
    {
        color: 0xffa21a, intensity: 1.1, range: 7, x: 3.6, y: 2.2, z: -1.2
    } /* amber glow by the jukebox */
];
function addLights() {
    scene.add(new T.AmbientLight(0x8f7bb8, 0.55));
    scene.add(new T.HemisphereLight(0xffd9b0, 0x2b1b3a, 0.3));
    LIGHTS.forEach(function (l) {
        var light = new T.PointLight(l.color, l.intensity, l.range);
        light.position.set(l.x, l.y, l.z);
        scene.add(light);
    });
    partyLight = new T.PointLight(0xff4fd8, 0.9, 12);
    scene.add(partyLight);
}
addLights();
