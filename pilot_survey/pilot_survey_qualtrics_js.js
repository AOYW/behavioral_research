/*
Code for the intro block.
Precalculation of dates and start_amount for the titration method
*/
// array to keep all responses from loop
var ans = [];

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	/* Calculates dates*/
	var today = new Date()
	var early = parseInt("${e://Field/date_early}")
	var late = parseInt("${e://Field/date_late}")
	var dateEarly =  (today.getMonth()+1) + '/' +today.getDate() + '/' + (today.getFullYear() + early);
	Qualtrics.SurveyEngine.setEmbeddedData("DateEarly", dateEarly)
	var dateLate =  (today.getMonth()+1) + '/' +today.getDate() + '/' + (today.getFullYear() + late);
	Qualtrics.SurveyEngine.setEmbeddedData("DateLate", dateLate)
	
	/* Calculates starting amount*/
	var minAmount = parseInt("${e://Field/min_amount}")
	var maxAmount = parseInt("${e://Field/max_amount}")
	var startAmount = Math.floor((minAmount + maxAmount)/2)
	/* save variable for future use*/
	Qualtrics.SurveyEngine.setEmbeddedData("start_amount", startAmount);
	/* added comma for presentation in questions*/
	Qualtrics.SurveyEngine.setEmbeddedData("StartAmount", startAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	Qualtrics.SurveyEngine.setEmbeddedData("MinAmount",minAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	Qualtrics.SurveyEngine.setEmbeddedData("MaxAmount", maxAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the titration block.
Part I. Initial Question (e.g. Q52)
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/* get variables from embedded data fields*/
	var minAmount = parseInt("${e://Field/min_amount}");
	var maxAmount = parseInt("${lm://Field/4}");
	/* calculates start amount from min and max*/
	var startAmount = Math.floor((minAmount + maxAmount)/2)
	/* get response for this question*/
	var choice = this.getChoiceAnswerValue();
	if (choice == '4') { // if yes
		var next_amount = Math.floor((minAmount + startAmount)/2); // next would be average of start and min
		var high_amount = startAmount; // upper bound is the starting amount
		var low_amount = minAmount; // lower bound is the min amount
	} else if (choice == '5') { // if no
		var next_amount = Math.floor((maxAmount + startAmount)/2); // next would be average of start and max
		var high_amount = maxAmount; // upper bound is the max amount
		var low_amount = startAmount; // lower bound is the starting amount
	}
	/* save variable for future use*/
	Qualtrics.SurveyEngine.setEmbeddedData("next_amount", next_amount);
	Qualtrics.SurveyEngine.setEmbeddedData("high_amount", high_amount);
	Qualtrics.SurveyEngine.setEmbeddedData("low_amount", low_amount);
	/* add comma for presentation*/
	Qualtrics.SurveyEngine.setEmbeddedData("NextAmount", next_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the titration block.
Part II. Titration Loop Questions (e.g. Q80)
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/* get variables from embedded data fields*/
	var highAmount = parseInt("${e://Field/high_amount}");
	var lowAmount = parseInt("${e://Field/low_amount}");
	var nextAmount = parseInt("${e://Field/next_amount}");
	/* get response for this question*/
	var choice = this.getChoiceAnswerValue();
	if (choice == '1') { // if yes
		highAmount = nextAmount; // upper bound would be current amount
		nextAmount = Math.floor((lowAmount + nextAmount)/2); // next amount would be the average
	} else if (choice == '2') { // if no
		lowAmount = nextAmount; // lower bound would be current amount
		nextAmount = Math.floor((highAmount + nextAmount)/2); // next amount would be the average
	}
	/* update variable for future use*/
	Qualtrics.SurveyEngine.setEmbeddedData("next_amount", nextAmount);
	Qualtrics.SurveyEngine.setEmbeddedData("high_amount", highAmount);
	Qualtrics.SurveyEngine.setEmbeddedData("low_amount", lowAmount);
	/* add comma for presentation*/
	Qualtrics.SurveyEngine.setEmbeddedData("NextAmount", nextAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the titration block.
Part III. Titration Loop Final Question (e.g. Fifth)
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/* get variables from embedded data fields*/
	var highAmount = parseInt("${e://Field/high_amount}");
	var lowAmount = parseInt("${e://Field/low_amount}");
	var nextAmount = parseInt("${e://Field/next_amount}");
	/* get response for this question*/
	var choice = this.getChoiceAnswerValue();
	if (choice == '1') { // if yes
		highAmount = nextAmount; // upper bound would be current amount
		nextAmount = Math.floor((lowAmount + nextAmount)/2); // next amount would be the average
	} else if (choice == '2') { // if no
		lowAmount = nextAmount; // lower bound would be current amount
		nextAmount = Math.floor((highAmount + nextAmount)/2); // next amount would be the average
	}
	
	/* No need to update embedded data fields*/
	
	/* record answers for this loop*/
	var thisRound = {
		"loop": "${lm://CurrentLoopNumber}",
		"early": "${lm://Field/1}",
		"late": "${lm://Field/2}",
		"min": "${e://Field/min_amount}",
		"max": "${lm://Field/4}",
		"high": highAmount,
		"low": lowAmount,
		"mean": nextAmount,
	};
	/* adds response of this loop to the array*/
	ans.push(thisRound);
	/* for debugging
	console.log(ans);
	*/
	
	/* allow reminder for 4th 7th, 10th loop */
	if ([4, 7, 10].includes(parseInt("${lm://CurrentLoopNumber}") + 1)) {
		Qualtrics.SurveyEngine.setEmbeddedData("progressStatement", 'True');
	} else {
		Qualtrics.SurveyEngine.setEmbeddedData("progressStatement", 'False');
	}
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the exit block.
Save the responses as a stringified array to the embedded data field.
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	/* record survey response*/
	Qualtrics.SurveyEngine.setEmbeddedData("surveyResponse", JSON.stringify(ans));
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
