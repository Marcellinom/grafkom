import drawSquare from "./drawSquare.js";
import { getGl } from "./main.js";

export default function draw() {
    let gl = getGl()
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* Set up modelview to hold the viewing transform. */

    mat4.lookAt(modelview, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
    mat4.rotateX(modelview, modelview, rotateX);
    mat4.rotateY(modelview, modelview, rotateY);
    mat4.rotateZ(modelview, modelview, rotateZ);

    // Save the viewing transformation.
    let saveMV = mat4.clone(modelview);
    drawSquare(textureObjects); // front face
}