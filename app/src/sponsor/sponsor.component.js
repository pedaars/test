(function(angular) {

var app = angular.module('cisTestApp');

app.component('sponsor', {
  templateUrl: './src/sponsor/sponsor.template.html',
  controller: SponsorController,
  controllerAs: 'vm',
  bindings: {
    sponsor: '='
  }
});

function SponsorController() {
  var vm = this;
}

})(window.angular);
