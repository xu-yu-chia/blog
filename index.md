---
layout: default
title: "Xu Yu-Chia's Blog"
---

# 程式學習與技術筆記

<div class="posts-container">
  {% for post in site.posts %}
    {% unless post.hidden %}
      <article
        class="post-card"
        role="link"
        tabindex="0"
        onclick="window.location.href='{{ post.url | relative_url }}'"
        onkeydown="if(event.key==='Enter' || event.key===' '){ event.preventDefault(); window.location.href='{{ post.url | relative_url }}'; }"
      >
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-date">{{ post.date | date: "%Y-%m-%d" }}</p>
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
        {% if post.tags %}
          <div class="post-tags">
            {% for tag in post.tags %}
              <a href="{{ '/tags/' | relative_url }}{{ tag | uri_escape }}/" class="tag">{{ tag }}</a>
            {% endfor %}
          </div>
        {% endif %}
        <a href="{{ post.url | relative_url }}" class="read-more">閱讀更多</a>
      </article>
    {% endunless %}
  {% endfor %}
</div>
