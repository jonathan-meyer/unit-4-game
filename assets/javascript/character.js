(function($) {
  $.widget("stej.character", {
    options: {
      img: "none.png",
      name: "UnNamed",
      health: 0,
      attack: 0,
      counter: 0,
      Type: "none"
    },

    health: function(value) {
      if (value === undefined) {
        return this.options.health;
      }

      this.options.health = parseInt(value);
      this._update();
    },

    _create: function() {
      this.healthEl = $("<div>").addClass("character-health");

      this.imageEl = $("<img>")
        .attr({
          src: this.options.img,
          alt: this.options.name
        })
        .width(200)
        .addClass("character-img");

      this.element
        .append(this.imageEl)
        .append($("<div>").addClass("character-shadow"))
        .append(this.healthEl)
        .css({
          cursor: "pointer"
        })
        .addClass("character");

      this._on(this.element, {
        click: function() {
          console.log("Click", this.options.name);
        }
      });

      this._update();
    },

    _update: function() {
      this.healthEl.text(this.options.health);
      this;
    }
  });
})(jQuery);
