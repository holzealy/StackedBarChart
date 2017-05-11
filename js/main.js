/* Create a treemap of country level measures. Inspiration drawn from https://bl.ocks.org/mbostock/4063582.
 */
$(function() {

    var data = [
        {
            "key": "Jim",
            "values": [
                {
                    "key": "Apples",
                    "value": 4
                },
                {
                    "key": "Oranges",
                    "value": 3
                },
                {
                    "key": "Pears",
                    "value": 1
                },
                {
                    "key": "Bananas",
                    "value": 0
                }
            ]
        },
        {
            "key": "Claire",
            "values": [
                {
                    "key": "Apples",
                    "value": 3
                },
                {
                    "key": "Oranges",
                    "value": 1
                },
                {
                    "key": "Pears",
                    "value": 2
                },
                {
                    "key": "Bananas",
                    "value": 2
                }
            ]
        },
        {
            "key": "Beth",
            "values": [
                {
                    "key": "Apples",
                    "value": 5
                },
                {
                    "key": "Oranges",
                    "value": 2
                },
                {
                    "key": "Pears",
                    "value": 4
                },
                {
                    "key": "Bananas",
                    "value": 1
                }
            ]
        },
        {
            "key": "Grace",
            "values": [
                {
                    "key": "Apples",
                    "value": 1
                },
                {
                    "key": "Oranges",
                    "value": 4
                },
                {
                    "key": "Pears",
                    "value": 2
                },
                {
                    "key": "Bananas",
                    "value": 3
                }
            ]
        }
    ];

    var myChart = StackedBar();

    var chartWrapper = d3.select('#vis').datum(data).call(myChart);

});