/**
 *! Vecti | Vector Image for Web Vector
 * v0.0.4
 * @Creator : Habib Rohman
 * @Date : 17 Agustus 2016
 */

( function (global) {
    'use strict';
    // Namespace VECTI
    window.Vecti = function (params) {
        var app = this,
            err = new Error();

        // Database icon
        app.db = '';

        // App parameters
        app.params = {
            tagName: 'icon',
            attributeName: 'data',
            size: 32,
            dataType:'json',
            fill: "#000000",
            stroke: "none",
            dataUrl: 'dist/json/data.json'
        }

        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }

        /**
         * Initialization app
         * @type callback function
         * @return {void}
         */
        app.init = function (callback) {
            switch(app.params.dataType){
                case 'json':
                    app.getJSONData(function (res) {
                        app.generateSVG(res, function (data) {
                            app.replaceSVG(data);
                            callback(data);
                        });
                    })  
                    break;
                // case 'variable': // Cooming soon
                //     app.db = data;
                //     break;
                default:
                    throw err.message = 'Data type not supported';
                    break;
            }
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
        app.getJSONData = function (callback) {
            var urldata = app.params.dataUrl;
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

                xhr.open("GET", urldata);
                xhr.send();
            }
        }

        /**
         * Count JSON as Number
         * @param  {object} json
         * @return {number}      countData
         */
        app.countJSON = function (json) {
            var countData = 0;
            for (var x in json) {
                ++countData;
            }
            return countData;
        }

        /**
         * Generate the SVG icon
         * @param  {datas}   datas    json icon data
         * @param  {function} callback 
         * @return {object}            generated icon svg
         */
        app.generateSVG = function (datas, callback) {

            var data,
                dataIndex = 0,
                newData = '';

            var countData = app.countJSON(datas);

            for (data in datas) {
                ++dataIndex;
                var parser = new DOMParser(),
                    element;

                element = parser.parseFromString(app.decodeHTML(datas[data].code), 'text/xml').firstChild;

                var size = app.params.size || 32,
                    fill = app.params.fill || '#000000',
                    stroke = app.params.stroke || 'none';

                element.setAttribute('width', size);
                element.setAttribute('height', size);
                element.setAttribute('fill', fill);
                element.setAttribute('stroke', stroke);
                var dbElement,
                    encodedElement =  app.htmlEntities(element.outerHTML);
                var lastKoma = ',';
                if (dataIndex == countData) {
                    lastKoma = '';
                } 
                dbElement = '\"' + data + '\":' + '{ \"code\":\"' + encodedElement + '\"}' + lastKoma;
                newData += dbElement;
            }

            var appdb = JSON.parse('{' + newData + '}');
            app.db = appdb;

            if ( callback ) {
                callback(appdb);
                return false;
            }

            return appdb;
        }

        /**
         * Replace Tagname with SVG Icon
         * @type {object} Database icon
         * @type {function} Callback
         * @return 
         */
        app.replaceSVG = function (datas, callback) {

            var tagNames = document.getElementsByTagName(app.params.tagName);

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

                    var decodeSVG = this.decodeHTML(datas[tagName].code);
                    element = parser.parseFromString( decodeSVG , 'text/xml').firstChild;

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

                        element.setAttribute('width', size); // Setting Width SVG
                        element.setAttribute('height', size); // Setting Height SVG
                        element.setAttribute('fill', fill); // Setting Fill SVG
                        element.setAttribute('stroke', stroke); // Setting Stroke SVG

                        tagNames[b].parentElement.replaceChild(element , tagNames[b]);

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
                return this.decodeHTML(app.db);
            }

            return app.db;

        }
        
        /**
         * Encode HTMLEntities to Element
         * @param  {object} str Element
         * @return {String}
         */
        app.htmlEntities = function (str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

    }   

    
})(window);