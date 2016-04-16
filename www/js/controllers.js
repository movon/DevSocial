angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('SearchCtrl', function($scope, $state, $http) {
  //sql stuff $scope.results = response.data
  $scope.results = [{
    "name": "1",
    "aboutme": "1"
  },{
    "name": "2",
    "aboutme": "1"
  }
  ];

})

.controller('UpEventsController', function($scope, $state, $stateParams){
  $scope.index = $stateParams.index;
  $scope.result = [{
    "name": "HackTrack",
    "type": "Hackathon",
    "date": "15/4/2016   11:00",
    "location": "Hangar 26, Namal Tel Avivm, Israel",
    "description": "Cool hackathon developed by teens for teens",
    "Ldescription": "HackTrack is an international hackathon competition where the most talented, aspiring and passionate teenagers come together to create and invent new technologies, apps, and other products while forming an international community of young innovators.",
    "icon": "img/hackTrack.jpg",
    "image": "img/hackTrackMain.jpg",
    "founders": [{
      "name": "founder1",
      "img": "img/hackTrackFounder1.jpg"
    },
      {"name": "founder2",
        "img": "img/hackTrackFounder2.jpg"
    }],
    "teams": [
      {
        team: [{"name": "Roy Shulman"}, {"name": "Daniel Eliad"},{"name": "Tal Bortman"},{"name": "Arad Rozenblat"}],
        teamName: "mov_on",
        needed: ["designer"]
      }],

  },{"name": "CyberKnight",
    "type": "Competition",
    "date": "7/4/2016   20:00",
    "location": "Mitham Hatahana, Jerusalm, Israel",
    "description": "Hacking competition for teens and adults",
    "Ldescription": "Bustling city is under attack technologically.Critical computing systems are breached: Traffic stop functioning, trains, planes, power plants and more .. normal life of the residents are violated and created chaos. Now comes the turn of technologists: the teams solve mathematical puzzles / programming based technologies and their goal is to restore order to buy",
    "icon": "img/CyberKnightLogo.jpg",
    "image": "img/CyberKnight.jpg",
    "founders": []
}];
})

.controller('SignUpCtrl', function($scope,$cordovaCamera, $ionicLoading, $window,$ionicActionSheet,$timeout) {
  $scope.formData = {};
  $scope.doSignUp = function() {
    //do stuff with sql
  };

  $scope.data = { "ImageURI" :  "Select Image" };
  $scope.takePicture = function() {
    var options = {
      // quality: 50,
      // destinationType: Camera.DestinationType.FILE_URL,
      // sourceType: Camera.PictureSourceType.CAMERA

      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    $cordovaCamera.getPicture(options).then(
      function(imageData) {
        $scope.picData = imageData;
        $scope.ftLoad = true;
        $window.localStorage.setItem('fotoUp', imageData);
        // var image = document.getElementById('myImage');
        $scope.imageURI = "data:image/jpeg;base64," + imageData;
        $ionicLoading.show({template: 'Foto acquisita...', duration:500});
      },
      function(err){
        $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
      })
  };

  $scope.selectPicture = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    $cordovaCamera.getPicture(options).then(
      function(imageURI) {
        window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
          $scope.picData = fileEntry.nativeURL;
          $scope.ftLoad = true;
          // var image = document.getElementById('myImage');
          $scope.imageURI = fileEntry.nativeURL;
        });
        $ionicLoading.show({template: 'Foto acquisita...', duration:500});
      },
      function(err){
        $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
      })
  };

  $scope.uploadPicture = function() {
    $ionicLoading.show({template: 'Sto inviando la foto...'});
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = "someparams";
    params.value2 = "otherparams";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
      $ionicLoading.hide();}, options);
  };

  var viewUploadedPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
    server = "http://www.yourdomain.com/upload.php";
    if (server) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState === 4){
          if (xmlhttp.status === 200) {
            document.getElementById('server_images').innerHTML = xmlhttp.responseText;
          }
          else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
            return false;
          }
        }
      };
      xmlhttp.open("GET", server , true);
      xmlhttp.send()}
    $ionicLoading.hide();
  };


  $scope.viewPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
    server = "http://www.yourdomain.com/upload.php";
    if (server) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState === 4){
          if (xmlhttp.status === 200) {
            document.getElementById('server_images').innerHTML = xmlhttp.responseText;
          }
          else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
            return false;
          }
        }
      };
      xmlhttp.open("GET", server , true);
      xmlhttp.send()}
    $ionicLoading.hide();
  }

  $scope.showActionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take Picture' },
        { text: 'From Gallery' }
      ],
      titleText: 'Choose Image',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0) {
          //take picture
          $scope.takePicture();
        } else {
          //from gallery
          $scope.selectPicture();
        }
      }
    });

    // For example's sake, hide the sheet after two seconds

  };
})

.controller('ProfileCtrl',function($scope) {

});
