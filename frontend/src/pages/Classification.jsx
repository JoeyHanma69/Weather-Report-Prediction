import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const Classification = () => {
  const navigate = useNavigate();
  const [classificationReport, setClassificationReport] = useState(null);
  const [confusionMatrix, setConfusionMatrix] = useState(null);

  useEffect(() => {
    // Load dataset from CSV file using PapaParse
    Papa.parse('/path/to/cleaned_dataset.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Extract features and target from the dataset
        const data = result.data;
        const X = data.map(d => ({
          Year: +d['Year'],
          Month: +d['Month'],
          Day: +d['Day'],
          Rainfall: +d['Rainfall amount (millimetres)'],
          Period: +d['Period over which rainfall was measured (days)']
        }));
        const y = data.map(d => +d['RainToday']);

        // Split the dataset into training and testing sets
        const splitIndex = Math.floor(0.8 * X.length);
        const X_train = X.slice(0, splitIndex);
        const X_test = X.slice(splitIndex);
        const y_train = y.slice(0, splitIndex);
        const y_test = y.slice(splitIndex);

        // Mock function to simulate model training and evaluation
        const trainAndEvaluateModel = () => {
          // Mock classification metrics
          const metrics = {
            precision: 0.85,
            recall: 0.88,
            f1Score: 0.86,
            accuracy: 0.87
          };

          // Mock confusion matrix
          const mockConfusionMatrix = [
            [50, 10], // True Negatives, False Positives
            [5, 35]   // False Negatives, True Positives
          ];

          return { metrics, mockConfusionMatrix };
        };

        const { metrics, mockConfusionMatrix } = trainAndEvaluateModel();
        setClassificationReport(metrics);
        setConfusionMatrix(mockConfusionMatrix);
      }
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="classification-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">See how the classification model categorizes temperature and humidity data into different classes.</p>
      
      {classificationReport && (
        <div className="classification-report">
          <h2 className="report-title">Classification Report</h2>
          <div className="report-details">
            <p><strong>Precision:</strong> {classificationReport.precision}</p>
            <p><strong>Recall:</strong> {classificationReport.recall}</p>
            <p><strong>F1 Score:</strong> {classificationReport.f1Score}</p>
            <p><strong>Accuracy:</strong> {classificationReport.accuracy}</p>
          </div>
        </div>
      )}

      {confusionMatrix && (
        <div className="confusion-matrix">
          <h2 className="matrix-title">Confusion Matrix Heatmap</h2>
          <Plot
            data={[{
              z: confusionMatrix,
              type: 'heatmap',
              colorscale: 'Blues',
              x: ['Predicted No Rain', 'Predicted Rain'],
              y: ['Actual No Rain', 'Actual Rain']
            }]}
            layout={{
              title: 'Confusion Matrix',
              xaxis: { title: 'Predicted Labels' },
              yaxis: { title: 'Actual Labels' },
              hovermode: 'closest'
            }}
          />
        </div>
      )}

      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button>
        <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button>
      </div>
    </div>
  );
};

export default Classification;



