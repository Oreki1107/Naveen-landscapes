import os
import re

regex = re.compile(r'\b(square\s*feet|square|sq\.?\s*ft|sqft|ft²|sq)\b', re.IGNORECASE)
allowed_exts = {'.html', '.js', '.ts', '.jsx', '.tsx', '.json', '.md'}
exclude_dirs = {'node_modules', 'dist', 'build', '.git', 'scratch', '.gemini'}

results = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if any(file.endswith(ext) for ext in allowed_exts):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    for i, line in enumerate(f):
                        if regex.search(line):
                            results.append(f"{path}:{i+1}:{line.strip()}")
            except:
                pass

with open('search_results.txt', 'w', encoding='utf-8') as f:
    for res in results:
        f.write(res + '\n')
