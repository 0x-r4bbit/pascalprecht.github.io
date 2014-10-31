---
layout: post
title: Integrating Web Components with AngularJS
---

Just a few days ago I had the honour to give a talk together with the awesome <a href="http://twitter.com/CarmenPopoviciu">Carmen</a> at the first european <a href="http://angularjs.org">AngularJS</a> conference <a href="http://ngeurope.org">ngEurope</a>. The title of our talk was:

<i>"Don't stop thinking about tomorrow! - AngularJS and Web Components"</i>

We talked about what Web Components are and if and how we can integrate them with the AngularJS of today, since this is a question that seems to be asked quiet often. We also talked about Angular 2.0 and how that version of the framework will embrace the Web Components technologies, so we had a nice overview of what issues can occur and how they are solved in the future. If you're interested in the talk, the slides are up online [here](http://pascalprecht.github.io/dont-stop-thinking-about-tomorrow) and there's also <s>going to be</s> a video on [Youtube](https://www.youtube.com/watch?v=gSTNTXtQwaY). <s>I'll update this post, once it's online.</s>

However, as you can probably imagine, 25 minutes are not enough to cover everything in detail about Web Components, the Angular of today and the Angular of tomorrow. This is why I decided to write a follow up article on what we've been talking about, to focus more on the things that probably missed out. I'll not cover the Web Components technologies themselves since there are tons of resources out there in the web. This article focuses on the **integration of Web Components with the AngularJS** of today and the AngularJS of tomorrow.

## Building a simple web component

Let's jump right into the topic and say we've built a web component that looks something like this:

```html
<special-input value="Hello"></special-input>
```

You can probably imagine that this web component is evidently a sort of input element, that does a better job than the native `<input type="text">` element. However, here's what the implementation of it might look like, we start with the template (I don't use Polymer in order to make clear that the stuff you read here should work with any web component, regardless if it's implemented with a library like Polymer or not, as long as a few requirements are fulfilled. But we'll get into this in a minute):

```html
<template>
  <input type="text">
</template>
```

Ground breaking hm? As you can see, all we do is having an `<input type="text">` element in our template, however, you know we could do much more here. But for the sake of simplicity, we stick with this example.

Next, the custom element definition:

```js
var SpecialInputProto = Object.create(HTMLElement.prototype);

SpecialInputProto.createdCallback = function () {

  // getting initial value of value attribute
  var value = this.hasAttribute('value') ?
              this.getAttribute('value') : '';

  var template = document.querySelector('template').content;

  // setting value property of input element
  template.querySelector('input').value = value;

  var shadowRoot = this.createShadowRoot();
  shadowRoot.appendChild(template.cloneNode(true));
};

```

Okay, so our `SpecialInputProto` prototype creates its own shadow root, checks for an initial `value` attribute and feeds the templates `<input>` with it. Finally it activates its template by cloning its contents into its Shadow DOM. Last but not least, we have to register our new custom element on the document:

```js
document.registerElement('special-input', {
  prototype: SpecialInputProto
});
```

Great, our web component is now ready to use. But can we use it in an Angular app?

## Web Components inside Angular world

Being able to build our own web components is of course a nice thing. However, coming from an Angular world, the first question that probably comes into our minds is, if we're able to actually use this component in our Angular apps, even if it's not a directive but a custom element.

Unfortunately it's not possible to say that it works out of the box per se and at the same time, it wouldn't be fair to say that it's not possible at all. Let's go through all possible scenarios and see if we can find an answer. We start with the most simplest one: Using our web component in our Angular app.

Let's say we have some HTML code that looks like this:

```html
<div ng-controller="AppController">
  <label>Please enter your name:</label>
  <special-input value="Pascal"></special-input>
</div>
```
Pretty straight forward. We have a controller that creates a scope with an associated DOM element. What we also see is the usage of our fresh created web component with a hard coded `value` attribute. Now the big question:

**Does that work?**

