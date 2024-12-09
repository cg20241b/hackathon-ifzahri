uniform vec3 lightPos;
uniform vec3 baseColor;
uniform float ambientIntensity;
uniform vec3 cameraPos;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
      // Ambient
    vec3 ambient = baseColor * ambientIntensity;

      // Diffuse
    vec3 lightDir = normalize(lightPos - vPosition);
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 diffuse = diff * baseColor;

      // Specular (Plastic)
    vec3 viewDir = normalize(cameraPos - vPosition);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
    vec3 specular = vec3(0.5) * spec; // White specular for plastic

    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}