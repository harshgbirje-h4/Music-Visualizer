import re

file_path = "d:/promusiccc - Copy/script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_code = """
function drawCorridorSurfaces(c, z0, z1, fog, primaryColor, secondaryColor, accentColor, mid, beatGlow, camX, camY, cx, cy, focalLength, nearClip) {
  const h = _gateH;
  const w = _gateW * 1.5;
  const ceilY = -h * 1.2;
  const floorY = h;

  const ptL0 = projectPoint(-w - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
  const ptR0 = projectPoint(w - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
  const pbL0 = projectPoint(-w - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);
  const pbR0 = projectPoint(w - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);

  const ptL1 = projectPoint(-w - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
  const ptR1 = projectPoint(w - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
  const pbL1 = projectPoint(-w - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);
  const pbR1 = projectPoint(w - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);

  if (!ptL0 || !ptR0 || !pbL0 || !pbR0 || !ptL1 || !ptR1 || !pbL1 || !pbR1) return;

  c.save();
  
  // Create distinct visual surfaces so it's NOT a wireframe void.
  // Use alternating brightness based on z depth to create visible structural segments.
  const isAlt = Math.round(z0 * 2) % 2 === 0;
  
  // Ceiling
  c.fillStyle = isAlt ? `rgba(15, 20, 35, ${0.9 * fog})` : `rgba(8, 12, 22, ${0.9 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(ptR0.x, ptR0.y); c.lineTo(ptR1.x, ptR1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  // Left Wall
  c.fillStyle = isAlt ? `rgba(20, 25, 45, ${0.85 * fog})` : `rgba(12, 15, 30, ${0.85 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(pbL0.x, pbL0.y); c.lineTo(pbL1.x, pbL1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  // Right Wall
  c.fillStyle = isAlt ? `rgba(15, 20, 40, ${0.85 * fog})` : `rgba(10, 14, 28, ${0.85 * fog})`;
  c.beginPath(); c.moveTo(ptR0.x, ptR0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(ptR1.x, ptR1.y); c.fill();
  
  // Floor (Glossy Blackish-blue)
  c.fillStyle = isAlt ? `rgba(8, 12, 25, ${0.95 * fog})` : `rgba(4, 6, 15, ${0.95 * fog})`;
  c.beginPath(); c.moveTo(pbL0.x, pbL0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(pbL1.x, pbL1.y); c.fill();

  // Draw structural outlines for panels so they look like solid metal plates
  c.strokeStyle = `rgba(40, 60, 100, ${0.5 * fog})`;
  c.lineWidth = ptL0.scale * 0.001;
  c.beginPath();
  // Left wall panel border
  c.moveTo(ptL0.x, ptL0.y); c.lineTo(pbL0.x, pbL0.y);
  // Right wall panel border
  c.moveTo(ptR0.x, ptR0.y); c.lineTo(pbR0.x, pbR0.y);
  c.stroke();

  // 2. Floor Panels & Grid (Magenta dominated)
  const floorCols = [-0.8 * w, -0.4 * w, 0, 0.4 * w, 0.8 * w];
  for (let col of floorCols) {
    const pl0 = projectPoint(col - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);
    const pl1 = projectPoint(col - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);
    if (pl0 && pl1) {
      drawNeonLine(c, pl0, pl1, primaryColor, pbL0.scale * 0.0015, fog * 0.3 * (0.5 + beatGlow * 0.6));
    }
  }
  
  if (isAlt) {
     drawNeonLine(c, pbL0, pbR0, primaryColor, pbL0.scale * 0.002, fog * 0.5 * (0.8 + beatGlow * 0.4));
  }

  // 3. Wall details (Cyan dominated)
  const wallY = 0;
  const wmL0 = projectPoint(-w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmL1 = projectPoint(-w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  const wmR0 = projectPoint(w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmR1 = projectPoint(w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  
  if (wmL0 && wmL1 && wmR0 && wmR1) {
    drawNeonLine(c, wmL0, wmL1, secondaryColor, ptL0.scale * 0.002, fog * 0.4 * (0.4 + mid * 0.6 + beatGlow * 0.3));
    drawNeonLine(c, wmR0, wmR1, secondaryColor, ptL0.scale * 0.002, fog * 0.4 * (0.4 + mid * 0.6 + beatGlow * 0.3));
  }
  
  if (!isAlt) {
    drawNeonLine(c, ptL0, pbL0, secondaryColor, ptL0.scale * 0.0015, fog * 0.3 * (0.8 + beatGlow * 0.4));
    drawNeonLine(c, ptR0, pbR0, secondaryColor, ptL0.scale * 0.0015, fog * 0.3 * (0.8 + beatGlow * 0.4));
  }

  // 4. Ceiling details (Cyan dominated)
  const ceilCols = [-0.6 * w, 0.6 * w];
  for (let col of ceilCols) {
    const cl0 = projectPoint(col - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
    const cl1 = projectPoint(col - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
    if (cl0 && cl1) {
      drawNeonLine(c, cl0, cl1, accentColor, ptL0.scale * 0.0025, fog * 0.6 * (0.8 + beatGlow * 0.4));
    }
  }

  c.restore();
}
"""

start_str = "function drawCorridorSurfaces(c, z0, z1, fog, primaryColor, secondaryColor, accentColor, mid, beatGlow, camX, camY, cx, cy, focalLength, nearClip) {"
end_str = "function drawFloorReflections(c, z0, z1, depthAlpha, gateColor, beatGlow, camX, camY, cx, cy, focalLength, nearClip) {"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_file_content = content[:start_idx] + new_code + content[end_idx:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_file_content)
    print("Replaced successfully")
else:
    print("Could not find start or end index")
