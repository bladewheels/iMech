(function() {
  'use strict';

  google.load('visualization', '1', { packages: ['corechart', 'timeline'] });
  google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['application']);
  });

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
      .controller('MechController', function($scope, $log, $state){
          var container = document.getElementById('timeline');
          var chart = new google.visualization.Timeline(container);
          var dataTable = new google.visualization.DataTable();
          dataTable.addColumn({ type: 'string', id: 'Room' });
          dataTable.addColumn({ type: 'string', id: 'Name' });
          dataTable.addColumn({ type: 'date', id: 'Start' });
          dataTable.addColumn({ type: 'date', id: 'End' });
          dataTable.addRows([
              [ 'Edmonton South', 'Subaru Impreza brakes', new Date(0,0,0,13,0,0), new Date(0,0,0,14,0,0)],
              [ 'Edmonton South', 'F-150 fluids',    new Date(0,0,0,14,15,0), new Date(0,0,0,15,0,0)],
              [ 'Edmonton North', 'Porsche Boxer intercooler replacement',    new Date(0,0,0,15,30,0), new Date(0,0,0,18,0,0)]
          ]);

          var options = {
              timeline: { showRowLabels: true },
              avoidOverlappingGridLines: true
          };

          chart.draw(dataTable, options);
      })
      .controller('ServiceCoordinatorController', function($scope, $log, $state){

          chartWorkOrders('Work Orders Open Since','chart_div_for_open_work_orders',[
              ['Since', 'Count'],
              ['Last Hour', 11],
              ['Last Day',   2],
              ['Last Week',  1]
          ]);
          chartWorkOrders('Work Orders Estimated Since','chart_div_for_estimated_work_orders',[
              ['Since', 'Count'],
              ['Last Hour', 2],
              ['Last Day',   11],
              ['Last Week',  1]
          ]);
          chartWorkOrders('Work Orders Scheduled Since','chart_div_for_scheduled_work_orders',[
              ['Since', 'Count'],
              ['Last Hour', 1],
              ['Last Day',   2],
              ['Last Week',  11]
          ]);
          chartWorkOrders('Work Orders Assigned Since','chart_div_for_assigned_work_orders',[
              ['Since', 'Count'],
              ['Last Hour', 5],
              ['Last Day',   6],
              ['Last Week',  11]
          ]);
      })
      .filter('is', function() {
          return function(input, targetState) {
              input = input || [];
              var out = [];
              for (var i = 0; i < input.length; i++) {
                  if (input[i].state === targetState) {
                      out.push(input[i]);
                  }
              }
              return out;
          };
      })
      .constant("moment", moment)
      .constant("orderStates", {
          "NEW": 0,
          "ESTIMATED": 1,
          "AUTHORIZED": 2,
          "SCHEDULED": 3,
          "STARTED": 4,
          "FINISHED": 5,
          "BILLED": 6,
          "PAID": 7
      })
      .controller('OrdersController', function($scope, moment, orderStates){
          $scope.stateIs = orderStates;
          $scope.customers = [
              {
                  name:'John Brown',
                  address: {
                      addr1:'14564 Bannister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:1997, make:'Subaru', model:'Impreza', colour:'Blue' },
                  work: { sinceNow: moment().add(7, 'days').toNow(), descr:'Do brakes', details: ['replace brake pads & fluids', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.NEW
              },
              {
                  name:'Dick Green',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(6, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.ESTIMATED
              },
              {
                  name:'Jill Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(6, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Jack Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-350', colour:'Brown' },
                  work: { sinceNow: moment().add(5, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.SCHEDULED
              },
              {
                  name:'Kilroy Bojack',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(4, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.SCHEDULED
              },
              {
                  name:'Jill Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(3, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Jill Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(2, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Jill Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(1, 'days').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Joe Bue',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(12, 'hours').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Gill MacGillicuddy',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'BMW', model:'M-3', colour:'White' },
                  work: { sinceNow: moment().add(5, 'hours').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Jill Black',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Ford', model:'F-150', colour:'Silver' },
                  work: { sinceNow: moment().add(47, 'minutes').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              },
              {
                  name:'Michael Shields',
                  address: {
                      addr1:'13424 Minister Rd SE', addr2:'',
                      city:'Calgary', state:'AB', code:'T2X 1Z4'
                  },
                  car: { year:2012, make:'Audi', model:'A5', colour:'White' },
                  work: { sinceNow: moment().add(47, 'minutes').toNow(), descr:'Fix stuff', details: ['replace brake pads', 'inspect and refurbish brake rotors as necessary'], parts: ['4 brake pads', '32 oz brake fluid'], hours: 2.5},
                  schedule: { asString: 'M-F, 1000h, 1430h' },
                  state: orderStates.AUTHORIZED
              }
          ];
      })

    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

    function chartWorkOrders(title, divId, data){
        var data = google.visualization.arrayToDataTable(data);

        var options = {
            title: title,
            pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById(divId));
        chart.draw(data, options);
    }

})();
