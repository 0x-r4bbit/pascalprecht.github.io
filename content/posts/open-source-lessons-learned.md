+++
date = 2018-09-21T12:52:19+02:00
title = "Improving your open source experience"
slug = ""
tags = []
categories = ['oss']
+++

After working on several open source projects and contributing to even more in the past, I thought it's time to share some thoughts on what worked very well for me as a maintainer of my own, as well as contributor to other projects.

Creating a healthy and inclusive environment for everyone in the world of open source can be hard and often requires a long breath and patience. The approaches and tips I'm sharing here may or may not work for you, however I do believe that most of the time it pays out and will have a positive impact for everyone involved.

So if you wonder how to increase chances that your first pull request to your favorite repository on GitHub gets merged, or how to get more contributors involved and keeping them engaged for your own projects, read on! 👌

## As (first-time) contributors

Whether you're contributing for the very first time in your life, the first time to a particular project, or you're a veteran in getting your changes into other people's codebases. There are some simple approaches and tricks that not only make you more familiar with the codebase you're interested in contributing to, but can also increase your authority and trust from peer developers as you go along and interact with everyone involved:

- **Find trivial issues** - Luckily, it has already become kind of a good practice and trend to have issues labelled as "First timer" in repositories on GitHub. Those are probably the first you want to take a look at when contributing to a project for the first time. Even if no such label exists, take the time and browse through existing issues. See if you can find anything you think you could fix or implement.

	It's okay to not introduce a new major feature with your first contribution. Documentation, small bug and typo fixes are good too! Here my [first pull request for the IPFS project](https://github.com/ipfs/js-ipfs/pull/1415), just to give you an idea. If you can't find an issue that you feel comfortable with, try to reach out to the maintainers of the project and ask them if they can point you to a place were you can start looking into things.

- **Propose early** - Once you've found something you can work on, take your first stab on it. It doesn't have to be perfect with the first try. In fact, I believe you'll be much better off by getting a first rough draft of your changes done and propose them with a pull request as soon as you can for early feedback. That way you can signal early on that you're working on this issue. As a matter of fact you might have already implemented it, which is great!

- **Elaborate where needed** - It can be quite hard to follow what the intentions were when somebody wrote a particular code. Of course, when working with platforms like GitHub, this may be a bit easier, as there's usually an issue that you can refer to in your pull request, however, there's often some implementation detail that needs clarification. Sometimes, you may even find yourself in a situation where you're not entirely sure whether you should implement your thing one way or the other, as both come with advantages and disadvantages (as everything in life).

	Do yourself a favor and just go with one way for now. Attach comments to your pull request, clarify and elaborate why you made certain decisions and show that you considered other solutions as well and that you're happy to change your proposal accordingly if needed.

- **Iterate** - You've come already very far. You proposed changes, you made comments and elaborated on things that might need consideration and ideally, the maintainers reviewed your pull request and asked you to adjust a few things here and there. This is where you can shine. Show that you're responsive, go through the change requests and update your pull request. Keep doing this until everyone is happy. I personally prefer to either just committing work-in-progress commits on top of the PR, for better transparency, or, if the PR is rather small, I rebase the commits right away. Either way, before the PR gets merged, it's good to get the commits in your PR in shape, so that they have proper semantic meaning. This however, also depends on the project and how maintainers prefer their commit histories. Some don't even care so much. Always good to show that you care though.

- **Be explicit** - Last but not least for scenarios where you create your own issues, either with questions, bug reports or feature requests, make sure to take the time and be as explicit as you can. If you're posting a question, make sure to give enough context so that even other users in the space will understand where you're coming from and what your question is about. They may be able to help as well. If it's a bug report, explain the exact steps that cause the thing you think is a bug, ideally attach a minimal reproducible demo so maintainers have an easier time following what's going on. It also shows that you don't just dump a bug there, but actually put time and effort into making very clear why you think something is broken and how it can be reproduced. If it's a feature request, always keep in mind that chances are high you're not the only one using the project. Make sure the use case for your feature is generic enough so that it makes sense for others as well. Ideally propose what the new API could look like and how it can be used. Features that only cover your particular use case and don't make sense to anybody else have a very low chance to be accepted.