The answer is yes. And Carmen explained very well in the talk why:

>Everything is DOM. Angular doesn't know and shouldn't know about custom elements.

In fact, Angular doesn't even pick up our custom element since it's not registered as directive and therefore not collected by the compiler. So for that simple case, we can just use our custom element. Also the `value` attribute is just a hard coded string, there's nothing special with our custom element from the outside world so things do just work.

Okay, fair enough but what happens when we assign an actual model value to our scope and use that to feed our custom element with data? Well, let's take a look. First, the controller:

```js
angular.module('myApp')
.controller('AppController', function ($scope) {
  $scope.name = 'Pascal';
});
```

Next we apply the interpolation directive to our `<special-input>` element like this:

```html
{% raw %}
<div ng-controller="AppController">
  <label>Please enter your name:</label>
  <special-input value="{{name}}"></special-input>
</div>
{% endraw %}
```
What happens now? Executing this code in our browser shows us, that our `<special-input>` element gets `{% raw %}{{name}}{% endraw %}` as string value and that's it. It seems like the interpolation didn't happen at all. The reason for that is, that our custom element doesn't react on attribute changes yet. It gets the initial value, which is in fact `{% raw %}{{name}}{% endraw %}` and when the interpolation happens, it doesn't update the `value` property of the `<input>` element inside the Shadow DOM.

We can fix that by extending our `SpecialInputProto` with an `attributeChangedCallback` like this:

```js
SpecialInputProto.attributeChangedCallback = function (name, oldValue, newValue) {

  if (name === 'value') {
    this.shadowRoot.querySelector('input').value = newValue;
  }
};
```
Now, everytime the value of the `value` attribute of our custom element changes, it updates the `value` property of its Shadow DOM `input`. If we run the example in our browser again, we see that our custom element picks up the change at runtime and is updated accordingly.

We just experienced the first important fact when it comes to integrating web components with Angular: if the web component doesn't take care of reflecting attribute changes to corresponding properties, in our case the `value` property of the `<input>` element in the Shadow DOM, changes from the outside world do no appear inside the element. When building web components with Polymer, you don't have to care about that logic, since it comes with built-in template binding that does the job for you.

Okay, so now our custom element works even with interpolated attribute values in our Angular app. But does it work the other way around too? Are changes, that happen inside our custom element, reflected back to our model on the controllers scope?

Let's try it out and extend our example by adding another `<input>` element to our HTML that has a `ng-model` directive that is bound to our models `name`:

```html
{% raw %}
<div ng-controller="AppController">
  <div>
    <label>Please enter your name (directive):</label>
    <input type="text" ng-model="name">
  </div>
  <div>
    <label>Please enter your name (web component):</label>
    <special-input value="{{name}}"></special-input>
  </div>
</div>
{% endraw %}
```

Typing into our `input` directive triggers a `$digest` in the Angular world and updates the DOM, which in turn reflects the change in our custom element as well. But that we knew already. What happens when we type into our custom element? Yikes! The change happens **inside** our custom element, which at the same time is **outside** the Angular world, so Angular isn't notified about the change. There's no `$digest` triggered and our model isn't updated. This again, brings us back to what Carmen said at ngEurope:

>Everything is DOM. Angular doesn't know and shouldn't know about custom elements.

In other words, it's the elements job to notify the outside world when a change happens inside the element. Which brings up the next big question: How can an element notify the outside world? To answer this question, we first have to understand what APIs an element provides.

## Understanding the API of an element

Every DOM element, no matter if native or custom, comes with four different APIs that developers can use to interact with it:

- Attributes
- Properties
- Methods
- Events

Let's explore these for a minute.

**Attributes** are the things we either use declaratively, when we write HTML code and tell our `<input>` element what its initial `value`, or an `<img>` element what its `src` is, or imperatively using an elements `.setAttribute()` method. Attribute values are always interpreted as strings. So it's not possible to set for example an object as attribute. Some native attributes update their corresponding property once they are set. For example, setting an `input` elements `value` attribute, updates its property with the same value.

