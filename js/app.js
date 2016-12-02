/**
 * Created by Denis on 09/06/2016.
 */

//crée appli pour créer ng-blur
var app = angular.module('todo',[]);
app.directive('ngBlur', function(){

    //renvoie le scope en cours elements attribut HTML
   return function (scope, elem, attrs ){
       // detecte la sorti du focus
       elem.bind('blur', function(){
           //recupere attribut ngblur
           scope.$apply(attrs.ngBlur);
       })
   }
});

//utilise var app que pour la fonction TodoCtrl
app.controller('TodoCtrl', function($scope, filterFilter){

    // déclaration de la variable
    $scope.todos = []; //qui contiendra toutes les tâches


    $scope.$watch('todos', function(){
        $scope.remaining = filterFilter($scope.todos, {completed:false}).length;

        //permet d'activer le allcheck si toutes les sont sélectionnées
        $scope.allchecked = !$scope.remaining;
    }, true);

    $scope.removeTodo = function(index){
        $scope.todos.splice(index,1);
    };

    //supprime tous les todos
    $scope.destroyAll = function(index){
        $scope.todos.splice(index);
    };
    //fonction permettant d'insérer une tâche
    $scope.addTodo = function () {
        $scope.todos.push({
            name : $scope.newtodo,
            competed : false
        });
        //remet le champ input vide
        $scope.newtodo = '';
    };

    $scope.checkAllTodo = function (allchecked){
        $scope.todos.forEach(function(todo){
            todo.completed = allchecked;
        });
    };


    //fonction permettant de modifier un todo
    $scope.editTodo = function(todo){
        todo.editing = false;
    };

    //fonction permettant de tous coché  !! PAS BON !!
    $scope.class = "star";
    $scope.changeClass = function(){
        if ($scope.class === "star")
            $scope.class = "important";
        else
            $scope.class = "star";
    };

});

