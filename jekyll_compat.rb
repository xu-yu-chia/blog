# Compatibility shim for this local Windows Ruby 3.4 + Jekyll 3.x setup.
# In this environment Ruby's native Dir glob returns no matches for the Jekyll
# gem and site paths, so Jekyll cannot autoload its own filters/converters.
require "find"
require "pathname"

class << Dir
  unless method_defined?(:codex_original_glob)
    alias_method :codex_original_glob, :glob
    alias_method :codex_original_brackets, :[]
  end

  def glob(pattern, flags = 0)
    result = codex_original_glob(pattern, flags)
    return result unless result.empty? && pattern.to_s.match?(/[*?\{]/)

    codex_fallback_glob(pattern.to_s)
  end

  def [](*patterns)
    patterns.flat_map { |pattern| glob(pattern.to_s) }
  end

  private

  def codex_expand_braces(pattern)
    match = pattern.match(/\{([^{}]+)\}/)
    return [pattern] unless match

    match[1].split(",").flat_map do |part|
      codex_expand_braces(pattern.sub(match[0], part))
    end
  end

  def codex_glob_regex(pattern)
    normalized = pattern.tr("\\", "/")
    regex = +""
    i = 0
    while i < normalized.length
      char = normalized[i]
      if char == "*"
        if normalized[i + 1] == "*"
          regex << ".*"
          i += 2
        else
          regex << "[^/]*"
          i += 1
        end
      elsif char == "?"
        regex << "[^/]"
        i += 1
      else
        regex << Regexp.escape(char)
        i += 1
      end
    end
    /\A#{regex}\z/
  end

  def codex_root_for(pattern)
    normalized = pattern.tr("\\", "/")
    first_wildcard = normalized.index(/[*?\{]/) || normalized.length
    prefix = normalized[0...first_wildcard]
    root = if prefix.end_with?("/")
             prefix
           else
             File.dirname(prefix)
           end
    root = "." if root.nil? || root.empty?
    root
  end

  def codex_fallback_glob(pattern)
    codex_expand_braces(pattern).flat_map do |expanded|
      root = codex_root_for(expanded)
      absolute_pattern = Pathname.new(expanded).absolute?
      search_root = File.expand_path(root)
      next [] unless File.directory?(search_root)

      regex = codex_glob_regex(absolute_pattern ? File.expand_path(expanded).tr("\\", "/") : expanded.tr("\\", "/"))
      matches = []
      Find.find(search_root) do |path|
        next if path == search_root

        candidate = if absolute_pattern
                      File.expand_path(path).tr("\\", "/")
                    else
                      Pathname.new(path).relative_path_from(Pathname.new(Dir.pwd)).to_s.tr("\\", "/")
                    end
        matches << candidate if candidate.match?(regex)
      end
      matches
    end.uniq.sort
  end
end
