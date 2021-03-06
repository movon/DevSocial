// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $ionicConfig) {
  $ionicConfig.views.maxCache(0);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.detail',{
      url: '/browse/:aId/:index',
      views: {
        'menuContent':{
          templateUrl: 'templates/detail.html',
          controller: 'UpEventsController'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl'
      },
      'form': {
        templateUrl: 'templates/form-profile.html',
        controller: 'SignUpCtrl'
      }
    }
  })

    .state('app.signup.profile', {
      url: '/profilesignup',
      views: {
        'form': {
          templateUrl: 'templates/form-profile.html'
          // controller: 'SignUpCtrl'
        }
      }
    })

    // url will be /form/interests
    .state('app.signup.personal', {
      url: '/personalsignup',
      views: {
        'form': {
          templateUrl: 'templates/form-personal.html'
          // controller: 'SignUpCtrl'
        }
      }
    })

    // url will be /form/payment
    .state('app.signup.professional', {
      url: '/professionalsignup',
      views : {
        'form': {
          templateUrl: 'templates/form-professional.html'
          // controller: 'SignUpCtrl'
        }
      }
    })

    .state('app.profile', {
      url:'/profile/:profileId',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          abstract:true,
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.profile.personal', {
      url: '/personal',
      views: {
        'profileTab': {
          templateUrl: 'templates/profileTab1.html'
        }
      }
    })
    .state('app.profile.professional', {
      url: '/professional',
      views: {
        'profileTab': {
          templateUrl: 'templates/profileTab2.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
