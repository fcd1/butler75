        var tl;
        function onLoad() {
            var tl_el = document.getElementById("tl");
            var eventSource = new Timeline.DefaultEventSource();

            var theme = Timeline.ClassicTheme.create();
            theme.autoWidth = true; // Set the Timeline's "width" automatically.
                                     // Set autoWidth on the Timeline's first band's theme,
                                     // will affect all bands.
            theme.timeline_start = new Date(Date.UTC(1920, 0, 1));
            theme.timeline_stop  = new Date(Date.UTC(2020, 0, 1));

            var d = Timeline.DateTime.parseGregorianDateTime("1935")
            var bandInfos = [
                Timeline.createBandInfo({
                    width:          "10%", // set to a minimum, autoWidth will then adjust
                    intervalUnit:   Timeline.DateTime.DECADE,
                    intervalPixels: 200,
                    date:           d,
                    theme:          theme //,
                    //layout:         'detailed'  // original, overview, detailed
                }),
                Timeline.createBandInfo({
                    width:          "90%", 
                    intervalUnit:   Timeline.DateTime.DECADE, 
                    intervalPixels: 200,
                    eventSource:    eventSource,
                    date:           d,
                    theme:          theme
                })
            ];
            bandInfos[0].etherPainter = new Timeline.YearCountEtherPainter({
                startDate:  "Jan 1 1920 00:00:00 GMT",
                multiple:   5,
                theme:      theme
            });
            bandInfos[0].syncWith = 1;
            bandInfos[0].highlight = false;
            bandInfos[0].decorators = [
                new Timeline.SpanHighlightDecorator({
                    startDate:  "Jan 1 1910 00:00:00 GMT",
                    endDate:    "Dec 31 2010 00:00:00 GMT",
                    startLabel: "start",
                    endLabel:   "end",
                    color:      "#f0e8cb",
                    opacity:    50,
                    theme:      theme
                })
           ];
           bandInfos[1].decorators = [
                new Timeline.SpanHighlightDecorator({
                    startDate:  "Jan 1 1910 00:00:00 GMT",
                    endDate:    "Dec 31 2010 00:00:00 GMT",
                    startLabel: "start",
                    endLabel:   "end",
                    color:      "#f0e8cb",
                    opacity:    50,
                    theme:      theme
                })
           ];


            // create the Timeline
            tl = Timeline.create(tl_el, bandInfos, Timeline.HORIZONTAL);
	// The base url for image, icon and background image
//            var url = '/application/views/scripts/javascripts/timeline/timeline_2.3.0/'; 
//            var url = 'application/views/scripts/javascripts/timeline/timeline_2.3.0/'; 
//            var url = 'omekacul203/application/views/scripts/javascripts/timeline/timeline_2.3.0/'; 
            var url = '/omekacul203/application/views/scripts/javascripts/timeline/timeline_2.3.0/'; 
                           // references in the data

            eventSource.loadJSON(timeline_data, url); // The data was stored into the
                                                       // timeline_data variable.
            tl.layout(); // display the Timeline
        }

        var resizeTimerID = null;
        function onResize() {
            if (resizeTimerID == null) {
                resizeTimerID = window.setTimeout(function() {
                    resizeTimerID = null;
                    tl.layout();
                }, 500);
            }
        }

