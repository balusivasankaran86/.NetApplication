var kfg = angular.module('FacilityApp', []);

kfg.controller('RequestController', ['$scope', '$window', 'DataService', function ($scope, $window, DataService) {
    $scope.greeting = 'Welcome!';
    $scope.worklog = "AAAA";

    $scope.submit = function () {
       // $scope.isVisible = true;
        // alert(CKEDITOR.instances.txtWorkLog.getData());

        $scope.msg_header = "Success!";
        $scope.msg_body = "Record successfully inserted!";
        $scope.alert_type = "alert-success";
        // createAutoClosingAlert("#msg_alert", 2000);
//        $window.setTimeout(function () {
//            $("#msg_alert").fadeTo(500, 0).slideUp(500, function () {
//                  //   $(this).remove();
//                 //$scope.isVisible = false;
//            });
        //        }, 3000);

        $window.setTimeout(function () {
           
                }, 1000);

        //                $("#msg_alert").fadeTo(1000, 500).slideUp(500, function () {
        //                    $("#msg_alert").slideUp(500);
        //                    //$scope.isVisible = false;
        //                });
    }

    function createAutoClosingAlert(selector, delay) {
        var alert = $(selector).alert();
        window.setTimeout(function () { alert.alert('close') }, delay);
    }

    //   $scope.show = show;

    //    function show() {
    //        $scope.message ="Success!"
    //        $scope.isVisible = true;
    //        
    //        $window.setTimeout(function () {
    //            $("#msg_alert").fadeTo(500, 50).slideUp(500, function () {
    ////                $(this).remove();
    //                $scope.isVisible = false;
    //            });
    //        }, 1000);
    //    }

    //    DataService.GetUserData()
    //    .then(function(data)
    //    {
    //    	console.log(data);
    //    })
    //     .catch(function(error)
    //     {
    //     	console.log(error);
    //     });

} ]);


kfg.factory('DataService', function ($window,$http) {
    var services = {};

   services.GetUserData= function () {
      
//      return $http({
//      	method:"Get",
//		url:"https://kfgkw.sharepoint.com/intranet/_api/web/lists/getbytitle('KFG%20Sites')/items?$select=EmailAddress,Country,Title,Brands,Phone_x0020_Number,GPS_x0020_Location,Address,IP_Address&$filter=EmailAddress%20eq%20%27phakt@koutfood.com%27"
//		})

        return   $http.get("https://kfgkw.sharepoint.com/intranet/_api/web/lists/getbytitle('KFG%20Sites')/items?$select=EmailAddress,Country,Title,Brands,Phone_x0020_Number,GPS_x0020_Location,Address,IP_Address&$filter=EmailAddress%20eq%20%27phakt@koutfood.com%27")

       }

    return services;

});

kfg.directive('myAlert', function ($timeout) {
    return {
        scope: {
            message: '@',
            isVisible: '='
        },
        //link: link,
        restrict: 'E',
        replace: true,
        template: '<div ng-if="isVisible" id="msg_alert" class="alert {{alert_type}}" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>{{msg_header}}</strong> {{msg_body}}</div>'
        //alert-success 



        //template: '<div ng-if="isVisible" id="msg_alert" class="alert">{{msg_body}}</div>'
    }

    function link(scope, element, attrs) {
        scope.isVisible = true;

        $timeout(function () {
            scope.isVisible = false;
        }, 5000);

    }
});