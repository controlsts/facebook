
/// <reference path="bower_components/controls.ts/controls.ts"/>

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

    interface TPagingItem {
        data: any[];
        paging: {
            cursors: {
                after: string;
                before: string;
            };
            next: string;
        };
    }

    interface TPhotoItem {
        comments: TPagingItem;
        created_time: string;
        from: {
            category: string;
            id: string;
            name: string;
        };
        height: number;
        icon: string;
        id: string;
        images: {
            width: number;
            height: number;
            source: string;
        }[];
        likes: TPagingItem;
        link: string;
        picture: string;
        source: string;
        tags: TPagingItem;
        updated_time: string;
        width: number;
    }

    var list: Controls.CListControl;
    var root = new Controls.CLayoutGroupControl(document.body);
    export function start() {
        list = new Controls.CListControl(null);
        list.setListData([]);
        list.setItemHeight(140);
        list.setAnimation(true);
        list.setScrollScheme(Controls.TParamScrollScheme.EByFixed);
        list.setDataDrawer(function (aKey:any, aItem:TPhotoItem, aEl:HTMLElement) {
            var html = '<img src="' + aItem.picture + '">';
            //aItem.images.forEach(function(img) {
            //    html += '<img src="' + img.source + '">';
            //});
            aEl.innerHTML = html;

            return Controls.TFocusInfo.KFocusAble;
        });

        root.setOrientation(Controls.TParamOrientation.EHorizontal);
        root.setOwnedChildControls([list]);
        root.draw();
        root.setActiveFocus();

        document.body.addEventListener('keydown', function (e) {
            var keyStr = e['keyIdentifier'];
            var handled = root.doKey(keyStr);
            console.log(handled);

            var skip = {
                'Up': true,
                'Down': true,
                'Left': true,
                'Right': true
            };

            if (skip[keyStr]) {
                e.stopPropagation();
                e.preventDefault();
            }
        });
    }

    start();

    export function fbReady() {

        var cocacola = new CFbUtils('cocacola');
        cocacola.photos((err, result) => {
            list.setListData(result.data);
            root.draw();
            root.setActiveFocus();
        });
    }
}