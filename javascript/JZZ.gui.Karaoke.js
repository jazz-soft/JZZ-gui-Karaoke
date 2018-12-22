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
    self.spans = [];
    self.current = 0;
    self.div = document.createElement('div');
    self.div.className = 'karaoke';
    if (typeof at == 'string') {
      try {
        document.getElementById(at).appendChild(self.div);
        return self;
      }
      catch(e) {}
    }
    try {
      at.appendChild(self.div);
      return self;
    }
    catch(e) {}
    document.body.appendChild(self.div);
    return self;
  }
  Karaoke.prototype.load = function(smf) {
    var i, j, msg, txt, cl;
    var par, div, span;
    while (this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }
    this.spans = [];
    this.current = 0;
    for (i = 0; i < smf.length; i++) {
      if (smf[i] instanceof JZZ.MIDI.SMF.MTrk) {
        par = undefined;
        for (j = 0; j < smf[i].length; j++) {
          if (smf[i][j].ff == 1) {
            txt = JZZ.lib.fromUTF8(smf[i][j].dd);
            if (txt[0] == '@') {
              div = document.createElement('div');
              cl = { K: 'k', V: 'v', I: 'i', L: 'l', T: 't', W: 'w' }[txt[1]];
              if (cl) {
                txt = txt.substring(2);
                div.className = cl;
              }
              div.appendChild(document.createTextNode(txt));
              this.div.appendChild(div);
              par = undefined;
              continue;
            }
            if (txt[0] == '\\') {
              txt = txt.substring(1);
              par = undefined;
            }
            else if (txt[0] == '/') {
              txt = txt.substring(1);
              div = undefined;
            }
            if (!par) {
              par = document.createElement('p');
              this.div.appendChild(par);
              div = undefined;
            }
            if (!div) {
              div = document.createElement('div');
              par.appendChild(div);
            }
            span = document.createElement('span');
            span.appendChild(document.createTextNode(txt));
            div.appendChild(span);
            this.spans.push([smf[i][j].tt, span]);
          }
        }
      }
    }
    this.spans.sort(function(a, b) { return a[0] - b[0]; });
  };
  Karaoke.prototype.reset = function() {
    for (var i = 0; i < this.spans.length; i++) this.spans[i][1].className = '';
    this.current = 0;
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
