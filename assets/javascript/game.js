(function($) {
  $.widget("stej.game", {
    options: {
      characters: []
    },

    message: "Select a Player",

    _create: function() {
      var game = this;

      game.messageEl = $("<div>").addClass("game-message");
      game.charactersEl = $("<div>").addClass("game-characters");
      game.playerEl = $("<div>").addClass("game-player");
      game.opponentEl = $("<div>").addClass("game-opponent");
      game.attackButtonEl = $("<button>")
        .text("Attack ->")
        .addClass("btn btn-danger")
        .on("click", function() {
          game._attack();
        });

      game.grave = $("<div>");

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
                .append(game.charactersEl)
            )
        )
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
                .addClass("col-4 d-flex justify-content-center align-items-center")
                .append(game.playerEl)
            )
            .append(
              $("<div>")
                .addClass("col-4 d-flex justify-content-center align-items-center")
                .append(game.attackButtonEl)
            )
            .append(
              $("<div>")
                .addClass("col-4 d-flex justify-content-center align-items-center")
                .append(game.opponentEl)
            )
        )
        .addClass("game container");

      game._update();
    },

    _toJson: function(el) {
      return {
        name: el.character("name"),
        health: el.character("health"),
        attack: el.character("attack"),
        counter: el.character("counter")
      };
    },

    _player: function() {
      return this.playerEl.children().first();
    },

    _opponent: function() {
      return this.opponentEl.children().first();
    },

    _attack: function() {
      var game = this;

      var player = game._player();
      var opponent = game._opponent();

      var player_name = player.character("name");
      var opponent_name = opponent.character("name");
      var player_ap = player.character("attack");
      var opponent_cp = opponent.character("counter");

      if (player.character("hit", opponent)) {
        game.message = [
          player_name + " hits " + opponent_name + " for " + player_ap + " points of damage.",
          opponent_name + " counters " + player_name + " for " + opponent_cp + " points of damage."
        ].join("<br/>");
      }

      var player_health = player.character("health");
      var opponent_health = opponent.character("health");

      if (player_health > 0 && opponent_health <= 0) {
        game.grave.append(opponent);

        if (game.charactersEl.children().length > 0) {
          game.message += [game.message, '<span class="text-danger">' + opponent_name + " eliminated.</span>", "Select a new Opponent."].join("<br/>");
        } else {
          game.message = "Hurray!";
          game._popup(player_name + " prevailed!", "Game Over", true);
        }
      } else if (player_health <= 0) {
        game._popup(player_name + " eliminated!", "Game Over");
      }

      game._update();
    },

    _popup: function(message, title, won) {
      $("<div>")
        .addClass("modal fade")
        .attr({ role: "dialog" })
        .append(
          $("<div>")
            .addClass("modal-dialog modal-sm")
            .append(
              $("<div>")
                .addClass("modal-content bg-dark")
                .append(
                  $("<div>")
                    .addClass("modal-header")
                    .append($("<h5>").text(title))
                    .append(
                      $("<button>")
                        .addClass("close text-light")
                        .attr({ type: "button", "data-dismiss": "modal", "aria-label": "Close" })
                        .append(
                          $("<span>")
                            .attr({ "aria-hidden": true })
                            .text("x")
                        )
                    )
                )
                .append(
                  $("<div>")
                    .addClass("modal-body")
                    .append(
                      $("<h5>")
                        .addClass("text-center")
                        .addClass(won ? "text-success" : "text-danger")
                        .text(message)
                    )
                )
            )
        )
        .modal({ keyboard: false, backdrop: false });
    },

    _characterSelect: function(el) {
      var game = this;

      if (
        $(el).get(0) !==
          game.playerEl
            .children()
            .first()
            .get(0) &&
        $(el).get(0) !==
          game.opponentEl
            .children()
            .first()
            .get(0)
      ) {
        if (game.playerEl.children().length === 0) {
          game.playerEl.append(el.character("roll", "player"));
          game.message = "Select an Opponent";
        } else if (game.opponentEl.children().length === 0) {
          game.opponentEl.append(el.character("roll", "enemy"));
          game.message = "Go!";
        }

        game._update();
      }
    },

    _update: function() {
      var game = this;

      game.attackButtonEl.attr("disabled", true);
      game.messageEl.html(game.message);

      if (game._player().length > 0 && game._opponent().length > 0) {
        if (game._player().character("health") > 0 && game._opponent().character("health") > 0) {
          game.attackButtonEl.attr("disabled", false);
        }
      }
    }
  });
})(jQuery);
