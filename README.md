# StackedBarChart

Here is a reusable component to build a stacked bar chart.

Below lists the instruction to utilize this reusable component:
## **Methods**
- `stackedbar.width(value)` : a value (in pixels) may be passed as a parameter to define the total width of the chart 
- `stackedbar.height(value)` : a value (in pixels) may be passed as a parameter to define the total width of the chart
- `stackedbar.chartTitle(string)`: a string of text may be passed as a parameter to give a title to the chart
- `stackedbar.xTitle(string)`: a string of text may be passed as a parameter to define the title of the X-Axis of the chart
- `stackedbar.yTitle(string)`: a string of text may be passed as a parameter to define the title of the Y-Axis of the chart
- `stackedbar.series([...])` _Required_: this method takes in an array of elements (those elements that you'd like to be stacked for each key) in as a parameter. This method is required to be called as the reusable chart will not be function without this method call. 
- `stackedbar.valueKeys([...])` _Required_: this method takes in an array of elements(those elements that you'd like to the key for each of the series) in as as parameter. In this case, keys are considered to be the ordinal data elements that you'd like to have along the X-Axis. This method is required to be called as the reusable chart will not be functional without this method call.
- `stackedbar.colorRange([...])`: an array of colors (in hex code) may be passed as a parameter to give a color scheme to the series of the data. D3 categorical colors, such as `d3.schemeCategory10`, `d3.schemeCategory20`, etc., may also be directly passed as a parameter.

## **Data Preparation**
In this reusable stacked bar chart, data is structure a little differently than other charts. You do not need to `d3.nest()` your data, however, you must be prepped in a specific manner. 
In a stacked bar chart, there are **three distinct components**:
- **keys:** keys are referring to the element groupings that you defined in the X-Axis of your chart. 
- **series:** series are referring to the differing segments, or categories, of each grouping. Essentially, each element grouping, or keys, has a set of categories within it (or in this case, they're known as series)
- **values:** values are referring to the value of each row/data point

## **Structure the Data**
The data must be mapped in a specific pattern in order for the usable chart to work. Below entails the instruction to structure the raw data:

`data.map(function (d) {
                return {
                    value: value,
                    series: seriesname,
                    key: keyname
                };
            });`

With this format, the reusable chart will be able to distinguish the elements that you would like to be visualize as series and keys (vice versa) in the chart. 

After the structure of this data format, you can simply utilize the format to extract `series` and `keys` that you can pass into as a parameter for the required methods above.  

## **Let's Make a Stacked Bar Chart**
Now you are ready to build a stacked bar chart! You may simply start initialize the chart as shown below:

var myChart = chart().method1(parameter1).method2(parameter2);

var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myChart); 