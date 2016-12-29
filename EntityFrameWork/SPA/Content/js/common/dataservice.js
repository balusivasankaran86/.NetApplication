kfg.factory('DataService', function ($window, $http) {


    var FM_HELPDESK_URL = "https://kfgkw.sharepoint.com/sites/Depts/property/_api/web/lists/getbytitle('#LIST_NAME#')/items";
    var KFG_SITES_URL = "https://kfgkw.sharepoint.com/intranet/_api/web/lists/getbytitle('KFG%20Sites')/items";

    return {
        GetUserData: GetUserData,
        GetServiceCategory: GetServiceCategory,
        GetSubCategory: GetSubCategory,
        GetServiceDetails: GetServiceDetails
    };

    function GetUserData(query) {
        return $http.get(KFG_SITES_URL + query)
    };

    function GetServiceCategory(lname, query) {
        return $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#", lname));
    };

    function GetSubCategory(lname, query) {
        return $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#", lname));
    };

    function GetServiceDetails(lname, query) {
        return $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#", lname));
    };

});