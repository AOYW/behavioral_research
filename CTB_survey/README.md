# Convex Time Budget (CTB) Survey

This survey asks respondents to allocate a given amount of money between an earlier date and a later date when presented with various interest rates and time periods.

This folder contains JavaScript code for the Qualtrics survey deployed in data collection. 
Note that this code needs to be used in conjunction with the Qualtrics Survey Engine and Qualtrics' embedded data fields.

## Usage

### Embedded Data Field

#### Explicit (Stated in survey flow)

`${e://Field/totalAmount}` = total amount given to the respondent for allocation

`${e://Field/TotalAmount}` = total amount in presentation style with commas

`${e://Field/ctbResponse}` = a stringified array of dict to keep all responses from the CTB block

`${e://Field/titrationResponse}` = a stringified array of dict to keep all responses from the Titration block

`${e://Field/currentAge}` = the age of the respondent

`${e://Field/presentIncome}` = the amount of income the respondent currently earns

`${e://Field/bogus}` = a boolean for controlling bogus question appearance in the current loop (Titration)

`${e://Field/bogus1}` = a boolean for controlling bogus1 appearance in the current loop (CTB)

`${e://Field/bogus2}` = a boolean for controlling bogus2 appearance in the current loop (CTB)

`${e://Field/min_amount}` = minimum amount to receive on the later date (also the exact amount they can receive on the earlier date)

`${e://Field/MinAmount}` = minimum amount in presentation style with commas

`${e://Field/progressStatement}` = a string acting as boolean for deciding when to show progress statement

`${e://Field/Treatment}` = a randomizer for treatment (1) vs control (0)

`${e://Field/CTBFirst}` = a randomizer for order of the survey, CTB comes first (1) vs Titration comes first (0)

`${e://Field/earlyIsNow}` = a boolean indicating early period is now (T)/in the furture (F), for controlling whether certain questions show up

`${e://Field/hasEntered}` = a boolean indicating income for 1 year from now has been entered in the previous loop, skips the same question if so

#### Implicit (Used in code but not in survey flow)

`${e://Field/PresentIncome}` = the amount of income the respondent currently earns (Added comma for presentation in survey)

`${e://Field/earlyIncome}` = the amount of income the respondent expects to earn in the earlier period (1 year from now)

`${e://Field/EarlyIncome}` = the amount of income the respondent expects to earn in the earlier period (Added comma for presentation in survey)

`${e://Field/futureIncome}` = the amount of income the respondent expects to earn in the later period

`${e://Field/FutureIncome}` = the amount of income the respondent expects to earn in the later period (Added comma for presentation in survey)

### Loop and Merge Field

CTB Block

`${lm://Field/1}` = earlier date in words (e.g. now, 1 years from now)

`${lm://Field/2}` = later date in words (e.g. 2 years from now, 5 years from now)

`${lm://Field/3}` = earlier date in number of years (e.g. 0, 1, ...)

`${lm://Field/4}` = later date in number of years (e.g. 2, 5, ...)

`${lm://Field/5}` to `${lm://Field/9}` = annual interest rates of question 1 through 5

Titration Block

`${lm://Field/1}` = earlier date

`${lm://Field/2}` = later date

`${lm://Field/3}` = starting amount to ask for (in presentation style with comma)

`${lm://Field/4}` = maximum amount to be given on the later date (raw number to be parsed into integer in code)

`${lm://Field/5}` = earlier date in number of years (e.g. 0, 1, ...)

`${lm://Field/6}` = later date in number of years (e.g. 2, 5, ...)

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

`earlyIncome`: the amount of income the respondent earns in the earlier period (now / 1 year from now)

`futureIncome`: the amount of income the respondent expects to earn in the later period
