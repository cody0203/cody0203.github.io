$(window).resize(changeUiFirstPart);

function changeUiFirstPart() {
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
        $('#first-part').removeClass('fixed-position');
    } else {
        $('#first-part').addClass('fixed-position');
    }
    if (window.matchMedia && window.matchMedia('(max-width: 320px)').matches) {
        $('.content').removeClass('ml-5');
        $('.content').addClass('justify-content-center');
    }
};
changeUiFirstPart();

function autoTyping() {
    let typed = new Typed(".typing", {
        strings: [` `, `Hi, I'm Cody`],
        typeSpeed: 40,
        showCursor: false
    });

    let typed2 = new Typed(".typing2", {
        strings: [` `, `Front-end website developer based in Hanoi`],
        typeSpeed: 40,
        startDelay: 1500,
        showCursor: false
    });
}
autoTyping();

// let drawHtmlChart = document.getElementById("html-chart").getContext('2d');

// let htmlData = {
//     labels: ['HTML'],
//     datasets: [
//         {
//             label: "HTML",
//             data: [90, 10],
//             backgroundColor: [
//                 "rgba(36, 112, 250, 0.7)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             hoverBackgroundColor: [
//                 "rgba(36, 112, 250, 1)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             borderColor: [, "transparent"]
//         }]
// };

// let htmlChart = new Chart(drawHtmlChart, {
//     type: 'doughnut',
//     data: htmlData,
//     plugins: [{
//         beforeDraw: function (chart) {
//             var width = chart.chart.width,
//                 height = chart.chart.height,
//                 ctx = chart.chart.ctx;

//             ctx.restore();
//             var fontSize = (height / 150).toFixed(2);
//             ctx.font = fontSize + "em sans-serif";
//             ctx.fillStyle = "#9b9b9b";
//             ctx.textBaseline = "middle";

//             var text = "90%",
//                 textX = Math.round((width - ctx.measureText(text).width) / 2),
//                 textY = height / 2;

//             ctx.fillText(text, textX, textY);
//             ctx.save();
//         }
//     }],
//     options: {
//         legend: {
//             display: false
//         },
//         tooltips: {
//             enabled: false
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         cutoutPercentage: 85,
//     }
// });

// let drawCssChart = document.getElementById("css-chart").getContext('2d');

// let cssData = {
//     labels: ['HTML'],
//     datasets: [
//         {
//             label: "HTML",
//             data: [80, 20],
//             backgroundColor: [
//                 "rgba(36, 112, 250, 0.7)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             hoverBackgroundColor: [
//                 "rgba(36, 112, 250, 1)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             borderColor: [, "transparent"]
//         }]
// };

// let cssChart = new Chart(drawCssChart, {
//     type: 'doughnut',
//     data: cssData,
//     plugins: [{
//         beforeDraw: function (chart) {
//             var width = chart.chart.width,
//                 height = chart.chart.height,
//                 ctx = chart.chart.ctx;

//             ctx.restore();
//             var fontSize = (height / 150).toFixed(2);
//             ctx.font = fontSize + "em sans-serif";
//             ctx.fillStyle = "#9b9b9b";
//             ctx.textBaseline = "middle";

//             var text = "80%",
//                 textX = Math.round((width - ctx.measureText(text).width) / 2),
//                 textY = height / 2;

//             ctx.fillText(text, textX, textY);
//             ctx.save();
//         }
//     }],
//     options: {
//         legend: {
//             display: false
//         },
//         tooltips: {
//             enabled: false
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         cutoutPercentage: 85,
//     }
// });

// let drawJsChart = document.getElementById("js-chart").getContext('2d');

// let jsData = {
//     labels: ['JS', 'null'],
//     datasets: [
//         {
//             label: ["JS"],
//             data: [40, 60],
//             backgroundColor: [
//                 "rgba(36, 112, 250, 0.7)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             hoverBackgroundColor: [
//                 "rgba(36, 112, 250, 1)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             borderColor: [, "transparent"]
//         }]
// };

// let jsChart = new Chart(drawJsChart, {
//     type: 'doughnut',
//     data: jsData,
//     plugins: [{
//         beforeDraw: function (chart) {
//             var width = chart.chart.width,
//                 height = chart.chart.height,
//                 ctx = chart.chart.ctx;

//             ctx.restore();
//             var fontSize = (height / 150).toFixed(2);
//             ctx.font = fontSize + "em sans-serif";
//             ctx.fillStyle = "#9b9b9b";
//             ctx.textBaseline = "middle";

//             var text = '40%',
//                 textX = Math.round((width - ctx.measureText(text).width) / 2),
//                 textY = height / 2;

//             ctx.fillText(text, textX, textY);
//             ctx.save();
//         }
//     }],
//     options: {
//         legend: {
//             display: false
//         },
//         tooltips: {
//             enabled: false
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         cutoutPercentage: 85,
//     }
// });

// let drawJqueryChart = document.getElementById("jquery-chart").getContext('2d');

// let jqueryData = {
//     labels: ['Jquery', 'null'],
//     datasets: [
//         {
//             label: ["Jquery"],
//             data: [30, 70],
//             backgroundColor: [
//                 "rgba(36, 112, 250, 0.7)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             hoverBackgroundColor: [
//                 "rgba(36, 112, 250, 1)",
//                 "rgba(0, 0, 0, 0)",
//             ],
//             borderColor: [, "transparent"]
//         }]
// };

// let jqueryChart = new Chart(drawJqueryChart, {
//     type: 'doughnut',
//     data: jqueryData,
//     plugins: [{
//         beforeDraw: function (chart) {
//             var width = chart.chart.width,
//                 height = chart.chart.height,
//                 ctx = chart.chart.ctx;

//             ctx.restore();
//             var fontSize = (height / 150).toFixed(2);
//             ctx.font = fontSize + "em sans-serif";
//             ctx.fillStyle = "#9b9b9b";
//             ctx.textBaseline = "middle";

//             var text = '30%',
//                 textX = Math.round((width - ctx.measureText(text).width) / 2),
//                 textY = height / 2;

//             ctx.fillText(text, textX, textY);
//             ctx.save();
//         }
//     }],
//     options: {
//         legend: {
//             display: false
//         },
//         tooltips: {
//             enabled: false
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         cutoutPercentage: 85,
//     }
// });

// var ctx = document.getElementById('myChart').getContext('2d');


// var color = Chart.helpers.color;
// var config = {
//     type: 'radar',
//     data: {
//         labels: ['HTML', 'CSS', 'JavaScript', 'Jquery', 'Bootstrap', 'SEO', ['Photoshop', 'Illustrator'], ['English', 'Reading'], ['English', 'Listening']],
//         datasets: [{
//             label: ['Skills'],
//             backgroundColor: 'rgba(36, 112, 250, 0.3)',
//             borderColor: 'rgba(36, 112, 250, 0.7)',
//             pointBackgroundColor: 'rgba(36, 112, 250, 0.7)',
//             data: [
//                 90, 80, 50, 40, 40, 70, 50, 60, 60
//             ],
//         }]
//     },
//     options: {
//         legend: {
//             display: false  ,
//         },
//         scale: {
//             ticks: {
//                 beginAtZero: true
//             }
//         },
//         tooltips: {
//             enabled: true,
//             callbacks: {
//                 label: function (tooltipItem, data) {
//                     return ` ${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}%`;
//                 }
//             }
//         },
//     }
// };

// var chart = new Chart(ctx, config);