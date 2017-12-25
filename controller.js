var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.isHidden=true;
	$scope.PrevIndex=-1;

	var modifyIndex=function(indexList){
		if($scope.personList==null){
			angular.forEach(indexList,function(val,index){
				val.index=index;
				val.isHidden = true;			
			})

		}else{
			index = $scope.personList.length
			indexList.index = index;
			indexList.isHidden = true;
		}
		return indexList;
	}
	var reload = function(){
		$http.get('/persondata').success(function(response){	
			$scope.personList = modifyIndex(response);
		});
	};
	reload();
	$scope.addPerson = function(){
		$http.post('/persondata',$scope.emp).success(function(response){
			console.log(response);
			$scope.personList.push(modifyIndex(response));
		});
		$scope.emp=null;
	};
	$scope.remove_record = function(id,index){
		$http.delete('/persondata/'+id).success(function(response){
			$scope.personList.splice(index,1);
		});
	};
	$scope.edit = function(id,index){
		if($scope.PrevIndex<0){
			$scope.personList[index].isHidden=false;
			$scope.PrevIndex = index;
		}
		else
		{
			$scope.personList[$scope.PrevIndex].isHidden=true;
			$scope.personList[index].isHidden=false;
			$scope.PrevIndex = index;
		}
		
	};
	var update = function(obj,index){
		id = obj._id;
		
		$http.put('/persondata/'+id,obj).success(function(response){
			
			$scope.personList[index].isHidden=true;
			$scope.PrevIndex=-1;
		})
	};
	$scope.save = function(index){
		var obj = $scope.personList[index];
		var saveObj={'_id':obj._id,"name":obj.name,"lname":obj.lname,"designation":obj.designation};
		update(saveObj,index);
	}
}]);