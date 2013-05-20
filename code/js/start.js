var data = [1,3,5,7,25,29,50]

var width = 500;
var height = 500;
var bar_padding = width/data.length * 1/3;

var our_svg = d3.select("#main_container")
				.append("svg")
				.attr("width",width)
				.attr("height",height);
console.log(d3.extend(data));

var color_scale = d3.scale.linear()
		.domain([0,100])
		// .domain(d3.extend(data))
		.range(['orange', 'yellow']);

var rects = our_svg.selectAll('rect')
			.data(data)
			.enter().append("rect")
			.attr("x", function(d,i){
				return i*(width/data.length);
			})
			.attr('y', function(d){
				return 100 - d
			})
			.attr('width', width / data.length - bar_padding)
			.attr("height", function(d){return d})
			.attr("fill", function(d){return color_scale(d)});
			
var texts = our_svg.text(function(d){return d})
			.attr('x', function(d,i){return i * width/data.length;})
			.attr('y', function(d){
				return 0;
			});