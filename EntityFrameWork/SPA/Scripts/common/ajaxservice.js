spa.factory('AjaxService', function ($window, $http) {

    return {
        ApiGet: ApiGet,
        ApiPost: ApiPost
    };

    function ApiGet(url) {
        return $http.get(url);
    };

    function ApiPost(url, data) {
        return $http({
            url: url,
            dataType: 'json',
            method: 'POST',
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

});