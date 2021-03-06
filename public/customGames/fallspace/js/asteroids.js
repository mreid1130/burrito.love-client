function Asteroid(gameboard) {
  this.$gameboard = gameboard;
  this.height = 25;
  this.width = 25;
  this.y = this.height;
  this.x = Math.floor(Math.random() * this.$gameboard.width());
  this.initDisplay();
};

Asteroid.prototype = {

  updateDisplay: function() {
    this.$meteor.css('top', this.y - this.height / 2);
    this.$meteor.css('left', this.x - this.width / 2);
  },

  initDisplay: function() {
    this.$meteor = $("<div class='asteroid'></div>");
    $('#gameboard').append(this.$meteor);
    this.updateDisplay();
  },

  move: function() {

    xmove = Math.floor((Math.random() * 5) + 1);
    ymove = Math.floor((Math.random() * 5) + 1);

    this.y += ymove

    if (!this.inbounds()) {
      this.$meteor.css('display', 'none');
      this.$meteor.remove();
      this.outOfBounds = true;
    }

    this.updateDisplay();
  },

  inbounds: function() {
    return this.x > this.width / 2 && this.x < this.$gameboard.width() && this.y > this.height / 2 && this.y < this.$gameboard.height();
  },

  hit: function(shot) {
    return (this.x < shot.x + shot.width / 2 + this.width / 2 &&
      this.x + this.width / 2 + shot.width / 2 > shot.x &&
      this.y < shot.y + shot.height / 2 + this.height / 2 &&
      this.height / 2 + this.y + shot.height / 2 > shot.y);
  },

  explode: function() {
    meteor = this.$meteor;
    this.$meteor.css('background-image', "url('/customGames/fallspace/img/explosion.png')");
    this.strike = true;
    setTimeout(function() {
      meteor.remove();
    }, 250)
  },

  destroy: function() {
    this.$meteor.remove();
  }
}
