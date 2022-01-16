/*
Code for the CTB intro.
Initiates the list to put all the answers
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	// Set earlyIsNow to true if earlier period is now, and to false otherwise.
	if ('${lm://Field/1}' == 'now') {
		Qualtrics.SurveyEngine.setEmbeddedData("earlyIsNow", 'True');
	} else {
		Qualtrics.SurveyEngine.setEmbeddedData("earlyIsNow", 'False');
	}
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
Code for the inc_now question.
Stores the current income entered with formatting
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	
});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	// Get the answer
	var presentInc = jQuery('#' + this.questionId + " .InputText").val();
	//
	Qualtrics.SurveyEngine.setEmbeddedData("presentIncome", presentInc);
	// Add comma to income for presentation
	Qualtrics.SurveyEngine.setEmbeddedData("PresentIncome", presentInc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	// Once filled in, no need to fill in again
	Qualtrics.SurveyEngine.setEmbeddedData("hasEnteredNow", 'True');
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the inc_early question.
Stores the early period income (1 year from now) entered with formatting
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
	var earlyInc = jQuery('#' + this.questionId + " .InputText").val();
	// Store earlyIncome for use
	Qualtrics.SurveyEngine.setEmbeddedData("earlyIncome", earlyInc);
	// Add comma to income for presentation
	Qualtrics.SurveyEngine.setEmbeddedData("EarlyIncome", earlyInc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	// Once filled in, no need to fill in again
	Qualtrics.SurveyEngine.setEmbeddedData("hasEntered", 'True');
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the inc_late question.
Stores the early period income (1 year from now) entered with formatting
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
	var futureInc = jQuery('#' + this.questionId + " .InputText").val();
	// Store futureIncome for use
	Qualtrics.SurveyEngine.setEmbeddedData("futureIncome", futureInc);
	// Add comma to income for presentation
	Qualtrics.SurveyEngine.setEmbeddedData("FutureIncome", futureInc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	// Use presentIncome if earlier period is now
	if ('${e://Field/earlyIsNow}' == 'True') {
		Qualtrics.SurveyEngine.setEmbeddedData("earlyIncome", '${e://Field/presentIncome}');
		Qualtrics.SurveyEngine.setEmbeddedData("EarlyIncome", '${e://Field/PresentIncome}');
	}
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the CTB single-page version.
NOTE: the code needs modification for different questions (rate1, rate1_annual, 'tr:eq(29)', ... etc)
*/
/* variables specific to each question in a loop*/
var rate5 = rates[4]
var rate5_annual = rates_annual[4]

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* change the question text */
	var qText = 'Finally, imagine that for every dollar you choose to <strong>NOT</strong> receive \
	<strong>${lm://Field/1}</strong> you will receive <strong>$' + rate5.toFixed(2) + ' ${lm://Field/2}</strong>.';
	jQuery("#"+this.questionId+" .QuestionText").html(qText);
	
	/* make second entry box read only */
	jQuery("#"+this.questionId+" .InputText:eq(1)").prop("readonly", true);
	
	/* add text after the entry box */
	if ("${e://Field/bogus}" == 'False') {
		jQuery("tr:eq(29)").append("<td>" + textAfterEarly + "</td><td></td>");
		jQuery("tr:eq(31)").append("<td>" + textAfterLate + "</td>");
	} else {
		jQuery("tr:eq(36)").append("<td>" + textAfterEarly + "</td><td></td>");
		jQuery("tr:eq(38)").append("<td>" + textAfterLate + "</td>");
	}
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
		var later = Math.round((total - val) * rate5);
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
		"future": "${lm://Field/4}",
		"rate": rate5.toFixed(2),
		"annual": rate5_annual,
		"total": "${e://Field/totalAmount}",
		"amountEarly": jQuery('#' + this.questionId + " .InputText:eq(0)").val(),
		"amountLate": jQuery('#' + this.questionId + " .InputText:eq(1)").val(),
		"earlyIncome": "${e://Field/earlyIncome}",
		"futureIncome": "${e://Field/futureIncome}",
	};
	/* adds response of this loop to the array*/
	ansCTB.push(thisRound);
	
	/* allow bogus questions for 2nd loop */
	if ((parseInt("${lm://CurrentLoopNumber}") + 1) == 2) {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'True');
	} else {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'False');
	}
	
	// console.log("${lm://CurrentLoopNumber}");
	// console.log(ansCTB);
})

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the bogus question in single-page CTB block.
Save the responses as a stringified array to the embedded data field.
*/
/* variables specific to different questions in the loop*/
var rateb = 0.25;
var rateb_annual = "0";

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* change the question text */
	/*
	var qText = 'Next, imagine that for every dollar you choose to <strong> NOT </strong> receive \
	<strong>${lm://Field/1}</strong>, you will receive <strong> ' + rate.toFixed(2) + ' ${lm://Field/2}</strong>.';
	jQuery("#"+this.questionId+" .QuestionText").html(qText);
	*/
	
	/* make second entry box read only */
	jQuery("#"+this.questionId+" .InputText:eq(1)").prop("readonly", true);
	
	/* add text after the entry box */
	jQuery("tr:eq(29)").append("<td>" + textAfterEarly + "</td><td></td>");
	jQuery("tr:eq(31)").append("<td>" + textAfterLate + "</td>");
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
		var later = Math.round((total - val) * rateb);
		jQuery('#' + QID + " .InputText:eq(1)").val(later.toString());
		
	});
});

Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	/* record answers for this loop*/
	var thisRound = {
		"loop": "${lm://CurrentLoopNumber}",
		"question": "Bogus",
		"early": "${lm://Field/3}",
		"future": "${lm://Field/4}",
		"rate": rateb,
		"annual": rateb_annual,
		"total": "${e://Field/totalAmount}",
		"amountEarly": jQuery('#' + this.questionId + " .InputText:eq(0)").val(),
		"amountLate": jQuery('#' + this.questionId + " .InputText:eq(1)").val(),
		"earlyIncome": "${e://Field/earlyIncome}",
		"futureIncome": "${e://Field/futureIncome}",
	};
	/* adds response of this loop to the array*/
	ansCTB.push(thisRound);
})

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the CTB separate-page version.
NOTE: the code needs modification for different questions (rate1, rate1_annual, rate2, ... etc)
*/
/* variables specific to different questions in the loop*/
var rate = parseFloat("$e{ ( 1 + lm://Field/9 ) ^ ( lm://Field/4 ) }");
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
		"future": "${lm://Field/4}",
		"rate": rate.toFixed(2),
		"annual": rate_annual,
		"total": "${e://Field/totalAmount}",
		"amountEarly": jQuery('#' + this.questionId + " .InputText:eq(0)").val(),
		"amountLate": jQuery('#' + this.questionId + " .InputText:eq(1)").val(),
		"earlyIncome": "${e://Field/earlyIncome}",
		"futureIncome": "${e://Field/futureIncome}",
	};
	/* adds response of this loop to the array*/
	ansCTB.push(thisRound);
	
	/* allow bogus questions for 2nd loop */
	if ((parseInt("${lm://CurrentLoopNumber}") + 1) == 2) {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'True');
	} else {
		Qualtrics.SurveyEngine.setEmbeddedData("bogus", 'False');
	}
	
	// console.log("${lm://CurrentLoopNumber}");
	// console.log(ansCTB);
})

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the bogus question in separate-page CTB block.
Save the responses as a stringified array to the embedded data field.
*/
/* variables specific to different questions in the loop*/
var rate = 0.25;
var rate_annual = "0";

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	
	/* change the question text */
	/*
	var qText = 'Next, imagine that for every dollar you choose to <strong> NOT </strong> receive \
	<strong>${lm://Field/1}</strong>, you will receive <strong> ' + rate.toFixed(2) + ' ${lm://Field/2}</strong>.';
	jQuery("#"+this.questionId+" .QuestionText").html(qText);
	*/
	
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
		"question": "Bogus",
		"early": "${lm://Field/3}",
		"future": "${lm://Field/4}",
		"rate": rate.toFixed(2),
		"annual": rate_annual,
		"total": "${e://Field/totalAmount}",
		"amountEarly": jQuery('#' + this.questionId + " .InputText:eq(0)").val(),
		"amountLate": jQuery('#' + this.questionId + " .InputText:eq(1)").val(),
		"earlyIncome": "${e://Field/earlyIncome}",
		"futureIncome": "${e://Field/futureIncome}",
	};
	/* adds response of this loop to the array*/
	ansCTB.push(thisRound);
})

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});


/*
Code for the exit block.
Save the responses as a stringified array to the embedded data field for both titration and CTB block
*/
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
	Qualtrics.SurveyEngine.setEmbeddedData("ctbResponse", JSON.stringify(ansCTB));
	Qualtrics.SurveyEngine.setEmbeddedData("titrationResponse", JSON.stringify(ansTIT));
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
