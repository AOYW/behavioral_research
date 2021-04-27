/*
Code for generating the timeline graphic style 1 using D3.js
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* variable to be captured from survey */
	var currentAge = 22
	
	/* size of the graphic */
	var height = 300;
	var width = 800;
	var margin = 100; // left right margin
	var maxAge = 85;
	
	/* create svg element*/
	var svg = d3.select("#res")
		.append('svg')
			.attr('width', width)
			.attr('height', height)
	
	/* create scales for years and ages */
	var years = d3.scaleTime()
		.domain([Date.now(), Date.now() + (maxAge - currentAge) * 365.24 * 24 * 60 * 60 * 1000])
		.range([margin, width -  margin])
		//.nice();
	
	var ages = d3.scaleLinear()
		.domain([currentAge, maxAge])
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

	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width - 50)
		.attr("y", height/2 - 50)
		.text("Year");
	
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width - 50)
		.attr("y", height/2 + 60)
		.text("Age");
	
	function renderPoint(time, text, isLate) {
		/* find x coordinates of the time point*/
		var xAge = ages(currentAge + time);
		var xYear = years(Date.now() + time * 365.24 * 24 * 60 * 60 * 1000);
		/* define the color to use */
		var color = (isLate === true) ? '#80b1d3' : '#fb8072';
		
		/* draw circles at the point */
		svg.append("circle") // add circle for age axis
			.attr("transform", "translate(0, " + (height/2 + 10) + ")")
			.attr("cx", xAge)
			.attr("fill", color)
			.attr("r", 10);
		
		svg.append("circle") // add circle for year axis
			.attr("transform", "translate(0, " + (height/2 - 10) + ")")
			.attr("cx", xYear)
			.attr("fill", color)
			.attr("r", 10);
		
		/* draw a line at the point */
		svg.append("line")
			.style('stroke', color)
			.style("stroke-dasharray", ("5, 5"))
			.attr("x1", xYear)
			.attr("y1", margin)
			.attr("x2", xAge)
			.attr("y2", height - margin)
		
		svg.append("text") // label time points
			.attr("x", xAge)
			.attr("y", (isLate === true) ? height - 70 : 70)
			.style('fill', color)
			.text(text);
	}
	
	renderPoint(parseInt("${lm://Field/3}"), "${lm://Field/1}", false) // mark the earlier date
	renderPoint(parseInt("${lm://Field/4}"), "${lm://Field/2}", true)  // mark the later date
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

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
