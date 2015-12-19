// Creating game Pharser.AUTO trying to use WebGL, if not then use Canvas
var game = new Phaser.Game(800, 600, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background', 'assets/background.png');
    },
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'background');
    },
    update: function() {

    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
