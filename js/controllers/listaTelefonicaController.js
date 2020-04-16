
      angular
        .module("listaTelefonica")
        .controller("listaTelefonicaController", function ($scope, $http) {
          $scope.app = "Meus Contatinhos";
          $scope.contatos = [];
          $scope.operadoras = [];

          var carregarContatos = function () {
            $http
              .get("http://localhost:5500/contatos")
              .then(function (data) {
                $scope.contatos = response.data;
              })
              .error(function (data, status) {
                $scope.message = "Aconteceu um problema: " + data;
              });
          };

          var carregarOperadoras = function () {
            $http
              .get("http://localhost:5500/operadoras")
              .then(function (data) {
                $scope.operadoras = response.data;
              });
          };

          $scope.adicionarContato = function (contato) {
            contato.data = new Date();
            $http
              .post("http://localhost:3412/contatos", contato)
              .then(function (data) {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                carregarContatos();
              });
          };

          $scope.apagarContatos = function (contatos) {
            $scope.contatos = contatos.filter(function (contato) {
              if (!contato.selecionado) return contato;
            });
          };

          $scope.isContatoSelecionado = function (contatos) {
            return contatos.some(function (contato) {
              return contato.selecionado;
            });
          };

          carregarContatos();
          carregarOperadoras();
        });