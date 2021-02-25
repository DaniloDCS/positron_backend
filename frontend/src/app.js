angular
    .module("positron", [])
    .controller("positronCtrl", ($scope, $http, $interval) => {
        $scope.viewMenu = false;
        $scope.alertErrLogin = false

        $scope.userMail = sessionStorage.getItem("email") || ""
        $scope.userUsername = sessionStorage.getItem("username") || "Anônimo"
        
        $scope.exit = () => {
            sessionStorage.clear()
            window.location.href = "/signin"
        }

        $scope.charging = () => {
            $interval(() => {
                window.location.href = "/dashboard"
            }, 6000, 1)
        }

        $scope.signIn = user => {
            $http({
                method: "POST",
                url: "http://127.0.0.1:3333/signin",
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.data.user) {
                        sessionStorage.setItem("username", res.data.user.displayName)
                        sessionStorage.setItem("email", res.data.user.email)
                        $scope.userMail = sessionStorage.getItem("email")
                        $scope.userUsername = sessionStorage.getItem("username")
                        window.location.href  = "/"
                    } else {
                        window.location.href = "/signin"
                        $scope.alertErrLogin = true
                    }
                })
        }
    })