TestApp.controllers.controller('MainCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

  var KEY_OLD = "AIRCONSOLE_CHECKLIST";
  var KEY = "AIRCONSOLE_CHECKLIST_V1";
  var storage_key = KEY;
  $scope.total_questions = 0;
  $scope.marked_questions = 0;
  $scope.questions_default = {
    multi_screen: [
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />there is always only 1 primary controller.',
        checked: false
      },
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />there is always only 1 primary screen.',
        checked: false
      },
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />only the primary screen can control the game.',
        checked: false
      },
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />only the primary controller can control the game through the primary screen.',
        checked: false
      },
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />when the primary screen leaves the game session,<br />only one of the secondary screens becomes the primary screen.',
        checked: false
      },
      {
        text: 'I have tested that with 2 or more screens connected in a game session,<br />when the primary controller leave the game session,<br />the new master controller on the primary screen becomes the primary controller.',
        checked: false
      }
    ],
    quality:[
      {
        text: "I have tested all single-player game modes, and the game runs smoothly without any bugs.",
        checked: false
      },
      {
        text: "I have tested all the multiplayer game modes, and the game works smoothly without any bugs.",
        checked: false
      },
      {
        text: "I have tested that all transitions between scenes in the game are instantaneous. If the loading screen is shown during the transition, the loading screen is not stuck (the loading screen has a continuous loading animation).",
        checked: false
      },
      {
        text: "If loading is longer than 30 seconds, I am showing to the user something visually dynamic on the screen.",
        checked: false
      },
      {
        text: "I have tested that when controllers leave or new ones join the game, it works gracefully - notifies the players, and the game state is not stuck. (The recommendation is not to allow to join in the middle of the level/race/gameplay but to take all the players to for example the main menu after showing a message on the main screen).",
        checked: false
      },
      {
        text: "I have tested that only the master controller can control the game menu.",
        checked: false
      },
      {
        text: "I have tested that when the master controller leaves the game, one of the remaining players is designated as the new master, and that controller can control the game menu.",
        checked: false
      },
      {
        text: 'I have tested and confirmed that the game runs at 30 fps on modern Chromium-based web browsers. <a href="/#!/guides/technical-requirements" target="_blank">(Read Guide)</a>',
        checked: false
      }
    ],
    general: [
      {
        text: "My game includes the latest AirConsole API.",
        checked: false
      },
      {
        text: "All resources in my game are loaded over https.",
        checked: false
      },
      {
        text: 'I have tested my game with unstable connection and higher latency. <a href="/#!/guides/unstable_connection" target="_blank">(Read Guide)</a>',
        checked: false
      },
      {
        text: "My game loads less than 50 MB (gzipped) of resources to start (enter Main Menu).",
        checked: false
      },
      {
        text: "Additional resources that are loaded later do not exceed 50 MB (gzipped) per request.",
        checked: false
      }, {
        text: "I don't try to hide the top AirConsole bar (Using the DEPRECATED showDefaultUI() from the AirConsole API).",
        checked: false
      }
    ],
    localisation:[
      {
        text: "I tested that the game loads the game in the same language as the main screen (browser or Android TV). If the game does not support the language of the screen, the game defaults to English. NOTE: Only the language of the screen is relevant to the game, not the language of the controllers.",
        checked: false
      },
      {
        text: "I tested that the phone loads the controller in the language set on the phone (defaulting to English if the language is unsupported). NOTE: The game and the controller may have different languages.",
        checked: false
      },
      {
        text: "I have tested that my custom language menu in the game selection is reset to the main screen language setting when the game is reloaded (meaning it's not saved into the player's state).",
        checked: false
      },
    ],
    screen: [
      {
        text: "My game is self-explanatory or provides players with instructions on how to play.",
        checked: false
      },
      {
        text: "My game works on different screen resolutions / aspect ratios (Responsive design (TV resolution 960x540)).",
        checked: false
      },
      {
        text: "My game shows how many players are missing for the game to be started (Or: there is no minimal number of players in my game).",
        checked: false
      },
      {
        text: "If more players are connected than are allowed in my game, spare players are informed of that on their controllers (Or: there is no maximal number of players in my game).",
        checked: false
      },
      {
        text: "My game remains functional when devices connect during the game.",
        checked: false
      },
      {
        text: "My game remains functional when devices disconnect during the game,",
        checked: false
      },
      {
        text: "I did not hardcode device IDs and my game accounts for the fact that device ids may not be consecutive.",
        checked: false
      },
      {
        text: "My game displays the players' nicknames (see 'getNickname' in the API) instead of 'Player 1' etc. (Or: no names / titles are displayed).",
        checked: false
      },
      {
        text: "Menus (level selection, settings etc.) can only be controlled by the Master Controller.",
        checked: false
      },
      {
        text: 'I have read and followed the <a href="https://developers.airconsole.com/#!/guides/highscore" target="_blank">High Score Guide</a> and the launch checklist within (Or: my game does not use high scores).',
        checked: false
      },
      {
        text: 'I am using the <a href="https://github.com/AirConsole/airconsole-keyboard" target="_blank">AirConsole Keyboard</a> for any text input in my game (Or: My game does not use any text input).',
        checked: false
      },
      {
        text: 'I have added a <a href="https://developers.airconsole.com/#!/guides/unity-custom-loading-screen" target="_blank">custom loading screen</a> (Only games made with Unity).',
        checked: false
      }
    ],
    ctrl: [
      {
        text: "My game works on different phone screen sizes (Min. 320x480).",
        checked: false
      },
      {
        text: "My game controller lets the player know which character / avatar they are controlling (using colors, labels etc).",
        checked: false
      },
      {
        text: "My game controller shows buttons labelled with their function or a relevant icon rather than letters that need to be explained on screen.",
        checked: false
      },
      {
        text: "The layout (buttons, images, text, options...) of my game controller adapts to different in-game situations (menu, in-game, game over etc.).",
        checked: false
      },
      {
        text: "The individual buttons on my game controller are as big as possible on the phone screen.",
        checked: false
      },
      {
        text: "My controller uses custom visuals that fit the art style of my game.",
        checked: false
      },
      {
        text: "I am not using any html &lt;img&gt; tags on my controller, but set images as &lt;div&gt; backgrounds instead (so that no 'save image as' option appears).",
        checked: false
      }
    ],
    player_state: [
      {
        text: "The player's game progress is saved using the controller's UID.",
        checked: false
      },
      {
        text: "Multiplayer progression is correctly saved in each player's UID on their controller.",
        checked: false
      },
      {
        text: "Sound and music settings are not saved but reset to default values on reload.",
        checked: false
      },
      {
        text: "Language settings are not saved but reset to the main screen language on reload.",
        checked: false
      },
    ],
    ctx_screen: [
      {
        text: 'I have tested my game in the latest Chrome and Chrome 66 browser, and it works. I can use <a target="_blank" href="https://www.browserstack.com/">Browserstack</a> to ensure that everything works properly.',
        checked: false
      },
      {
        text: "I have tested my game in the Firefox browser and it works.",
        checked: false
      },
      {
        text: "I have tested my game in the Microsoft Edge browser and it works.",
        checked: false
      },
      {
        text: "I have tested my game in the Safari browser and it works.",
        checked: false
      }
    ],
    ctx_mobile: [
      {
        text: "I have tested my game on iOS in the Chrome browser, and it works.",
        checked: false
      },
      {
        text: "I have tested my game on iOS in the Safari browser, and it works.",
        checked: false
      },
      {
        text: "I have tested my game on iOS in the AirConsole App, and it works.",
        checked: false
      },
      {
        text: "I have tested my game on Android in the Chrome browser, and it works.",
        checked: false
      },
      {
        text: "I have tested my game on Android in the AirConsole App, and it works.",
        checked: false
      }
    ],
    ads: [
      {
        text: "After each level (or 15 minutes) I call showAd in my game.",
        checked: false
      },
      {
        text: "My game is paused in the onAdShow event and all audio is muted.",
        checked: false
      },
      {
        text: "My game is resumed in the onAdComplete event and all audio is unmuted.",
        checked: false
      },
      {
        text: 'I have tested that adding 3rd non-hero controller to the game shows a "Hero Subscription Promotion" ad.',
        checked: false
      }
    ],
    launch: [
      {
        text: "I have prepared a text for my game's landing page (ca. 200-500 words).",
        checked: false
      },
      {
        text: "I have prepared a 30-second trailer for my game's landing page.",
        checked: false
      },
      {
        text: "I am promoting my game on social media and will keep posting about it on relevant groups and hashtags.",
        checked: false
      }
    ],
    tv: [
      {
        text: "The game uses the latest AirConsole plugin version.",
        checked: false
      },
      {
        text: "The APK/ABB is not in Debug mode.",
        checked: false
      },
      {
        text: "The game uses minimum API level 19 and target API level 32.",
        checked: false
      },
      {
        text: 'I have tested and confirmed that the game runs at 25 fps on an Android TV device. <a href="/#!/guides/technical-requirement" target="_blank">(Read Guide)</a>',
        checked: false
      },
      {
        text: "I have tested that the game audio is muted and the game is paused on the connect screen.",
        checked: false
      },
      {
        text: "I tested that when the last player presses the \"leave session\" on the controller, the game sound is muted, and the game shows the connect screen.",
        checked: false
      },
      {
        text: "I have tested that when I rejoin from the connect screen, the game starts from the main menu, and I can control the game without any problem.",
        checked: false
      },
      {
        text: "I created all Appstore visuals.",
        checked: false
      }
    ]
  };
  $scope.questions = {};

  $scope.save = function() {
    localStorage.setItem(storage_key, JSON.stringify($scope.questions));
  };

  $scope.load = function() {
    return {...$scope.questions_default, ...JSON.parse(localStorage.getItem(storage_key))};
  };

  $scope.updateProgress = function(q) {
    $scope.save();
    if (q.checked === true) {
      $scope.marked_questions++;
    } else {
      $scope.marked_questions--;
    }
  };

  $scope.init = function() {

    if (localStorage.getItem(KEY_OLD)) {
      var conf = confirm("There is a newer version of this sheet. Do you want to load it? All progress will be lost!");
      if (conf) {
        localStorage.removeItem(KEY_OLD);
      } else {
        storage_key = KEY_OLD;
      }
    }

    $scope.questions = $scope.load();

    for (var ctx in $scope.questions) {
      var questions = $scope.questions[ctx];
      for (var i = 0; i < questions.length; i++) {
        $scope.total_questions++;
        if (questions[i].checked) {
          $scope.marked_questions++;
        }
      }
    }
  };

  $scope.getProgress = function() {
    var progress = Math.round($scope.marked_questions * 100 / $scope.total_questions);
    return progress + '%';
  };

  $scope.clearProgress = function() {
    for (var ctx in $scope.questions) {
      var questions = $scope.questions[ctx];
      for (var i = 0; i < questions.length; i++) {
        questions[i].checked = false;
      }
    }
    localStorage.removeItem(KEY);
    localStorage.removeItem(KEY_OLD);
    $scope.questions = $scope.load();
    $scope.marked_questions = 0;
  };

}]);
