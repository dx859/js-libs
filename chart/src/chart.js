var chartPie = require('./componentChartPie');

var pie = new chartPie()
pie.drawBg().drawPie([
    { name: 'Js', per: 0.47, color: '#ff7676' },
    { name: 'PHP', per: 0.2 },
    { name: 'Python', per: 0.1 },
    { name: 'Ruby', per: 0.08 },
    { name: 'Java', per: 0.15 }
]);
