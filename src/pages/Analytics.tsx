
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';

// Mock data
const monthlyData = [
  { name: 'Ene', total: 65432 },
  { name: 'Feb', total: 59821 },
  { name: 'Mar', total: 72345 },
  { name: 'Abr', total: 68234 },
  { name: 'May', total: 72345 },
  { name: 'Jun', total: 78321 },
  { name: 'Jul', total: 84532 },
  { name: 'Ago', total: 86754 },
  { name: 'Sep', total: 76543 },
  { name: 'Oct', total: 75421 },
  { name: 'Nov', total: 70123 },
  { name: 'Dic', total: 78954 },
];

const flightData = [
  { name: 'Nacional', value: 540 },
  { name: 'Internacional', value: 720 },
  { name: 'Conexión', value: 280 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const scatterData = [
  { scanner: 'XCT1', efficiency: 78, volume: 1234, errors: 45 },
  { scanner: 'XCT2', efficiency: 82, volume: 2345, errors: 38 },
  { scanner: 'XCT3', efficiency: 91, volume: 3456, errors: 27 },
  { scanner: 'XCT4', efficiency: 84, volume: 2345, errors: 34 },
  { scanner: 'XCT5', efficiency: 89, volume: 2567, errors: 31 },
];

const comparisonData = [
  { month: 'Ene', '2023': 58432, '2024': 65432 },
  { month: 'Feb', '2023': 54821, '2024': 59821 },
  { month: 'Mar', '2023': 63345, '2024': 72345 },
  { month: 'Abr', '2023': 59234, '2024': 68234 },
  { month: 'May', '2023': 62345, '2024': 72345 },
  { month: 'Jun', '2023': 69321, '2024': 78321 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics Avanzado</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Volumen Mensual de Equipajes" subtitle="Tendencia anual">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat().format(value as number)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Equipajes" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Distribución por Tipo de Vuelo" subtitle="Nacional vs Internacional">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={flightData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {flightData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat().format(value as number)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard title="Comparativa Anual" subtitle="2023 vs 2024">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat().format(value as number)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar dataKey="2023" name="2023" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="2024" name="2024" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard title="Eficiencia de Scanners vs Volumen" subtitle="Análisis multivariable">
          <div className="chart-container h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  type="number" 
                  dataKey="efficiency" 
                  name="Eficiencia" 
                  unit="%" 
                  label={{ value: 'Eficiencia (%)', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="volume" 
                  name="Volumen" 
                  label={{ value: 'Volumen', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="errors" 
                  range={[60, 200]} 
                  name="Errores" 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name) => {
                    if (name === 'Eficiencia') return `${value}%`;
                    return value;
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Scatter 
                  name="Scanners" 
                  data={scatterData} 
                  fill="#3b82f6" 
                  shape="circle"
                  label={{ dataKey: 'scanner', position: 'top' }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
