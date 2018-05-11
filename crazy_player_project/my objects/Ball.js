var ballVertexBuffer, ballColorBuffer, ballIndexBuffer;

var
ballVertices = [
    -0.3249,-4.236,2.552, -0.3249,4.236,2.552, 0.3249,-4.236,-2.552, 0.3249,4.236,-2.552,
    -0.5257,-1.618,-4.655, -0.5257,-4.854,-0.8507, -0.5257,1.618,-4.655, -0.5257,4.854,-0.8507,
    0.5257,-1.618,4.655, 0.5257,-4.854,0.8507, 0.5257,1.618,4.655, 0.5257,4.854,0.8507,
    1.376,-1.000,-4.655, 1.376,1.000,-4.655, 2.428,-4.236,0.8507, 2.428,4.236,0.8507,
    -4.129,-1.000,2.552, -4.129,1.000,2.552, -2.753,-2.000,3.603, -2.753,2.000,3.603,
    -2.753,-3.236,-2.552, -2.753,3.236,-2.552, -1.376,-1.000,4.655, -1.376,1.000,4.655,
    2.753,-2.000,-3.603, 2.753,2.000,-3.603, 2.753,-3.236,2.552, 2.753,3.236,2.552,
    -3.403,0,-3.603, 3.403,0,3.603, -2.428,-4.236,-0.8507, -2.428,4.236,-0.8507,
    -3.928,-1.618,-2.552, -3.928,1.618,-2.552, 4.129,-1.000,-2.552, 4.129,1.000,-2.552,
    4.454,-2.000,-0.8507, 4.454,2.000,-0.8507, 4.779,-1.000,0.8507, 4.779,1.000,0.8507,
    -2.227,-3.618,2.552, -2.227,3.618,2.552, 2.227,-3.618,-2.552, 2.227,3.618,-2.552,
    -4.779,-1.000,-0.8507, -4.779,1.000,-0.8507, -3.278,-3.618,0.8507, -3.278,3.618,0.8507,
    3.278,-3.618,-0.8507, 3.278,3.618,-0.8507, 3.928,-1.618,2.552, 3.928,1.618,2.552,
    1.701,0,4.655, -4.454,-2.000,0.8507, -4.454,2.000,0.8507, -1.701,0,-4.655,
    -1.051,-3.236,-3.603, -1.051,3.236,-3.603, 1.051,-3.236,3.603, 1.051,3.236,3.603
],
ballIndices = [
    [52,10,23,22,8],[50,38,39,51,29],[59,27,15,11,1],[19,41,47,54,17],
    [18,16,53,46,40],[0,9,14,26,58],[35,25,43,49,37],[3,57,21,31,7],
    [33,28,32,44,45],[20,56,2,5,30],[36,48,42,24,34],[12,4,55,6,13],
    [8,58,26,50,29,52],[52,29,51,27,59,10],[10,59,1,41,19,23],[23,19,17,16,18,22],
    [22,18,40,0,58,8],[12,24,42,2,56,4],[4,56,20,32,28,55],[55,28,33,21,57,6],
    [6,57,3,43,25,13],[13,25,35,34,24,12],[39,37,49,15,27,51],[15,49,43,3,7,11],
    [11,7,31,47,41,1],[47,31,21,33,45,54],[54,45,44,53,16,17],[53,44,32,20,30,46],
    [46,30,5,9,0,40],[9,5,2,42,48,14],[14,48,36,38,50,26],[38,36,34,35,37,39]
],
ballColors = [
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    1,1,1, 0,0,0, 1,1,1, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 1,1,1, 1,1,1,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
    1,1,1, 0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0, 0,0,0,
];



function initBallBuffer() {

    ballVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ballVertices), gl.STATIC_DRAW);

    ballColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ballColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(ballColors), gl.STATIC_DRAW);

    var app = [];
    for(var i=0; i < ballIndices.length; i++){
      app = app.concat(ballIndices[i]);
    }

    ballIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ballIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(app), gl.STATIC_DRAW);
}

function renderBall(context) {
    //setting the model view and projection matrix on shader
    setUpModelViewMatrix(context.sceneMatrix, context.viewMatrix);

    var positionLocation = gl.getAttribLocation(context.shader, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(context.shader, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, ballColorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(colorLocation);

    gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 1);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ballIndexBuffer);
    var off = 0;
    for(var i = 0; i < 32; i++) {
      gl.drawElements(gl.TRIANGLE_FAN, ballIndices[i].length, gl.UNSIGNED_SHORT, off);
      off += 2*ballIndices[i].length;
    }
}
