(function(angular) {

var app = angular.module('cisTestApp');

app.component('sponsorList', {
  templateUrl: './src/sponsorList/sponsorList.template.html',
  controller: SponsorListController,
  controllerAs: 'vm',
  bindings: {
  }
});

SponsorListController.$inject = ['$http'];

function SponsorListController($http) {
  var vm = this;

  vm.sponsors = [];

  vm.loadSponsors = function() {
    $http({
      method: 'GET',
      url: 'http://demo.api.coinvestor.co.uk/sponsor'
    }).then(success, error);

    function success(response) {
      vm.sponsors = response.data.data;
    }

    function error(response) {

    }
  };

  vm.loadSponsors();




}
})(window.angular);
