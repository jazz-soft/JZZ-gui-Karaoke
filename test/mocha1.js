var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
require('..')(JZZ);
var assert = require('assert');

describe('In terminal', function() {
  it('it works!', function(done) {
    assert.equal(0, 0);
    var file = 'mary.mid';
    var data = require('fs').readFileSync(file, 'binary');
    var smf = new JZZ.MIDI.SMF(data);
    var kar = new JZZ.gui.Karaoke();
    kar.load(smf);
    var player = smf.player();
    player.connect(kar);
    player.speed(20);
    player.play();
    setTimeout(function() { console.log('\n\n' + kar); done(); }, 2000);
  }).timeout(2500);
});
