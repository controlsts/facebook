
declare var FB: any;

module gApp {

    export function start() {
        FB.api('/me', function(result) {
            console.log(result);
            FB.api('/feed', function(result) {
                console.log(result);
            });
        });
    }
}