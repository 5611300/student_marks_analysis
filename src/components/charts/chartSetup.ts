import { Chart as ChartJS, registerables } from 'chart.js';

// Register all Chart.js controllers (BarController, LineController, etc.),
// elements, scales, and plugins.
ChartJS.register(...registerables);

export default ChartJS;
