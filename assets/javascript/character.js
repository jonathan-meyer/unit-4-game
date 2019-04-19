(function($) {
  $.widget("stej.character", {
    options: {
      img: "none.png",
      name: "Unnamed",
      roll: "none",
      health: 0,
      attack: 0,
      counter: 0
    },

    _init: function() {
      this.element.data("health", this.options.health);
      this.element.data("attack", this.options.attack);
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
      this._update();
    },

    counter: function() {
      return this.options.counter;
    },

    hit: function(opponent) {
      var me = this;

      if (me.health() > 0) {
        // attack opponent
        opponent.character("health", opponent.character("health") - me.attack());

        // opponent counter attacks
        me.health(me.health() - opponent.character("counter"));

        // add experiance points
        me.attack(me.attack() + this.element.data("attack"));

        return true;
      }

      return false;
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
      this.imageEl.width(this.options.roll === "none" ? 75 : 150);
      this.healthEl
        .css({
          fontSize: this.options.roll === "none" ? "1em" : "2em"
        })
        .text(this.options.health);
      this.element
        .attr("title", [this.options.name, "Attack: " + this.options.attack, "Counter: " + this.options.counter].join("\n"))
        .removeClass("roll-none roll-enemy roll-player")
        .addClass("roll-" + this.options.roll);
    }
  });
})(jQuery);
