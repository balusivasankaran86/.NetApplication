var spa = angular.module('SPA', ['ngRoute', 'pascalprecht.translate']);

spa.run(function ($rootScope) {
    $rootScope.test = new Date();
})



spa.config(function ($routeProvider, $translateProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Home/Dashboard',
            controller: 'DashCtrl',
            controllerAs: 'dashctrl'
        })

        .when('/Employee', {
            templateUrl: 'Employee/Index',
            controller: 'CourseCtrl',
            controllerAs: 'coursectrl'
        });


        //$translateProvider.translations('en', {

        //    TITLE: 'Welcome!',
        //    MESSAGE: 'This app supports your lanaguage!',
        //    en: 'English',
        //    sv: 'Svenska'
        //})
        // .translations('sv', {
        //     TITLE: 'Välkommen!',
        //     MESSAGE: 'Denna app stöder ditt språk!',
        //     en: 'English',
        //     sv: 'Svenska'
    //    });

    $translateProvider.translations('en', {
        'COURSE': {
            TITLE:'Courses!',
            COURSE_NAME: 'Courses Name',
            DESCRIPTION: 'Descriptions',
            SNO: 'S.No',
            COURSE : 'Course',
            en: 'English',
            sv: 'Svenska'
        }
    })
     .translations('sv', {
         'COURSE': {
             TITLE: 'الدورات',
             COURSE_NAME: 'اسم الدورة التدريبية',
             DESCRIPTION: 'وصف',
             SNO: 'عدد',
             COURSE: 'دورة',
             en: 'English',
             sv: 'Svenska'
         }
         });

    


    $translateProvider.preferredLanguage('en');

   


});



spa.controller('AppCtrl', ['$scope', '$http', 'AjaxService', '$translate', function ($scope, $http, AjaxService, $translate) {

    $scope.language = 'en';
    $scope.languages = ['en', 'sv'];
    $scope.updateLanguage = function () {
        $translate.use($scope.language);
    };

}]);

spa.controller('DashCtrl', ['$scope', '$http', 'AjaxService', function ($scope, $http, AjaxService) {


}]);

spa.controller('CourseCtrl', ['$scope', '$http', 'AjaxService', '$translate', function ($scope, $http, AjaxService, $translate) {

  

    


    $scope.T_COURSES = { ID: 0, Course_Name: "", Descriptions: "" };
    $scope.CouresList = [];
    $scope.ManageCoures = ManageCoures;

    function ManageCoures() {

        var Item_Course = { ID: 0, Course_Name: $scope.T_COURSES.Course_Name, Descriptions: $scope.T_COURSES.Descriptions };

        AjaxService.ApiPost("/api/EmployeeInfoAPI/Manage_Course", Item_Course).then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function GetAllCourse() {
        AjaxService.ApiGet("/api/EmployeeInfoAPI/GetAll_Course").then(function (result) {
            var tempList = [];

            angular.forEach(result.data, function (item, key) {

                tempList.push({ 'Course_Name': item.Course_Name, 'Descriptions': item.Descriptions, 'ID': item.ID });
            });

            $scope.CouresList = tempList;

        }).catch(function (error) {
            console.log(error);
        });
    }

    GetAllCourse();
}]);

































