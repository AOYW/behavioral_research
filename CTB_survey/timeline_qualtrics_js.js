/*
Code for generating the timeline graphic style 1 using D3.js
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* hide the page and disable next button */
	jQuery('body').hide();
	this.disableNextButton();
	
	/* variable to be captured from survey */
	var currentAge = parseInt("${e://Field/currentAge}") || 21;
	
	/* size of the graphic and style parameters */
	var height = 300;
	var width = 800;
	var margin = 10; // left right margin
	var maxAge = 85;
	var labelSize = 16; // font-size of labels
	
	/* create svg element*/
	var svg = d3.select("#res")
		.append('svg')
			.attr('width', width)
			.attr('height', height)
	
	/* create scales for years and ages */
	var years = d3.scaleTime()
		.domain([Date.now() - currentAge * 365.24 * 24 * 60 * 60 * 1000, 
				 	   Date.now() + (maxAge - currentAge) * 365.24 * 24 * 60 * 60 * 1000])
		.range([margin, width -  margin])
		//.nice();
	
	var ages = d3.scaleLinear()
		.domain([0, maxAge])
		.range([margin, width - margin])
		//.nice();

	/* draw two axes on top and bottom */
	 svg.append("g")
		 .attr("class", "x axis")
		 .attr("transform", "translate(0," + (height/2 - 10) + ")")
		 .call(d3.axisTop(years));
	
	 svg.append("g")
		 .attr("class", "x axis")
		 .attr("transform", "translate(0," + (height/2 + 10) + ")")
		 .call(d3.axisBottom(ages));
	
	/* adding text labels */
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width - margin)
		.attr("y", height/2 - 50)
		.attr('dominant-baseline', 'middle')
		.text("Date");
	
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width - margin)
		.attr("y", height/2 + 50)
		.attr('dominant-baseline', 'middle')
		.text("Age");
	
	/*
	svg.append("text")
		.attr("text-anchor", "start")
		.attr("x", 0)
		.attr("y", height/2)
		.attr('dominant-baseline', 'middle')
		.text("Now");
	*/
	
	function renderPoint(time, text, isLate) {		
		/* find x coordinates of the time point*/
		var xAge = ages(currentAge + time);
		var xYear = years(Date.now() + time * 365.24 * 24 * 60 * 60 * 1000);

		/* define the color to use */
		var color = (isLate === true) ? '#80b1d3' : '#fb8072';
		var yStart = (isLate === true) ? (height/2 - 10) : (height/2 + 10);
		var yEnd= (isLate === true) ? height - 80 : 80;

		/* if the early period is not now, label now */
		if (isLate == false && text != "now") {
			/* draw a line at now */
			svg.append("line")
				.style('stroke', 'black')
				.style("stroke-dasharray", ("5, 5"))
				.attr('stroke-width', '2')
				.attr("x1", years(Date.now()))
				.attr("y1", yStart)
				.attr("x2", ages(currentAge))
				.attr("y2", yEnd)
			
			/* label now*/
			svg.append("text")
				.attr("x", xAge - 10)
				.attr("y", 75)
				.attr("text-anchor", "end")
				.attr('dominant-baseline', 'middle')
				.style("font-size", labelSize + 'px')
				.style('fill', "black")
				.text('Now')
		}
		
		/* draw a line at the point */
		svg.append("line")
			.style('stroke', color)
			.style("stroke-dasharray", ("5, 5"))
			.attr('stroke-width', '2')
			.attr("x1", xYear)
			.attr("y1", yStart)
			.attr("x2", xAge)
			.attr("y2", yEnd)
		
		/* add additional text to display */
		text += "\nIt is the year " + (parseInt(new Date().getFullYear()) + time);
		text += "\nand you are " + (currentAge + time) + " years old ";
		/* label timepoints with multiline text */
		var texts = (isLate === true) ? text.split('\n') : text.split('\n').reverse();
		var y = (isLate === true) ? height - 75 : 75;
		var yOffset = (isLate === true) ? labelSize : -labelSize;
		for (i = 0; i < texts.length; i++) { // loop for multiple lines
			svg.append("text")
				.attr("x", xAge)
				.attr("y", y + i * yOffset)
				.attr("text-anchor", "start")
				.attr('dominant-baseline', 'middle')
				.style("font-size", labelSize + 'px')
				.style('fill', color)
				.text(texts[i])
		}
	}
	
	renderPoint(parseInt("${lm://Field/3}"), "${lm://Field/1}", false) // mark the earlier date
	renderPoint(parseInt("${lm://Field/4}"), "${lm://Field/2}", true)  // mark the later date
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	
	/* fade in to show the question body when the graphic is ready */ 
	var that = this
	jQuery("#res svg").ready(function() {
		jQuery('body').fadeIn(1000);
		that.enableNextButton();
	});
	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});

/*
Code for generating the timeline graphic style 2 using timeline (https://github.com/squarechip/timeline)
Note: library needs to be loaded in header section, and text will be modified in actual survey.
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/	
	jQuery('.timeline').timeline({
		verticalStartPosition: 'right',
		verticalTrigger: '150px'
	});
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
