/* people.js — the cute blocky regulars.
   human(look, x, y, z, rotY, sitting)
   look: shirt, pants, skin, hair, hat ("puffs" | "cap" | "chef"), wave (true/false) */
function human(look, x, y, z, rotY, sitting) {
    var body = new T.Group();
    var head = new T.Group();
    var blush = look.blush || 0xd9707a;
    body.position.set(x, y, z);
    body.rotation.y = rotY;
    box(0.46, 0.5, 0.26, look.shirt, 0, 0.28, 0, 0, body); /* torso */
    box(0.46, 0.12, 0.27, look.pants, 0, 0, 0, 0, body); /* hips */
    [-1, 1].forEach(function (side) {
        var arm = new T.Group();
        arm.position.set(side * 0.32, 0.5, 0);
        body.add(arm);
        box(0.14, 0.4, 0.14, look.shirt, 0, -0.2, 0, 0, arm);
        box(0.13, 0.12, 0.13, look.skin, 0, -0.45, 0, 0, arm);
        if (look.wave && side > 0)
            WAVERS.push(arm);
        if (sitting) {
            box(0.16, 0.16, 0.42, look.pants, side * 0.12, -0.05, 0.22, 0, body); /* thigh */
            box(0.16, 0.4, 0.16, look.pants, side * 0.12, -0.28, 0.43, 0, body); /* shin */
            box(0.17, 0.08, 0.24, 0x2b2b2b, side * 0.12, -0.5, 0.5, 0, body); /* shoe */
        }
        else {
            box(0.16, 0.5, 0.16, look.pants, side * 0.12, -0.3, 0, 0, body);
        }
    });
    head.position.y = 0.88;
    body.add(head);
    box(0.42, 0.4, 0.4, look.skin, 0, 0, 0, 0, head);
    box(0.46, 0.13, 0.44, look.hair, 0, 0.21, 0, 0, head); /* hair top */
    box(0.46, 0.08, 0.04, look.hair, 0, 0.12, 0.21, 0, head); /* bangs */
    box(0.46, 0.34, 0.1, look.hair, 0, 0.02, -0.19, 0, head); /* hair back */
    [-1, 1].forEach(function (side) {
        box(0.1, 0.12, 0.02, 0xffffff, side * 0.1, 0.03, 0.205, 0, head); /* eye white */
        box(0.06, 0.09, 0.02, BLACK, side * 0.1, 0.03, 0.215, 0, head); /* pupil */
        box(0.1, 0.05, 0.02, blush, side * 0.15, -0.08, 0.205, 0, head); /* blush */
    });
    box(0.14, 0.04, 0.02, 0xffe9e1, 0, -0.1, 0.205, 0, head); /* smile */
    if (look.hat === "puffs") {
        [-1, 1].forEach(function (side) {
            var puff = new T.Mesh(new T.SphereGeometry(0.14, 12, 8), mat(look.hair));
            puff.position.set(side * 0.2, 0.34, -0.02);
            head.add(puff);
        });
    }
    if (look.hat === "cap") {
        box(0.47, 0.12, 0.46, 0xffd166, 0, 0.27, 0, 0, head);
        box(0.4, 0.03, 0.22, 0xffd166, 0, 0.21, 0.3, 0, head);
    }
    if (look.hat === "chef") {
        cylinder(0.2, 0.2, 0xffffff, 0, 0.38, 0, 0, head);
        var puffy = new T.Mesh(new T.SphereGeometry(0.24, 12, 8), mat(0xffffff));
        puffy.position.y = 0.55;
        head.add(puffy);
        box(0.48, 0.42, 0.03, 0xffffff, 0, 0.24, 0.15, 0, body); /* apron */
        box(0.2, 0.04, 0.02, look.hair, 0, -0.045, 0.21, 0, head); /* mustache */
    }
    scene.add(body);
    HEADS.push({
        head: head, phase: Math.random() * 6
    });
    return body;
}
human({
    shirt: 0x4fd1c5, pants: 0x3b4a6b, skin: 0x7a4a2b, hair: 0x161616, hat: "puffs", wave: true
}, -2, 0.83, -1, 0.45, true);
human({
    shirt: 0xd62839, pants: 0x2b3a55, skin: 0x5a3520, hair: 0x111111, hat: "cap"
}, 2, 0.83, -1, -0.45, true);
human({
    shirt: 0xe8e0cc, pants: 0x333333, skin: 0x8a5a3c, hair: 0x161616, hat: "chef"
}, 0, 0.95, -3.1, 0, false);
