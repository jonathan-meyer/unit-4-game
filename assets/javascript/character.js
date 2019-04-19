(function($) {
  $.widget("stej.character", {
    options: {
      img: "none.png",
      name: "UnNamed",
      health: 0,
      attack: 0,
      counter: 0,
      type: "none"
    },

    name: function() {
      return this.options.name;
    },

    health: function(value) {
      if (value === undefined) {
        return this.options.health;
      }

      this.options.health = parseInt(value);
      this._update();
    },

    setNone: function() {
      this.options.type = "none";
      this.element.removeClass("enemy").removeClass("player");
      this._update();
    },

    setPlayer: function() {
      this.options.type = "player";
      this.element.removeClass("enemy").addClass("player");
      this._update();
    },

    setEnemy: function() {
      this.options.type = "enemy";
      this.element.removeClass("player").addClass("enemy");
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
      this.healthEl.text(this.options.health);
    }
  });
})(jQuery);
