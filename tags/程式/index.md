---
layout: default
title: "{{ page.title }}"
---
<h1>標籤: {{ page.title }}</h1>

<ul>
  {% assign tag = page.title | downcase %}
  {% for post in site.posts %}
    {% if post.tags contains tag %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
