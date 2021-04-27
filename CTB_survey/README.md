# Convex Time Budget (CTB) Survey

This survey asks respondents to allocate a given amount of money between an earlier date and a later date when presented with various interest rates and time periods.

This folder contains JavaScript code for the Qualtrics survey deployed in data collection. 
Note that this code needs to be used in conjunction with the Qualtrics Survey Engine and Qualtrics' embedded data fields.

## Usage

**Embedded Data Field**

`${e://Field/totalAmount}` = total amount given to the respondent for allocation

`${e://Field/TotalAmount}` = total amount in presentation style with commas

`${e://Field/surveyResponse}` = a stringified array of dict to keep all the responses during loop

`${e://Field/progressStatement}` = a string acting as boolean for deciding when to show progress statement

**Loop and Merge Field**

`${lm://Field/1}` = earlier date in words (e.g. now, 1 year from now)

`${lm://Field/2}` = later date in words (e.g. 1 year from now, 2 years from now)

`${lm://Field/3}` = earlier date in number of years (e.g. 0, 1, ...)

`${lm://Field/4}` = later date in number of years (e.g. 0, 1, ...)

`${lm://Field/5}` to `${lm://Field/9}` = annual interest rates of question 1 through 5

## Survey Response

The survey responses are collected as an embedded data in `${e://Field/surveyResponse}` in the form of a stringified array of dict. Each dict contains the following keys.

`loop`: Number of loop the response was from (in random order)

`question`: the questionId of which the response is from

`early`: the earlier date 

`late`: the later date

`rate`: the annually compounded interest rate shown to the respondents in this scenario (with 2 decimals)

`annual`: the annual interest rate assigned to this scenario 

`total`: the total amount given to the respondent for allocation

`amountEarly`: the amount allocated to earlier date

`amountLate`: the amount allocated to later date
