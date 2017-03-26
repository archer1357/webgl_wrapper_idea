
function renderGeometry() {
	gl.viewport(0,0,canvas.width,canvas.height);

	gl.clearFramebuffers();

	gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,deferredColorTex,0);
	gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT1,gl.TEXTURE_2D,deferredNormalTex,0);
	gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,deferredDepthTex,0);

	//
	gl.clearColor(0,0,0,0);
	gl.clearDepth(1.0);

	gl.vertexShader(geomVs);
	gl.fragmentShader(geomFs);

	gl.clearStates();
	  
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clearVertsInds();

	gl.bindVerts(0,3,gl.FLOAT,teapotVertPos);
	gl.bindVerts(1,2,gl.FLOAT,teapotVertTex);
	gl.bindInds(gl.UNSIGNED_INT,teapotInds);

	for(var i=0;i<teapots.length;i++) {
		gl.uniformMatrix4fv('u_viewProjMat',true,teapots[i].viewProjMat);
		gl.uniformMatrix4fv('u_viewMat',true,teapots[i].viewMat);
		gl.uniformMatrix3fv('u_normalMat',true,teapots[i].normalMat);
		gl.uniform3fv('u_color',teapots[i].color);
		gl.draw(gl.TRIANGLES);
	}

	/*gl.begin(gl.TRIANGLES);
	gl.vertex3f(0, 0.0,0.0,0.0); gl.vertex2f(1. 0.0,0.0);
	gl.vertex3f(0, 1.0,0.0,0.0); gl.vertex2f(1. 1.0,0.0);
	gl.vertex3f(0, 0.0,1.0,0.0); gl.vertex2f(1. 0.0,1.0);
	gl.end();*/
}

function renderShadowStencil(obj,light) {
	gl.vertexShader(shdVolVs);
	gl.fragmentShader(shdVolFs);

	gl.uniformMatrix4fv('u_viewMat',true,obj.viewMat);
	gl.uniformMatrix3fv('u_normalMat',true,obj.normalMat);
		
	gl.clearStencil(0);
	
	gl.clearStates();
	gl.enable(gl.STENCIL_TEST);
	gl.stencilFunc(gl.ALWAYS,0,0xff);
        gl.stencilOpSeparate(gl.BACK,gl.KEEP,gl.INCR_WRAP,gl.KEEP);
        gl.stencilOpSeparate(gl.FRONT,gl.KEEP,gl.DECR_WRAP,gl.KEEP);
	gl.colorMask(gl.FALSE,gl.FALSE,gl.FALSE,gl.FALSE);
	gl.enable(gl.DEPTH_CLAMP);
	gl.depthFunc(gl.LEQUAL);
	
	
	gl.clearVertsInds();

}

function renderDeferredLight() {
	gl.vertexShader(deferredLightVs);
	gl.fragmentShader(deferredLightFs);

	gl.clearStates();
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE,gl.ONE);
	gl.enable(gl.CULL_FACE);

	gl.clearVertsInds();
	gl.bindVerts(0,3,gl.FLOAT,scrVerts);

	for(var i=0i;i<lights.length;i++) {
		gl.uniform3fv('u_lightPos',lights[i].pos);
		gl.uniform3fv('u_lightAtten',lights[i].atten);
		gl.draw(gl.TRIANGLE_STRIP);
	}

	/*gl.begin(gl.TRIANGLE_STRIP);
	gl.vertex3f(0, 0.0,0.0,0.0); gl.vertex2f(1. 0.0,0.0);
	gl.vertex3f(0, 1.0,0.0,0.0); gl.vertex2f(1. 1.0,0.0);
	gl.vertex3f(0, 0.0,1.0,0.0); gl.vertex2f(1. 0.0,1.0);
	gl.vertex3f(0, 1.0,1.0,0.0); gl.vertex2f(1. 1.0,1.0);
	gl.end();*/
}

function renderDeferred() {
	gl.viewport(0,0,canvas.width,canvas.height);
		
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


}
