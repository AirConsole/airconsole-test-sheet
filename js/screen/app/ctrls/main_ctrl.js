TestApp.controllers.controller('MainCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

  var KEY_OLD = "AIRCONSOLE_CHECKLIST";
  var KEY = "AIRCONSOLE_CHECKLIST_V1";
  var storage_key = KEY;
  $scope.total_questions = 0;
  $scope.marked_questions = 0;
  $scope.questions_default = {
    general: [
      {
        text: "My game includes the lastest AirConsole API",
        checked: false
      },
      {
        text: "All resources in my game are loaded over https",
        checked: false
      },
      {
        text: "I have tested my game with higher latency",
        checked: false
      }
    ],
    screen: [
      {
        text: "My game is self-explanatory or provides players with instructions on how to play",
        checked: false
      },
      {
        text: "My game works on different screen resolutions / aspect ratios (Responsive design (TV resolution 960x540))",
        checked: false
      },
      {
        text: "My game shows how many players are missing for the game to be started (Or: there is no minimal number of players in my game)",
        checked: false
      },
      {
        text: "If more players are connected than are allowed in my game, spare players are informed of that on their controllers (Or: there is no maximal number of players in my game)",
        checked: false
      },
      {
        text: "My game remains functional when devices connect during the game",
        checked: false
      },
      {
        text: "My game remains functional when devices disconnect during the game",
        checked: false
      },
      {
        text: "I did not hardcode device IDs and my game accounts for the fact that device ids may not be consecutive",
        checked: false
      },
      {
        text: "My game displays the players' nicknames (see 'getNickname' in the API) instead of 'Player 1' etc. (Or: no names / titles are displayed)",
        checked: false
      },
      {
        text: "Menus (level selection, settings etc.) can only be controlled by the Master Controller",
        checked: false
      },
      {
        text: "I have read and followed the High Score Guide and the launch checklist within (Or: my game does not use high scores)",
        checked: false
      },
      {
        text: "I am using the AirConsole Keyboard for any text input in my game (Or: My game does not use any text input)",
        checked: false
      },
      {
        text: "I have added a custom loading screen (Only games made with Unity)",
        checked: false
      }
    ],
    ctrl: [
      {
        text: "My game works on different phone screen sizes (Min. 320x480).",
        checked: false
      },
      {
        text: "My game controller lets the player know which character / avatar they are controlling (using colors, labels etc)",
        checked: false
      },
      {
        text: "My game controller shows buttons labelled with their function or a relevant icon rather than letters that need to be explained on screen",
        checked: false
      },
      {
        text: "The layout (buttons, images, text, options...) of my game controller adapts to different ingame situations (menu, ingame, game over etc.)",
        checked: false
      },
      {
        text: "The individual buttons on my game controller are as big as possible on the phone screen",
        checked: false
      },
      {
        text: "My controller uses custom visuals that fit the art style of my game",
        checked: false
      },
      {
        text: "I am not using any html <img> tags on my controller, but set images as <div> backgrounds instead (so that no 'save image as' option appears) ",
        checked: false
      }
    ],
    ctx_screen: [
      {
        text: "I have tested my game in the Chrome browser and it works",
        checked: false
      },
      {
        text: "I have tested my game in the Firefox browser and it works",
        checked: false
      },
      {
        text: "I have tested my game in the Microsoft Edge browser and it works",
        checked: false
      },
      {
        text: "I have tested my game in the Safari browser and it works",
        checked: false
      }
    ],
    ctx_mobile: [
      {
        text: "I have tested my game on iOS in the Chrome browser, and it works",
        checked: false
      },
      {
        text: "I have tested my game on iOS in the Safari browser, and it works",
        checked: false
      },
      {
        text: "I have tested my game on iOS in the AirConsole App, and it works",
        checked: false
      },
      {
        text: "I have tested my game on Android in the Chrome browser, and it works",
        checked: false
      },
      {
        text: "I have tested my game on Android in the AirConsole App, and it works",
        checked: false
      }
    ],
    ads: [
      {
        text: "I regularly call showAd in my game",
        checked: false
      },
      {
        text: "My game is paused in the onAdShow event and all audio is muted",
        checked: false
      },
      {
        text: "My game is resumed in the onAdComplete event and all audio is unmuted",
        checked: false
      }
    ],
    launch: [
      {
        text: "I have prepared a text for my game's landing page (ca. 200-500 words)",
        checked: false
      },
      {
        text: "I have prepared a 30-second trailer for my game's landing page",
        checked: false
      },
      {
        text: "I have created a page for it on madewith.unity.com (Only games made with Unity)",
        checked: false
      },
      {
        text: "I am promoting my game on social media and will keep posting about it on relevant groups and hashtags",
        checked: false
      },
      {
        text: "I have created a feature graphic for my game's promotion within the AirConsole store",
        checked: false
      }
    ]
  };
  $scope.questions = {};

  $scope.save = function() {
    localStorage.setItem(storage_key, JSON.stringify($scope.questions));
  };

  $scope.load = function() {
    return JSON.parse(localStorage.getItem(storage_key)) || $scope.questions_default;
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
    var progress = ($scope.marked_questions / $scope.total_questions) * 100;
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
