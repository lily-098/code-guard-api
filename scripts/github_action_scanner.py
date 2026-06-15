import os
import re
import sys

# Define regex patterns for code anomalies
PATTERNS = {
    "Google API Key": re.compile(r'AIzaSy[A-Za-z0-9-_]{35}'),
    "GitHub PAT": re.compile(r'ghp_[A-Za-z0-9_]{36,255}'),
    "Generic Credential/Secret": re.compile(r'(?i)\b(password|secret|api_key|private_key)\s*[:=]\s*[\'"][^\'"]{6,}[\'"]'),
    "Reverse Shell Command": re.compile(r'(socket\.socket|subprocess\.Popen|/bin/bash|nc\s+-e)'),
    "Cryptominer Signature": re.compile(r'(xmrig|stratum\+tcp)')
}

# Directories and files to exclude from scans
EXCLUDE_DIRS = {".git", "venv", ".venv", "node_modules", "__pycache__", "models", "data"}
EXCLUDE_FILES = {"github_action_scanner.py", "test_scanner_logic.py", "collaboration.db"}

def scan_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        threats_found = []
        for name, pattern in PATTERNS.items():
            matches = pattern.findall(content)
            if matches:
                threats_found.append((name, len(matches)))
                
        return threats_found
    except Exception as e:
        # Ignore files that can't be read
        return []

def main():
    print("====================================================")
    print("      CodeGuard Repository Security Scanner         ")
    print("====================================================")
    
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(f"Scanning directory: {root_dir}")
    
    total_files_scanned = 0
    total_threats_found = 0
    failed = False
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude directories in place
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        
        for filename in filenames:
            if filename in EXCLUDE_FILES:
                continue
                
            filepath = os.path.join(dirpath, filename)
            rel_path = os.path.relpath(filepath, root_dir)
            total_files_scanned += 1
            
            threats = scan_file(filepath)
            if threats:
                failed = True
                for threat_type, count in threats:
                    print(f"[CRITICAL THREAT] {rel_path} contains {count} instance(s) of: {threat_type}")
                    total_threats_found += count
                    
    print("\n----------------------------------------------------")
    print(f"Scan Complete. Files Scanned: {total_files_scanned}")
    
    if failed:
        print(f"STATUS: FAILURE ({total_threats_found} critical security vulnerabilities detected!)")
        sys.exit(1)
    else:
        print("STATUS: SUCCESS (No threats or secrets exposed in code files.)")
        sys.exit(0)

if __name__ == "__main__":
    main()
