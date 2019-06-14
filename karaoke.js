var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
require('.')(JZZ);

var file = process.argv[2];
if (typeof file == 'undefined') file = 'mary.mid';
var data = require('fs').readFileSync(file, 'binary');
var smf = new JZZ.MIDI.SMF(data);
var kar = new JZZ.gui.Karaoke();
kar.load(smf);
var player = smf.player();
player.connect(kar);

JZZ.lib.registerMidiOut('dummy', {
  _info: function(name) { return { name: name }; },
  _openOut: function(port) { port._resume(); }
});

JZZ().or('Cannot start MIDI engine!').openMidiOut().or('Cannot open MIDI Out!').and(function() {
  player.connect(this);
  player.play();
});
