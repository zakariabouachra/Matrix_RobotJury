
import PropTypes from 'prop-types';

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ArticleChart = () => {
  const [articleData] = useState([
    { id: 1, title: 'Article 1', status: 'Publier' },
    { id: 2, title: 'Article 2', status: 'En cours' },
    { id: 3, title: 'Article 3', status: 'Publier' },
    { id: 4, title: 'Article 4', status: 'Verifier' },
    { id: 5, title: 'Article 5', status: 'Revision' },
7  ]);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getChartData = () => {
    const statusCounts = {};
    articleData.forEach((article) => {
      statusCounts[article.status] = statusCounts[article.status]
        ? statusCounts[article.status] + 1
        : 1;
    });

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    return { labels, data };
  };

  useEffect(() => {
    const ctx = chartRef.current;
    const { labels, data } = getChartData();

    if (ctx) {
      if (chartInstance.current) {
        chartInstance.current.data.labels = labels;
        chartInstance.current.data.datasets[0].data = data;
        chartInstance.current.update();
      } else {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Nombre d\'articles par statut',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [articleData]);


  return <canvas ref={chartRef} id="statusChart" width="200" height="100"></canvas>
};      



ArticleChart.propTypes = {
  slot: PropTypes.string
};

export default ArticleChart;
