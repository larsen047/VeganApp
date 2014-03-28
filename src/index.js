var count = 0;
Ext.namespace('BVApp','BVApp.views','BVApp.models','BVApp.templates','BVApp.utils',"BVApp.data");
BVApp.Main = {
    ui: null,
    errorEMail: "",
    version: "1.6",
    favoriteListStoreID: "favoriteListStore",
    favoriteStoreID: "favoriteStore",
    restaurantStoreID: "restaurantStore",
    cafeStoreID: "cafeStore",
    shopStoreID: "shopStore",
    maxListItems: 15,
    maxToolbarLetters: 14, // word length in toolbar
    timeoutLocationRequest: 6000, // in miliseconds
    intervalLocationRequest: 5000, // in miliseconds

    /* if app starts and find an location in that distance,
    just nav to it instantly, in meter*/
    locationDistanceLimit: -1, //Slået fra - Åbner automatisk restauranter indenfor x-antal meter på mobilen.
    launched: false,
    // startup time in milliseconds
    startTime:null,
    //startup time
    performance:0,


    init: function()
    {
        var me= this;
        if(this.startTime===null)
        {
            this.startTime = (new Date).getTime();
        }
        /*console.log("BVApp.Main.init try");
        if(!Ext.is.Desktop){
            if (!device || !this.launched) {return;}
        }
        console.log("BVApp.Main.init success");
        */


        BVApp.utils.Settings.init();
        if(BVApp.utils.AppUtils.isAndroid())
        {
            this.maxToolbarLetters += 6; // on android we can increase, because we don't have a back button
        }
        // init the favoriteListStore
        var favListStore = Ext.StoreMgr.lookup(BVApp.Main.favoriteListStoreID);
        favListStore.updateFromFavorites();


        // copy "cafes" from restaurantStore to cafestore
        var restaurantStore = Ext.StoreMgr.lookup(BVApp.Main.restaurantStoreID);
        var cafeStore = Ext.StoreMgr.lookup(BVApp.Main.cafeStoreID);
        restaurantStore.clearFilter(false);
        restaurantStore.filter
        ([{
            property     : 'tags',
            value        : 'Cafe',
            anyMatch     : true,
            caseSensitive: true
        }]);
        cafeStore.insert(0,restaurantStore.getRange());

        console.log("BVApp.Main.init Mainpanel start");
        this.ui = new BVApp.views.MainPanel();
        if(!BVApp.utils.AppUtils.isAndroid())
        { // if not android, use default
            this.ui.determinePositionMask.show();
            setTimeout(function()
            { // hide location request after some time
                me.locationReady.call(me);
            },this.timeoutLocationRequest);
            BVApp.utils.CurrentGeoPosition.updateLocation(function()
            {
                me.locationReady.call(me);
            });
        }
        else
        { // special handling for android, because to much problems with phonegap location provider
            // bvappObj is injected from "App" Activity
            setInterval(function ()
             {
                me.getLocation();
            }, this.intervalLocationRequest);
            me.getLocation();
           me.locationReady();
        }
        console.log("BVApp.Main.init Mainpanel ready");
        this.performance = (new Date).getTime() - this.startTime;
        console.log("Performance " +  this.performance);
    },
    /* get location from java activity
        call it only on Android
    */
    getLocation: function()
    {
        BVApp.utils.CurrentGeoPosition.latitude = bvappObj.getLatitute();
        BVApp.utils.CurrentGeoPosition.longitude = bvappObj.getLongitute();
    },

    locationReady: function()
    {
        this.ui.determinePositionMask.hide();
        this.showCurrentLocation();
    },

    /**
        if we are near a know location, just show it directly
     */

    showCurrentLocation: function()
    {
        var location = this.getCurrentLocationRecord();
        if(location !== null)
        {
            this.ui.favoriteRestaurantPanel.updateRestaurant(location);
            this.ui.setActiveItem(this.ui.favoriteRestaurantPanel,false)
            this.ui.activeView = this.ui.favoriteRestaurantPanel;
        }
    },

    /**
     * returns an Location Record if there is a location in locationDistanceLimit, otherwise null
       Hvis der er et spisested indenfor locationDistanceLimit-grænsen, popper den automatisk op, når app'en starter!
     */
       getCurrentLocationRecord: function(){
           var loader = new Ext.LoadMask(this.ui.getId(), {msg:BVApp.Main.getLangString("Loading")});
           loader.show();
           var location=null;
           var store;

           [BVApp.Main.restaurantStoreID].forEach(function(k,v){
               store = Ext.StoreMgr.lookup(v);
               store.clearFilter(false);
               store.filter([store.nowOpenFilter]);
               store.updateDistance();
               store.sort({
                   property: "distance",
                   direction: "ASC"
               });
               if(store.getCount()>0){
                   if(location === null){
                       location = store.getAt(0);
                   }else{
                       if(location.get("distance") > store.getAt(0).get("distance")){
                           location = store.getAt(0);
                       }
                   }}
           });
           if(location !== null){
               if(location.get("distance") > this.locationDistanceLimit){
                   location = null; // not in distance limit, so return null
               }
           }
           count++;
           if(count >= 2)
           {
                loader.hide();
           }
           return location;
       },

    /**
     *
     * @param key
     * @param lang optional
     */
    getLangString: function (key,lang)
    {
        if(lang === undefined)
        {
            lang = BVApp.utils.Settings.language
        }
      return BVApp.utils.Locales[lang][key];
    },
    getAppInfoPhoneGapForEMail: function(){
        var body = "";
        body += "**************************\n" ;
        body += "App Version: " +this.version + "\n" ;
        body += "Device Name: " +device.name + "\n" ;
        body += "Platform: " + device.platform + "\n";
        body += "Device Version: " + device.version + "\n";
        body += "Performance: " + this.performance + "\n";
        body += "**************************\n" ;
        return body;
    },
    /**
     * returns record or null, searches all available stores
     * restaurantStore,cafeStore,shopStore
     * @param lat
     */
    findLocationByLat: function(lat)
    {
        var store = Ext.StoreMgr.lookup(BVApp.Main.restaurantStoreID);
        var record = store.findRecord("lat",lat);
        if(record !== null) return record;
        store = Ext.StoreMgr.lookup(BVApp.Main.cafeStoreID);
        record = store.findRecord("lat",lat);
        if(record !== null) return record;
        store = Ext.StoreMgr.lookup(BVApp.Main.shopStoreID);
        record = store.findRecord("lat",lat);
        return record;
    }

};

Ext.setup({
    icon: 'resources/images/icon.png',
            tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'resources/images/splashscreen.png',
            statusBarStyle: 'black',
            glossOnIcon: true,
            onReady: function() {
                console.log("Ext.setup.onReady");
                if(!BVApp.data.RestaurantStoreData){ // no internet connection, so quit the app
                    new BVApp.views.NoConnectionPanel();
                    //noConnectionPanel.show();
                    //var lang = BVApp.utils.AppUtils.getUserLanguage();
                    //alert(BVApp.utils.Locales[lang]["NoConnection"]);
                    //BVApp.utils.AppUtils.quitApp();

                    /*BVApp.utils.AppUtils.alertMessage(
                        BVApp.Main.getLangString("NoConnectionTitle",lang),
                        BVApp.Main.getLangString("NoConnection",lang),
                        function(){ // callback from alert
                        }
                    );
                    */
                }else{
                    // load google maps asynchrone
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=Ext.emptyFn";
                    document.body.appendChild(script);

                    BVApp.Main.launched =true;
                    BVApp.Main.init();
                }
            }
});