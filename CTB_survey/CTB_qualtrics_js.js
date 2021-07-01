/*
Code for the intro block.
Initiates the list to put all the answers
*/
/* array to keep all responses from loop*/
var ans = [];

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

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
Code for the intro block.
Stores the current income entered and calculates the future income with a 20% raise
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
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Get the answer
	var presentInc = jQuery('#' + this.questionId + " .InputText").val();
	var futureInc = Math.round(presentInc * 1.2);
	// Store futureIncome for use
	Qualtrics.SurveyEngine.setEmbeddedData("futureIncome", futureInc);
	// Add comma to income for presentation
	Qualtrics.SurveyEngine.setEmbeddedData("FutureIncome", futureInc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	Qualtrics.SurveyEngine.setEmbeddedData("PresentIncome", presentInc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the CTB block.
NOTE: the code needs modification for different questions.
*/
/* variables specific to different questions in the loop*/
var rate = parseFloat("$e{ ( 1 + lm://Field/9 ) ^ ( lm://Field/4 - lm://Field/3 ) }");
var rate_annual = "${lm://Field/9}";

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* change the question text */
	var qText = 'Finally, imagine that for every dollar you choose to <strong>NOT</strong> receive \
	<strong>${lm://Field/1}</strong> you will receive <strong>$' + rate.toFixed(2) + ' ${lm://Field/2}</strong>.';
	jQuery("#"+this.questionId+" .QuestionText").html(qText);
	
	/* make second entry box read only */
	jQuery("#"+this.questionId+" .InputText:eq(1)").prop("readonly", true);
	
	/* add text after the entry box */
	jQuery("tr:eq(0)").append("<td>" + textAfterEarly + "</td><td></td>");
	jQuery("tr:eq(1)").append("<td>" + textAfterLate + "</td>");
	jQuery("#"+this.questionId+" .InputText").each(function(){
		this.before('$');
	});
	
	/* flatten the table into one column*/
	jQuery('table').find('td').unwrap().wrap(jQuery('<tr/>'));
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	
	/* get the totalAmount from embedded data field */
	var total = parseInt("${e://Field/totalAmount}")
	/* get the question ID*/
	var QID = this.questionId
	
	/* limit the first text entry to numbers, min at 0, and max at totalAmount */
	//jQuery("#" + QID + " .InputText:eq(0)").attr({'type': 'number', 'min': '0', 'max': "${e://Field/totalAmount}"});
	
	/* jQuery event handler that calculates the amount of money received later and fills in */
	jQuery("#" + QID + " .InputText:first").on('keyup click', function() {
		
		/* get the input value */
		var val = this.value;
		/* test if input contains only digits */
		let isNum = /^\d+$/.test(val);
		/* parse into integer or set to 0 if no input */
		if (isNum) {
			val = parseInt(val);
		} else { // if no number or other characters
			val = 0;
			//jQuery("#" + QID + " .InputText:eq(0)").val("0");
		};
		
		if (event.which != 8 && isNaN(String.fromCharCode(event.which))) { // do not allow special chars
			event.preventDefault(); //stop character from entering input
		} else if (val > total) { // do not allow going over total amount
			jQuery("#" + QID + " .InputText:eq(0)").val(total.toString());
			val = total;
			event.preventDefault(); //stop character from entering input
		};
		
		/* calculates the amount received later and fill in to second box */
		var later = Math.round((total - val) * rate);
		jQuery('#' + QID + " .InputText:eq(1)").val(later.toString());
		
	});
});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/* record answers for this loop*/
	var thisRound = {
		"loop": "${lm://CurrentLoopNumber}",
		"question": "Fifth",
		"early": "${lm://Field/3}",
		"late": "${lm://Field/4}",
		"rate": rate.toFixed(2),
		"annual": rate_annual,
		"total": "${e://Field/totalAmount}",
		"amountEarly": jQuery('#' + this.questionId + " .InputText:eq(0)").val(),
		"amountLate": jQuery('#' + this.questionId + " .InputText:eq(1)").val(),
		"presentIncome": "${e://Field/presentIncome}",
		"futureIncome": "${e://Field/futureIncome}",
	};
	/* adds response of this loop to the array*/
	ans.push(thisRound);
	
	/* allow bogus questions for 3rd loop */
	if ((parseInt("${lm://CurrentLoopNumber}") + 1) == 3) {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'True');
	} else {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'False');
	}
	
	console.log("${lm://CurrentLoopNumber}");
	console.log(ans);
})

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
	Qualtrics.SurveyEngine.setEmbeddedData("surveyResponse", JSON.stringify(ans));
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
