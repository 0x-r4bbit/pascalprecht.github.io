---
title: "Learning Rust"
date: "2020-01-15"
template: "post"
draft: false
category: "Career"
slug: "/posts/learning-rust"
description: "About a year ago I've started learning the Rust programming language. Here are a few thoughts about my experience."
---

About half a year ago I wrote about the [Effects of leaving the comfort zone](/posts/effects-of-leaving-the-comfort-zone) and that, among other things, I've started learning the [Rust](https://rust-lang.org) programming language. People say, as a developer, you should learn one programming language every year. I've honestly never really tried it or made it a goal, but I also think it's not trivial to truly **learn** a new programming language. It's one thing to take a look, read the documentation and then play around with a few things. However, if you want to experience what stands out in the language of your choice, it's probably better to work on an actual project with various use cases that cover the different language features.

With a primary background in web development for about 10 years, I thought Rust would be a good candidate. The main reasons are, that I practically don't have any background in systems programming and that I was looking for something that's fun to explore. Rust is a systems programming language. Anything that is written in C or C++ can be written in Rust. It comes with interesting features and guarantees that many other languages don't offer. At the same time, it is known that the learning curve of Rust is supposed to be pretty steep. How can I say no to that?

With that said, I'd like to write about little Rust journey and how it has been going so far. If you're new to Rust or consider giving the language a try, this might be interesting or even useful to you!

## Getting started can be tricky

The first thing I do when I want to learn a new thing is to do a lot of reading. Rust makes that part fairly easy as there are a lot of official learning resources maintained by the Rust team. This includes the [official documentation](https://www.rust-lang.org/learn), as well as the [Rust book](https://doc.rust-lang.org/book/). If you feel like going a bit deeper, there are even books about the [rustc compiler](https://doc.rust-lang.org/rustc/index.html), about [building command line tools](https://rust-cli.github.io/book/index.html), about [building embedded programs](https://rust-embedded.github.io/book/) and many more. I'd argue that it's not very common to have so many officially maintained docs and resources when it comes to programming languages.

Obviously, simply reading isn't going to cut it. Spending lots of time reading about something but not applying what we've learned immediately, is almost a waste of time. That's why I've quickly came up with a project idea so I can put my Rust theory to use. At the time of writing this post I'm working for [Status](https://status.im) on the [Embark](https://embark.status.im) team. Embark is a command line tool that aims to help developers building, testing an deploying applications and I thought, it would be an interesting challenge to build **something like** Embark in Rust.

So here we are, [Vibranium](https://github.com/PascalPrecht/vibranium) was born and I soon started writing my first CLI program. Luckily there are many "crates", that's what packages are called in the Rust ecosystem, built and tested by the community that help a lot with such tasks. Unfortunately, I quickly realised that simple things like outputting a string isn't always as straight forward as I was used to (coming from languages like JavaScript). In total it took me about 2-3 days to successfully write a program that simply outputs the version number and author of the program in the command line.

I should say that this wasn't me trying to make this work 24/3. I'm learning Rust in my spare-time so I could really only play around with things for 1-2 hours every day. Still, that's a lot, considering that I could do the same within a few minutes in NodeJS.

It took me a while to realise and learn that Rust has a bunch of different type representations for strings. There's `String`, `str` and depending on what API you're dealing with, you might need a `&String` or `&str` respectively (mostly the latter, but let's not get lost in details), which is a reference to a `str`.

There are a lot of [resources](https://stackoverflow.com/questions/24158114/what-are-the-differences-between-rusts-string-and-str) and [articles](https://www.ameyalokare.com/rust/2017/10/12/rust-str-vs-String.html) out there that demystify the difference between those types and also their reasoning of existence so I won't talk about it here. But at the end of the day, it boils down to how Rust manages memory and stores data in collaboration with its **Ownership** system. The latter being a fundamental feature of the language that enables **memory-safety**.

Getting a good understanding of Ownership in Rust is crucial, so I've blogged about it over at [thoughtram](https://thoughtram.io) in [A closer look at Ownership in Rust](https://blog.thoughtram.io/ownership-in-rust/). You might want to give it a read.

## Error handling done right

The next thing I ran into was the different ways of handling errors in Rust and more importantly, the "correct" way of implementing your own. There are a few things to consider here. Rust uses the `Result<T, E>` type to represent "possibility of error". A `Result<T, E>` either resolves into a value or into an error. In a way it's simimlar to `Promises` in languages like JavaScript, which either **resolve with a value** or **reject with an error**. They have to be "unwrapped" to access what is being emitted.

One thing that is fundamentally different though, is that the compiler requires you to handle both outcomes. If you're dealing with a `Result<T, E>`, it's either unwrapping with a type `Ok(T)`, or with an `Err(E)`. The unwrapping is done using one of my favourite language features in Rust: Pattern Matching.

If you have experience with the Haskell programming langauge, pattern matching should be familiar to you. Pattern matching allows us to match certain expressions with patterns and if a pattern matches, its code block will be executed. Here's an example of pattern matching a `Result<T, E>`:

```rust
match some_expression_that_returns_result {
  Ok(value) => println!("The value is: {}", value),
  Err(err) => eprintln("Aborted due to error: {}", err)
}
```

Another way to "handle' errors is to just assume there won't be an error at all, in which case we can simply call `.unwrap()` on the `Result` type. This however is rather discouraged because if an error does occur, the program will panic and fall apart.

Errors can be nicely composed and propagated as well if that's what we need. This however, isn't necessarily an easy thing to do if you're new to this. Creating custom error types is also something that kept me busy for quite a while. Since I've developed Vibranium as a library, not just as a CLI program, I needed to make sure that the CLI program could respond to library specific errors. To make custom errors work, we quickly enter the world of [Traits in Rust](https://doc.rust-lang.org/rust-by-example/trait.html), which, in a way, are similar to interfaces in other languages, but they are way more powerful.

There's a lot to learn just about that. I highly recommend you to check out [this article](https://blog.burntsushi.net/rust-error-handling/) to get a deep dive into error handling in Rust.

## And there's so much more

There are many many more things I had to wrap my head around, such as [Structs](https://doc.rust-lang.org/rust-by-example/custom_types/structs.html) and [Lifetimes](https://doc.rust-lang.org/1.9.0/book/lifetimes.html), or [Generics](https://doc.rust-lang.org/1.9.0/book/generics.html) and [Deref Coercions](https://doc.rust-lang.org/1.9.0/book/deref-coercions.html).

One thing however that really stood out to me is the **very inclusive and active Rust community**. There are various channels for beginners and advanced Rust users where no question is a dumb question. I personally got a lot of support and help there to make certain things work in Vibranium.

If you want to learn a new language and need a nice challenge, I think Rust is a good place to get started.

## Tour of Rust workshop

In order to learn even more about Rust and dive deeper into the language I'm working on a few online courses with my friends over at [Egghead](https://egghead.io). One of the best ways to learn something new is to teach it to someone else. Creating online courses is a great way of doing that. To ensure high quality and good topic coverage, we're running an [online workshop](https://ti.to/egghead-live-online-events/a-tour-of-rust-with-pascal-precht-2020-01-23/discount/early) called "Tour of Rust" on the 23 Janurary 2020.

The workshop is a nice little introduction to the language and aims to give you just enough information and hands-on experience, so that you can start writing your own Rust programs. The ticket price is \$199 but guess what, by reading this article, you're getting \$100 off!

Thanks for reading about the start of my Rust journey. I'm write more in-depth articles over at [blog.thoughtram.io](https://blog.thoughtram.io) so make sure to keep an eye on it!
