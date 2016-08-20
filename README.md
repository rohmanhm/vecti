# INVECT

invect is plugin to create vector image in your HTML code with simple code and more customizing.

[![Demo invect](http://img.youtube.com/vi/PiSAmveSWi8/0.jpg)](http://www.youtube.com/watch?v=PiSAmveSWi8)

##How to install

Download `invect` or clone to your local folder.

>`git clone https://github.com/rohmanhm/invect.git invect`

Include file `invect.min.js` or `invect.js` to your HTML code.

>`<script type="text/javascript" src="invect/invect.min.js"></script>`

##How to use
First, you must create a new variable to define `invect` plugin

```javascript
var invect = new invect();
```
Add to your HTML code 
`<code data="face"></code>`

or add something like 
`<code data="favorite" size="60" stroke="#f98eee" fill="#ffffff"></code>`
Means, call icon favorite with size 60, and outline stroke color `#f98eee`, filling shape with `#ffffff` color.

##Customize

You can customize the default action.

```javascript
var invect = new invect({
	tagName: 'i', // by default icon
	attributeName: 'icon-name', // by default data
	fill: '#f98eee', // by default #000000
	stroke: '#000000', // by default none
});
```

And many more, you can see the code.

##Supported icon

We support 845 icon from (Google Icon Design)