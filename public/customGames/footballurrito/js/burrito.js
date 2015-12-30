function Burrito(gameboard) {
  this.$gameboard = gameboard;
  this.height = 46;
  this.width = 60;
  this.x = Math.floor(Math.random() * this.$gameboard.width());
  this.y = Math.floor(Math.random() * this.$gameboard.height());
  this.initDisplay();
  this.lifespan = Math.floor(Math.random() * 10000) + 5000;
  this.created = new Date().getTime();
}

Burrito.prototype = {

  updateDisplay: function() {
    this.$burrito.css('top', this.y - this.height / 2);
    this.$burrito.css('left', this.x - this.width / 2);
  },

  initDisplay: function() {
    this.$burrito = $("<div class='burrito'</div>");
    $('#field').append(this.$burrito);

    this.updateDisplay();
  },

  decay: function() {
    if (new Date().getTime() - this.created >= this.lifespan) {
      this.destroy();
    }
  },

  destroy: function() {
    this.$burrito.remove();
    this.eaten = true;
  }

}
