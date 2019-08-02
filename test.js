let items = [
  {
    section: 'Calendar',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Profile',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Property',
    permission: { view: false, edit: false, remove: false }
  },
  {
    section: 'Contacts',
    permission: { view: false, edit: false, remove: false }
  }
];
let app = angular.module('table', []);
app.controller('myCtrl', function($scope) {
  $scope.items = items;
  $scope.editAllDisable = true;
  $scope.removeAllDisable = true;
  $scope.view;
  $scope.edit;
  $scope.remove;

  $scope.showEdit = function(section) {
    if (section.permission.view === false) {
      $scope.edit = false;
      $scope.remove = false;
      section.permission.edit = false;
      section.permission.remove = false;
    }
    // if every separate view is checked - Check all for view, Check all for edit are checked too
    let allTrue = items.every(item => item.permission.view === true);
    if (allTrue === true) {
      $scope.view = true;
      $scope.editAllDisable = false;
    }

    // if at least one of views is unchecked - Check all for view is unchecked too,
    // relevant edit and Check all for edit, relevant remove, and Check all for remove are disabled
    let someFalse = items.some(item => item.permission.view === false);
    if (someFalse === true) {
      $scope.view = false;
      $scope.removeAllDisable = true;
      $scope.editAllDisable = true;
    }
  };

  $scope.showRemove = function(section) {
    // if edit is unchecked - remove is disabled
    if (section.permission.edit === false) {
      section.permission.remove = false;
    }
    // if at least one of edits is unchecked - Check all for edit is unchecked too,
    // relevant remove, and Check all for remove are disabled
    let someFalse = items.some(item => item.permission.edit === false);
    if (someFalse === true) {
      $scope.edit = false;
      $scope.remove = false;
      $scope.removeAllDisable = true;
    }
    // якщо всі окремі едіт галочки стоять - "всі едіт" теж стоїть, "всі ремув" розблоковано
    let allTrue = items.every(item => item.permission.edit === true);
    if (allTrue === true) {
      $scope.edit = true;
      $scope.removeAllDisable = false;
    }
  };

  $scope.changeAllView = function(condition) {
    // якщо галочка "всі в"ю" стоїть - "всі едіт" розблоковано
    $scope.editAllDisable = !condition;

    items.forEach(item => {
      // якщо зняти галочку "всі в"ю" - "всі едіт", "всі ремув" - заблоковано, окремі галочки не стоять
      if (condition === false) {
        item.permission.edit = condition;
        item.permission.remove = condition;
        $scope.removeAllDisable = !condition;
      }
      // для всіх окремих в"ю встановити значення як у "всі в"ю"
      item.permission.view = condition;
    });
    // для "всі едіт", "всі ремув" зняти галочки
    if (condition === false) {
      $scope.edit = condition;
      $scope.remove = condition;
    }
  };

  $scope.changeAllEdit = function(condition) {
    // якщо галочка "всі едіт" стоїть - "всі ремув" розблоковано
    $scope.removeAllDisable = !condition;

    // якщо зняти галочку "всі едіт" - "всі ремув" - заблоковано, окремі галочки не стоять
    items.forEach(item => {
      if (condition === false) {
        item.permission.remove = condition;
      }
      // для всіх окремих едіт встановити значення як у "всі едіт"
      item.permission.edit = condition;
    });

    // для "всі ремув" зняти галочку
    if (condition === false) {
      $scope.remove = condition;
    }
  };

  $scope.changeAllRemove = function(condition) {
    // якщо галочка всі є - кожна окрема теж галочка
    items.forEach(item => {
      item.permission.remove = condition;
    });
  };

  $scope.changeSeparateRemove = function() {
    // якщо хоча б однієї галочки немає, "всі" - теж немає
    let someFalse = items.some(item => item.permission.remove === false);
    if (someFalse === true) {
      $scope.remove = false;
    }
    // якщо галочки проставлені, "всі" - теж є
    let allTrue = items.every(item => item.permission.remove === true);
    if (allTrue === true) {
      $scope.remove = true;
    }
  };

  $scope.save = function() {
    let serialItems = JSON.stringify(items);
    localStorage.setItem('items', serialItems);
  };
});
