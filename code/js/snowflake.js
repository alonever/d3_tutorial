// Some variables that will be helpful to define
var height = 600;
var width = 600;
var padding = 30;
var duration = 1000;

var triangle_vertices = [
    [width/2,padding],
    [width-padding,padding],
    [width/2,height/2]
];

// create the points on the edge for the circles
var num_points_on_edge = 5;
var data_1 = create_points(triangle_vertices[triangle_vertices.length-1],triangle_vertices[0], num_points_on_edge);
for (var i = 0; i < triangle_vertices.length-1; i++){
    data_1 = data_1.concat(create_points(triangle_vertices[i],triangle_vertices[i+1], num_points_on_edge))
}

// Initialize the two svg canvgases
var svg = d3.select("#main_container")
    .append("svg")
    .attr("width", width + padding)
    .attr("height", height + padding);

var line = d3.svg.line()
    .x(function(d) { 
	return d[0]})
    .y(function(d) { return d[1]});

var first_flip = d3.svg.line()
    .x(function(d) { 
	return x_scale(d[1])})
    .y(function(d) { return y_scale(d[0])});

var second_flip = d3.svg.line()
    .x(function(d) { 
	return x_scale(d[0])})
    .y(function(d) { return d[1]});

var third_flip = d3.svg.line()
    .x(function(d) { 
	return d[0]})
    .y(function(d) { return y_scale(d[1])});

var x_scale = d3.scale.linear()
    .domain([0,width])
    .range([width, 0]);
var y_scale = d3.scale.linear()
    .domain([0,height])
    .range([height, 0]);

initial_draw();

function initial_draw(){    
    var path_1 = svg.selectAll(".path_1")
	.data([data_1]);
    path_1.enter().append("path")
	.attr("fill","rgba(120,120,120,1)")
	.attr("class","path_1")
	.attr("class","snowflake")
	.attr("d",line);
    
    var circles = svg.selectAll("circle")
	.data(data_1)
	.enter().append("circle")
	.attr("cx",function(d){return d[0]})
	.attr("cy",function(d){return d[1]})
	.attr("r", 8)
	.attr("stroke","none")
	.attr("fill","red")
	.call(d3.behavior.drag()
	      .on("dragstart",function (d, i) {
		  this.__origin__ = d;
	      })
	      .on("drag", function (d, i) {
	      var e = [0,0];
		  e[0] = this.__origin__[0] + d3.event.dx;
		  e[1] = this.__origin__[1] + d3.event.dy
		  if (point_in_triangle(e,
					triangle_vertices[0],
					triangle_vertices[1],
					triangle_vertices[2])){
		      d[0] = this.__origin__[0] + d3.event.dx;
		      d[1] = this.__origin__[1] + d3.event.dy
		      
		      d3.select(this).attr("cx", d[0]);
		      d3.select(this).attr("cy", d[1]);
		      data_1[i] = [d[0],d[1]];
		      path_1.transition().duration(0)
			  .attr("d",line);
		  }
		  else{
		      d = this.__origin__;
	      }
	      })
	      .on("dragend", function (d) {
		  delete this.__origin__;
	      }));
}

function click_button() {
    var create = "Create Snowflake";
    var reset = "Reset";
    if ($("#animation_button").html() == create){
	$("#animation_button").html(reset);
	animate_snowflake();
    } 
    else {
	$("#animation_button").html(create);
	reset_snowflake();
    }
}

function reset_snowflake(){
    svg.selectAll(".snowflake")
	.remove();
    initial_draw();
}

