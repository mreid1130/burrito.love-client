$(window).ready(function() {

  gameloop = function(game) {

    var footballurritoloop = setInterval(function() {
      if (!game.player.down) {
        game.loop();
      } else {

        clearInterval(footballurritoloop);

        $.ajax({
          type: 'POST',
          url: 'https://salty-reaches-7186.herokuapp.com/stats/highScore',
          data: {
            game: 'footballurrito',
            time: game.score,
            burritosEaten: game.burritosEaten,
            opponentsTackled: game.opponentsTackled,
          }
        })
        $('#field').remove() // removed the gameboard (and thus all HTML elements)
        $('.game_container').prepend("<div id='field'><div class='game-overlay'><div id='start'></div></div></div>")

        console.log($('#start'))
        $("#start").on('click', function(e) {
          e.preventDefault();
          $('#start').remove();
          $('.game-overlay').remove();
          game = new FootballGame();
          gameloop(game); // recursive call to run gameloop again
        })

      }
    }, 20);

    ['left', 'right', 'up', 'down'].forEach(function(direction) {
      Mousetrap.bind(direction, function(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        game.player.dir = direction;
        game.player.movement = 4;
      }, 'keydown');

      Mousetrap.bind(direction, function(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        game.player.dir = 'none';
        game.player.movement = 0;
        game.player.$player.css('background-image', "url('/customGames/footballurrito/img/standingplayer.png')")
      }, 'keyup');
    })

  };

  // When the start button is click, a new game is initiated
  $('#start').on('click', function(e) {
    e.preventDefault();
    $('#start').remove();
    $('.game-overlay').remove();
    game = new FootballGame();
    gameloop(game);
  });

});
