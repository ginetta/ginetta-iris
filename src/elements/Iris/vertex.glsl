attribute vec2 aOff;
attribute vec3 aColor;
attribute float aRes;

uniform float uProgress;
uniform float uTime;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;

varying vec3 vColor;
varying vec2 vPos;
varying float vRes;
varying float vProgress;
varying float vTime;

void main(){
	// gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix;
	// gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aOff,0,.0,1.);
	gl_Position=vec4(aOff,0.,1.);
	// gl_PointSize=1.;
	// gl_Position=vec4(0.,0.,0.,1.);

	vPos=gl_Position.xy;
	vColor=aColor;
	vRes=aRes;
	vProgress=uProgress;
	vTime=uTime;
}
