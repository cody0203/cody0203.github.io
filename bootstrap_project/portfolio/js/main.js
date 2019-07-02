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

let programingChart = new ApexCharts(document.querySelector("#programing-chart"), {
    chart: {
        width: 300,
        height: 300,
        type: "radialBar"
    },

    series: [90, 80, 40, 30],

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 10,
                size: "40%"
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#888",
                    fontSize: "13px"
                },
                value: {
                    color: "#111",
                    fontSize: "30px",
                    show: true
                }
            }
        }
    },

    labels: ["HTML", "CSS", "Javascript", "Jquery"]
});

programingChart.render();

let othersChart = new ApexCharts(document.querySelector("#others-chart"), {
    chart: {
        width: 300,
        height: 300,
        type: "radialBar"
    },

    series: [80, 50, 30],

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 10,
                size: "40%"
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -5,
                    show: true,
                    color: "#888",
                    fontSize: "13px"
                },
                value: {
                    color: "#111",
                    fontSize: "30px",
                    show: true
                }
            }
        }
    },

    labels: ["SEO", "Photoshop", "Illustrator"]
});

othersChart.render();