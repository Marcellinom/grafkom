import initGL from './initGL.js';
import draw from './draw.js';

export function getGl() {
    try {
        var gl
        let canvas = document.getElementById("webglcanvas");
        gl = canvas.getContext("webgl");
        if (!gl) throw "Browser does not support WebGL";
        return gl
    } catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not get a WebGL graphics context.</p>";
        throw "could not get a WebGL graphics context."
    }
}

try {
    initGL(); // initialize the WebGL graphics context
  } catch (e) {
    document.getElementById("canvas-holder").innerHTML =
      "<p>Sorry, could not initialize the WebGL graphics context:" +
      e.message +
      "</p>";
      throw "could not initialize the WebGL graphics context:" + e.message
  }
  document.addEventListener("keydown", doKey, false);

function doKey(evt) {
let rotationChanged = true;
switch (evt.keyCode) {
case 37:
    rotateY -= 0.05;
    break; // left arrow
case 39:
    rotateY += 0.05;
    break; // right arrow
case 38:
    rotateX -= 0.05;
    break; // up arrow
case 40:
    rotateX += 0.05;
    break; // down arrow
case 33:
    rotateZ += 0.05;
    break; // PageUp
case 34:
    rotateZ -= 0.05;
    break; // PageDown
case 13: // return key
case 36:
    rotateX = rotateY = rotateZ = 0;
    break; // home key
default:
    rotationChanged = false;
}
if (rotationChanged) {
evt.preventDefault();
draw();
}
}
