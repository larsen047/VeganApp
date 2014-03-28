
BVApp.utils.Settings = new Object({
    animation: null,
    distanceUnit: null,
    language: null,
    filterNowOpen: false,
    filterVeganDeclared: false,
    filterWheelChair: false,
    filterOrganic: false,
    filterDogsAllowed: false,
    filterDelivery: false,

    //filterShoppingNowOpen: true,
    filterShoppingOrganicStore: false,
    filterShoppingBakedGoods: false,
    filterShoppingIcecream: false,
    filterShoppingDrugStore: false,

    init: function(){
        console.log("Settings:init");
        var language = BVApp.utils.AppUtils.getUserLanguage();

        var distanceUnit = language==="dk" ? "metric" : "imperial";
        

        var settingStore = Ext.StoreMgr.lookup("settingStore");
        if(settingStore.getCount()===0)
        { // if no settings available, create default one
            settingStore.add
            (
                {
                    id:"1",
                    language: language,
                    distanceUnit: distanceUnit,
                    animation: Ext.is.Desktop ? true : false
                }
            );
        }
        settingStore.sync();
        var setting  = settingStore.getAt(0);
        this.updateSettings(setting);
        /*
        if(this.language === "dk")
        {
            this.filterVeganDeclared = true;
        }
        */

    },
    getSettingRecord: function(){
        return Ext.StoreMgr.lookup("settingStore").getAt(0); 
    },
    writeSettings: function(){
        var settingStore = Ext.StoreMgr.lookup("settingStore");
        settingStore.sync();
        var setting  = settingStore.getAt(0);
        this.updateSettings(setting);
    },
    /**
     * @private
     * @param record
     */
    updateSettings: function(record)
    {
        this.animation = record.get("animation");
        this.distanceUnit = record.get("distanceUnit");
        this.language = record.get("language");
    }
});