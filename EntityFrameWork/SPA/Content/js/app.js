var kfg = angular.module('KFG', []); //'angularValidator'

kfg.controller('RequestController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.greeting = 'Welcome!';

    $scope.isSuccess = true;
    $scope.isWarning = false;

    $scope.MsgHeader = " Success!";
    $scope.MsgHeadSummary = " Your request have been sent successfully";

    //    $scope.MsgHeader = " Warning!";
    //    $scope.MsgHeadSummary = " Kindly check the mandatory fields";

    $scope.Correspondance = [];
    $scope.Correspondance = [{ userid: '1', username: 'Jack Sparrow'}]

    $scope.showError = false;
    $scope.doFade = false;

    $scope.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    $scope.fakeError = function () {
        $('#myModal').modal('show');
        //reset

        var correspondance = angular.toJson($scope.correspondance);
        console.log(correspondance);
        var correspondance_obj = angular.fromJson(correspondance);
        console.log(correspondance_obj);

        $scope.showError = false;
        $scope.doFade = false;

        $scope.showError = true;

        $scope.Msg = "";

        $scope.errorMessage = 'We\'re mixing apples and oranges!';

        $timeout(function () {
            $scope.doFade = true;
        }, 2500);
    };

    $scope.GetURL = function () {
        var item = $(":file").filestyle('input');
        alert(item);
    };


    function GetUserProfile() {
        jQuery.ajax({
            url: " https://kfgkw.sharepoint.com/intranet/_api/web/siteusers?$filter=Email eq 'abdulrahmans@koutfood.com'",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                console.log(data.d)

            },
            error: function () { onQueryFailed }
        });
    }



    $scope.warehouse_itmes =
        [
           { 'sapno': '109-3388', 'description': 'This is not good This is not good This is not good This is not good', 'qty': '30' },
           { 'sapno': '109-3388', 'description': 'This is not good This is not good This is not good This is not good', 'qty': '30' },
           { 'sapno': '109-3388', 'description': 'This is not good This is not good This is not good This is not good', 'qty': '30' }

        ];

    $scope.hasRecord = true;

    $scope.additem = function () {
        $scope.warehouse_itmes.push({ 'sapno': $scope.SAPNO, 'description': $scope.Description, 'qty': $scope.QTY });
    }

    $scope.removeitem = function (item) {
        $scope.warehouse_itmes.splice($scope.warehouse_itmes.indexOf(item), 1);
    }

    $scope.correspondance =
    [
        { user: 'Balu', msg: 'Hi i have one problem', msgtime: '06-09-2016 15:30', orderby: 1 },
        { user: 'Abdul', msg: 'what is ur problem', msgtime: '06-09-2016 15:45', orderby: 1 },
        { user: 'Balu', msg: 'SharePoint server was down', msgtime: '06-09-2016 15:55', orderby: 1 },
    ];


} ]);






kfg.directive('msgAlert', function () {
    return {
        template: ' <div data-ng-show="showError" ng-class="{fade:doFade}" ' +
                  ' style=" position: absolute; left:30%; top: 20%; text-align: center;" ' +
                  ' class="alert alert-success"><strong>Error:</strong> {{errorMessage}}</div></section>'
    };
});



kfg.directive('kfgRequest', function () {
    return {
        restrict: 'E',
        templateUrl: '/pages/kfg-request.htm'
    };

});



















kfg.controller("MasterController", function ($scope) {

    $scope.submitMyForm = function () {
        alert("Form submitted");
    };

    $scope.RQ =
    {
        Request: '',
        Rname: '',
        Remail: '',
        Country: '',
        Brand: '',
        Location: '',
        ContactNumber: '',
        Description: ''
    };

    $scope.wasSubmitted = false;

    $scope.submit = function () {
        var obj = $scope.RQ;
        if (myForm.$valid == tr) {
            alert("Form Submitted");
        }
        else {
            alert("Validation Error");
        }
        $scope.wasSubmitted = true;
    };

    $scope.error = function (name) {
        var s = $scope.form[name];
        return s.$invalid && s.$dirty ? "error" : "";
    };
});