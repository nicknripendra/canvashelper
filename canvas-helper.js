var GraphMaker = (function (window) {
  'use strict';
  /**
   * Abstract class for canvas helper
   * @param {string} [canvas element id]
   */
  function BaseCanvas(elementId) {
    var self = this;
    self.element = window.document.getElementById(elementId);
    self.canvas = self.element.getContext('2d');

    function initSettings() {
      self.setSize();
    }

    self.setSize = function () {
      self.y = self.element.height;
      self.x = self.element.width;
    };

    initSettings();
  }

  /**
   * Helper class to create canvas actions
   * @param {CavasObject} [canvas object with 2d context]
   */
  function CanvasHelper(canvas) {
    var self = this;

    self.canvas = canvas;

    /**
     * Creares a line
     * @param  {object} [begin line position x,y]
     * @param  {object} [end line position x,y]
     * @param  {object} [other options]
     */
    self.createLine = function (begin, end, options) {
      options = options || {};

      self.canvas.beginPath();
      self.canvas.moveTo(begin.x, begin.y);
      self.canvas.lineTo(end.x, end.y);

      if (options.colour) {
        self.canvas.strokeStyle = options.colour;
      }

      self.canvas.stroke();
      self.canvas.closePath();
    }

    /**
     * Creates a static rectangle or a filled rectangle
     * @param  {object} [begin line position x,y]
     * @param  {object} [end line position x,y]
     * @param  {object} [other optional parmeters]
     * @param  {Boolean}
     */
    self.createReactangle = function (begin, end, options, isRect) {
      options = options || {};
      isRect = isRect === undefined ? true : isRect;

      self.canvas.beginPath();

      if (options.fillColour) {
        self.canvas.fillStyle = options.fillColour;
      }

      if (options.colour) {
        self.canvas.strokeStyle = options.colour;
      }

      if (isRect) {
        //creates a static empty rectangle with borders
        self.canvas.rect(begin.x, begin.y, end.x, end.y);
      } else {
        //creates a filled coloured rectangle
        self.canvas.fillRect(begin.x, begin.y, end.x, end.y);
      }
      self.canvas.stroke();
      self.canvas.closePath();
    };

    /**
     * Creates a stext at given position
     * @param  {object} [text position x,y]
     * @param  {object} [other optional parmeters]
     */
    self.createText = function (txt, position, options) {
      options = options || {};

      self.canvas.beginPath();

      if (options.font) {
        self.canvas.font = canvas.font;
      }

      self.canvas.fillStyle = "black";
      if (options.colour) {
        self.canvas.fillStyle = options.colour;
      }

      self.canvas.fillText(txt, position.x, position.y);
      self.canvas.stroke();
      self.canvas.closePath();
    };

    /**
     * Creates a circle bubbles
     * @param  {object} [text position x,y]
     * @param  {object} [other optional parmeters]
     */
    self.createCircle = function (position, radius, curmenfrence, options) {
      options = options || {};

      //var radius = 10;
      self.canvas.beginPath();

      if (options.width) {
        self.canvas.lineWidth = options.width;
      }

      self.canvas.fillStyle = "white";
      if (options.colour) {
        self.canvas.fillStyle = options.colour;
      }
      self.canvas.arc(position.x, position.y, radius, 0, 2 * Math.PI);

      self.canvas.fill();
      self.canvas.stroke();
      self.canvas.closePath();
    }
  }

  /**
   * Class : Handing the creation of basic matrix actions
   * @param {string} [canvas element id]
   */
  function MatrixGraph(elementId) {
    //extends base canvas
    BaseCanvas.apply(this, [elementId]);

    //extends canvas helper
    CanvasHelper.apply(this, [this.canvas]);

    var self = this;

    //initializing constructor
    self.constructor.prototype.initSettings = function () {
      self.ticks = {};
      self.ticks.x = 20;
      self.ticks.y = 20;

      self.range = {};
      self.range.x = 200;
      self.range.y = 200;

      self.pixels = {};
      self.pixels.y = self.y / self.range.y;
      self.pixels.x = self.y / self.range.x;

      self.draw.create();
    };

    //all draw objects
    self.draw = {};

    self.draw.create = function () {
      self.draw.quardrents();
      self.draw.baseGraph();
      self.draw.diagnols();
      self.draw.hroizontalTicks();
      self.draw.verticalTicks();
      self.draw.numberMarking();
    };

    self.draw.baseGraph = function () {
      var begin = {};
      var end = {};

      begin.x = self.x / 2;
      begin.y = 0;

      end.x = self.x / 2;
      end.y = self.y;
      self.createLine(begin, end);

      begin.x = 0;
      begin.y = 0;

      end.x = self.x;
      end.y = self.y;
      self.createReactangle(begin, end);

      begin.x = 0;
      begin.y = self.y / 2;

      end.x = self.x;
      end.y = self.y / 2;
      self.createLine(begin, end);
    };

    self.draw.quardrents = function () {
      var begin = {};
      var end = {};
      var options = {};

      //creating quardrent 2;
      begin.x = 0;
      begin.y = 0;
      end.x = self.x / 2;
      end.y = self.y / 2;
      options.fillColour = "#DEEAF6";
      self.createReactangle(begin, end, options, false);

      //creating quardrent 1;
      begin.x = self.x / 2;
      begin.y = 0;
      end.x = self.x;
      end.y = self.y / 2;
      options.fillColour = "#E2EFD9";
      self.createReactangle(begin, end, options, false);

      //creating quardrent 4;
      begin.x = 0;
      begin.y = self.y / 2;
      end.x = self.x / 2;
      end.y = self.y / 2;
      options.fillColour = "#D0CECE";
      self.createReactangle(begin, end, options, false);

      //creating quardrent 3;
      begin.x = self.x / 2;
      begin.y = self.y / 2;
      end.x = self.x;
      end.y = self.y;
      options.fillColour = "#FFCCCC";
      self.createReactangle(begin, end, options, false);
    };
    self.draw.diagnols = function () {
      var begin = {};
      var end = {};

      begin.x = 0;
      begin.y = 0;
      end.x = self.x;
      end.y = self.y;
      self.createLine(begin, end);

      begin.x = self.x;
      begin.y = 0;
      end.x = 0;
      end.y = self.y;
      self.createLine(begin, end);
    };

    self.draw.verticalTicks = function () {
      var count = 0;
      var begin = {};
      var end = {};

      for (count = 1; count <= 10; count++) {
        begin.x = (self.ticks.x * count) * self.pixels.x;
        begin.y = 0;

        end.x = (self.ticks.x * count) * self.pixels.x;
        end.y = self.y;

        self.createLine(begin, end);
      }
    };

    self.draw.hroizontalTicks = function () {
      var count = 0;
      var begin = {};
      var end = {};

      for (count = 1; count <= 10; count++) {
        begin.y = (self.ticks.y * count) * self.pixels.y;
        begin.x = 0;

        end.y = (self.ticks.y * count) * self.pixels.y;
        end.x = self.x;

        self.createLine(begin, end, {font: "5px black"});
      }
    };

    self.draw.numberMarking = function () {
      var quardrents = 4;
      var q, s;
      var sections = 4;
      var position = {};
      var textValue = "";

      for (q = 1; q <= quardrents; q++) {
        for (s = 0; s <= sections; s++) {
          textValue = ((sections - s) * self.ticks.x ) + self.ticks.x;
          position = getPostion(s);
          self.createText(textValue, position);
        }

      }

      function getPostion(sec) {
        if (q === 1) {
          return {
            x: self.x - ((9 * self.pixels.x) + (self.ticks.x * sec) * self.pixels.x),
            y: (5 * self.pixels.y) + ((self.ticks.y * sec) * self.pixels.y)
          };
        }

        if (q === 2) {
          return {
            x: (3 * self.pixels.x) + (self.ticks.x * sec) * self.pixels.x,
            y: (5 * self.pixels.y) + ((self.ticks.y * sec) * self.pixels.y)
          };
        }

        if (q === 3) {
          return {
            x: (3 * self.pixels.x) + (self.ticks.x * sec) * self.pixels.x,
            y: self.y - ((2 * self.pixels.y) + ((self.ticks.y * sec) * self.pixels.y))
          };
        }

        if (q === 4) {
          return {
            x: self.x - ((9 * self.pixels.x) + (self.ticks.x * sec) * self.pixels.x),
            y: self.y - ((2 * self.pixels.y) + ((self.ticks.y * sec) * self.pixels.y))
          };
        }

      }
    };

    self.initSettings();
  }

  function GraphInteraction(elementId) {
    MatrixGraph.apply(this, [elementId]);
  }

  /**
   * @param {string} [canvas element id]
   */
  function GraphMaker(elementId) {
    GraphInteraction.apply(this, [elementId]);

    var self = this;

    // window.addEventListener('resize', function(){
    // 	self.draw.redraw();
    // });

    // self.element.addEventListener('resize', function(){
    // 	self.draw.redraw();
    // });

    self.draw.redraw = function () {
      self.draw.create();
    }
  }

  return GraphMaker;
})(window);
