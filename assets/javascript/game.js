(function($) {
  $.widget("stej.game", {
    options: {
      characters: []
    },

    attack: function(player, opponent) {
      var h = this.characterEls[0].character("health");
      console.log("health:", h);
      this.characterEls[0].character("health", h - 10);
    },

    _characterSelect: function(el) {
      console.log({ select: el.character("name"), health: el.character("health") });
    },

    _create: function() {
      var game = this;

      game.messageEl = $("<div>").addClass("game-message");
      game.charactersEl = $("<div>").addClass("game-characters clearfix");
      game.playerEl = $("<div>").addClass("game-player");
      game.opponentEl = $("<div>").addClass("game-opponent");
      game.attackButtonEl = $("<button>").text("Attack ->").addClass("btn btn-danger");

      $.each(game.options.characters, function() {
        var character = this;
        var characterEl = $("<div>").character(character);

        game._on(characterEl, {
          click: function() {
            game._characterSelect(characterEl);
          }
        });

        game.charactersEl.append(characterEl);
      });

      game.element
        .append(
          $("<div>")
            .addClass("row")
            .append(
              $("<div>")
                .addClass("col-12")
                .append(game.messageEl)
            )
        )
        .append(
          $("<div>")
            .addClass("row")
            .append(
              $("<div>")
                .addClass("col-12")
                .append(game.charactersEl)
            )
        )
        .append(
          $("<div>")
            .addClass("row")
            .append(
              $("<div>")
                .addClass("col-4")
                .append(game.playerEl)
            )
            .append(
              $("<div>")
                .addClass("col-4 d-flex justify-content-center align-items-center")
                .append(game.attackButtonEl)
            )
            .append(
              $("<div>")
                .addClass("col-4")
                .append(game.opponentEl)
            )
        )
        .addClass("game container");

      game._update();
    },

    _update: function() {
      this.messageEl.text("Select a Player");
    }
  });
})(jQuery);
