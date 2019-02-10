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
or `node karaoke.js filename.kar`

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

Please check the [**API Reference**](https://jazz-soft.net/doc/JZZ/karaoke.html) !

    <div id=kar></div>

    <script><!--
      var midiout = JZZ().openMidiOut().or('Cannot open MIDI Out');
      var data = ... // load the .kar file as string
      var smf = new JZZ.MIDI.SMF(data);
      var karaoke = new JZZ.gui.Karaoke('kar');
      var player = smf.player();
      karaoke.load(smf);
      player.connect(karaoke);
      player.connect(midiout);
      player.onEnd = function() { karaoke.reset(); };
      player.play();
    --></script>

## CSS

It's up to the user how to style the Karaoke.
Generated Karaoke DOM tree looks like the following:

    <div class=karaoke> // parent element
      <div> // one for each track that has text
        <div class=t>...</div> // Title and oter special text events:
        // t for @T..., k for @K..., v for @V..., i for @I..., l for @L..., w for @W...
        // most of these except the title are best to set invisible.
        <p class=past> // past verses
        ...
        </p>
        <p class=current> // current verse
          <div class=past> // past line
          ...
          </div>
          <div class=current> // current line
            <div class=past>Ma</div> // past span
            <div class=current>ry </div> // current span
            <div>was </div> // future spans - no class
            ...
          </div>
          <div> // future lines - no class
          ...
          </div>
        </p>
        <p> // future verses - no class
        ...
        </p>
      </div>
    </div>

## More information

Please visit [**https://jazz-soft.net**](https://jazz-soft.net) for more information.  
Your questions and comments are welcome [**here**](https://jazz-soft.org).

We would really appreciate your [**support**](https://jazz-soft.net/donate)!
