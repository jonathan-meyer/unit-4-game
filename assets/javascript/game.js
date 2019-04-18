(function($) {
  $.widget("stej.game", {
    options: {
      characters: [],
      characterEls: []
    },

    attack: function(player, enemy) {
      var h = this.options.characterEls[0].character("health");
      console.log("health:", h);
      this.options.characterEls[0].character("health", h - 10);
    },

    _create: function() {
      var self = this;

      $.each(this.options.characters, function() {
        self.options.characterEls.push(
          $("<div>")
            .character(this)
            .appendTo(self.element)
        );
      });
    }
  });
})(jQuery);
