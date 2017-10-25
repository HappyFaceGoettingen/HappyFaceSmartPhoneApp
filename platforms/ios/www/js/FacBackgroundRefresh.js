angular.module('hf.BackgroundRefresh', [])
    .factory('FacBackgroundRefresh', ['FacInstances', 'FacWebservice', 'FacUIVariables', '$state', function (FacInstances, FacWebservice, FacUIVariables, $state) {

        function initializeBackgroundFetch() {
            var Fetcher = window.plugins.backgroundFetch;
            var fetchCallback = function () {
                if ((navigator.connection.type != Connection.NONE) && (FacInstances.getLastActiveInstance().length != 0)) {  //if we have internet and an active instance
                    var oldCategories = FacInstances.getLastActiveInstance().categories.category;
                    FacInstances.lightweightRefresh() //refresh the active instance (lightweight == no UI changes etc)
                        .then(function () {
                            var fetchMessage = [];
                            var cat;
                            for (cat = 0; cat < oldCategories.length; ++cat) {
                                if ((oldCategories[cat].name == FacInstances.getLastActiveInstance().categories.category[cat].name) &&
                                    (oldCategories[cat].status != FacInstances.getLastActiveInstance().categories.category[cat].status)) {
                                    //set right name for category status
                                    var rightStatus = "";
                                    if (FacInstances.getLastActiveInstance().categories.category[cat].status == 1.0) {
                                        rightStatus = "\'Ok\'";
                                    } else if (FacInstances.getLastActiveInstance().categories.category[cat].status == 0.5) {
                                        rightStatus = "\'Warning\'";
                                    } else if (FacInstances.getLastActiveInstance().categories.category[cat].status == 0.0) {
                                        rightStatus = "\'Critical\'";
                                    }
                                    //
                                    fetchMessage.push({
                                        title: FacInstances.getLastActiveInstance().categories.category[cat].title,
                                        status: rightStatus});
                                }
                            }
                            var messageStr = "";
                            for (cat = 0; cat < fetchMessage.length; ++cat) {
                                messageStr += (cat > 0) ? "\n" : "" + fetchMessage[cat].status + " is now the status of " + fetchMessage[cat].title + ".";
                            }

                            if (fetchMessage.length != 0) {
                                window.plugin.notification.local.add({ message: messageStr});
                            } else if (FacUIVariables.getExtendedNotifications()) { //if extendedNotifications you'll always get 'Just fetched!'
                                window.plugin.notification.local.add({ message: 'Just fetched! No changes.'});
                            }
                        },
                        function () { //error stuff here
//                            console.log('error while lightweightRefreshing');
                        });

                    //if the view is detail view then also update the data from webservice
                    if ($state.is("sidemenu.details")) {
                        FacWebservice.setTableContent();
                    }
                }
                Fetcher.finish();   // <-- N.B. You MUST called #finish so that native-side can signal completion of the background-thread to the os.
            };
            Fetcher.configure(fetchCallback);
        }


        return {
            initializeBackgroundFetch: function () {
                initializeBackgroundFetch();
            }
        }
    }]);