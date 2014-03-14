---
layout: post
title: "Imgur API with Ruby: Downloading Images"
---

I've modified the script from my previous post to download the images from an album and accept a few arguments.  The script can now be invoked like this:

{% highlight bash %}
ruby script.rb CLIENT_ID ALBUM_ID destination_folder
{% endhighlight %}

This implementation is very brittle and future posts will see this script move toward a fully tested executable.  Don't forget to change the permissions!

{% highlight bash %}
chmod u+x path/to/script.rb
{% endhighlight %}

{% highlight ruby %}
#!/usr/bin/env ruby
require 'net/http'
require 'net/https'
require 'open-uri'
require 'json'

def imgur_data
  headers = { "Authorization" => "Client-ID #{ARGV[0]}"}
  path    = "/3/album/#{ARGV[1]}.json"
  uri     = URI.parse("https://api.imgur.com"+path)
  request = Net::HTTP::Get.new(path, headers)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  response = http.request(request)
  response.body
end

def album_json
  JSON.parse(imgur_data)
end

def images
  album_json["data"]["images"]
end

def url_array
  [].tap do |array|
    images.each do |image|
      array << image["link"]
    end
  end
end

def download
  url_array.each do |url|
    filename = /(\w+).jpg/.match(url)[0]
    File.write("#{ARGV[2]}/#{filename}", open(url).read, {mode: "wb"})
  end
end

download
{% endhighlight %}
