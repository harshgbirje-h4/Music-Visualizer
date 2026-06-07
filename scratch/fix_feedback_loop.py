import os

def main():
    cwd = r"d:\promusiccc - Copy"
    file_path = os.path.join(cwd, "script.js")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Define targets and replacements
    
    # 1. Floor & Ceiling Reflector setup update
    target1 = """  // ================================================================
  // GLOSSY MIRROR FLOOR & CEILING
  // ================================================================
  const floorGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const floorReflector = new Reflector(floorGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });
  floorReflector.rotation.x = -Math.PI / 2;
  floorReflector.position.set(0, -hexRadius, -(tunnelLen / 2));
  scene.add(floorReflector);

  const ceilGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const ceilReflector = new Reflector(ceilGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });
  ceilReflector.rotation.x = Math.PI / 2;
  ceilReflector.position.set(0, hexRadius, -(tunnelLen / 2));
  scene.add(ceilReflector);"""

    replacement1 = """  // ================================================================
  // GLOSSY MIRROR FLOOR & CEILING
  // ================================================================
  let bgReflector; // Declare early for mutual visibility hiding during render passes

  const floorGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const floorReflector = new Reflector(floorGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });
  
  const oldFloorRender = floorReflector.onBeforeRender;
  floorReflector.onBeforeRender = function(renderer, scene, camera) {
    if (bgReflector) bgReflector.visible = false;
    oldFloorRender.call(this, renderer, scene, camera);
    if (bgReflector) bgReflector.visible = true;
  };

  floorReflector.rotation.x = -Math.PI / 2;
  floorReflector.position.set(0, -hexRadius, -(tunnelLen / 2));
  scene.add(floorReflector);

  const ceilGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const ceilReflector = new Reflector(ceilGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });

  const oldCeilRender = ceilReflector.onBeforeRender;
  ceilReflector.onBeforeRender = function(renderer, scene, camera) {
    if (bgReflector) bgReflector.visible = false;
    oldCeilRender.call(this, renderer, scene, camera);
    if (bgReflector) bgReflector.visible = true;
  };

  ceilReflector.rotation.x = Math.PI / 2;
  ceilReflector.position.set(0, hexRadius, -(tunnelLen / 2));
  scene.add(ceilReflector);"""

    # 2. Background Reflector setup update
    target2 = """  const bgGeo = new THREE.ShapeGeometry(bgShape, 1);
  const bgReflector = new Reflector(bgGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xffffff // Perfect high-reflective silver/white for vibrant OLED colors
  });
  
  // CRITICAL FIX: The reflection camera renders from 2x the distance, causing 
  // standard scene fog to completely black out the reflection. 
  // We temporarily disable the fog entirely while the mirror is rendering.
  const oldBeforeRender = bgReflector.onBeforeRender;
  bgReflector.onBeforeRender = function(renderer, scene, camera) {
    const oldDensity = scene.fog.density;
    scene.fog.density = 0.003; // Soft premium fading reflection
    oldBeforeRender.call(this, renderer, scene, camera);
    scene.fog.density = oldDensity;
  };

  bgReflector.position.set(0, 0, mirrorZ - 0.5);  // behind the rings, directly in the scene (avoiding parent scale errors)
  scene.add(bgReflector);"""

    replacement2 = """  const bgGeo = new THREE.ShapeGeometry(bgShape, 1);
  bgReflector = new Reflector(bgGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xffffff // Perfect high-reflective silver/white for vibrant OLED colors
  });
  
  // CRITICAL FIX: The reflection camera renders from 2x the distance, causing 
  // standard scene fog to completely black out the reflection. 
  // We temporarily disable the fog entirely while the mirror is rendering.
  const oldBeforeRender = bgReflector.onBeforeRender;
  bgReflector.onBeforeRender = function(renderer, scene, camera) {
    // Hide floor and ceiling mirrors to prevent recursive reflection feedback loop
    if (floorReflector) floorReflector.visible = false;
    if (ceilReflector) ceilReflector.visible = false;

    const oldDensity = scene.fog.density;
    scene.fog.density = 0.003; // Soft premium fading reflection
    oldBeforeRender.call(this, renderer, scene, camera);
    scene.fog.density = oldDensity;

    // Restore visibility
    if (floorReflector) floorReflector.visible = true;
    if (ceilReflector) ceilReflector.visible = true;
  };

  bgReflector.position.set(0, 0, mirrorZ - 0.5);  // behind the rings, directly in the scene (avoiding parent scale errors)
  scene.add(bgReflector);"""

    # Replace Chunk 1
    if target1 in content:
        content = content.replace(target1, replacement1)
        print("Chunk 1 replaced successfully (LF).")
    elif target1.replace("\n", "\r\n") in content:
        content = content.replace(target1.replace("\n", "\r\n"), replacement1.replace("\n", "\r\n"))
        print("Chunk 1 replaced successfully (CRLF).")
    else:
        print("WARNING: Chunk 1 target not found!")

    # Replace Chunk 2
    if target2 in content:
        content = content.replace(target2, replacement2)
        print("Chunk 2 replaced successfully (LF).")
    elif target2.replace("\n", "\r\n") in content:
        content = content.replace(target2.replace("\n", "\r\n"), replacement2.replace("\n", "\r\n"))
        print("Chunk 2 replaced successfully (CRLF).")
    else:
        print("WARNING: Chunk 2 target not found!")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    main()
