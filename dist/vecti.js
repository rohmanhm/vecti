/**
 *! Vecti | Vector Image for Web Vector
 * v0.0.3
 * @Creator : Habib Rohman
 * @Date : 17 Agustus 2016
 */

( function (global) {
    'use strict';
    // Namespace VECTI
    window.Vecti = function (params) {
        var app = this,
            err = new Error(),
            datas = {};

        app.version = '0.0.3';

        app.params = {
            tagName: 'icon',
            attributeName: 'data',
            size: 32,
            fill: "#000000",
            stroke: "none",
            dataUrl: 'json/data.json'
        }

        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }

        /**
         * Initialization app
         * @return {void}
         */
        app.init = function () {
            var app = this;
            this.getJSONData(app.params.dataUrl, function (res) {
                datas = res;
                app.replaceSVG();
            })
        }

        /**
         * Decode html entity to valid html
         * @param  {object} html Object
         * @return {string}      html decoded text
         */
        app.decodeHTML = function (html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        /**
         * Get JSON Data from url
         * @param  {string} urldata Link to JSON Data
         * @return {object}         Response text
         */
        app.getJSONData = function (urldata, callback) {
            if (global.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
                
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var res = xhr.responseText;
                        if (typeof(res) != 'object') {
                            res = JSON.parse(res);
                        }
                        callback(res);
                    }
                }

                xhr.open("GET", urldata, true);
                xhr.send();
            }
        }

        /**
         * Replace Tagname with SVG Icon
         * @return 
         */
        app.replaceSVG = function () {
            var tagNames = document.getElementsByTagName(app.params.tagName);
            if (datas == undefined || datas == {} || datas == ""){
                this.init();
                return false;
            }

            if (tagNames.length > 0) {
                var b = tagNames.length - 1;
                while ( b > -1 ) {
            
                    var tagName = tagNames[b].getAttribute(app.params.attributeName).toLowerCase(),
                        parser = new DOMParser(),
                        element;

                    if (datas[tagName] == undefined) {
                        b--;
                        continue;
                    }

                    element = parser.parseFromString(this.decodeHTML(datas[tagName].code), 'text/xml');

                    if (tagName != undefined) {
                        var size = app.params.size,
                            fill = app.params.fill,
                            stroke = app.params.stroke,
                            tagSize = tagNames[b].getAttribute('size'),
                            tagFill = tagNames[b].getAttribute('fill'),
                            tagStroke = tagNames[b].getAttribute('stroke');

                        // Check tag size if available
                        if (tagSize != undefined && tagSize != "") {
                            size = tagSize;
                        }

                        // Check tag fill if available
                        if (tagFill != undefined && tagFill != "") {
                            fill = tagFill;
                        }

                        // Check tag stroke if available
                        if (tagStroke != undefined && tagStroke != "") {
                            stroke = tagStroke;
                        }                        

                        element.firstChild.setAttribute('width', size); // Setting Width SVG
                        element.firstChild.setAttribute('height', size); // Setting Height SVG
                        element.firstChild.setAttribute('fill', fill); // Setting Fill SVG
                        element.firstChild.setAttribute('stroke', stroke); // Setting Stroke SVG
                        tagNames[b].parentElement.replaceChild(element.firstChild , tagNames[b]);

                        b--;
                    } else {
                        throw err.message = 'Undefined. can\'t found tag name';
                    }
                }
            }
        }

        /**
         * Get database SVG Icon 
         * @param  {boolean} decoded True if want return as Decoded HTML Entities
         * @return {object}         database SVG Icon
         */
        app.getDatas = function (decoded) {
            if (decoded) {
                return this.decodeHTML(datas);
            }
            return datas;
        }

    }   

    
})(window);