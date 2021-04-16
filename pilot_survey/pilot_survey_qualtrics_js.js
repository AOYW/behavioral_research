/*
Code for the intro block.
Precalculation of dates and start_amount for the titration method
*/


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
	var minAmount = parseInt("${e://Field/min_amount}");
	var maxAmount = parseInt("${lm://Field/4}");
	var startAmount = Math.floor((minAmount + maxAmount)/2)
	var choice = this.getChoiceAnswerValue();
	if (choice == '4') { /* yes*/
		var next_amount = Math.floor((minAmount + startAmount)/2);
		var high_amount = startAmount;
		var low_amount = minAmount;
	} else if (choice == '5') { /* no*/
		var next_amount = Math.floor((maxAmount + startAmount)/2);
		var high_amount = maxAmount;
		var low_amount = startAmount;
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
	var highAmount = parseInt("${e://Field/high_amount}");
	var lowAmount = parseInt("${e://Field/low_amount}");
	var nextAmount = parseInt("${e://Field/next_amount}");
	var choice = this.getChoiceAnswerValue();
	if (choice == '1') {
		highAmount = nextAmount;
		nextAmount = Math.floor((lowAmount + nextAmount)/2);
	} else if (choice == '2') {
		lowAmount = nextAmount;
		nextAmount = Math.floor((highAmount + nextAmount)/2);
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
