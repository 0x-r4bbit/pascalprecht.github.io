---
layout: post
title: Sharing styles across Web Components with Polymer and core-style
---

When starting developing your first own web components, it doesn't take long until you realise, that a lot of things have to be handled kind of differently in the world of these new technologies. A web components HTML, CSS and JavaScript can be literally packaged and imported into other applications via HTML Imports.

This is great for all of us developers, because we can just grab a component from somewhere and put it on our own website or web app and everything works out of the box without doing any additional work (assuming the components author did a great job and the component is built with [first](http://addyosmani.com/first/) in mind).

However, as I said, things get different. One of the bigger challenges that come with Web Components, is the way how we share common stylesheets across multiple components. Usually, when you build an app and you have styles that are shared along several parts of your code, all you have to do is to is to embed your collected shared styles in your application once,  because that's it, right? So you probably have a build process that first pre-processes your stylesheets, concatenates them to one file and if you're good, that file gets minified. Great. But does that work for Web Components too?

## So what's the challenge?

As I mentioned earlier, web components can be literally packaged with their needed HTML, CSS and JavaScript. That's a huge step forward. But thinking about that more deeply, we actually face our first challenges.

A web component comes with its own CSS. And to make it work out of the box without any further customization, its CSS has to contain everything that's needed. That means, a web component also has to come with possible shared styles right? So what if there are two (or more) components that are technically independent, but depend on a same set of styles? Are we in code duplication land again then?

Although it's possible to just copy shared styles across components, it's nothing what we as developers want, nor what users want when they try to load our application on their smartphone in the middle of nowhere.

## The solution (sort of)

Fortunately, when building your web components with Polymer, there is an experimental (hence "sort of") solution for that. [&lt;core-style&gt;](http://www.polymer-project.org/docs/elements/core-elements.html#core-style) is one of Polymer's core elements that gives us the possibility to manage styling inside other elements and can be used to make themes. Due to its nature and API we can use it to share stylesheets across multiple web components, without duplicating code. So let's take a look how it actually works.

Reading the [documentation](http://www.polymer-project.org/docs/elements/core-elements.html#core-style), `<core-style>` can be either a **producer or consumer** of styling. To understand what that actually means, we start with a simple use case. Let's say we have a `<my-button>` web component that looks like this:

```html
<polymer-element name="my-button">
  <template>
    <style>
      button {
        display: inline-block;
        background: #bada55;
        border: 1px solid #6ba4b8;
        border-radius: 0.3em;
        font-size: 1.4em;
        cursor: pointer;
      }
    </style>
    <button><content></content></button>
  </template>
  <script>
    Polymer('my-button');
  </script>
</polymer-element>
```

Once created, we can import and use it like so:

```html
<link rel="import" href="path/to/my-button.html">

<my-button>Button</my-button>
```

The result should look like this:

<img src="/public/my-button.png">

Wow. Beautiful.

Okay, let's create another element. This time it's `<my-other-button>`:

```html
<polymer-element name="my-other-button">
  <template>
    <style>
      button {
        display: inline-block;
        background: #bada55;
        border: 1px solid #6ba4b8;
        border-radius: 0.3em;
        font-size: 1.4em;
        cursor: pointer;
        color: red;
      }
    </style>
    <button><content></content></button>
  </template>
  <script>
    Polymer('my-other-button');
  </script>
</polymer-element>
```

Using that element should look like this:

<img src="/public/my-other-button.png">

You've probably noticed that these two web components have the exact same styles except that `<my-other-button>` comes with a fresh (and totally unannoying) red font color. Now we have the scenario we were talking about a few minutes ago. There are two independent components that both actually use a same set of styles and for now, these styles are duplicated to make them available in both components. Let's fix that with `<core-style>`.

### Creating a style producer

As mentioned earlier, `<core-style>` can be either used as producer or consumer of styles. Where as a styles producer provides you with predefined styles that can be reused across your app, a consumer makes actually use of these styles.

Since our two components have a set of shared styles, we need both: a producer that provides us exactly these common styles and two consumers, one for each component, that make sure that the provided styles are applied on the dedicated component.

Let's extract the shared styles for a moment so we get a better feeling what styles should land in the producer:

```css
button {
  display: inline-block;
  background: #bada55;
  border: 1px solid #6ba4b8;
  border-radius: 0.3em;
  font-size: 1.4em;
  cursor: pointer;
}
```

Okay great. You can see that all styles except the `color: red;` style are shared between our two components. To put these styles into a `<core-style>` producer, we first have to import that element:

```html
<link rel="import" href="path/to/core-style.html">
```

Next we create a `<core-style>` producer with our styles like this:

```html
<core-style id="button">
  button {
    display: inline-block;
    background: #bada55;
    border: 1px solid #6ba4b8;
    border-radius: 0.3em;
    font-size: 1.4em;
    cursor: pointer;
  }
</core-style>
```

Believe it or not, that's it. We just created a style producer for our two components. As you can see, all you need to do ist to wrap your shared styles in a `<core-style>` element. Giving this element an id (in our case `button`) makes that element a producer. We'll learn how that differs from a styles consumer in a minute. For now, just keep in mind that by giving your `<core-style>` element an id, makes it a producer and it's referencable by other `<core-style>` consumers.

Make sure that the value of `id` is unique. I called it `button` because this styles producer provides us shared styles for our button components. I know `button` is not a good fit here, since it's likely to be used somewhere else, but you get the idea.

### Consuming styles with style consumers

Once `<core-style>` producers defined somewhere in your app (either inlined or imported), we can use `<core-style>` consumers to reuse them in our components. To consume styles, all we have to do is to use the `<core-style>` element in our component and give it a `ref` attribute to define the producer from which we want to get the styles.

Since our `<my-button>` component needs all styles defined in our producer with the id `button`, we give our consumer the corresponding reference:

```html
<polymer-element name="my-button">
  <template>
    <core-style ref="button"></core-style>
    <button><content></content></button>
  </template>
  <script>
    Polymer('my-button');
  </script>
</polymer-element>
```

As you can see, there's no `<style>` element anymore. All needed styles are defined in our style producer so we can just reference them with `<core-style>`. Try it out, our fancy button should still look the same!

Let's do the same for our `<my-other-button>` element and use a style consumer to get the needed styles. Since that component has one additional style that is not part of our style producer, we keep the `<style>` element with that one rule:

```html
<polymer-element name="my-other-button">
  <template>
    <core-style ref="button"></core-style>
    <style>
      button {
        color: red;
      }
    </style>
    <button><content></content></button>
  </template>
  <script>
    Polymer('my-other-button');
  </script>
</polymer-element>
```

Try it out and you'll see that `<my-other-button>` has all styles that are defined in `button` styles producer and the one additional rule defined in the component. You can consume styles as often as needed. If you have another element that needs the shared styles too, just use a `<core-style>` consumer and give it a reference to the corresponding producer.

Don't forget that in the end, `<core-style>` is also just a web component and therefore just HTML. It can be used in a single HTML Import to make it available across mutiple other web components.

## What else?

`<core-style>` comes with a few more features than just that. It supports bindings to have dynamic stylings. These are also accessible via JavaScript. **You can even nest multiple `<core-style>` definitions** if needed. You can find out more about it [here](http://www.polymer-project.org/docs/elements/core-elements.html#core-style).
