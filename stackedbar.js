var StackedBar = () => {
    var height = 500,
        width = 960,
        xScale = d3.scaleBand(),
        yScale = d3.scaleLinear(),
        zScale = d3.scaleOrdinal(),
        xTitle = 'X Axis Title',
        yTitle = 'Y Axis Title',
        chartTitle = 'Chart title',
        margin = {
            left: 40,
            bottom: 60,
            top: 20,
            right: 40,
        },
        series,
        valueKeys,
        colorRange = d3.schemeCategory10;

    var chart = function (selection) {
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        selection.each(function (data) {
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);

            var selectedData = data.filter(function (d) {
                if (valueKeys.includes(d.key) && series.includes(d.series)) {
                    return d;
                }
            })
            var seriesData = d3.stack()
                .keys(series)
                .value(function (d) {
                    return d.value;
                })
                .order(d3.stackOrderNone)
                .offset(d3.stackOffsetNone)(selectedData);


            function stackMax(serie) {
                return d3.max(serie, function (d) { return d[1]; });
            }

            // Append static elements (i.e., only added once)
            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width)
                .attr("height", height);

            // Title G
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + 20 + ')')
                .text(chartTitle)
                .attr('class', 'chart-title')

            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr("class", 'chartG');

            // Append axes to the svgEnter element
            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .attr('class', 'axis x');

            svgEnter.append('g')
                .attr('class', 'axis y')
                .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

            // Add a title g for the x axis
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left + chartWidth / 2) + ',' + (chartHeight + margin.top + 40) + ')')
                .attr('class', 'title x');

            // Add a title g for the y axis
            svgEnter.append('text')
                .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + chartHeight / 2) + ') rotate(90)')
                .attr('class', 'title y');


            // Define xAxis and yAxis functions
            var xAxis = d3.axisBottom();
            var yAxis = d3.axisLeft();

            xScale.domain(valueKeys).range([0, width]).padding(0.25);

            yScale.domain([0, d3.max(seriesData, stackMax) * 1.05]).range([chartHeight, 0]);
            zScale.range(colorRange);

            // Update axes
            xAxis.scale(xScale);
            yAxis.scale(yScale);
            ele.select('.axis.x').transition().duration(1000).call(xAxis);
            ele.select('.axis.y').transition().duration(1000).call(yAxis);

            // Update titles
            ele.select('.title.x').text(xTitle)
            ele.select('.title.y').text(yTitle)


            var layers = svgEnter.append('g').selectAll('g').data(seriesData).enter().append('g')
                .attr('fill', function (d) {
                    return zScale(d.key);
                })

            var rects = layers
                .selectAll('rect')
                .data(function (d) {
                    return d;
                })

            rects.enter().append('rect')
                .merge(rects)
                .attr('width', xScale.bandwidth)
                .attr('x', function (d) {
                    return xScale(d.data.key);
                })
                .attr('y', function (d) {
                    return yScale(d[1]);
                })
                .attr('height', function (d) {
                    var difference = yScale(d[0]) - yScale(d[1]);
                    return difference;
                })

            // Use the .exit() and .remove() methods to remove elements that are no longer in the data
            rects.exit().remove();

        });
    };

    chart.height = (value) => {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = (value) => {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.xTitle = (value) => {
        if (!arguments.length) return xTitle;
        xTitle = value;
        return chart;
    };

    chart.yTitle = (value) => {
        if (!arguments.length) return yTitle;
        yTitle = value;
        return chart;
    };

    chart.chartTitle = function (value) {
        if (!arguments.length) return chartTitle;
        chartTitle = value;
        return chart;
    };
    chart.series = function (value) {
        if (!arguments.length) return series;
        series = value;
        return chart;
    };

    chart.colorRange = function (value) {
        if (!arguments.length) return colorRange;
        colorRange = value;
        return chart;
    };

    chart.valueKeys = function (value) {
        if (!arguments.length) return valueKeys;
        valueKeys = value;
        return chart;
    };
    return chart;
}