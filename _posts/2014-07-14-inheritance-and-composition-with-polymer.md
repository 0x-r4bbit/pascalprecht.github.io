---
layout: post
title: Inheritance and composition with Polymer
---

You've probably heard of this new hot thing that will change the way we build web applications in the future, right? Exactly. I'm talking about [Web Components](http://webcomponents.org/). Web Components is a new technology that lets us build our own components for the web with the same tools the browser vendors use.

Actually, Web Components are a set of four different specifications. These are **HTML Imports**, **HTML Templates**, **Custom Elements** and **Shadow DOM**. I will not go into much detail here since that's not the scope of this article. If you want to learn more about Web Components in general, I recommend checking out the community project [webcomponents.org](http://webcomponents.org), which is full of useful resources and information about the technologies.

With evolving standards come evolving tools, libraries and frameworks. When it comes to web components, there are basically two frameworks that try to make your life easier: [X-Tag](http://www.x-tags.org/) by Mozilla and [Polymer](http://polymer-project.org), a Google project. **Both use the same polyfills under the hood** to make the four web component technologies work in all major browsers. However, whereas X-Tag API abstracts only the imperative way of building web components, goes Polymer a step further and also provides a declarative way.

For example, defining your own custom element with Polymer looks something like this:

```html
<polymer-element name="my-custom-element" noscript>
  <template>
    <!-- shadow dom -->
    <div>My custom element</div>
  </template>
</polymer-element>
```
To use the created element, all you have to do is to import it via HTML Imports:

```html
<!-- import custom element -->
<link rel="import" href="path/to/my-custom-element.html">

<my-custom-element></my-custom-element>
```

That's all you need to create your own element with Polymer. Taking a deeper look at what's happening here, we can actually see all four technologies in action. We create a custom element (the actual registration of it on the DOM happens behind the scenes in that case. Polymer takes care of it.), we use HTML Template to define our custom elements template, which gets later injected into its Shadow DOM. And finally, to actually use our element, we import it with HTML Imports.

There's much more to discover in the world of Polymer. To get a feeling of what else is possible, I recommend reading their docs [on their website](http://www.polymer-project.org/docs/polymer/polymer.html).

## Extending existing elements

One of the biggest things that come with web components, is the fact that you can extend existing elements. And since your own custom elements are also just HTML elements, you can extend them as well as native elements. From a surface point of view there's no differents between native elements and custom elements.

Let's take a look at how we can extend existing elements with Polymer. To extend an existing element, Polymer again comes with a nice declarative way via HTML. Simply use the `extends` attribute on your elements definition and apply the name of the element you want to extend as value.

Before we extend an element, let's quickly build an element that is actually more useful. Here's the definition of a `basic-button` element:

```html
<polymer-element name="basic-button" noscript>
  <template>
    <span><content></content></span>
  </template>
</polymer-element>
```

Another addition you see here is the use of the `<content>` element. With `<content>` elements you can define so called "Insertion Points". Insertion Points are the places in your Shadow DOM where the contents of your actual used element will land. For example using our `basic-button` like this:

```html
<basic-button>Hello</basic-button>
```

Will internally result with a Shadow DOM like this:

```html
<span>Hello</span>
```
If you're familiar with [AngularJS](http://angularjs.org), an insertion point is to Polymer what transclusion is to Angular, sort of. Insertion points actually go a step further but I will not go into much detail here.

Alright, now let's extend our `basic-button` element. We want to have a button element that always has an icon, so our new element will be called `icon-button`. We use the mentioned `extends` attribute to extend our existing `basic-button` element:

```html
<polymer-element name="icon-button" extends="basic-button">
  <template>
    <span>
      <i class="icon"></i><shadow></shadow>
    </span>
  </template>
  <script>
    Polymer('icon-button');
  </script>
</polymer-element>
```

There are a few new things in this snippet, so let's take a deeper look. First, there's this `<shadow>` element. `<shadow>` is very powerful because it lets extend the Shadow DOM of your element with the contents of the parent elements Shadow DOM. We also use the `Polymer` constructor here to explicitly register our custom element (we'll see in a minute why).

Using our extended element stays straight forward:

```html
<icon-button>Hello</icon-button>
```

Depending on your use case, you might want to use the `is=""` syntax to extend an existing element in your application code. Just keep in mind that `is=""` extensions are only for native elements. So instead of using your extended element as tag, you would rather do something like this:

```html
<button is="mega-button"></button>
```

Again, this depends on your use case.

If there's additional functionality you want to add, for example a `ready` callback handler, you can define it directly on the constructor call. To make sure that the parent element callback handler is called too, you can call `this.super()` which does exactly that:

```js
Polymer('icon-button', {
  ready: function () {
    // gets called once component is ready
    console.log('icon-button ready');

    // call parent `ready` handler
    this.super();
  }
});
```

You can also override existing methods and access data-bound properties. Curious how? Find out more [here](http://www.polymer-project.org/docs/polymer/polymer.html#extending-other-elements).

## Extending multiple elements

Now that we know how to extend an element with Polymer, you might wonder how we can extend multiple elements. For example let's say have a web component that extends existing elements in a way that it makes them draggable. We could use it by applying it to existing elements like this:

```html
<!-- draggable img -->
<img is="my-draggable">

<!-- draggable something -->
<div is="my-draggable"></div>
```

So how can we extend multiple elements? You think there has to be a way to say something like `extends="foo bar"` right? Unfortunately, the answer is **no**. Or to make it more clear:

**It's not possible to extend multiple elements**

You won't find anything in the official docs and you can also read about it in this [StackOverflow question](http://stackoverflow.com/questions/24157576/how-to-extend-multiple-elements-with-polymer). However, there are some ways to get *some* result when it comes to extending multiple elements.

## Composition over inheritance

Basically it's always better to prefer composition over inheritance at a first glance, to stay flexible. So instead of explicitly declare which element extends which other element to reuse functionality, it's better to define new elements that **make use** of existing elements.

We could take our `icon-button` element and break it down into three smaller elements using composition. For example we could have a `basic-icon` element, a `basic-button` element and a `icon-button` element, that does **not** explicitly extend `basic-button`, but uses it in it's Shadow DOM. Then we could also define a `icon-link` element, that uses `basic-icon` and another `basic-link` element (or whatever comes to your mind).

To get an idea how far you can actually break down things, just take a look at [Polymer Paper Elements](https://github.com/Polymer?query=paper). Another project you should keep an eye on is the [Basic Web Components](https://github.com/basic-web-components/) project. This project even defines its own [principles](https://github.com/basic-web-components/components-dev/wiki/Ten-Principles-for-Great-General-Purpose-Web-Components) that are heavily based on composability.

## Reuse functionality with mixins

However, even if we're able to compose new elements with existing elements, there are cases where we really just want to reuse existing functionality. Just think about the `my-draggable` example. Having the functionality of being draggable is not really about composing a new element out of existing elements. It's rather about sharing functionality across multiple elements.

Can we do that with Polymer? Yes we can. Polymer supports mixins. With mixins we're able to extends existing components with shared functionality without explicitly extending other elements. All we have to do is to isolate our shared functionality and mix it into our components constructor using `Platform.mixin()`. The `Platform` object is globally available when Polymer is loaded since it comes with Polymer by default.

For example let's say we have a mixin object that provides functionality that should be shared across multiple components:

```js
var sharedMixin = {
  // define shared functions and properties here
};
```

Plain old JavaScript. Now, if we want to reuse the provided functionality, all we have to do is to extend the constructor of our component using `Platform.mixin()` like so:

```js
Polymer('my-component', Platform.mixin({
  // component logic
}, sharedMixin));
```

## Sharing mixins across multiple imports

With the power of Web Components it's super easy to make shared mixins available across multiple imports. Even if the term "Web Components" sounds super special, it's still just HTML, CSS and JavaScript. Same tools. Same rules.

So, if we want to make a mixin available globally across multiple imports, all we have to do is to put our shared mixin into it's own document that does nothing but defining our mixin on the global namespace. Our `shared.html` could look something like this:

```html
<script>
  window.sharedMixin = {
    // logic goes here
  };
</script>
```

And thank HTML Imports, we can just import it into our own component as we would do with other full-fledged web components:

```html
<link rel="import" href="path/to/shared.html">

<element name="foo-element">
  <script>
    Polymer('foo-element', Platform.mixin({
      // foo-element logic
    }, sharedMixin));
  </script>
</element>
```

(Since I struggled especially with that part, I posted another [StackOverflow question](http://stackoverflow.com/questions/24180622/is-it-possible-to-share-mixins-across-web-components-and-imports-in-polymer) here.)

I hope this article helped you understanding inheritance and composition with Polymer.
