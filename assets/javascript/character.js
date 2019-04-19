(function($) {
  $.widget("stej.character", {
    options: {
      img: "none.png",
      name: "Unnamed",
      roll: "none",
      health: 0,
      attack: 0,
      counter: 0,
      size: 150
    },

    name: function() {
      return this.options.name;
    },

    roll: function(value) {
      if (value === undefined) {
        return this.options.roll;
      }

      if (["none", "player", "enemy"].includes(value.toLowerCase())) {
        this.options.roll = value.toLowerCase();
      }

      this._update();
    },

    health: function(value) {
      if (value === undefined) {
        return this.options.health;
      }

      this.options.health = parseInt(value);
      this._update();
    },

    attack: function(value) {
      if (value === undefined) {
        return this.options.attack;
      }

      this.options.attack = parseInt(value);
    },

    counter: function() {
      return this.options.counter;
    },

    size: function(value) {
      if (value === undefined) {
        return this.options.size;
      }

      this.options.size = parseInt(value);
      this._update();
    },

    _create: function() {
      this.healthEl = $("<div>").addClass("character-health");

      this.imageEl = $("<img>")
        .attr({
          src: this.options.img,
          alt: this.options.name
        })
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
        mouseenter: function() {
          this.element.addClass("hover");
        },
        mouseleave: function() {
          this.element.removeClass("hover");
        }
      });

      this._update();
    },

    _update: function() {
      this.imageEl.width(this.options.size);
      this.healthEl.text(this.options.health);
      this.element
        .attr("title", [this.options.name, "Attack: " + this.options.attack, "Counter: " + this.options.counter].join("\n"))
        .removeClass("enemy")
        .removeClass("player")
        .addClass(this.options.roll);
    }
  });
})(jQuery);
