TestApp.controllers.controller('MainCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

  var KEY = "AIRCONSOLE_CHECKLIST";
  $scope.total_questions = 0;
  $scope.marked_questions = 0;
  $scope.questions_default = {
    general: [
      {
        text: "It includes the lastest AirConsole API",
        checked: false
      },
      {
        text: "I have tested my game on https",
        checked: false
      },
      {
        text: "I have tested my game on a higher latency",
        checked: false
      }
    ],
    screen: [
      {
        text: "It should show an explanation text",
        checked: false
      },
      {
        text: "It should work on different kinds of screen resolutions (Responsive design (TV resolution 960x540))",
        checked: false
      },
      {
        text: "It should work when only 1 player is connected / trying to play",
        checked: false
      },
      {
        text: "It should work when more than 1 player is connected / trying to play",
        checked: false
      },
      {
        text: "It should work when more players are connected than my game allows",
        checked: false
      },
      {
        text: "It should work when a player disconnects during the game",
        checked: false
      },
      {
        text: "It should work when all players disconnect",
        checked: false
      },
      {
        text: "It should NOT have any hard coded device ids",
        checked: false
      },
      {
        text: "If possible, it should use the player's name instead of 'Player 1'",
        checked: false
      }
    ],
    ctrl: [
      {
        text: "It should work for different screen sizes (Min. 320x480).",
        checked: false
      },
      {
        text: "It should work on different devices (iPhone, Android).",
        checked: false
      },
      {
        text: "It should indicate which ingame-character the player is controlling.",
        checked: false
      },
      {
        text: "It should show different views (Start, Ingame-Controller, Win-Screen)",
        checked: false
      }
    ],
    ctx_screen: [
      {
        text: "Chrome",
        checked: false
      },
      {
        text: "Firefox",
        checked: false
      },
      {
        text: "IE 11",
        checked: false
      },
      {
        text: "Safari",
        checked: false
      }
    ],
    ctx_mobile: [
      {
        text: "iOS Chrome",
        checked: false
      },
      {
        text: "iOS Safari",
        checked: false
      },
      {
        text: "iOS AirConsole App",
        checked: false
      },
      {
        text: "Android Chrome",
        checked: false
      },
      {
        text: "Android AirConsole App",
        checked: false
      }
    ]
  };
  $scope.questions = {};

  $scope.save = function() {
    localStorage.setItem(KEY, JSON.stringify($scope.questions));
  };

  $scope.load = function() {
    return JSON.parse(localStorage.getItem(KEY)) || $scope.questions_default;
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
    localStorage.setItem(KEY, null);
    $scope.questions = $scope.load();
    $scope.marked_questions = 0;
  };

}]);
