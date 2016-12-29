var kfg = angular.module('FacilityApp', []);

kfg.controller('RequestController', ['$scope', 'DataService', function ($scope, DataService) {
    
     $scope.greeting = 'Welcome!';
     $scope.selected_category = '0';
     $scope.category_list =[{'ID':'0','Title':"---Select Service Category---"}];     
     $scope.selected_sub_category = '0';
     $scope.category_sub_list =[{'ID':'0','Title':"---Select Sub Category---"}];
     $scope.selected_service_detail = '0';
     $scope.service_detail_list =[{'ID':'0','Title':"---Select Service Details---"}];
	 $scope.IsSubCate =true;
	 $scope.IsDetails=true;
     $scope.DropdownChanged= DropdownChanged;
	 GetServiceCategory();
	
	function DropdownChanged(controlID)
	{
		switch (controlID) {
	    case 'ddlServiceCategory':
		     console.log('ddlServiceCategory changed :'+ $scope.selected_category);
		     $scope.category_sub_list =[{'ID':'0','Title':"---Select Sub Category---"}];		    
		     $scope.selected_sub_category = '0';		    
		     $scope.service_detail_list =[{'ID':'0','Title':"---Select Service Details---"}];		   
		     $scope.selected_service_detail = '0';
		     $scope.IsSubCate =false;   
		     $scope.IsDetails=true;  
			 GetSubCategory();	
			   
			 break;
	    case 'ddlSubCategory':
	    	 console.log('ddlSubCategory changed :'+ $scope.selected_sub_category);
	         $scope.service_detail_list =[{'ID':'0','Title':"---Select Service Details---"}];		    
		     $scope.selected_service_detail = '0';
		     $scope.IsDetails=false;
	         GetServiceDetails();
	         break;	         
	   }
	}


//----- Service Calling --------------------

	function GetUserInformation()
	{
	    var query = "?$select=EmailAddress,Country,Title,Brands,Phone_x0020_Number,GPS_x0020_Location,Address,IP_Address&$filter=EmailAddress%20eq%20%27phakt@koutfood.com%27";
	    DataService.GetUserData(query).then(function(data){
	    	console.log(data);
	     }).catch(function(error){
	     	console.log(error);
	     });
	}
	
	function GetServiceCategory()
	{	     
	    DataService.GetServiceCategory("FM_Helpdesk_Service_Category","").then(function(result){
	    	angular.forEach(result.data.value, function(item, key) {
			   $scope.category_list.push({'ID':item.ID,'Title':item.Title});
			});	    
	     }).catch(function(error){ 	console.log(error);  });
	}
	
	function GetSubCategory()
	{
	    var query = "?$filter=Service_Category_RefId%20eq%20"+ $scope.selected_category;
	    
		 DataService.GetSubCategory("FM_Helpdesk_Sub_Categories",query).then(function(result){
	    	angular.forEach(result.data.value, function(item, key) {
			   $scope.category_sub_list.push({'ID':item.ID,'Title':item.Title});
			});		    	
	     }).catch(function(error){ console.log(error); });
	}
	function GetServiceDetails()
	{
	    var query = "?$filter=Sub_Category_RefId%20eq%20"+ $scope.selected_sub_category;
	    DataService.GetServiceDetails("FM_Helpdesk_Service_Details",query).then(function(result){
	    	angular.forEach(result.data.value, function(item, key) {
			   $scope.service_detail_list.push({'ID':item.ID,'Title':item.Title});
			});	    
	     }).catch(function(error){ console.log(error); });
	}
	
} ]);


kfg.factory('DataService', function ($window,$http) {
 
    
    var  FM_HELPDESK_URL = "https://kfgkw.sharepoint.com/sites/Depts/property/_api/web/lists/getbytitle('#LIST_NAME#')/items";
    var  KFG_SITES_URL = "https://kfgkw.sharepoint.com/intranet/_api/web/lists/getbytitle('KFG%20Sites')/items";

   return  {
    	GetUserData : GetUserData,
    	GetServiceCategory : GetServiceCategory,    
    	GetSubCategory:GetSubCategory,
    	GetServiceDetails:GetServiceDetails
    }; 
   
   function GetUserData(query) { 
	    return   $http.get(KFG_SITES_URL + query)      
       };     
       
   function GetServiceCategory(lname,query) {   
	    return   $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#",lname));      
       };  
       
   function GetSubCategory(lname,query) {   
	    return  $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#",lname));    
	   }; 
	   
   function GetServiceDetails(lname,query) {   
	    return  $http.get(FM_HELPDESK_URL.replace("#LIST_NAME#",lname));	   }; 

});


