import os

def main():
    cwd = r"d:\promusiccc - Copy"
    file_path = os.path.join(cwd, "script.js")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the target block in updateThreeVortexAudio
    target = """  const time = Date.now() * 0.001;
  state.threeVortexCamera.position.x = Math.sin(time * 0.5) * 0.3;
  state.threeVortexCamera.position.y = Math.cos(time * 0.3) * 0.2;
}"""

    replacement = """  const time = Date.now() * 0.001;
  state.threeVortexCamera.position.x = Math.sin(time * 0.5) * 0.3;
  state.threeVortexCamera.position.y = Math.cos(time * 0.3) * 0.2;
  state.threeVortexCamera.rotation.z = Math.sin(time * 0.25) * 0.015;
}"""

    # Replace windows line endings if needed
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