Alright, this should help you getting your changes into your favorite projects. Of course, every project is different and also maintainers may expect different things from their contributors, so always make sure to constantly check on what's the desired outcome when you work on things.

This also brings us to the next section of this post. Doing open source from the perspective of maintainers.

## As maintainers

There's a lot we can do as maintainers to keep our project's users engaged and contributors happy. Everything described here should work for newly started open source projects, as well as high activity projects with an already existing community.

- **Make it as easy as possible** - This sounds like an obvious thing but is probably one of the harder tasks when it comes to getting open source right. If your goal is to get more people involved, that use your code or even contribute to it, the best way to get there is to make it as easy as possible. This means that you provide all the information that is needed to get the task done. In other words, make sure you have a well written documentation that shows how your tool can be used, what the different options are and which use cases users may look for. My first successful open source project was [angular-translate](https://angular-translate.github.io/) and putting most of my time into documentation (even different languages!) had the biggest impact when it comes to user adoption.

- **Be responsive** - Probably one of the most important things when it comes to making an open source project successful. Be responsive and show your contributors that you're there to help. Nothing is more discouraging than pull requests or issues with questions that don't get a single response in weeks or even months. I know it's super hard to stay on top of things, especially when a project is successful.

	If you feel you don't have an answer to a question or it may even be rather misplaced on platforms like GitHub, tell your contributors where to post their questions best and refer to chat rooms and StackOverflow. In fact, delegating questions to community chat rooms is a great way to keep your community involved and have them help each other without yourself being the only source for answers. You can also use GitHub's [issue and pull request templates](https://blog.github.com/2016-02-17-issue-and-pull-request-templates/<Paste>) to get those things right out of the way.

- **Provide help as much as you can** - It can be very very hard to find your way through a code base you haven't created yourself. Coding styles can vary a lot and sometimes it's even hard to find the right spot where things need change. Depending on the project it can also be simply very overwhelming when there are many components and parts involved. Your contributors feel exactly like that when they start helping out. It will take them time to get used to everything and chances are high they might not be aware of certain APIs that might've better been reused instead of introducing that new function in their first pull request.

	As a maintainer it's your job to make this experience as pleasant as possible. Point contributors to the right spots where they have to start digging, raise awareness of APIs that are probably involved and give them a rough idea of what needs to be done. If you want your contributors to stay or even come back, make them feel welcome and show that you're happy they offer a helping hand, all the time! To give you and idea, [here's a comment](https://github.com/embark-framework/embark/issues/816#issuecomment-423136233) where I tried elaborating on what the original issue was all about. It doesn't have to be that detailed all the time, but offering support on this level will show your contributors that you're in this together.

- **Be patient** - This goes hand in hand with the previous point. Open source can be very frustrating, especially when you get the feeling that your peers don't put the needed effort into the task at hand and give you the feeling you're the one that has to fix and do things eventually. It's okay, I've been there too. However, it will never improve the situation to react impatiently on platforms like GitHub, especially because it's often hard to get the right emotions across in written communication. Give your users and contributors time to digest, keep offering a helping hand even if you have to repeat yourself. It will pay out in the long run. Trust me.

## Stay positive

No matter whether you're a maintainer or contributor, if there's one thing I want you to take away from this post, it's that it's key to stay positive throughout the journey. When you contribute, be nice. Be open minded. Adjust yourself to fit the rest of the project you're contributing to and people will greatly accept you.

When you maintain, the same thing applies. Be nice to your contributors. Make them feel good about the work they're doing for you. When giving feedback, always make it as constructive as you can. This is especially useful when reviewing pull requests, but also when collaborating on issues.

Here's a rule I follow that works very well for me:

> For every change request, propose at least one alternative

This means, that we shouldn't just say what we don't like and why, but also tell our peers what a good alternative would be and how it can improve the situation. In practice, this often drives very nice discussions without anyone feeling hurt to rejected. 🙃

Alright, that's all I've got. Let me know how it goes for you!
