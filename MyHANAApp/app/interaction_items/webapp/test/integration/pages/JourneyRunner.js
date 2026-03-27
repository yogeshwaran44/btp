sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"interactionitems/test/integration/pages/Interactions_HeaderList",
	"interactionitems/test/integration/pages/Interactions_HeaderObjectPage"
], function (JourneyRunner, Interactions_HeaderList, Interactions_HeaderObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('interactionitems') + '/test/flp.html#app-preview',
        pages: {
			onTheInteractions_HeaderList: Interactions_HeaderList,
			onTheInteractions_HeaderObjectPage: Interactions_HeaderObjectPage
        },
        async: true
    });

    return runner;
});

