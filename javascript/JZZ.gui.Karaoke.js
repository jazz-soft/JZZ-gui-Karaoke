(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.gui.Karaoke', ['JZZ', 'JZZ.midi.SMF'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

  if (!JZZ.gui) JZZ.gui = {};
  if (JZZ.gui.Karaoke) return;

  function Karaoke(at) {
    var self = new JZZ.Widget();
    for (var k in Karaoke.prototype) if (Karaoke.prototype.hasOwnProperty(k)) self[k] = Karaoke.prototype[k];
    self.tracks = [];
    try {
      self.gui = document.createElement('div');
    }
    catch (e) {
      return self; // not in browser
    }
    self.gui.className = 'karaoke';
    if (typeof at == 'string') {
      try {
        document.getElementById(at).appendChild(self.gui);
        return self;
      }
      catch(e) {}
    }
    try {
      at.appendChild(self.gui);
      return self;
    }
    catch(e) {}
    document.body.appendChild(self.gui);
    return self;
  }
  Karaoke.prototype.load = function(smf) {
    var i, j, msg, txt, cl, tt;
    var track, verse, line, div, span;
    if (this.gui) while (this.gui.firstChild) {
      this.gui.removeChild(this.gui.firstChild);
    }
    this.tracks = [];
    for (i = 0; i < smf.length; i++) {
      if (smf[i] instanceof JZZ.MIDI.SMF.MTrk) {
        track = undefined;
        for (j = 0; j < smf[i].length; j++) {
          if (smf[i][j].ff == 1) {
            tt = smf[i][j].tt;
            if (!track) {
              track = { tt: tt, verses: [] };
              if (this.gui) {
                track.dom = document.createElement('div');
                this.gui.appendChild(track.dom);
              }
              this.tracks.push(track);
              verse = undefined;
            }
            txt = JZZ.lib.fromUTF8(smf[i][j].dd);
            if (txt[0] == '@') {
              cl = { K: 'k', V: 'v', I: 'i', L: 'l', T: 't', W: 'w' }[txt[1]];
              if (cl) txt = txt.substring(2);
              if (this.gui) {
                div = document.createElement('div');
                if (cl) div.className = cl;
                div.appendChild(document.createTextNode(txt));
                track.dom.appendChild(div);
              }
              if (cl == 't') track.title = track.title ? track.title + '\n' + txt : txt;
              verse = undefined;
              continue;
            }
            if (txt[0] == '\\') {
              txt = txt.substring(1);
              verse = undefined;
            }
            else if (txt[0] == '/') {
              txt = txt.substring(1);
              line = undefined;
            }
            if (!verse) {
              verse = { tt: tt, lines: [] };
              if (this.gui) {
                verse.dom = document.createElement('p');
                track.dom.appendChild(verse.dom);
              }
              track.verses.push(verse);
              line = undefined;
            }
            if (!line) {
              line = { tt: tt, spans: [] };
              if (this.gui) {
                line.dom = document.createElement('div');
                verse.dom.appendChild(line.dom);
              }
              verse.lines.push(line);
            }
            span = { tt: tt, txt: txt };
            if (this.gui) {
              span.dom = document.createElement('span');
              span.dom.appendChild(document.createTextNode(txt));
              line.dom.appendChild(span.dom);
            }
            line.spans.push(span);
          }
        }
      }
    }
  };
  Karaoke.prototype.reset = function() {
    //for (var i = 0; i < this.spans.length; i++) this.spans[i][1].className = '';
    //this.current = 0;
  };
  Karaoke.prototype._receive = function(msg) {
    if (typeof msg.tt != 'undefined') {
      for (; this.current < this.spans.length; this.current++) {
        if (msg.tt < this.spans[this.current][0]) break;
        this.spans[this.current][1].className = 'hi';
      }
    }
  };

  JZZ.gui.Karaoke = Karaoke;
});
