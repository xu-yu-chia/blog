import os

# 這裡放你的所有標籤
tags = ["學習", "程式", "生活"]

for tag in tags:
    safe_tag = tag.replace(" ", "-")
    folder = f"tags/{safe_tag}"
    os.makedirs(folder, exist_ok=True)

    with open(f"{folder}/index.md", "w", encoding="utf-8") as f:
        f.write(f"---\nlayout: tag\ntag: {tag}\npermalink: /tags/{safe_tag}/\n---\n")
