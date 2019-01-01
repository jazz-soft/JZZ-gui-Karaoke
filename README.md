# JZZ-gui-Karaoke

Karaoke MIDI Player

[![npm](https://img.shields.io/npm/v/jzz-gui-karaoke.svg)](https://www.npmjs.com/package/jzz-gui-karaoke)
[![npm](https://img.shields.io/npm/dt/jzz-gui-karaoke.svg)](https://www.npmjs.com/package/jzz-gui-karaoke)

## Install

`npm install jzz-gui-karaoke --save`  
or `bower install jzz-gui-karaoke`  
or `yarn add jzz-gui-karaoke`  
or get the full development version and minified scripts from [**GitHub**](https://github.com/jazz-soft/JZZ-gui-Karaoke)

## Test
`node karaoke.js`

## Usage

##### Plain HTML

    <script src="JZZ.js"></script>
    <script src="JZZ.midi.SMF.js"></script>
    <script src="JZZ.gui.Karaoke.js"></script>
    //...

##### CDN (always the latest version!)

    <script src="https://cdn.jsdelivr.net/npm/jzz"></script>
    <script src="https://cdn.jsdelivr.net/npm/jzz-midi-smf"></script>
    <script src="https://cdn.jsdelivr.net/npm/jzz-gui-karaoke"></script>
    //...

##### CommonJS

    var JZZ = require('jzz');
    require('jzz-midi-smf')(JZZ);
    require('jzz-gui-player')(JZZ);
    //...

##### AMD

    require(['JZZ', 'JZZ.midi.SMF', 'JZZ.gui.Karaoke'], function(JZZ, smf, kar) {
      // ...
    });

## Playing MIDI file

    <div id=kar></div>

    <script><!--
      var midiout = JZZ().openMidiOut().or('Cannot open MIDI Out');
      var data = ... // load the .kar file as string
      var smf = new JZZ.MIDI.SMF(data);
      var player = smf.player();
      var karaoke = new JZZ.gui.Karaoke('kar');
      player.connect(karaoke);
      player.connect(midiout);
      player.onEnd = function() { karaoke.reset(); };
      player.play();
    --></script>

## More information

Please visit [**https://jazz-soft.net**](https://jazz-soft.net) for more information.  
Your questions and comments are welcome [**here**](https://jazz-soft.org).

We would really appreciate your [**support**](https://jazz-soft.net/donate)!
