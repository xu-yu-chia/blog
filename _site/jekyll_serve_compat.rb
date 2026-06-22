load "jekyll_compat.rb"

ARGV.replace([
  "serve",
  "--host", "127.0.0.1",
  "--port", "4000",
  "--no-watch"
])

load Gem.bin_path("jekyll", "jekyll")
