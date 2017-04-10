(function(angular) {

var app = angular.module('cisTestApp');

app.component('sponsorAddress', {
  templateUrl: './src/sponsorAddress/sponsorAddress.template.html',
  controller: SponsorAddressController,
  controllerAs: 'vm',
  bindings: {
    address: '='
  }
});

function SponsorAddressController() {
  var vm = this;
}

})(window.angular);
