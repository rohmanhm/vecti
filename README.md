# ICOEN SVG

Icoen-SVG is plugin to create vector image in your HTML code with simple code and more customizing.

<a href="http://www.youtube.com/watch?feature=player_embedded&v=PiSAmveSWi8" target="_blank"><img src="http://img.youtube.com/vi/PiSAmveSWi8/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

##How to install

Download `icoen-svg` or clone to your local folder.

>`git clone https://github.com/rohmanhm/icoen-svg.git icoen-svg`

Include file `icoen-svg.min.js` or `icoen-svg.js` to your HTML code.

>`<script type="text/javascript" src="icoen-svg/icoen-svg.min.js"></script>`

##How to use
First, you must create a new variable to define `icoen-svg` plugin

```javascript
var icoenSVG = new icoenSVG();
```
Add to your HTML code 
`<code data="face"></code>`

or add something like 
`<code data="favorite" size="60" stroke="#f98eee" fill="#ffffff"></code>`
Means, call icon favorite with size 60, and outline stroke color `#f98eee`, filling shape with `#ffffff` color.

##Customize

You can customize the default action.

```javascript
var icoenSVG = new icoenSVG({
	tagName: 'i', // by default icon
	attributeName: 'icon-name', // by default data
	fill: '#f98eee', // by default #000000
	stroke: '#000000', // by default none
});
```

And many more, you can see the code.

##Supported icon

We support 845 icon from (Google Icon Design)