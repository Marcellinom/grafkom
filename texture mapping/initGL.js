import createProgram from './createProgram.js'
import * as main from './main.js'
import draw from "./draw.js";

const coordinate = [
  // top
  -1.0, 1.0, -1.0,   0, 0,
  -1.0, 1.0, 1.0,    0, 1,
  1.0, 1.0, 1.0,     1, 1,
  1.0, 1.0, -1.0,    1, 0,

  // Left
  -1.0, 1.0, 1.0,    0, 0,
  -1.0, -1.0, 1.0,   1, 0,
  -1.0, -1.0, -1.0,  1, 1,
  -1.0, 1.0, -1.0,   0, 1,

  // Right
  1.0, 1.0, 1.0,    1, 1,
  1.0, -1.0, 1.0,   0, 1,
  1.0, -1.0, -1.0,  0, 0,
  1.0, 1.0, -1.0,   1, 0,

  // Front
  1.0, 1.0, 1.0,    1, 1,
  1.0, -1.0, 1.0,    1, 0,
  -1.0, -1.0, 1.0,    0, 0,
  -1.0, 1.0, 1.0,    0, 1,

  // Back
  1.0, 1.0, -1.0,    0, 0,
  1.0, -1.0, -1.0,    0, 1,
  -1.0, -1.0, -1.0,    1, 1,
  -1.0, 1.0, -1.0,    1, 0,

  // Bottom
  -1.0, -1.0, -1.0,   1, 1,
  -1.0, -1.0, 1.0,    1, 0,
  1.0, -1.0, 1.0,     0, 0,
  1.0, -1.0, -1.0,    0, 1,
]

const indices = [
  		// Top
      0, 1, 2,
      0, 2, 3,
  
      // Left
      5, 4, 6,
      6, 4, 7,
  
      // Right
      8, 9, 10,
      8, 10, 11,
  
      // Front
      13, 12, 14,
      15, 14, 12,
  
      // Back
      16, 17, 18,
      16, 18, 19,
  
      // Bottom
      21, 20, 22,
      22, 20, 23
]

export default function initGL() {
    let gl = main.getGl()
    let prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(prog);
    
    let coordsBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinate), gl.STATIC_DRAW);

    let tCoordsBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tCoordsBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
    
    let aCoordsLoc = gl.getAttribLocation(prog, "a_coords");
    let aTexCoordsLoc = gl.getAttribLocation(prog, "a_texCoords");
    gl.enableVertexAttribArray(aCoordsLoc);
    gl.vertexAttribPointer(
      aCoordsLoc, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(aTexCoordsLoc);
    gl.vertexAttribPointer(
      aTexCoordsLoc, 
      2, 
      gl.FLOAT, 
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );


    uTransformMatrixLoc = gl.getUniformLocation(prog, "u_transformMatrix");
    uNormalMatrixLoc = gl.getUniformLocation(prog, "u_normalMatrix");

    let uNormalLoc = gl.getUniformLocation(prog, "u_normal");
    gl.uniform3f(uNormalLoc, 0, 0, 1);
    let uDiffuseLoc = gl.getUniformLocation(prog, "u_diffuse");
    gl.uniform3f(uDiffuseLoc, 1, 1, 1);

    gl.enable(gl.DEPTH_TEST);

    mat4.perspective(projection, Math.PI / 8, 1, 5, 15);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  for (let i = 0; i < 6; i++) {
    textureObjects[i] = gl.createTexture();
    textureObjects[i].img = new Image();
    textureObjects[i].img.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, textureObjects[i]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          textureObjects[i].img
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        console.log("loaded texture", i);
        draw();
    };
    textureObjects[i].img.src = textureURLs[i];
  }
}