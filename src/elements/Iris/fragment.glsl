precision mediump float;

varying vec3 vColor;
varying vec2 vPos;
varying float vRes;
varying float vProgress;
varying float vTime;

float circle(in vec2 _st,in float _radius){
	vec2 dist=_st-vec2(.5);
	return 1.-smoothstep(_radius-(_radius*.01),
	_radius+(_radius*.01),
	dot(dist,dist)*4.);
}

vec3 rgb(in vec3 c){
	return vec3(c.r/255.,c.g/255.,c.b/255.);
}

vec3 gradCirc(in vec2 center,in vec3 rgbColor){
	vec3 color=vec3(circle(center,1.));

	float dis=1.-distance(center,vec2(.5,.5))*4.;
	dis=smoothstep(-.080,.960,dis);

	color.r*=dis;
	color.g*=dis;
	color.b*=dis;

	color.rgb*=rgb(rgbColor);

	return color;
}

// Colors
vec3 brightPurpleColor=vec3(255.,0.,104.)*.9;
vec3 brightPinkColor=vec3(113.,12.,254.)*.9;
vec3 brightGreenColor=vec3(0.,250.,184.)*.9;
vec3 lightBlueColor=vec3(77.,212.,224.)*.9;
vec3 lightPinkColor=vec3(255.,180.,176.)*.9;

void main(){
	vec2 st=gl_FragCoord.xy/vRes;
	// vec2 st=vPos.xy;

	float y=st.x;

	// vec3 color = vec3(st, .0);

	vec3 color=vec3(st,.1);

	gl_FragColor=vec4(color,.5);
}
