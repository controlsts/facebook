
declare var FB: any;

module gApp {

    function FBUtils(aNode) {
        return function(aEdge) {
            var param = '/' + aNode + '/' + aEdge;
            FB.api(param, function(result) {
                console.log(param, result);
            });
        }
    }

    interface TCallback {
        (err, result): void;
    }

    // http://joochang.tistory.com/6
    class CFbUtils {

        private _nodeId;

        constructor(aNodeId) {
            this._nodeId = aNodeId;
        }

        public get(aEdge, aCb: TCallback) {
            var param = '/' + this._nodeId;
            if (aEdge) {
                param += '/' + aEdge;
            }
            FB.api(param, function(result) {
                console.log(param, result);
                if (result.error) {
                    aCb(result.error, null);
                } else {
                    aCb(null, result);
                }
            });
        }

        public friends(aCb: TCallback) {
            this.get('friends', aCb);
        }

        public posts(aCb: TCallback) {
            this.get('posts', aCb);
        }

        public newsFeed(aCb: TCallback) {
            this.get('home', aCb);
        }

        public profileFeed(aCb: TCallback) {
            this.get('feed', aCb);
        }

        public likes(aCb: TCallback) {
            this.get('likes', aCb);
        }

        public movies(aCb: TCallback) {
            this.get('movies', aCb);
        }

        public music(aCb: TCallback) {
            this.get('music', aCb);
        }

        public books(aCb: TCallback) {
            this.get('books', aCb);
        }

        public notes(aCb: TCallback) {
            this.get('notes', aCb);
        }

        public permissions(aCb: TCallback) {
            this.get('permissions', aCb);
        }

        public photos(aCb: TCallback) {
            this.get('photos', aCb);
        }

        public albums(aCb: TCallback) {
            this.get('albums', aCb);
        }

        public videos(aCb: TCallback) {
            this.get('videos', aCb);
        }

        public videoUploads(aCb: TCallback) {
            this.get('videos/uploaded', aCb);
        }

        public events(aCb: TCallback) {
            this.get('events', aCb);
        }

        public groups(aCb: TCallback) {
            this.get('groups', aCb);
        }

        public checkins(aCb: TCallback) {
            this.get('checkins', aCb);
        }
    }


    export function start() {

        var cocacola = new CFbUtils('cocacola');
        cocacola.get(null, (err, result) => {
        });
        cocacola.photos((err, result) => {

        });

    }
}