function animate_snowflake(){
    
    var circles = svg.selectAll("circle")
	.remove();
    d3.select(".snowflake").transition().duration(0)
	.attr("fill","green");
    var path_2 = svg.selectAll(".path_2")
	.data([data_1])
    path_2.enter().append("path")
	.attr("fill","green")
	.attr("class","path_2")
	.attr("class","snowflake")
	.attr("d",function (d){
	    console.log(line(d));
	    return line(d);})
	.transition().duration(duration)
	.attr("d",first_flip)
	.attr("fill","red");
    
	
    // console.log(path_1);
    setTimeout(function(){
	var data_2 = create_data(path_2);
	var path_3 = svg.selectAll(".path_3")
	    .data([data_1]);
	
	path_3.enter().append("path")
	    .attr("fill","green")//"rgba(120,120,120,1)")
	    .attr("class","path_3")
	    .attr("class","snowflake")
	    .attr("d",line);
	
	path_3.transition().duration(duration)
    	    .attr("d", second_flip)
	
	
	
	var path_4 = svg.selectAll(".path_4")
	    .data([data_2]);
	
	path_4.enter().append("path")
	.attr("fill","red")//"rgba(120,120,120,1)")
	    .attr("class","path_4")
	    .attr("class","snowflake")
	    .attr("d",line);
	
	path_4.transition().duration(duration)
    	    .attr("d", second_flip)
	
	
	setTimeout(function(){
	    var data_3 = create_data(path_3);
	    var data_4 = create_data(path_4);
	    
	    var path_5 = svg.selectAll(".path_5")
		.data([data_1]);
	    
	    path_5.enter().append("path")
		.attr("fill","green")//"rgba(120,120,120,1)")
		.attr("class","path_5")
		.attr("class","snowflake")
		.attr("d",line);
	    
	    path_5.transition().duration(duration)
    		.attr("d", third_flip);
	    
	    var path_8 = svg.selectAll(".path_8")
		.data([data_4]);
	    
	    path_8.enter().append("path")
		.attr("fill","red")//"rgba(120,120,120,1)")
		.attr("class","path_8")
		.attr("class","snowflake")
		.attr("d",line);
	    
	    path_8.transition().duration(duration)
    		.attr("d", third_flip)
	    
	    var path_7 = svg.selectAll(".path_7")
		.data([data_3]);
	    
	    path_7.enter().append("path")
		.attr("fill","green")//"rgba(120,120,120,1)")
		.attr("class","path_7")
		.attr("class","snowflake")
		.attr("d",line);
	    
	    path_7.transition().duration(duration)
    		.attr("d", third_flip);
	    
	    var path_6 = svg.selectAll(".path_6")
		.data([data_2]);
	    
	    path_6.enter().append("path")
		.attr("fill","red")//"rgba(120,120,120,1)")
		.attr("class","path_6")
		.attr("class","snowflake")
		.attr("d",line);
	    
	    path_6.transition().duration(duration)
    		.attr("d", third_flip)
	    
	}, duration);
	
    }, duration);
}

// http://www.blackpawn.com/texts/pointinpoly/default.html
function cross_product (u, v) {
    return u[0]*v[1] - v[0]*u[1];
}
function sign (u) {
    return u>=0
}
function same_side(p1, p2, a, b) {
    var b_minus_a = [b[0]-a[0], b[1]-a[1]];
    var p1_minus_a = [p1[0]-a[0], p1[1]-a[1]];
    var p2_minus_a = [p2[0]-a[0], p2[1]-a[1]];
    var cp1 = cross_product(b_minus_a, p1_minus_a);
    var cp2 = cross_product(b_minus_a, p2_minus_a);
    if (sign(cp1) === sign(cp2)) {
	return true;
    }
    return false;
}
function point_in_triangle(p, a, b, c) {
    if (same_side(p, a, b, c) && same_side(p, b, a, c) && same_side(p, c, a, b)) {
	return true;
    }
    return false;
}

function create_points(point_1, point_2, num_points){
    var points = [];
    if (point_2[0] === point_1[0]){
	// do something different
	for (var i = 0; i<num_points;i++){
	    var x = point_2[0]
	    var y = (point_2[1] - point_1[1]) * i/num_points + point_1[1];
	    points.push([x,y]);
	}
	
    }
    else{
	var slope = (point_2[1] - point_1[1]) / (point_2[0] - point_1[0]);
	var y_intercept = -slope*point_1[0] + point_1[1];	
	for (var i = 0; i<num_points;i++){
	    var x = (point_2[0] - point_1[0]) * i/num_points + point_1[0];
	    var y = slope*x + y_intercept;
	    points.push([x,y]);
	}
    }
    return points;
}

function create_data(path) {
    var d = path.attr("d").substring(1);
    var coordinates = _.map(d.split('L'), function (s) {
	return _.map(s.split(','), Number);
    });
    return coordinates;
};
