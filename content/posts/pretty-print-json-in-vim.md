---
title: "Pretty print JSON in Vim"
date: 2014-07-10T13:09:47+02:00
template: "post"
draft: false
category: "Productivity"
aliases:
  - "/2014/07/10/pretty-print-json-in-vim/"
tags:
  - "Vim"
  - "Productivity"
  - "Tools"
slug: "/posts/pretty-print-json-in-vim"
description: "Quick tip! Format JSON within Vim with a single command."
---

This post is rather a quick tip than a real article. I think I don't have to give a specific context here, since the use case is clear: You've got some JSON from any resource and you want to inspect it for any reason. And since you're a Vim user, of course you want to do that inside your Vim.

Great. So now we have some JSON and we paste it into our Vim and because our mentioned resource doesn't return pretty printed JSON, all we see is a big unreadable junk of JSON data in our buffer. How do we get this pretty printed? It's as simple as running this command within Vim:

```vim
:%!python -m json.tool
```

That's it, try it.

Let's take a look at what's happening here. We can actually split the command above into the following parts:

- `:` - Brings you from Normal Mode into Command-Line Mode. Vim now waits for you to enter a command.

- `%` - A symbolic identifier to specify a range. `%` defines a range from the first to the last line of the current buffer. You could also specify line numbers like `2,5` which defines the range from line 2 to line 5. Another possible way to define a range is to use Visual Mode. Simply select your target lines and type `:`. This prepares the command line with `'<,'>`, which is the range definition for "Everything that has been visually selected".

- `!` - Starting your command with `!` lets you run any shell command from within Vim. Having a range selected before makes the shell using that as standard input stream.

- `python -m json.tool` - The actual shell command. Here we run a Python library module `json.tool` that does the actual work for us. The output of this command is sent back to your Vim buffer once executed.

Of course, this command only works if you have Python installed on your local machine. Unix machines usually come with a default Python installation.

Hope this helps!