**Properties** are the actual DOM object properties we can access imperatively through JavaScript. Every DOM object comes with its default properties but we are of course able to just define new properties on an object if we want. Properties also can have different values that just string. The following code updates the value of an inputs `value` property:

```js
var input = document.querySelector('input');
input.value = 'new value!';
```

Element properties are not necessarily reflected back to their attributes. Some element properties do, some don't. The value of an `input` elements `value` property does not reflect back to its attribute. An `img` elements `src` property does. Which means, if we set the value declaratively to `value="Pascal"` and update the elements property to `"Carmen"`, the attributes value is still `"Pascal"`. It's also important to mention that, whereas element attributes are used to set initial values, properties are used to update values at runtime. Of course, this only works if there's a corresponding property to an attribute.

**Methods** can also be accessed imperatively by invoking them directly on an elements DOM object like this:

```js
var p = document.querySelector('p');

p.setAttribute('title', 'Hello there');
```

**Events** are the things we listen to when we want to react on things like `click`, `focus` or `input`. In fact, events are are the only natural way of an element to notify the outside world that something happened inside, like when an element is clicked or an inputs value changed.

Keep in mind that it's always up to the element what its inner workings are and if it does things like (custom) event dispatching or attribute/property reflection or not. Now that we know what an elements APIs are, let's see what we can do to inform Angular about changes in our custom element.

## Notifying the outside world

Taking a look at the APIs that an element comes with, it's pretty much obvious what we can do to inform Angular about changes that happen inside our custom element, right? Dispatching a custom event like `valueChanged` everytime the `input` element of our custom elements Shadow DOM is updated seems to be the way to go. But what does that mean from the outside world point of view? What do we have to do to actually react on such custom event that is fired in order to call `$scope.$apply` to trigger `$digest`?

Right. We have to create a new directive for that particular event, otherwise we're not able to listen to it "*The Angular Way*". And now imagine a custom element dispatches four different events depending on what happens. We would have to build four different directives for every single custom event. Next, multiply this with the amount of different custom elements you use in your Angular app. I think you get the idea.

So what else can we do to notify Angular? The Angular of today is not able to track changes on custom element properties. It also doesn't see any attribute changes. It seems hopeless...

