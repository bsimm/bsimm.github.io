---
layout: post
title: "Moving from script to bin"
---

Following Practicing Ruby's [example](https://practicingruby.com/articles/building-unix-style-command-line-applications), I've modified my script to be executable without prefixing it with "ruby" and used Ruby's OptionParser library to read arguments instead of pulling them straight from ARGV.

Using the OptionParser library was fairly straightforward, but I needed to use the arguments following the flags as strings in my code.  After looking over the the documentation, I realized you have to specify that you will be receiving an argument, otherwise it will be set to true or false.

For example:

{% highlight ruby %}
parser.on("-f", "--foo") {|argument| options[:foo] = argument}
{% endhighlight %}

If your bin is executed with `mybin -f bar`, `options[:foo]` will return `true`.

{% highlight ruby %}
parser.on("-f", "--foo ARGUMENT") {|argument| options[:foo] = argument}
{% endhighlight %}

If your bin is executed with `mybin -f bar`, `options[:foo]` will return `bar`.

Check out the rest of the code on my [github](https://github.com/bsimm/rimgur).
