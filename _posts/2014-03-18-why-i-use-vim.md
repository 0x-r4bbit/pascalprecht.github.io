---
layout: post
title: Why I use Vim
---

The first question you get asked by developers of a company when starting at a new gig (after saying hello to everyone and having the first coffee), is probably: <blockquote>So what tools or IDE do you prefer when working with code?</blockquote>

Right? Developers should always be interested and curious about what other developers do to make their daily work as pleasant as possible. They may use tools, editors or IDEs you've never heard of and it probably turns out that these tools give you what you've always been waiting for. Productivity boosts.

This is what we all want and what we should care about. Developers are lazy and very clever at the same time. We're able to customize our environment to make it work in a way we want it to work. We spend a lot of time in thinking about how to automate repetitive tasks because we don't want to repeat ourself over and over again. We try to make things with as less effort as possible to get as much things as possible done. We don't want to waste time. We want to be productive.

This is why I always see an amazed face when people ask me this question, because my answer is (and will probably always be):

<blockquote>Well, I use Vim.</blockquote>

Wait, you mean this text editor nobody knows how to get out of? This editor, where I don't even know how to type things into a file? You are kidding, right?

No. I mean exactly <strong>that</strong> editor.

If you read this article right now, you are probably a Vim user. Because you want to know the reasons why somebody uses the same cool editor you use right? And that's good. If you are not a Vim user, that's even better. Because you are interested in what other developers do and use. Keep reading, you won't regret it.

To make things clear, this post is not about saying that Vim is the answer to everything and you should switch your editors and IDE's right now to be productive. It's also not about saying that everything that is not Vim, is not as good as Vim. Whatever opinions come to your mind when reading this article, all I do here is explaining why I've chosen Vim as my primary editor for almost everything. If it doesn't work for you, that's okay. Just choose what works best for you. If it sounds interesting to you and you decide to try this editor, I'd be very happy to hear from your experiences and how things work out.

<h2 id="climbing-the-wall-and-sliding-down-afterwards">Climbing the wall and sliding down afterwards</h2>

Most people don't really know what Vim is all about. All they know is that it's a text editor sitting in almost every platform and that one can use it to for example editing a file on a remote server. Vim is a lot more. I know, it's not as easy to use as other editors and IDE's, but once you get used to it, you don't want to work without it anymore. <a href="#figure-1" title="Link to figure 1">Figure 1</a> shows the way how I think how steep the learning curve of Vim is.

<figure id="figure-1">
  <img style="width: 100%" alt="Figure that represents Vim's learning curve" src="/public/vim-learn-curve.jpg">
  <figcaption>Figure 1: The Vim learning curve</figcaption>
</figure>

As you can see, it's not a curve at all. It's a wall. But you also see, once you climbed that wall, you can lean back and slide down on the other side. So what do I try to say with this relatively lovely figure of Vim's learning <s>curve</s> wall?


Well, yes. It is true that it's really hard to get started with this editor. You have to understand its <a href="#its-a-modal-editor" title="Link to modal behaviour section">modal behavior</a>, you have to learn a bunch of <a title="Link to text objects section"href="#text-objects-and-motions">key bindings</a>, you even have to stick with a textual user interface. However, once you learned the fundamentals of Vim you'll notice that the original idea behind this editor is actually quite clever and that you're probably much faster than before.

You don't need a mouse, you push yourself to use as few key strokes as possible to do your operations (which again makes you faster), you learn how to customize the <strong>entire</strong> editor that it fits to your preferences and you finally become a Vim power user and only leave it when it's really needed.

I climbed that wall and it took me weeks to get used to the basic things like editing files, opening different files etc. Back in the days I switched from <a href="https://www.eclipse.org/" title="Eclipse website">Eclipse</a> to Vim. You probably agree that this IDE is slow by default. But despite from that, once I was able to do some basic operations in Vim and actually started working again, I made almost as twice as much progress at work in about half the time. I know that sounds kind of crazy but I'm serious. And that convinced me that I made the right choice.

So, do yourself a favor and climb that mountain. Just remember that you can slide down afterwards.

<h2 id="its-a-modal-editor">It's a modal editor</h2>

I can't even think of navigating with the mouse through files and folders anymore. Navigating with the keyboard is just way faster. Moving away your hand from the home row to the mouse takes too long. But how is it possible to navigate with the keyboard without typing directly into file you ask? Well, Vim doesn't insert into files unless you tell him to do so. It's a modal editor.

That's another fact that makes me love Vim. It has different modes. There's <em>Normal Mode</em>, <em>Insert Mode</em>, <em>Command Mode</em>, <em>Visual Mode</em> and <em>Ex Mode</em> to name a few. Each key on the keyboard has a different meaning in each mode. Now, it probably sounds like too many things to keep in your head and you might be right about that, but learning Vim is not about starting from 0 to 100. Remember the <a href="#figure-1">wall</a>.

By the way, as far as I know, <a href="https://www.gnu.org/software/emacs/">Emacs</a> has even a mode for each file type/language.

Normal mode is the mode you hang around most of your time. It's for navigating and editing text. Even if you can use the mouse or arrow keys to get from one place to another, you actually don't want to do that because it's a waste of time. The basic navigation keys in Vim that correspond to the arrow keys are `h`, `j`, `k` and `l`. Looking at these letters they seem to be just letters right? Now take a look at your keyboard and see where these letters are placed.

