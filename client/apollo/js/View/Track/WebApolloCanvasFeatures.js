define( [
            'dojo/_base/declare',
            'dojo/_base/array',
            'JBrowse/View/Track/CanvasFeatures',
            'dijit/Menu',
            'dijit/MenuItem',
            'dijit/CheckedMenuItem',
            'dijit/MenuSeparator',
            'dijit/PopupMenuItem',
            'dijit/Dialog',
            'JBrowse/Util',
            'JBrowse/Model/SimpleFeature',
            'WebApollo/SequenceOntologyUtils'
        ],
        function( declare,
            array,
            CanvasFeaturesTrack,
            dijitMenu,
            dijitMenuItem,
            dijitCheckedMenuItem,
            dijitMenuSeparator,
            dijitPopupMenuItem,
            dijitDialog,
            Util,
            SimpleFeature,
            SeqOnto )
{

return declare( CanvasFeaturesTrack,

{
    constructor: function() {
        this.browser.getPlugin( 'WebApollo', dojo.hitch( this, function(p) {
            this.webapollo = p;
        }));
    },
    _defaultConfig: function() {
        console.log("WA config",document.body);
        var config = Util.deepUpdate(dojo.clone(this.inherited(arguments)),
            {
                style: {
                    textColor: function() { return dojo.hasClass(document.body,'Dark') ?'white': 'black'; },
                    text2Color: function() { return dojo.hasClass(document.body,'Dark')? 'LightSteelBlue': 'blue'; },
                    connectorColor: function() { return dojo.hasClass(document.body,'Dark')? 'lightgrey': 'black'; },
                    color: function() { return dojo.hasClass(document.body,'Dark')? 'orange': 'goldenrod'; }
                }
            });
        var thisB=this;
        var atrack=thisB.webapollo.getAnnotTrack();
        var official = atrack.getApollo().isOfficialTrack(thisB.key);
        console.log('is official track',thisB,official)
        config.menuTemplate.push(            {
              "label" : "Create new annotation",
              "children" : [
                {
                  "label" : "gene",
                  "action":  function() {
                     atrack.createAnnotations({x1:{feature:this.feature}},true);
                  }
                },
                {
                  "label" : "pseudogene",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "transcript", null, "pseudogene",official);
                  }
                },
                {
                  "label" : "tRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "tRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "snRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "snRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "snoRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "snoRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "ncRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "ncRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "rRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "rRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "miRNA",
                  "action" : function() {
                     atrack.createGenericAnnotations([this.feature], "miRNA", null, "gene",official);
                   }
                },
                {
                  "label" : "Repeat region",
                  "action" : function() {
                     atrack.createGenericOneLevelAnnotations([this.feature], "repeat_region", true,official);
                   }
                },
                {
                  "label" : "Terminator",
                  "action" : function() {
                      atrack.createGenericOneLevelAnnotations([this.feature], "terminator", true,official);
                  }
                },
                {
                  "label" : "Transposable element",
                  "action" : function() {
                     atrack.createGenericOneLevelAnnotations([this.feature], "transposable_element", true,official);
                   }
                }
              ]
            }
        );
        return config;
    }


});

});

