# Behavioral Pilot Survey 1

This folder contains JavaScript code for the Qualtrics survey deployed in data collection. 
Note that this code needs to be used in conjunction with the Qualtrics Survey Engine and Qualtrics' embedded data fields.

## Usage

**Embedded Data Field**

`${e://Field/min_amount}` = minimum amount to give on the later date (also the exact amount they can receive on the earlier date)

`${e://Field/MinAmount}` = minimum amount in presentation style with commas

`${e://Field/surveyResponse}` = a stringified array to keep all the responses during loop

`${e://Field/progressStatement}` = a string acting as boolean for deciding when to show progress statement

**Loop and Merge Field**

`${lm://Field/1}` = earlier date

`${lm://Field/2}` = later date

`${lm://Field/3}` = starting amount to ask for (in presentation style with comma)

`${lm://Field/4}` = maximum amount to be given on the later date (raw number to be parsed into integer in code)

