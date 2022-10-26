import { getGl } from "./main.js";

export default function drawSquare(texObj) {
    let gl = getGl()
    // Send combined projection/modelview matrix to shader.
    mat4.multiply(modelviewProj, projection, modelview);
    gl.uniformMatrix4fv(uTransformMatrixLoc, false, modelviewProj);
    // Send normal matrix to the shader.
    mat3.normalFromMat4(normalMatrix, modelview);
    gl.uniformMatrix3fv(uNormalMatrixLoc, false, normalMatrix);
    // bind the appropriate texture object
    gl.bindTexture(gl.TEXTURE_2D, texObj);
    // Draw the 2-by-2 square (originally in the xy-plane)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }