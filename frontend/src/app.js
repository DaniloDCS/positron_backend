angular
    .module("positron", ["ngRoute"])
    // .config(($routeProvider) => {
    //     $routeProvider
    //         .when("/", {
    //             templateUrl: "views/charging.html"
    //         })
    //         .when("/signin", {
    //             templateUrl: "views/signin.html"
    //         })
    //         .when("/dashboard", {
    //             modelUrl: "views/dashboard.html"
    //         })
    // })
    .controller("positronCtrl", ($scope, $http, $interval, $location) => {
        $scope.title = "Positron Technology";

        sessionStorage.setItem("username", undefined )
        sessionStorage.setItem("email", undefined )

        console.log(sessionStorage)

        $scope.userMail = sessionStorage.getItem("email")

        $scope.verifyLogin = () => {
            if (typeof sessionStorage.getItem("username") === "undefined") return $location.url("/signin")
        }

        //$scope.verifyLogin()

        $scope.charging = () => {
            $interval(() => {
                $location.url("/dashboard")
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
                        console.log(res.data.user.email)
                        sessionStorage.setItem("username", res.data.user.email)
                        sessionStorage.setItem("email", res.data.user.email)
                        $location.url("/dashboard")
                    } else {
                        $location.url("/signin")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })