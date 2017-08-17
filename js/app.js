(function (angular) {
	'use strict';

	var myapp = angular.module('todoApp',[]);
	myapp.controller('todoController',['$scope','$location',function($scope,$location){

		//自己写的一个获取id的函数
		function getId(){
			var id = Math.random();
			for(var i=0; i<$scope.todos.length; i++){
				if($scope.todos[i].id == id){
					id = getId();
					break;
				}
			}
			return id;
		}

		//暴露给输入框的数据
		$scope.text = '';
		//暴露给列表的数据
		$scope.todos = [
			{ id: 1, text: '吃饭', completed: false },
			{ id: 2, text: '睡觉', completed: false },
			{ id: 3, text: '打豆豆', completed: false },
			{ id: 4, text: '泡美美', completed: true }
		];

		//添加项
		$scope.add = function(){
			if(!$scope.text){
				return;
			}

			$scope.todos.push({ 
				id: getId(), 
				text: $scope.text, 
				completed: false 
			});

			$scope.text = '';
		};

		//移除项
		$scope.remove = function(id){
			for(var i=0; i<$scope.todos.length; i++){
				if($scope.todos[i].id == id){
					$scope.todos.splice(i,1);
				}
			}
		};

		//清空项
		$scope.clear = function(){
			var tempArr = [];
			for(var i=0; i<$scope.todos.length; i++){
				if(!$scope.todos[i].completed){
					tempArr.push($scope.todos[i]);
				}
			}
			$scope.todos = tempArr;
		}

		//控制clear按钮是否可点击，通过判断是否有已经完成的任务
		$scope.existCompleted = function(){
			for(var i=0; i<$scope.todos.length; i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		//控制可编辑性,默认无可编辑项，so,$scope.editingID = -1;
		$scope.editingID = -1;
		//获取可编辑项的id
		$scope.setEditingId = function(id){
			$scope.editingID = id;
		};
		//清除可编辑的样式
		$scope.clearEditing = function(id){
			$scope.editingID = -1;
		};

		//全选切换
		var flag = true;
		$scope.toggleAll = function(){
			for(var i=0; i<$scope.todos.length; i++){
				$scope.todos[i].completed = flag;
			}
			flag = !flag;
		};


		//筛选功能
		$scope.selector = {};

		//$watch只能监视$scope下的内容，因此将$location挂到$scope下
		$scope.$location = $location;
		$scope.$watch('$location.hash()',function(now ,old){

			//这样不能实时监控到hash值得变化，因此需要$watch函数
			switch(now){
				case '/active':
					$scope.selector = {completed:false};
					break;
				case '/completed':
					$scope.selector = {completed:true};
					break;
				default :
					$scope.selector = {};
					break;

			}
		});
		
		//默认的filter是模糊匹配，因此自己写一个比较函数，来精确匹配
		$scope.equalCompare = function(source,target){
			return source === target;
		};

	}]);

})(angular);
