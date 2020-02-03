//Scroll Top
$(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".thetop").offset().top},"1000");return false})})

$(document).ready(function() {
	//SMILE
	 $('.smile-mood').click(function(){
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".smile-box").not(targetBox).hide();
        $(targetBox).show();
    });
	
	//Employee List 
	$(".e-row").click(function(){
	  $(".e-list").hide();
	  });
	
	$(".back").click(function(){
	  $(".e-list").show();
	  });
	
	//SEARCHABLE Employee Directory
	$( '#searchable-container' ).searchable({
        searchField: '#container-search',
        selector: '.row',
        childSelector: '.col-xs-11',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        },
		
    })
	//SEARCHABLE Highlight Employee Directory
	jQuery.fn.highlight = function(pat) {
	 function innerHighlight(node, pat) {
	  var skip = 0;
	  if (node.nodeType == 3) {
	   var pos = node.data.toUpperCase().indexOf(pat);
	   if (pos >= 0) {
		var spannode = document.createElement('span');
		spannode.className = 'highlight';
		var middlebit = node.splitText(pos);
		var endbit = middlebit.splitText(pat.length);
		var middleclone = middlebit.cloneNode(true);
		spannode.appendChild(middleclone);
		middlebit.parentNode.replaceChild(spannode, middlebit);
		skip = 1;
	   }
	  }
	  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
	   for (var i = 0; i < node.childNodes.length; ++i) {
		i += innerHighlight(node.childNodes[i], pat);
	   }
	  }
	  return skip;
	 }
	 return this.each(function() {
	  innerHighlight(this, pat.toUpperCase());
	 });
	};
	
	jQuery.fn.removeHighlight = function() {
	 function newNormalize(node) {
		for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
			var child = children[i];
			if (child.nodeType == 1) {
				newNormalize(child);
				continue;
			}
			if (child.nodeType != 3) { continue; }
			var next = child.nextSibling;
			if (next == null || next.nodeType != 3) { continue; }
			var combined_text = child.nodeValue + next.nodeValue;
			new_node = node.ownerDocument.createTextNode(combined_text);
			node.insertBefore(new_node, child);
			node.removeChild(child);
			node.removeChild(next);
			i--;
			nodeCount--;
		}
	 }
	
	 return this.find("span.highlight").each(function() {
		var thisParent = this.parentNode;
		thisParent.replaceChild(this.firstChild, this);
		newNormalize(thisParent);
	 }).end();
	};
	
	$('.text-search').bind('keyup change', function(ev) {
        // pull in the new value
        var searchTerm = $(this).val();

        // remove any old highlighted terms
        $('body').removeHighlight();

        // disable highlighting if empty
        if ( searchTerm ) {
            // highlight the new term
            $('body').highlight( searchTerm );
        }
    });


	
	
	//BOX TOGGLE
	$('.top-toggle').on('click', function() {
	$parent_box = $(this).closest('.box-toggle');
	$parent_box.siblings().find('.bottom-toggle').slideUp();
	$parent_box.find('.bottom-toggle').slideToggle(1000, 'swing');
	});
	
	//Accordion Toggle
	$('.accordion').each(function () {
	var $accordian = $(this);
	$accordian.find('.accordion-head').on('click', function () {
		$(this).parent().find(".accordion-head").removeClass('a-open a-close');
		$(this).removeClass('a-open').addClass('a-close');
		$accordian.find('.accordion-body').slideUp();
		if (!$(this).next().is(':visible')) {
			$(this).removeClass('a-close').addClass('a-open');
			$(this).next().slideDown();
		}
	});
	});

	//MY TASK LIST (Task History - More and Less Toggle)
	$('input[class="check-color"]').change(function () {           
		var checked = $(this).is(':checked');
		$(this).parent().toggleClass('check-color',checked);
		$(this).parent().toggleClass('uncheck-color',!checked);    
	});
	
	//Internal E Services
  	$('.glyphicon-chevron-up').click(function () {
    $('.bottom-pullup .showcontent').slideToggle({
      direction: "up"
    }, 300);
    $(this).toggleClass('glyphicon-chevron-down');
	}); // end click

	// Recent Contacts
	$('#myCarousel').carousel({interval: 4000});
	
	$('.recent-contacts .item').each(function(){
	  var next = $(this).next();
	  if (!next.length) {
		next = $(this).siblings(':first');
	  }
	  next.children(':first-child').clone().appendTo($(this));
	
	  for (var i=0;i<2;i++) {
		next=next.next();
		if (!next.length) {
		  next = $(this).siblings(':first');
		}
	
		next.children(':first-child').clone().appendTo($(this));
	  }
	});
	
	//Smile
	$('.holdingbox').hover(function(){
        $('.allsmile').stop().animate({width: '8em'}, 1000)
    }, function(){
        $('.allsmile').stop().animate({width: '-0'}, 1000);
	});
	
	//Dashboard
	Morris.Donut({
		element: 'VoteCount',
		  resize: true,
		  data: [
			{label: '20', value: 20, formatted: 'Total Votes' },
			{label: '32', value: 32, formatted: 'Total Votes' },
			{label: '25', value: 25, formatted: 'Total Votes' },
		  ],
		  colors: ['#e5a3c8','#7078a7','#5aa3ba'],
		  formatter: function (x,data) {return data.formatted; }
	});
	
		
	//Latest News Slider
	$('#custom_carousel').carousel({interval:2000});
    $('#custom_carousel').on('slide.bs.carousel', function (evt) {
       
      $('#custom_carousel .controls li.active').removeClass('active');
      $('#custom_carousel .controls li:eq('+$(evt.relatedTarget).index()+')').addClass('active');
    });
	var clickEvent = false;
	$('#LatestNews').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
		}).on('slid.bs.latest-news', function(e) {
			if(!clickEvent) {
				var count = $('.nav').children().length -1;
				var current = $('.nav li.active');
				current.removeClass('active').next().addClass('active');
				var id = parseInt(current.data('slide-to'));
				if(count === id) {
					$('.nav li').first().addClass('active');	
				}
			}
			clickEvent = false;
		});
	});
	
	//
	$('.more-opt').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-opt').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('LESS OPTIONS');                
            } else {
                 link.html('MORE OPTIONS');                
            }        
        });
            
    });
	
	//
	$('.more-opt-ar').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-opt-ar').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('خيارات أقل');                
            } else {
                 link.html('المزيد من الخيارات');                
            }        
        });
            
    });
	
	//TASK (Task History more option slide)
	$('.more').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('Less options <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('More options <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });
	
	$('.more-1').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-1').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('Less options <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('More options <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });
	
	$('.more-2').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-2').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('Less options <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('More options <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });

	//TASK (Task History more option slide)-Arabic
	$('.more-ar').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-ar').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('خيارات أقل <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('خيارات أخرى <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });
	
		$('.more-ar-1').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-ar-1').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('خيارات أقل <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('خيارات أخرى <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });
	
	$('.more-ar-2').click(function(){
		"use strict";
        var link = $(this);
        $('.showpanel-ar-2').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('خيارات أقل <img src="../images/up-arrow-gold.png" alt="" />');                
            } else {
                 link.html('خيارات أخرى <img src="../images/down-arrow-gold.png" alt="" />');                
            }        
        });
            
    });
	
	
	//3 Container Graph Toggle
	$('.graph-view').click(function(){
		"use strict";
        var link = $(this);
        $('.graph-panel').slideToggle('slow', function() {
            if ($(this).is(":visible")) {
                 link.html('<img src="../images/graph-hide.png" alt="" />');                
            } else {
                 link.html('<img src="../images/graph-view.png" alt="" />');                
            }        
        });
            
    });
	
	

	
	//ATTENDANCE (Datepicker)
	var active_dates = ["14/4/2017","21/3/2017","13/2/2017","8/2/2017"];
	$('.attendance-date').datepicker({
		startView: 0,
		multidate: true,
        minDate: 0,
		format: "dd/mm/yyyy",
     beforeShowDay: function(date){
         var d = date;
         var curr_date = d.getDate();
         var curr_month = d.getMonth() + 1; //Months are zero based
         var curr_year = d.getFullYear();
         var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

           if ($.inArray(formattedDate, active_dates) != -1){
               return {
                  classes: 'active'
               };
        }
          return;
      }
	});
	
	//Drop Down Menu
	$(".dropdown").hover(            
	function() {
		$('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
		$(this).toggleClass('open');
		$('b', this).toggleClass("caret caret-up");                
	},
	function() {
			$('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
			$(this).toggleClass('open');
			$('b', this).toggleClass("caret caret-up");                
		});
			
	//Three State Toggle
	$('.switch-me').switchy();
	$('.event').on('click', function(){
	  "use strict";
	$('.switch-me').val($(this).attr('event')).change();
	});
	$('.switch-me').change(function(){
		// Animate Switchy Bar background color
		"use strict";
		var bgColor = '#ffffff';
		if ($(this).val() === 'GOING'){
		  bgColor = '#bee190';
		} else if ($(this).val() === 'NOT GOING'){
		  bgColor = '#ec9267';
		}
		
		$('.switchy-bar').animate({
		  backgroundColor: bgColor
		});
		
		// Display action in console
		var log =  $(this).val();
		$('.console').html(log).hide().fadeIn();
		});
	
	//MY TASK LIST (Task Overview)
	function TaskOverview() {
		"use strict";
		var data = google.visualization.arrayToDataTable([
		  ['Task', 'No. of task'],
		  ['Completed', 50],
		  ['Pending', 35],
		  ['Overdue', 15],
		]);

		var options = {
		   colors: ['#90b757', '#fbc02c', '#f26c4f'],
		   backgroundColor:'transparent',
		   pieSliceText:'none',
		   pieStartAngle:180,
		   pieSliceBorderColor:'none',
		   chartArea:{left:20,top:20,width:'100%',height:'100%'},
		   legend:{position: 'right', alignment: 'center', textStyle: {color: '#5a5a5a', fontName:'Roboto', fontSize: 12}}
		};

		var chart = new google.visualization.PieChart(document.getElementById('TaskOverview'));

		chart.draw(data, options);
	  }
	
	//MY TASK LIST (Average Time)
	function AverageTime() {
	"use strict";
	var data = google.visualization.arrayToDataTable([
	  ['Hours', 'Hours'],
	  ['Task', 82],
	  ['Pending', 1440],
	]);

	var options = {
	   colors: ['#b78a35', '#e6d4b3'],
	   backgroundColor:'transparent',
	   pieSliceText:'none',
	   pieHole: 0.8,
	   pieStartAngle:0,
	   pieSliceBorderColor:'none',
	   pieSliceTextStyle: {color: '#b78a35',},
	   chartArea:{left:10,top:10, width:'90%',height:'90%'},
	   legend:'none',
	   tooltip:{trigger: 'none'},
	};

	var chart = new google.visualization.PieChart(document.getElementById('AverageTime'));

	chart.draw(data, options);
  }
	
	//MY TASK LIST (Tasks Remaining)
	function TasksRemaining() {
	"use strict";
	var data = google.visualization.arrayToDataTable([
	  ['Hours', 'Hours'],
	  ['Task', 12],
	  ['Pending', 8],
	]);

	var options = {
	   colors: ['#b78a35', '#e6d4b3'],
	   backgroundColor:'transparent',
	   pieSliceText:'none',
	   pieHole: 0.8,
	   pieStartAngle:0,
	   pieSliceBorderColor:'none',
	   pieSliceTextStyle: {color: '#b78a35',},
	   chartArea:{left:10,top:10, width:'90%',height:'90%'},
	   legend:'none',
	   tooltip:{trigger: 'none'},
	};

	var chart = new google.visualization.PieChart(document.getElementById('TasksRemaining'));

	chart.draw(data, options);
  }
  
    //REQUEST TRANSPORT (Requests)
	function TransportRequests() {
			"use strict";
			var data = google.visualization.arrayToDataTable([
			  ['Hours', 'Hours'],
			  ['Task', 75],
			  ['Pending', 25],
			]);
	
			var options = {
			   colors: ['#b78a35', '#e6d4b3'],
			   backgroundColor:'transparent',
			   pieSliceText:'none',
			   pieHole: 0.8,
			   pieStartAngle:0,
			   pieSliceBorderColor:'none',
			   pieSliceTextStyle: {color: '#b78a35',},
			   chartArea:{left:10,top:10, width:'90%',height:'90%'},
			   legend:'none',
			   tooltip:{trigger: 'none'},
			};
	
			var chart = new google.visualization.PieChart(document.getElementById('TransportRequests'));
	
			chart.draw(data, options);
		  }
		  
	//REQUEST TRANSPORT SERVICE MANAGER (VehicleFleet)
	function VehicleFleet() {
			"use strict";
			var data = google.visualization.arrayToDataTable([
			  ['Hours', 'Hours'],
			  ['Time', 17],
			  ['Pending', 11],
			]);
	
			var options = {
			   colors: ['#b78a35', '#e6d4b3'],
			   backgroundColor:'transparent',
			   pieSliceText:'none',
			   pieHole: 0.8,
			   pieStartAngle:0,
			   pieSliceBorderColor:'none',
			   pieSliceTextStyle: {color: '#b78a35',},
			   chartArea:{left:10,top:10, width:'90%',height:'90%'},
			   legend:'none',
			   tooltip:{trigger: 'none'},
			};
	
			var chart = new google.visualization.PieChart(document.getElementById('VehicleFleet'));
	
			chart.draw(data, options);
		  }
		  
	//REQUEST TRANSPORT SERVICE MANAGER (Drivers)
	function Drivers() {
			"use strict";
			var data = google.visualization.arrayToDataTable([
			  ['Drivers', 'Number'],
			  ['Available', 4],
			  ['Not Available', 6],
			]);
	
			var options = {
			   colors: ['#b78a35', '#e6d4b3'],
			   backgroundColor:'transparent',
			   pieSliceText:'none',
			   pieHole: 0.8,
			   pieStartAngle:0,
			   pieSliceBorderColor:'none',
			   pieSliceTextStyle: {color: '#b78a35',},
			   chartArea:{left:10,top:10, width:'90%',height:'90%'},
			   legend:'none',
			   tooltip:{trigger: 'none'},
			};
	
			var chart = new google.visualization.PieChart(document.getElementById('Drivers'));
	
			chart.draw(data, options);
		  }
	
	//ATTENDANCE (Attendance %)
	function Attendance() {
			"use strict";
			var data = google.visualization.arrayToDataTable([
			  ['Hours', 'Hours'],
			  ['Task', 75],
			  ['Pending', 25],
			]);
	
			var options = {
			   colors: ['#b78a35', '#e6d4b3'],
			   backgroundColor:'transparent',
			   pieSliceText:'none',
			   pieHole: 0.8,
			   pieStartAngle:0,
			   pieSliceBorderColor:'none',
			   pieSliceTextStyle: {color: '#b78a35',},
			   chartArea:{left:10,top:10, width:'90%',height:'90%'},
			   legend:'none',
			   tooltip:{trigger: 'none'},
			};
	
			var chart = new google.visualization.PieChart(document.getElementById('Attendance'));
	
			chart.draw(data, options);
		  }
		  
	//ATTENDANCE (Timings average)
	function AttendanceTimings() {
		"use strict";
		var data = google.visualization.arrayToDataTable([
		  ['Hours', 'Hours'],
		  ['Task', 9],
		  ['Pending', 3],
		]);

		var options = {
		   colors: ['#b78a35', '#e6d4b3'],
		   backgroundColor:'transparent',
		   pieSliceText:'none',
		   pieHole: 0.8,
		   pieStartAngle:0,
		   pieSliceBorderColor:'none',
		   pieSliceTextStyle: {color: '#b78a35',},
		   chartArea:{left:10,top:10, width:'90%',height:'90%'},
		   legend:'none',
		   tooltip:{trigger: 'none'},
		};

		var chart = new google.visualization.PieChart(document.getElementById('AttendanceTimings'));

		chart.draw(data, options);
	  }
	  
	//ATTENDANCE (Leaves Remaining)
	function AttendanceLeaves() {
			"use strict";
			var data = google.visualization.arrayToDataTable([
			  ['Hours', 'Hours'],
			  ['Task', 12],
			  ['Pending', 8],
			]);
	
			var options = {
			   colors: ['#b78a35', '#e6d4b3'],
			   backgroundColor:'transparent',
			   pieSliceText:'none',
			   pieHole: 0.8,
			   pieStartAngle:0,
			   pieSliceBorderColor:'none',
			   pieSliceTextStyle: {color: '#b78a35',},
			   chartArea:{left:10,top:10, width:'90%',height:'90%'},
			   legend:'none',
			   tooltip:{trigger: 'none'},
			};
	
			var chart = new google.visualization.PieChart(document.getElementById('AttendanceLeaves'));
	
			chart.draw(data, options);
		  }
		  
