# VECTI JS

vecti is library to create vector image in your HTML code with simple code and more customizing.

[![Demo VECTI](http://img.youtube.com/vi/PiSAmveSWi8/0.jpg)](http://www.youtube.com/watch?v=PiSAmveSWi8)

##How to install

Download `vecti` or clone to your local folder.

>`git clone https://github.com/rohmanhm/vecti.git vecti`

Include file `vecti.min.js` or `vecti.js` in `dist` path to your HTML code.

>`<script type="text/javascript" src="dist/vecti.min.js"></script>`

##How to use
First, you must create a new variable to define `vecti` library

```javascript
var vecti = new vecti();
```
Add to your HTML code 
`<code data="face"></code>`

or add something like 
`<code data="favorite" size="60" stroke="#f98eee" fill="#ffffff"></code>`

It Means, call your icon with size 60, and outline stroke color `#f98eee`, filling shape with `#ffffff` color.

##Customize

You can customize the default action.

```javascript
var vecti = new vecti({
	tagName: 'i', // by default icon
	attributeName: 'icon-name', // by default data
	fill: '#f98eee', // by default #000000
	stroke: '#000000', // by default none
	dataUrl: 'dist/json/data.json' //JSON image data
});
```

And many more, you can see the code.

##Supported icon

We support 845 icon from (Google Icon Design)