angular.module('starter.controllers', [])

.controller('AppCtrl', 
  function($scope, $window, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.logout = function(){
    $window.localStorage.clear();
    $state.go('app.login');
  }

})

.controller('LoginCtrl', 
  function($scope, servicio, $window, $state, $ionicHistory){

  $scope.$on('$ionicView.loaded', function(){
    var token = $window.localStorage['token'];

    if(token){
      //borrar historial de navegación
      $ionicHistory.nextViewOptions({disableBack: true});
      //enviar al home
      $state.go('app.profile', {user: $window.localStorage});
    }
  });


  //evento que se ejecuta cada vez que se ingresa a la pantalla
  $scope.$on('$ionicView.enter', function(){
    $scope.loginData = {
      user: '',
      password: '',
    };
  });

  $scope.doLogin = function(){
    console.log($scope.loginData);
    servicio.login($scope.loginData)
      .then(function(response){
        console.log(response);
        if(response.data.status == 1){
          $window.localStorage['token'] = response.data.token;
          $window.localStorage['uid'] = response.data.user._id;
          $window.localStorage['user'] = response.data.user.user;
          $window.localStorage['nombre'] = response.data.user.nombre;
          $window.localStorage['apellido'] = response.data.user.apellido;
          $window.localStorage['genero'] = response.data.user.genero;


          $ionicHistory.nextViewOptions({disableBack: true});
          $state.go('app.profile', {user: $window.localStorage});

        }
      });
  }
})

.controller('ProfileCtrl', function($scope, $stateParams){
  
  $scope.$on('$ionicView.enter', function(){
    $scope.user = $stateParams.user;  
  });

})

.controller('ListCtrl', function($scope, servicio){
  
  $scope.$on('$ionicView.enter', function(){
    
    servicio.list()
      .then(function(response){
        console.log(response);

        $scope.users = response.data.data;
      })

  });

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

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
