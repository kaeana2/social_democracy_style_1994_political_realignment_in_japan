(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Add your custom code here.
  };

  var TITLE = "1994 Political Realignment in Japan — Practice MOD" + '_' + "by kaeana2";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };
  
  window.showMods = function() {
    window.hideOptions();
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('mod_loader')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('mod_loader');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
    window.dendryUI.show_portraits = true;
    window.dendryUI.saveSettings();
   };

  window.disableImages = function() {
    window.dendryUI.show_portraits = false;
    window.dendryUI.saveSettings();
};

window.enableLightMode = function() {
    window.dendryUI.dark_mode = false;
    document.body.classList.remove('dark-mode');
    window.dendryUI.saveSettings();
};
window.enableDarkMode = function() {
    window.dendryUI.dark_mode = true;
    document.body.classList.add('dark-mode');
    window.dendryUI.saveSettings();
};

window.enableGrayMode = function() {
    window.dendryUI.gray_mode = true;
    document.body.classList.add('gray-mode');
    window.dendryUI.saveSettings();
};
window.disableGrayMode = function() {
    window.dendryUI.gray_mode = false;
    document.body.classList.remove('gray-mode');
    window.dendryUI.saveSettings();
};

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
    if (window.dendryUI.gray_mode) {
        $('#gray_on')[0].checked = true;
    } else {
        $('#gray_no')[0].checked = true;
    }
  };

  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
  window.displayText = function(text) {
      return text;
  };

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  window.updateSidebar = function() {
      $('#qualities').empty();
      var effectiveTab = window.statusTab;
      var qualities = dendryUI.dendryEngine.state.qualities;
      if (qualities.ending_preview && effectiveTab == 'status.politics') {
          effectiveTab = qualities.ending_preview == 2 ? 'status.politics_ending_2' : (qualities.ending_preview == 3 ? 'status.politics_ending_3' : (qualities.ending_preview == 4 ? 'status.politics_ending_4a' : (qualities.ending_preview == 5 ? 'status.politics_ending_4b' : (qualities.ending_preview == 6 ? 'status.politics_ending_5_kaifu' : (qualities.ending_preview == 7 ? 'status.politics_ending_5_kono' : (qualities.ending_preview == 8 ? 'status.politics_ending_5_hata' : (qualities.ending_preview == 9 ? 'status.politics_ending_6' : 'status.politics_ending')))))));
      }
      if (qualities.ending_preview && effectiveTab == 'status.polls') {
          effectiveTab = qualities.ending_preview == 2 ? 'status.polls_ending_2' : (qualities.ending_preview == 3 ? 'status.polls_ending_3' : (qualities.ending_preview == 4 ? 'status.polls_ending_4a' : (qualities.ending_preview == 5 ? 'status.polls_ending_4b' : (qualities.ending_preview == 6 ? 'status.polls_ending_5_kaifu' : (qualities.ending_preview == 7 ? 'status.polls_ending_5_kono' : (qualities.ending_preview == 8 ? 'status.polls_ending_5_hata' : (qualities.ending_preview == 9 ? 'status.polls_ending_6' : 'status.polls_ending')))))));
      }
      var scene = dendryUI.game.scenes[effectiveTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.updateSidebarRight = function() {
    $('#qualities_right').empty();
    var scene = dendryUI.game.scenes[window.statusTabRight];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    $('#qualities_right').append(dendryUI.contentToHTML.convert(displayContent));
};

  window.changeTab = function(newTab, tabId, isRight) {
      if (tabId == 'poll_tab' && (dendryUI.dendryEngine.state.qualities.historical_mode || dendryUI.dendryEngine.state.qualities.rubicon)) {
          if (dendryUI.dendryEngine.state.qualities.historical_mode && !dendryUI.dendryEngine.state.qualities.rubicon) window.alert('Polls are not available in historical mode.');
          if (dendryUI.dendryEngine.state.qualities.rubicon) window.alert('Polls are not available after crossing the rubicon.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      if (isRight) {
        window.statusTabRight = newTab;
        window.updateSidebarRight();
        } else {
          window.statusTab = newTab;
          window.updateSidebar();
    }
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
      window.updateSidebarRight();
      window.renderEndingParliament();
  };

  window.renderEndingParliament = function() {
      var svg = document.getElementById('ending-parliament');
      if (!svg || svg.getAttribute('data-rendered') == '1') return;

      var q = window.dendryUI.dendryEngine.state.qualities;
      var parties;
      if (q.ending_preview == 2) {
          parties = [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'SPD', seats: q.sdp_seats, color: '#55B7E8'},
              {name: 'NFP', seats: q.nfp_seats, color: '#FF6699'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'LRP', seats: q.lrp_seats, color: '#278F87'},
              {name: 'NLP', seats: q.nlp_seats, color: '#C89428'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      } else if (q.ending_preview == 3) {
          parties = q.ed3_pup_variant ? [
              {name: 'PUP', seats: q.pup_seats, color: '#D9272E'},
              {name: 'SDRA', seats: q.sdra_seats, color: '#3F91A8'},
              {name: 'Komeito', seats: q.komeito_seats, color: '#D6CF00'},
              {name: 'Lib', seats: q.liberal_seats, color: '#007CDA'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ] : [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'SDRA', seats: q.sdra_seats, color: '#3F91A8'},
              {name: 'Komeito', seats: q.komeito_seats, color: '#D6CF00'},
              {name: 'Lib', seats: q.liberal_seats, color: '#007CDA'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      } else if (q.ending_preview == 4) {
          parties = [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'JSP', seats: q.jsp_seats, color: '#084195'},
              {name: 'NFP', seats: q.nfp_seats, color: '#FF6699'},
              {name: 'Sakigake', seats: q.sakigake_seats, color: '#8CBF3F'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      } else if (q.ending_preview == 5) {
          parties = [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'JSP', seats: q.jsp_seats, color: '#084195'},
              {name: 'Sakigake', seats: q.sakigake_seats, color: '#8CBF3F'},
              {name: 'DSP', seats: q.dsp_seats, color: '#E8891C'},
              {name: 'Komeito', seats: q.komeito_seats, color: '#D6CF00'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'Lib', seats: q.liberal_seats, color: '#007CDA'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      } else if (q.ending_preview == 6 || q.ending_preview == 7 || q.ending_preview == 8) {
          parties = [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'JSP', seats: q.jsp_seats, color: '#084195'},
              {name: 'NFP', seats: q.nfp_seats, color: '#FF6699'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'Sakigake', seats: q.sakigake_seats, color: '#8CBF3F'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      } else if (q.ending_preview == 9) {
          parties = [
              {name: 'PUP', seats: q.pup_seats, color: '#D9272E'},
              {name: 'NWP', seats: q.nwp_seats, color: '#8C6E9E'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'FRP', seats: q.frp_seats, color: '#2F6DB0'}
          ];
      } else {
          parties = [
              {name: 'JCP', seats: q.jcp_seats, color: '#EE0000'},
              {name: 'SDP', seats: q.sdp_seats, color: '#55B7E8'},
              {name: 'DPJ', seats: q.dpj_seats, color: '#D64B5F'},
              {name: 'Sakigake', seats: q.sakigake_seats, color: '#8CBF3F'},
              {name: 'Others', seats: q.other_seats, color: '#808080'},
              {name: 'NFP', seats: q.nfp_seats, color: '#FF6699'},
              {name: 'LDP', seats: q.ldp_seats, color: '#4DB56A'}
          ];
      }
      var totalSeats = parties.reduce(function(sum, party) { return sum + party.seats; }, 0);
      if (!totalSeats) return;

      var rows = 14;
      var rowWeights = [];
      var weightTotal = 0;
      for (var row = 0; row < rows; row++) {
          rowWeights.push(row + 6);
          weightTotal += row + 6;
      }
      var rowCounts = rowWeights.map(function(weight) {
          return Math.floor(weight / weightTotal * totalSeats);
      });
      var allocated = rowCounts.reduce(function(sum, count) { return sum + count; }, 0);
      for (var remainder = 0; remainder < totalSeats - allocated; remainder++) {
          rowCounts[rows - 1 - (remainder % rows)] += 1;
      }

      var points = [];
      for (var ring = 0; ring < rows; ring++) {
          var radius = 58 + ring * (172 / (rows - 1));
          var count = rowCounts[ring];
          for (var seat = 0; seat < count; seat++) {
              var angle = Math.PI - ((seat + 0.5) / count * Math.PI);
              points.push({
                  angle: angle,
                  radius: radius,
                  x: 250 + Math.cos(angle) * radius,
                  y: 242 - Math.sin(angle) * radius
              });
          }
      }
      points.sort(function(a, b) {
          return b.angle - a.angle || a.radius - b.radius;
      });

      var namespace = 'http://www.w3.org/2000/svg';
      svg.setAttribute('viewBox', '0 0 500 250');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', q.ending_preview == 3 ? '1997 Lower House seat composition' : ((q.ending_preview == 6 || q.ending_preview == 7 || q.ending_preview == 8) ? '1995 Lower House seat composition' : ((q.ending_preview == 4 || q.ending_preview == 5) ? '1994 Lower House seat composition' : '1996 Lower House seat composition')));
      svg.style.maxWidth = '500px';
      svg.style.width = '100%';
      svg.style.height = 'auto';

      var pointIndex = 0;
      parties.forEach(function(party) {
          for (var i = 0; i < party.seats; i++) {
              var point = points[pointIndex++];
              var circle = document.createElementNS(namespace, 'circle');
              circle.setAttribute('cx', point.x.toFixed(2));
              circle.setAttribute('cy', point.y.toFixed(2));
              circle.setAttribute('r', '5');
              circle.setAttribute('fill', party.color);
              circle.setAttribute('stroke', '#f5f2e6');
              circle.setAttribute('stroke-width', '0.55');
              circle.setAttribute('data-party', party.name);
              svg.appendChild(circle);
          }
      });
      svg.setAttribute('data-rendered', '1');
  };

  window.toggleDem = function toggleDemographicTable() {
      const resultsDiv = document.getElementById('results');
      // Toggle display between 'none' and 'block'
      if (resultsDiv.style.display === 'none' || resultsDiv.style.display === '') {
          resultsDiv.style.display = 'block'; // or 'table' for the table specifically
      } else {
          resultsDiv.style.display = 'none';
      }
  };
  window.toggleGraph = function toggleGraph() {
      const svgElement = document.getElementById('party_support_history');
      if (svgElement.style.display === 'none' || svgElement.style.display === '') {
          svgElement.style.display = 'block';
      } else {
          svgElement.style.display = 'none';
      }
  };
  window.toggleElectionGraph = function toggleElectionGraph() {
      const svgElement = document.getElementById('election_history');
      if (svgElement.style.display === 'none' || svgElement.style.display === '') {
          svgElement.style.display = 'block';
      } else {
          svgElement.style.display = 'none';
      }
  };
  window.toggleNews = function toggleNews() {
      const elements = document.querySelectorAll('.dnvp');
      const elements2 = document.querySelectorAll('.other');
      const button = document.getElementById('news_tab');

      if (!button) {
          console.error('Button with id "news_tab" not found.');
          return;
      }

      elements.forEach(function (element) {
          if (element.style.display !== 'block') {
              element.style.display = 'block';
              button.innerHTML = "View Other News";
          } else {
              element.style.display = 'none';
              button.innerHTML = "View Right-Wing News";
          }
      });

      elements2.forEach(function (element) {
          if (element.style.display !== 'none') {
              element.style.display = 'none';
          } else {
              element.style.display = 'block';
          }
      });

      button.style.backgroundColor = '#dddddd';
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.statusTabRight = "status_right";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: true});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    if (window.dendryUI.gray_mode) {
        document.body.classList.add('gray-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
    window.statusTab = "status";
    window.updateSidebar();
    window.statusTabRight = "status_right";
    window.updateSidebarRight();
  };

}());
