import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ArticleChart = ({ articlesData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getChartData = () => {
    const statusCounts = {};
    articlesData.forEach((article) => {
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
            datasets: [
              {
                label: "Nombre d'articles par statut",
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
              },
            ],
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
  }, [articlesData]);

  return <canvas ref={chartRef} id="statusChart" width="200" height="100"></canvas>;
};

ArticleChart.propTypes = {
  articlesData: PropTypes.array.isRequired,
};

export default ArticleChart;
