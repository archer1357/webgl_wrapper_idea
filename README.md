# webgl wrapper idea

An immediate mode, but not just for vertices, for everything including framebuffers.
```javascript

gl.viewport(0,0,canvas.width,canvas.height);

gl.clearFramebuffers();

gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,deferredColorTex,0);
gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT1,gl.TEXTURE_2D,deferredNormalTex,0);
gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,deferredDepthTex,0);

//
gl.clearColor(0,0,0,1);
gl.clearDepth(1.0);

gl.vertexShader(geomVs);
gl.fragmentShader(geomFs);

gl.uniformMatrix4fv('u_viewProjMat',true,viewProjMat);
gl.uniformMatrix4fv('u_viewMat',true,viewMat);
gl.uniformMatrix3fv('u_viewNormalMat',true,viewNormalMat);

gl.clearStates();
gl.enable(gl.BLEND);

gl.clearVertsInds();

gl.bindVerts(0,3,gl.FLOAT,teapotVertPos);
gl.bindVerts(1,2,gl.FLOAT,teapotVertTex);
gl.bindInds(gl.UNSIGNED_INT,teapotInds);

gl.draw(gl.TRIANGLES);

/*gl.begin(gl.TRIANGLES);
gl.vertex3f(0, 0.0,0.0,0.0); gl.vertex2f(1. 0.0,0.0);
gl.vertex3f(0, 1.0,0.0,0.0); gl.vertex2f(1. 1.0,0.0);
gl.vertex3f(0, 0.0,1.0,0.0); gl.vertex2f(1. 0.0,1.0);
gl.end();*/

//

gl.clearFramebuffers();

gl.sampler(0,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.sampler(0,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.sampler(1,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.sampler(1,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
gl.sampler(2,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
gl.sampler(2,gl.TEXTURE_MAG_FILTER,gl.NEAREST);

gl.bindTexture(0,deferredColorTex);
gl.bindTexture(1,deferredNormalTex);
gl.bindTexture(2,deferredDepthTex);

gl.vertexShader(deferredVs);
gl.fragmentShader(deferredFs);

gl.clearStates();

gl.clearVertsInds();
gl.bindVerts(0,3,gl.FLOAT,scrVerts);

gl.uniform3f('u_lightPos',true,lightPos);
gl.uniform3f('u_lightAtten',true,lightAtten);

gl.draw(gl.TRIANGLES);

/*gl.begin(gl.TRIANGLE_STRIP);
gl.vertex3f(0, 0.0,0.0,0.0); gl.vertex2f(1. 0.0,0.0);
gl.vertex3f(0, 1.0,0.0,0.0); gl.vertex2f(1. 1.0,0.0);
gl.vertex3f(0, 0.0,1.0,0.0); gl.vertex2f(1. 0.0,1.0);
gl.vertex3f(0, 1.0,1.0,0.0); gl.vertex2f(1. 1.0,1.0);
gl.end();*/

```
