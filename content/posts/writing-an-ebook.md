---
title: "How I've written and published an ebook in just two months"
date: "2020-02-21"
template: "post"
draft: false
category: "Career"
slug: "/posts/writing-an-ebook"
description: "I've authored and published an ebook in just two months. In this article I describe how I did it."
---

About two months ago, [I've announced](/posts/i-am-writing-a-book) that I'm planning to author and publish an ebook within just two months. Well, I guess it worked out.

[REBASE - The complete guide on rebasing in Git](https://rebase-book.com) is officially released as of 31 January 2020 and sales have been going great ever since! In fact, at the time of writing this post, **REBASE has generated over $5000 in gross revenue** and counting. I'd like to share the process of how I managed to produce the book in this short time next to my full-time job, as well as pointing out some of the key learnings that I took away from this experience. I will also talk about some actual numbers to give readers an idea how the project has grown over time.

I hope this is useful for one or the other potential author out there!

- [A little bit of background](#a-little-bit-of-background)
- [Reevaluating the idea and getting feedback](#reevaluating-the-idea-and-getting-feedback)
- [Announcing the Pre-sale launch](#announcing-the-pre-sale-launch)
- [Figuring out the writing process](#figuring-out-the-writing-process)
- [Getting a domain and reaching the first milestone](#getting-a-domain-and-reaching-the-first-milestone)
- [Launching a first landing page](#launching-a-first-landing-page)
- [Creating a book cover](#creating-a-book-cover)
- [Setting up an email workflow](#setting-up-an-email-workflow)
- [Constant progress. Every day a little bit.](#constant-progress-every-day-a-little-bit)
- [Making the first $1000 🎉](#making-the-first-1000-)
- [Generating traffic through regular updates](#generating-traffic-through-regular-updates)
- [More Sales, Milestones and a 10% Conversion Rate](#more-sales-milestones-and-a-10-conversion-rate)
- [Publishing REBASE](#publishing-rebase)
- [Taking it further](#taking-it-further)

## A little bit of background

For those who are curious how REBASE became a thing, it was actually an idea a friend of mine and I had when we were actively giving [on-site classes about mastering Git](https://thoughtram.io/git-master-class.html). The primary goal was to create a side product that would complement our Git Master Class. A nice guide that we could hand out to our students once they've finished the class, as well as selling it to generate some passive revenue.

However, shortly after we kicked off this whole [thoughtram](https://thoughtram.io) thing, we've also started offering [on-site classes about Angular](https://thoughtram.io/angular-master-class.html), which then kept us busy pretty much full-time as we got hundreds of training requests. The result of that was that we managed to write maybe one and a half chapters and didn't get to continue working on the book anymore.

Fast-forward, about five years later, I decided to bring REBASE back to life in a different style, different tone and different experience. I also really just felt like creating a "product" from scratch and getting a bit creative with the design, its website and everything else that comes with it.

And so it starts...

## Reevaluating the idea and getting feedback

Whenever it comes building or creating something new, whether it is a product, a software project, or even a company, I really believe in making small steps and taking things one step at a time. So instead of going all-in, buying a new domain, hiring a designer to create a website and setting up paid ads and marketing, I first wanted to make sure if there's actual interest in a book like REBASE.

Luckily, these days it's extremely easy to gather feedback on various social platforms from friends and followers, especially with functionalities like built-in polls on Twitter. Due to my follower base on Twitter (13k+ at the time of writing this article), I tend to reach at least **some** people when it comes to putting out a poll. Certainly, the number of responses is in no way representative of the entire potential target audience, but it's still better than nothing.

So I decided to create a poll in which I'd ask how much people would be willing to spend on a book like REBASE:

https://twitter.com/PascalPrecht/status/1200389992184463361

What's interesting to note is that, while the majority of voters voted for the smallest amount of money out of all the available options, there were some replies to this tweet in which people said they'd pay more than the biggest amount available in those options.

Overall I was quite happy with the outcome of the poll and decided to give this project a go.

## Announcing the Pre-sale Launch

Yes, that's right. Time for the first launch. After I've decided I'll give REBASE a spin, I also wanted to make sure that I get things going as quickly as possible. It was important for me that I don't spend months and months, or even years, on writing the book and never release a first version.

That's why I decided to set a rather aggressive deadline and make it public so I have a certain amount of pressure to actually deliver the thing. The goal was to release a first version of the book within two months. It doesn't have to be perfect, but it should be "complete" in the sense that the main content of the book is covered and readable.

As I've mentioned earlier, I believe in starting small and improve iteratively, so I went ahead and created a [product page on Gumroad](https://gumroad.com/l/rebase-book) that can already be used to sell the product, even though it doesn't exist yet. I also didn't have any media graphics or illustrations yet, so I've scribbled something that could one day be the REBASE title page:

<img alt="REBASE logo draft" src="/media/rebase-logo-draft.jpg" style="max-width: 600px">

With a total "MVP" in place (to be fair, not really an MVP because there was no product yet), I've announced the pre-sale of the book on Twitter and was hoping that maybe a handful of people would preorder it. To increase the incentive, I decided to sell the book for 15,00 € excluding VAT during the pre-sale phase, as opposed to 20,00 € for the launch release.

https://twitter.com/PascalPrecht/status/1201439682623680512

Guess what, by the end of that very day, the 2 December 2019, I've already **sold 17 copies** of the book **without having written a single word**!

## Figuring out the writing process

Time to figure out this writing thing! There are certainly many different tools and apps to write books these days. For me it was important though, that I can start quickly and move quickly. I don't want to spend too much time clicking around, importing and exporting files, aligning graphics etc. Ideally, I would find a way to write the book in plain old markdown and then have some tools or script to generate proper ebook reader friendly format from that.

And that's exactly what I ended up doing. I decided to go with [pandoc](https://pandoc.org/index.html), a universal document converter. It's extremely flexible and comes with a markdown-to-epub converter built-in! Epub is the format used by Apple iBooks. I still needed a way to generate Mobi files, which is the format used by Amazon Kindle. Luckily, there's another tool called [kindlegen](https://www.amazon.com/gp/feature.html?docId=1000765211) from Amazon which takes an ePub file as input and generates a Mobi file from that!

Having those tools and hand, all I had to do was creating a little script that automates the process of generating the ebook reader files. I kept fine-tuning the script a little bit here and there over time, but this is what it looks like in a nutshell:

```
rm -rf output/*

pandoc \
  --pdf-engine=xelatex \
  -o output/rebase.pdf \
  source/chapters/foreword.md \
  source/chapters/introduction.md \
  source/chapters/a-quick-look-behind-the-scenes.md \
  source/chapters/anatomy-of-a-git-commit.md \
  source/chapters/a-branch-is-just-a-pointer.md \
  source/chapters/merge-strategies.md \
  source/chapters/a-quick-detour-on-reset.md \
  source/chapters/rebasing.md \
  source/chapters/interactive-rebasing.md \
  source/chapters/cherry-picking.md \
  source/chapters/appendix-a.md \
  source/chapters/appendix-b.md \
  source/chapters/appendix-c.md \
  source/chapters/thank-you.md \
  --toc

pandoc \
  -o output/rebase.epub \
  source/meta \
  source/chapters/foreword.md \
  source/chapters/introduction.md \
  source/chapters/a-quick-look-behind-the-scenes.md \
  source/chapters/anatomy-of-a-git-commit.md \
  source/chapters/a-branch-is-just-a-pointer.md \
  source/chapters/merge-strategies.md \
  source/chapters/a-quick-detour-on-reset.md \
  source/chapters/rebasing.md \
  source/chapters/interactive-rebasing.md \
  source/chapters/cherry-picking.md \
  source/chapters/appendix-a.md \
  source/chapters/appendix-b.md \
  source/chapters/appendix-c.md \
  source/chapters/thank-you.md \
  --toc

kindlegen output/rebase.epub -o rebase.mobi
```

Testing the REBASE was then just a matter of running the script and drag and dropping the files into their dedicated programs, such as Amazon Kindle and Apple iBooks. For mobile testing I used Amazon's "Send to Kindle" feature. It's pretty cool because it lets you easily send any book to your Kindle device via your Kindle email address.

Having this super minimal writing workflow figured out, I was ready to put the pen on paper!

## Getting a domain and reaching the first milestone

I decided to create an [IndieHackers page for REBASE](https://www.indiehackers.com/product/rebase-book) to have a place to keep track of weekly milestones. I know, milestones probably shouldn't be measured on a timely basis, but since the deadline for a first release was just two months away, I thought it'd be okay to keep everyone about the progress in the loop via milestones.

Exactly one week after the pre-sale has started, [I've sold 30 copies](https://www.indiehackers.com/product/rebase-book/30-sold-copies--Lvr5R-MkTJ4VQ1hGaU7) and generated a gross revenue of about $500.

<img alt="First Gumroad Stats showing 30 sold copies of REBASE" src="/media/gumroad-stats-1.png" style="max-width: 600px">

Now was a time where I felt comfortable reinvesting into the project and actually spend a bit of money to take it to the next level. I bought [rebase-book.com](https://rebase-book.com) that same day and looked into landing page templates that I could use to quickly set up a proper website.

Unfortunately, I quickly found out that, while a lot of templates are rather cheap, commercial licenses can easily go up to over $500. Given that I used to do a lot of front-end development and therefore know how websites are made, I sat down and built a simple landing page from scratch instead, with the goal to launch it the next day.

## Launching a first landing page

I certainly wanted to have a nice and crisp looking landing page, but I also knew that I coudldn't spend too much time and energy on being a perfectionist and coming up with an outstanding design and layout. In addition, I also didn't feel like putting too much effort into static site generators or any of the various "starter kits" to build a simple one-pager landing page.

Luckily, I found this cool open source repository called [one-page](https://github.com/nqthqn/one-page), which is literally just a single HTML file template but comes with a modern CSS pipeline to make use of preprocessors such as SASS. Exactly what I needed!

After a few hours of fiddling around with some HTML, CSS and setting up the domain correctly, I was happy to create [another milestone](https://www.indiehackers.com/product/rebase-book/official-landing-page-launch--Lvr6lGNk9azgxkYUw-9) and launch a first version of the landing page. The page has changed a lot since the first release, but because I've put everything under version control, I can easily pull up a screenshot of it:

<img alt="Screenshot of version REBASE landing page" src="/media/landing-page-v1.png" style="max-width: 600px">

Okay, a few things to note here:

- Yes, there's a book cover! I'll touch on that in just a moment.
- The "Preorder now!" button is an embedded widget from [Gumroad](https://gumroad.com). It's awesome because it takes care of the entire checkout flow, without interferring with the rest of your website.
- There were certainly plenty typos in the copy, however, I guess the over all message and structure is clear. It was important for me to be as transparent about the book's content as possible, without giving too much away. As a matter of fact, I wasn't even entirely sure what the exact chapters are going to be because I've just written the first chapter.
- The launch of **the landing page caused another 5 sales** that day, increasing the total amount of sold copies to 35.

I also took the chance to create [a post](https://www.indiehackers.com/post/im-writing-a-book-about-git-in-two-months-30dda144d0) in one of the IndieHackers forums to ask for feebdack from the community. It turns out the indie hacker community is extremely helpful. Just read all the comments and how much value they add!

## Creating a book cover

This actually went hand in hand with the landing page launch. There was no way I could launch and announce a landing page without having at least a title cover for people to look at. So once again, I put on my "start-less-and-do-more"-hat and created a book cover in [Google Drawings](https://docs.google.com/drawings) based on a scribble I've created at the time when I was sketching out the title as well.

This is what the scribble looks like:

<img alt="First scribble of REBASE cover illustration" src="/media/rebase-graph-draft.jpg" style="max-width: 600px">

And the final book cover:

<img alt="REBASE book cover" src="/media/rebase-cover.png" style="max-width: 600px">

One thing I haven't mentioned, was that I wanted to create custom illustrations for the book. Eventually, I ended up drawing all illustrations for the book in Google Drawings myself. No designer or illustrator involved. Which means, zero additional costs!

## Setting up an email workflow

Okay, so this may sound a little bit rude, but I think as a solo hacker or entepreneur it's always good to aim for optimizing yourself out of the product as much as you can. What I mean by that, is simply that things that can be automated, should be automated. This is especially true for email workflows, which should help improving the product you're working on by getting user feedback and engagement.

For example, every time someone buys a copy of REBASE, I would like to do a few things:

- Expressing my gratitude for supporting my work (sounds cheesy I know, but I really mean it).
- Asking how they learned about REBASE. This is super important because I want to get an idea which channels work well to get the word out about the book.
- Letting them know that they can follow regular updates on the Indie Hackers page.
- Potentially have **them** share the fact that they bought the book, so their circle will learn about it.

I really believe in reaching out to customer personally, also as a way to express that I care, however, once you have to do these things above for 50+ people, it actually takes quite a lot of time, even when the email is already prepared as a template.

That's why for this task, I set up an email workflow with Gumroad. It lets me configure multiple emails that will be send out to my customers after certain events have happened and a certain time has expired. For example, one hour after a purchase, I send an email with the content discussed above. About one week later however, I reach out to the reader again to ask whether they've finished the book and what they found most valuable. I also ask them what's the one thing they are missing the most.

Setting up this email workflow turned out to be super valuable as I'm getting high-quality feedback from my readers and it helps me a lot to improve the product.

## Constant progress. Every day a little bit.

Writing an entire book in just two months is certainly an ambitious goal, however as I've mentioned earlier, I was not aiming for a perfect masterpiece. Also, knowing about the things you want to write about helps a lot as well. I didn't need to do too much research.

Here's what I thought: I have about 8 weeks. Let me try to write one chapter every week. That would be 8 chapters and should be plenty for the book (spoiler: I ended up squeezing in a 9th chapter later on). To make sure I stay on track, **I made it a habit to write 1-2 hours every day** in the evening after work. Well, to be fair, more often than not is was more like every second evening, because I still went to my BJJ classes 3-4 times a week.

Anyways, the point is that doing a little bit roughly every day really helped me having a clear understanding of whether I'm behind or on time, while making constant progress. This was probably one of the most crucial actions I've taken in this whole project.

Of course, I also didn't stop improving the landing page to make it more attractive to potential readers of the book. **Here are a few things I've learned**:

- **High-contrast CTAs** - Call-To-Action buttons should have a high contrast so they are easily spotted.
- **Supportive CTA information** - It can have a very positive effect to add some supportive information close to the CTA. This can be messages like "_You won't be charged until the release_", or "_Only three items left!_".
- **Trigger emotions** - Your landing page's copy can have a massive impact when it's written in a way that it speaks to the reader. This is often done by address certain pain points that the reader identifies with.
- **Visible price and discount** - If you put a price close to the CTA and it will be clicked, you know the user is most likely willing to pay that amount for your product. I played around with [putting the discount in the button](https://www.indiehackers.com/post/discount-in-buy-button-d390349e71) as well.

A few more iterations later, the landing page has converted [50 sold copies](https://www.indiehackers.com/product/rebase-book/50-sold-copies--Lwcbbo9DQKu0KsaWF4e). Once again, the Indie Hackers community has given a lot of very valuable feedback.

Probably the most impactful change on the page is the **"This book is for you if..."** section. I've received a lot of feedback that this very section caused a lot of users to hit the buy button.

Again, triggering emotions is a very powerful tool!

<img alt="Screenshot showing the section of the website" src="/media/book-is-for-u.png" style="max-width: 600px">

Every time I did a significant change to the landing page, I posted an update at Indie Hackers and on Twitter. Even though I didn't have too many visitors, the conversion rate was pretty decent from the get got, so it wouldn't take too long until I'd reach my first major milestone.

## Making the first $1000 🎉

About four weeks into the project, pretty much exactly during christmas, I was happy to see that [I've sold 62 copies and hit the $1000 mark in gross revenue](https://www.indiehackers.com/product/rebase-book/1000-gross-revenue--Lx12v6dyAzyPkSDjP3q). That was for sure an amazing christmas gift!

<img alt="First Gumroad Stats showing 62 sold copies of REBASE" src="/media/gumroad-stats-2.png" style="max-width: 600px">

At this point I had written about half the book. I also had a better idea of what the exact outline is going to be, so I've added a chapter breakdown it to the landing page. Overall, [rebase-book.com](https://rebase-book.com) was performing really well. Its overall **conversion rate was 5.1%** according to Gumroad.

## Generating traffic through regular updates

Once I've reached the $1000 milestone, I saw more and more activity and engagement in the Indie Hackers community. There was one question that kept coming up. A lot of people were interested in how I'm marketing REBASE, what's my main traffic channel, whether I'm using paid ads, how big my mailing list was (spoiler: I don't even have one for REBASE) etc.

I've responded to all questions in [various comments](https://www.indiehackers.com/product/rebase-book/200-sold-copies--M-4Keh0hRvgsbIGFXrA?commentId=-M-9KtZj3naeLQFs25-d&utm_campaign=forum-notification&utm_medium=email&utm_source=indie-hackers-emails), but here's what it boils down to:

- Clearly, the biggest impact in terms of marketing is my [Twitter channel](https://twitter.com/pascalprecht) with over 13k followers (at the time of writing this article). This has been confirmed by many reponses I've got from the [email workflow](#setting-up-an-email-workflow). Most of my followers know me from my past activities in the JavaScript community, conference talks, blog posts and onsite workshops and therefore know what kind of teaching style they can expect. This has lead to many sales. **I guess it's important to have or build an audience first**.
- You want to get the word out there without coming across too spammy. So instead of just retweeting the fact that I'm working on a book, I mostly tweeted about it together with some progress update. Whether it's a new finished chapter, or an update to the landing page with more useful information. Have something new to share, otherwise you'll get muted.
- The weekly milestones on IndieHackers have helped a lot too. Once a milestone has 2-3 upvotes, it actually shows up on Indie Hacker's frontpage, exposing your product to many people. Having a lot of people commenting and discussing about your work increases the votes as well and causes more people to run into your product.
- I didn't do any paid ads. The only "ad" that I've set up was a banner in the blog post view of [my company's blog](https://blog.thoughtram.io). The blog has 100k page views per month on average and I could see a good amount of that ending up on [rebase-book.com](https://rebase-book.com) because of that.

So all in all I guess it's save to say that regular, meaningful updates are key to generating a decent amount of traffic. Having that traffic convert, is then job of the landing page. As you know by now, that's something I kept fine-tuning day in and day out.

## More sales, milestones and a 10% Conversion Rate

The following weeks I've been monitoring a constant stream of sales, from [80](https://www.indiehackers.com/product/rebase-book/80-sold-copies--LxpNIDxfyQV8rg0mMuX), [90](https://www.indiehackers.com/product/rebase-book/90-sold-copies--Ly4bUsGa67bIPeDJKSY), to [100 sold copies](https://www.indiehackers.com/product/rebase-book/100-sold-copies--LyTBPmdEKOHTIOx7cwf). At this point I've made $1600+ in gross revenue and the book was about 80% done. Shortly after that, I even reached a [conversion rate of 10%](https://www.indiehackers.com/product/rebase-book/10-conversion-rate-in-the-past-30-days--LydBgMloXiuPSR2N06e)!

Things were getting interesting now as I was approaching the last two weeks until the first public release. I focussed on writing and finishing up the last few chapters. It didn't take too long until I've hit [the next $1000 in gross revenue](https://www.indiehackers.com/product/rebase-book/2000-gross-revenue--LzfRywbX7q8mG9LQVE-) with 130 sold copies right before end of January. I've also changed the launch price from 20 € to 25 €, which means I could increase the discount from 20% to 40%, which made it even more appealing to buy the book.

<img alt="First Gumroad Stats showing 130 sold copies of REBASE" src="/media/gumroad-stats-3.png" style="max-width: 600px">

## Publishing REBASE

On point, 31 January 2020, I've uploaded the first version of REBASE to Gumroad and sent it out to my readers. To make sure many people learn about the announcement, I've put out this tweet here:

https://twitter.com/PascalPrecht/status/1223177153837248512

In addition, I've shared the announcement on various platforms, such as facebook, Reddit, [Indie Hackers](https://www.indiehackers.com/product/rebase-book/published-rebase--Lzv2PocbZozWarjAq0A) and [Hacker News](https://news.ycombinator.com/item?id=22200222). To my surprise, **I even made it on the Show HN front page** on place #3, which caused a lot of traffic for many days:

<img alt="REBASE on Hacker News front page" src="/media/show-hn.png" style="max-width: 600px">

What's interesting is that I wasn't sure whether people will still be willing to actually buy the book after the discount didn't exist anymore. Then it turned out that more and more sales were coming in now that the book was finally available.

**By the end of 31 January 2020, I've sold 200 copies. Twice as much as I was aiming for.**

## Taking it further

I'm super happy this whole thing worked out. This doesn't mean however, that I'll stop here. REBASE continues to get updates. There are a few more things I want to add in terms of chapters. Also, I'm regularly going through my readers' feedback and fine-tune the content to address their needs. Updates will be send out through Gumroad every few weeks.

I'm also glad to see that there's still a constant stream of sales coming in, even almost a month after the launch. Just recently, I [hit the $5000 mark](https://www.indiehackers.com/product/rebase-book/made-5000-in-gross-revenue--M0MSqgWYthUW2yhUSyM) in gross revenue with **162 sales and a conversion rate of 12.9%**!

Here are some final stats as of today (20 February 2020):

<img alt="Gumroad dashboard" src="/media/gumroad-dashboard-final.png" style="max-width: 600px">
