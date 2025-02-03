---
layout: default
title: "Xu Yu-Chia's Blog"
---
# 📝 最新文章

<div class="posts-container">
  {% for post in site.posts %}
    <div class="post-card">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="post-date">{{ post.date | date: "%Y-%m-%d" }}</p>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 100 }}</p>
      <a href="{{ post.url | relative_url }}" class="read-more">閱讀更多 →</a>
    </div>
  {% endfor %}
</div>


