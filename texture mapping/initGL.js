import createProgram from './createProgram.js'
import * as main from './main.js'
import draw from "./draw.js";

export default function initGL() {
    let gl = main.getGl()
    let prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(prog);

    let aCoordsLoc = gl.getAttribLocation(prog, "a_coords");
    let coordsBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuf);
    let coords = new Float32Array([-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aCoordsLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aCoordsLoc);

    let aTexCoordsLoc = gl.getAttribLocation(prog, "a_texCoords");
    let tCoordsBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tCoordsBuf);
    let tCoords = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, tCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aTexCoordsLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTexCoordsLoc);

    uTransformMatrixLoc = gl.getUniformLocation(prog, "u_transformMatrix");
    uNormalMatrixLoc = gl.getUniformLocation(prog, "u_normalMatrix");

    let uNormalLoc = gl.getUniformLocation(prog, "u_normal");
    gl.uniform3f(uNormalLoc, 0, 0, 1);
    let uDiffuseLoc = gl.getUniformLocation(prog, "u_diffuse");
    gl.uniform3f(uDiffuseLoc, 1, 1, 1);

    gl.enable(gl.DEPTH_TEST);

    mat4.perspective(projection, Math.PI / 8, 1, 5, 15);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    let img = new Image();
    img.onload = function () {
      textureObjects[0] = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textureObjects[0]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
      gl.generateMipmap(gl.TEXTURE_2D);
      console.log("loaded texture", 0);
      draw();
    };
    img.src = textureURLs[0];
}