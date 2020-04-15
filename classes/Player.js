
var shortID = require('shortid');
// var Vector2 = require('./Vector2.js');

module.exports = class Player {
    constructor() {
        this.username = 'admin';
        this.id = shortID.generate();
    }
}