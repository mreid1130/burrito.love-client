$(document).ready(function() {
  console.log('here');
  gameloop = function(game) {

    var fallspaceloop = setInterval(function() {
      console.log('woah');

      // checks if player is dead
      if (!game.faller.dead) {
        game.loop();
      } else {
        clearInterval(fallspaceloop) // if player is dead, the loop is stopped

        $.ajax({
          type: 'POST',
          url: 'https://salty-reaches-7186.herokuapp.com/stats/highScore',
          data: {
            game: 'fallspace',
            time: game.score,
            shipsDestroyed: game.enemyKills,
            asteroidsDestroyed: game.asteroidKills,
            wallsDestroyed: game.wallKills
          }
        })

        $('#gameboard').remove();
        $('.game_container').prepend("<div id='gameboard'><div class='game-overlay'><div id='start'></div></div></div>")

        // when the reset button is clicked...
        $('#start').on('click', function(e) {
          e.preventDefault();
          $('#start').remove();
          $('.game-overlay').remove();
          game = new Game(); // create a new Game object
          gameloop(game); // recursive call to run gameloop again
        })
      }
    }, 20);

    // Keybinding to move player on keydown until keyup
    ['left', 'right', 'up', 'down'].forEach(function(direction) {
      Mousetrap.bind(direction, function(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        game.faller.dir = direction
        game.faller.movement = 5
      }, 'keydown');

      Mousetrap.bind(direction, function(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        game.faller.dir = direction
        game.faller.movement = 0
      }, 'keyup');
    });

    // Keybinds user firing to space bar
    Mousetrap.bind('space', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      game.userFire();
    })

  };

  // When the start button is click, a new game is initiated
  $('#start').on('click', function(e) {
    e.preventDefault();
    $('#start').remove();
    $('.game-overlay').remove();
    game = new Game();
    gameloop(game);

  });

});