**But wait, the internet has this thing called [Mutation Observer](https://developer.mozilla.org/en/docs/Web/API/MutationObserver)!**

Mutation Observers can be used to observe mutations on the DOM. This includes things like insertions or removals of DOM elements, but also attribute changes. That means, we can create an observer that observes an elements attributes and whenever the observer sees a change, we can run `$scope.$apply()` to inform Angular about this particular change.

It turns out we don't even have to build such a thing ourselves. [Chris Strom](https://github.com/eee-c) already built a directive called [angular-bind-polymer](https://github.com/eee-c/angular-bind-polymer) that does exactly what we need. It sets up mutation observers for all attributes that have an interpolation directive applied on that particular element, and triggers a `$scope.$apply()` whenever a change on one of these attributes happens.

All we have to do is to apply the `bind-polymer` directive (yes, the name sounds Polymer specific, but it isn't. I'll tell you why in a minute) to the custom element that interacts with our Angular app:

```html
{% raw %}
<special-input value="{{name}}" bind-polymer></special-input>
{% endraw %}
```

Weird. It seems that typing into our custom elements `input` still doesn't notify the outside world about its changes. Why that? Well, if we look closely, we see that we actually forgot something. The `bind-polymer` directive sets up observers that observe changes on the elements attribute, but our custom element doesn't reflect changes back to its attributes when we type into its `input`. That means, the observers callback isn't called at all and no `$digest` is triggered. So what do we have to do?

In order to trigger the applied mutation observers, we have to make sure, that the changes are actually reflected back to the elements attribute. In our particular case that means, we have to set the `value` attribute of `special-input` whenever its `input` fires an `input` event. Let's update the `createdCallback()` of our `SpecialInputProto` accordingly:

```js
SpecialInputProto.createdCallback = function () {

  // ... creating shadow root etc...

  this.shadow.querySelector('input')
  .addEventListener('input', function (e) {
    this.setAttribute('value', e.target.value);
  }.bind(this));
};

```

After we cloned the templates contents into our Shadow DOM, we query its `input` element and set up an event listener that updates our custom elements `value` attribute whenever a change in the `input` happens.

Phew. That's it. Typing into our custom element now triggers a `$digest` that syncronizes the scopes model.

This brings us to the next important fact when integrating web components with Angular: when relying on attribute changes with mutation observers, syncronization only works when the custom element reflects changes back to its attributes. In addition, from a custom element point of view and despite from the fact that it's probably going to be used in an Angular app, there's no real reason to reflect property values back to its attributes except for styling.

That's also the reason why the README of the angular-bind-polymer project says "*This only works with Polymer elements that use reflection*". Polymer comes with an API that lets you easily set up attribute/property reflection. All you have to do is to set `reflect: true` in a properties configuration and Polymer does the rest for you. That's probably also be the reason why the project has a Polymer specific name. However, as we can see, reflection is nothing that is only restricted to web components built with Polymer.

If you now think "*This is a horrible hack!*" then you're right. But it seems to be the most comfortable way, compared to creating directives for every single event, to integrate web components with the Angular of today. However, as we know, the Angular team works on a new version of Angular that embraces the power of Web Components technologies by default. Let's see how these issues are tackled in the Angular of tomorrow.

## Web Components and Angular 2.0

Angular 2.0 should be able to work with *any* element. It shouldn't matter if an element is a native element, or a custom element. It also shouldn't matter what attributes it defines, or what events it fires. Let me bring up Carmens statement again (and seriously, let it sink in):

>Everything is DOM. Angular doesn't know and shouldn't know about custom elements.

In order to make this happen, Angular needs a new generalized syntax that unifies native and custom events as well as custom and native property/attribute names. Today we use things like `ng-click` or `ng-focus` to react on events and Angular takes care of triggering a `$digest` for us. However, as we discussed earlier, a custom element could dispatch a custom event that Angular doesn't know about. To get around this, there'll be a new template syntax that just works with *any* event, no matter if custom or native.

Take a look at the following code:

```html
<button (click)="doSomething()">Click me!</button>
```

This code executes `doSomething()` on the component when it's clicked. As we can see, there's no `ng-click`. Also, `click` could be a custom event name as well. So `(click)` is the same as `(skip)` or `(foo)`. The `()` symbols tell Angular that it's an event expression. What about attributes and properties?

As we learned, attributes are always interpreted as strings when it comes to elements (I'm not talking about directives!). However, in an Angular world, we want to be able to pass things like objects to components right? This is why Angular will try to bind to properties by default and falls back to attributes, if there's no corresponding property. Properties can have any value. And since Angular embraces the declarative way of building apps, it comes with a new template syntax to declare property bindings.

The following code shows how we can bind a value to a components property in HTML:

```html
<p [title]="foo"></p>
```

Again `title` could be anything custom if the underlying element defines it. `foo` can now also be an object or primitive, which wouldn't be possible with attributes. The `[]` symbols tell Angular that this is a property binding.

## Conclusion

Integrating Web Components with the Angular of today doesn't *really* work. It is simply not designed to work with Web Components technologies out of the box. Even if there are ways to make it sort of work, it'll always be a hack to rely on things like Mutation Observers, especially when keeping in mind that this work-around only works when the element reflects its changes back to its attributes. Also, creating directives for every single event that a custom element could fire, isn't really a comfortable option.

However, we shouldn't forget that this only applies to web components that need to notify the outside world. Components that just need data from the outside world, can be used right away along with Angular without any further hacks.
