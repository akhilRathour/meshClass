


#version 330 core

// Outputs colors in RGBA
out vec4 FragColor;


// Imports the color from the Vertex Shader
in vec3 color;
// Imports the texture coordinates from the Vertex Shader
in vec2 texCoord;
// Imports the normal from the Vertex Shader
in vec3 Normal;
// Imports the current position from the Vertex Shader
in vec3 crntPos;

// Gets the Texture Unit from the main function
uniform sampler2D tex0;
// Gets the color of the light from the main function
uniform vec4 lightColor[2];
// Gets the position of the light from the main function
uniform vec3 lightPos[2];

// Gets the position of the camera from the main function
uniform vec3 camPos;

void main()
{
	// ambient lighting
	float ambient = 0.20f;

	// diffuse lighting
	//light 1
	vec3 normal = normalize(Normal);
	vec3 lightDirection1 = normalize(lightPos[0] - crntPos);
	float diffuse1 = max(dot(normal, lightDirection1), 0.0f);

	// specular lighting
	float specularLight = 0.50f;
	vec3 viewDirection1 = normalize(camPos - crntPos);
	vec3 reflectionDirection1 = reflect(-lightDirection1, normal);
	float specAmount1 = pow(max(dot(viewDirection1, reflectionDirection1), 0.0f), 8);
	float specular1 = specAmount1 * specularLight;

	//light2
	vec3 lightDirection2 = normalize(lightPos[1] - crntPos);
	float diffuse2 = max(dot(normal, lightDirection2), 0.0f);

	vec3 viewDirection2 = normalize(camPos - crntPos);
	vec3 reflectionDirection2 = reflect(-lightDirection2, normal);
	float specAmount2 = pow(max(dot(viewDirection2, reflectionDirection2), 0.0f), 8);
	float specular2 = specAmount2 * specularLight;
	// outputs final color
	FragColor = texture(tex0, texCoord) * (lightColor[0] * (diffuse1 + ambient + specular1) + lightColor[1]*(diffuse2 + ambient + specular2));
}