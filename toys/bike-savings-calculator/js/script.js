//================================================================================================= DRAW TIME

function drawTime(time_graph) {
	var chart;
		chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart-time',
			type: 'column',
			margin: [ 80, 50, 100, 80],
			borderWidth: 2,
			backgroundColor: '#fffccc',
			plotBackgroundColor: '#fffccc',
			
		},
		title: {
			text: 'Time saved (hours)'
		},
		xAxis: {
			categories: [
				'1 month',
				'2 months',
				'3 months',
				'4 months',
				'5 months',
				'6 months',
				'7 months',
				'8 months',
				'9 months',
				'10 months',
				'11 months',
				'12 months',
			],
			labels: {
				rotation: -45,
				align: 'right',
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, Helvetica, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Time saved (hours)'
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			formatter: function() {
				return 'Time saved: ' + Highcharts.numberFormat(this.y, 1) + ' hours';
			}
		},
			series: [{
			name: 'Time',
			data: time_graph,
			dataLabels: {
				enabled: true,
				rotation: -90,
				color: '#FFFFFF',
				align: 'right',
				x: -3,
				y: 10,
				formatter: function() {
					return this.y;
				},
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		}]
	});
}

//================================================================================================= DRAW MONEY

function drawMoney(money_graph) {
	var chart;
		chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart-money',
			type: 'column',
			margin: [ 80, 50, 100, 80],
			borderWidth: 2,
			backgroundColor: '#fffccc',
			plotBackgroundColor: '#fffccc',
		},
		title: {
			text: 'Money saved'
		},
		xAxis: {
			categories: [
				'1 month',
				'2 months',
				'3 months',
				'4 months',
				'5 months',
				'6 months',
				'7 months',
				'8 months',
				'9 months',
				'10 months',
				'11 months',
				'12 months',
			],
			labels: {
				rotation: -45,
				align: 'right',
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, Helvetica, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Money saved'
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			formatter: function() {
				return 'Money saved: ' + Highcharts.numberFormat(this.y, 1);
			}
		},
			series: [{
			name: 'Time',
			data: money_graph,
			dataLabels: {
				enabled: true,
				rotation: -90,
				color: '#FFFFFF',
				align: 'right',
				x: -3,
				y: 10,
				formatter: function() {
					return this.y;
				},
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		}]
	});
}

//================================================================================================= CALCULATE

function calculate() {
	message.style.display = "none";
	for (var i = 0; i < data.length; i++)
		if (data[i].value == "")
			return;
	for (var i = 0; i < data.length; i++)
		if (isNaN(parseFloat(data[i].value))) {
			message.innerHTML = 'I\'m sorry, but where I come from, "' + data[i].value + '" is not a valid number...';
			message.style.display = "block";
			return;
		}
	var time_saved = (parseFloat(current_time.value) - parseFloat(bike_time.value)) * parseFloat(days_a_week.value) * 4 / 60;
	var time_graph = [];
	for (var i = 1; i <= 12; i++) {
		var amount = time_saved * i;
		amount = parseFloat(amount.toFixed(1))
		time_graph.push(amount);
	}
	drawTime(time_graph);

//===============================================

	var money_saved = parseFloat(current_money.value) * parseFloat(days_a_week.value) * 4;
	money_saved += time_saved * parseFloat(salary.value);

	var money_graph = [];
	for (var i = 1; i <= 12; i++) {
		var amount = money_saved * i;
		amount = parseFloat(amount.toFixed(1))
		money_graph.push(amount);
	}
	drawMoney(money_graph);
}

//================================================================================================= HANDLE EVENTS

var days_a_week = document.getElementById("days_a_week");
var current_time = document.getElementById("current_time");
var current_money = document.getElementById("current_money");
var bike_time = document.getElementById("bike_time");
var salary = document.getElementById("salary");
var data = [];
data.push(days_a_week, current_time, current_money, bike_time, salary);
var message = document.getElementById("message");

days_a_week.onkeyup = calculate;
current_time.onkeyup = calculate;
current_money.onkeyup = calculate;
bike_time.onkeyup = calculate;
salary.onkeyup = calculate;

//================================================================================================= END
