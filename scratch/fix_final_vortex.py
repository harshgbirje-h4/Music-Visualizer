import os

def main():
    cwd = r"d:\promusiccc - Copy"
    file_path = os.path.join(cwd, "script.js")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the target block for background reflector
    target = """  bgReflector.onBeforeRender = function(renderer, scene, camera) {
    const oldDensity = scene.fog.density;
    scene.fog.density = 0.0; // 100% crystal-clear reflection for the OLED mirror look
    oldBeforeRender.call(this, renderer, scene, camera);
    scene.fog.density = oldDensity;
  };

  bgReflector.position.z = -0.5;  // behind the rings
  bgGroup.add(bgReflector);"""

    replacement = """  bgReflector.onBeforeRender = function(renderer, scene, camera) {
    const oldDensity = scene.fog.density;
    scene.fog.density = 0.003; // Soft premium fading reflection
    oldBeforeRender.call(this, renderer, scene, camera);
    scene.fog.density = oldDensity;
  };

  bgReflector.position.set(0, 0, mirrorZ - 0.5);  // behind the rings, directly in the scene (avoiding parent scale errors)
  scene.add(bgReflector);"""

    if target in content:
        content = content.replace(target, replacement)
        print("Replaced with LF line endings successfully.")
    elif target.replace("\n", "\r\n") in content:
        content = content.replace(target.replace("\n", "\r\n"), replacement.replace("\n", "\r\n"))
        print("Replaced with CRLF line endings successfully.")
    else:
        print("Could not find target content in file!")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    main()