Exactly. There's no place like home row. Now compare it to where the arrow keys are placed (Yes, they are too far away!). Using `h`, `j`, `k` and `l` alone doesn't really do the trick right? It's like using arrow keys but from the home row. Vim is very neat when it comes to combine <a href="#text-objects-and-motions">motions</a> with a count. For example you can simply prefix the keys with a count like `5j` or `9k`, which executes the motion accordingly.

There's also `H` which brings you to the top of the window, `M` which brings you to the middle and `G` which puts your cursor in the last line. Motions work everywhere in Vim. So for example if you are in Visual Mode to select a range of text, you can use any kind of motion to do so. Selecting everything from top to the 26th line of the file could be achieved with `ggV26G` when starting from Normal Mode. Is that easy? Of course there are much more motions and features to move around in Vim. Simply google for <em>marks</em>, <em>jumps</em> or <em>text-objects</em>.

To get an idea of how fast you can navigate in Vim, watch this <a href="https://www.youtube.com/watch?feature=player_embedded&v=zIOOLZJb87U">video</a>. I'll get into some other powerful motions in a minute.

But how do one insert text like in any other editor and IDE? Well, in Vim everything is just a few key strokes away. To insert text into a file, you first have to switch to Insert Mode. You get there by simply typing `i` in Normal Mode. From there you can type anything you want and it gets inserted into the Buffer. You get out and switch to Normal Mode again by hitting `<Esc>`. Even if that's pretty intuitive, it turns out that the `<Esc>` key is far away from the home row. No problem. Simply map something else to escape from Insert Mode.

If you want to select a range of text to operate on it, you simply switch to Visual Mode by typing `v` for character-wise or `V` for line-wise selection. From there you can use any kind of motions to select a range. Switching to Normal Mode again, is as easy as hitting the `<Esc>` key. Vim even comes with a <em>Visual-Block Mode</em> out of the box, which let's you select ranges of text vertically.

Even if it sounds very uncomfortable to switch between modes all the time, once you get into it you'll see that it's actually very intuitive and that you are much faster when working with a few key strokes instead of reaching out to the mouse, scrolling around, finding the place you want to put the cursor and finally trying to be as precise as possible to hit that target. In addition, like I said, you actually spend most of the time in Normal Mode. The less you have to switch modes to edit your text the better and faster you are.

<h2 id="text-objects-and-motions">Text-objects and motions</h2>

Vim comes with a two features that I haven't seen in any other editor yet. Taking a look at the headline doesn't make it hard to guess what features I'm talking about. Exactly, I'm talking about text-objects and motions. Now what the hell are they and why are these two guys another reason I love Vim?

Motions are in most cases the second part of an entire command you want to execute when working with Vim. You apply them during the so called **Operator-Pending Mode**, which is the little time frame where you apply a "target" to built-in commands such as `d`, `y` or `c`. Let's say you want to delete from the current cursor position <em>until</em> the next occurrence of the letter `r`. You do that with the `t` command which brings your cursor in front of the next occurrence of the given characer. So typing `dtr` in Normal Mode could be read as <em>Delete until next 'r'</em>. The basic pattern of the `d` command is `d{motion}` and you can use any kind of motion there.

Text-objects can be used in context of motions. They are a bit more clever than normal motions because they can act in both "directions." For example, whereas the `w` command in Normal Mode is a motion to jump to the next word, `iw` is a text-object that operates <em>inside</em> the current word. Where "inside" means "this word excluding the surrounding spaces". So, to delete a word you can compose commands like `diw` or `daw` for <em>around</em> a word. There are text-objects for paragraphs (`ip`, `ap`), sentences (`is`, `as`), HTML tags (`it`, `at`) and Vim is even smart enough to act on the current function block (`i{`, `a{`).

These are just a few of Vim's built-in text objects. Also, the examples I gave here are just very simple scenarios, I think you can imagine how powerful these commands could be when working on bigger texts and codes. In the end it's all about composability. Vim gives you literally a grammar so that you can edit your text with the speed of thought.

## There's no place like Vim

Other editors try to bring Vim functionality into their environments. For example the editor Sublime Text has an optional [Vintage Mode](https://www.sublimetext.com/docs/2/vintage.html). The recently launched editor by GitHub [Atom](http://atom.io) has a vim-mode too. However none of these additional modes can really give you what Vim gives you. Apart from the fact that Vim has over 20 years of knowledge inside with loads of built-in features I didn't even know yet, key features like operator-pending key mappings are things that let me keep using Vim.

<img style="width: 100%" src="/public/reimplement-vim.jpg">

There was this great article on [why Atom can't replace Vim](https://medium.com/programming-ideas-tutorial-and-experience/433852f4b4d1) popping up recently, you really should read it.

<s>However, that's all I have.</s>

Based on some feedback I got, I'm adding a few links to resources here that I find very useful and maybe help you out getting started with Vim too.

- [Your problem with Vim is that you don't grok vi](http://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118) on StackOverflow
- [Coming Home to Vim](http://stevelosh.com/blog/2010/09/coming-home-to-vim/) by Steve Losh
- [Vim from novice to professional](http://ontwik.com/tools/vim-from-novice-to-professional-by-derek-wyatt-p1/) by Derek Wyatt
- [All episodes on Vimcasts.org](http://vimcasts.org/episodes/archive) by Drew Neil

I also recommend typing `vimtutor` into your console and go through it.
