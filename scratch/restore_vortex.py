import subprocess
import os

def main():
    cwd = r"d:\promusiccc - Copy"
    
    # 1. Get script.js from b1486fb
    try:
        git_content = subprocess.check_output(
            ["git", "show", "b1486fb:script.js"],
            cwd=cwd,
            stderr=subprocess.STDOUT
        ).decode('utf-8')
    except Exception as e:
        print(f"Error reading from git: {e}")
        return

    # 2. Get current script.js content
    file_path = os.path.join(cwd, "script.js")
    with open(file_path, "r", encoding="utf-8") as f:
        current_content = f.read()

    # Split into lines
    git_lines = git_content.splitlines()
    curr_lines = current_content.splitlines()

    # Find where the vortex section starts
    # In both, it seems to start around line 3775 with 'let THREE, EffectComposer...'
    git_start_idx = -1
    for idx, line in enumerate(git_lines):
        if "let THREE, EffectComposer" in line:
            git_start_idx = idx
            break
            
    curr_start_idx = -1
    for idx, line in enumerate(curr_lines):
        if "let THREE, EffectComposer" in line:
            curr_start_idx = idx
            break

    if git_start_idx == -1 or curr_start_idx == -1:
        print(f"Could not find start index. git: {git_start_idx}, curr: {curr_start_idx}")
        return

    print(f"git vortex start index: {git_start_idx}")
    print(f"curr vortex start index: {curr_start_idx}")

    # Check if lines before start are identical
    before_identical = True
    min_len = min(git_start_idx, curr_start_idx)
    for i in range(min_len):
        if git_lines[i] != curr_lines[i]:
            print(f"Difference at line {i+1}:")
            print(f"  git : {git_lines[i]}")
            print(f"  curr: {curr_lines[i]}")
            before_identical = False
            break

    if before_identical:
        print("Lines before vortex are identical!")
    else:
        print("WARNING: Lines before vortex are NOT identical.")

    # 3. Create the restored script.js by taking:
    # - current script.js lines before vortex (curr_lines[:curr_start_idx])
    # - git script.js lines from vortex start to end (git_lines[git_start_idx:])
    new_vortex_section = "\n".join(git_lines[git_start_idx:])
    
    # Save a backup of the current script.js first
    backup_path = os.path.join(cwd, "script.js.backup")
    with open(backup_path, "w", encoding="utf-8") as f:
        f.write(current_content)
    print(f"Backup saved to {backup_path}")

    new_content = "\n".join(curr_lines[:curr_start_idx]) + "\n" + new_vortex_section + "\n"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Vortex section successfully restored from b1486fb!")

if __name__ == "__main__":
    main()
