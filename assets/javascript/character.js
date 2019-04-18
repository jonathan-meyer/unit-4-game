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
      this.healthEl = $("<div>").addClass("health");

      this.imageEl = $("<img>")
        .attr({
          src: this.options.img,
          alt: this.options.name,
          width: 150
        })
        .addClass("img-thumbnail");

      this.element
        .append(this.imageEl)
        .append(this.healthEl)
        .addClass("character");

      this._update();
    },

    _update: function() {
      this.healthEl.text(this.options.health);
    }
  });
})(jQuery);
