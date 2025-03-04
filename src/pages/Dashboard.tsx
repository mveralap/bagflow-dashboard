import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import FilterDropdown from '@/components/dashboard/FilterDropdown';
import GaugeChart from '@/components/dashboard/GaugeChart';
import { Briefcase, BarChart, LineChart, RefreshCw } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for charts
const weeklyData = [{
  day: 'S2',
  nivel1: 58936,
  nivel2: 11915,
  nivel3: 2011,
  ratio: 0.13
}, {
  day: 'S3',
  nivel1: 56904,
  nivel2: 11886,
  nivel3: 1651,
  ratio: 0.16
}, {
  day: 'S4',
  nivel1: 55824,
  nivel2: 10952,
  nivel3: 1798,
  ratio: 0.16
}, {
  day: 'S5',
  nivel1: 56362,
  nivel2: 10947,
  nivel3: 1588,
  ratio: 0.18
}, {
  day: 'S6',
  nivel1: 54164,
  nivel2: 10422,
  nivel3: 1396,
  ratio: 0.19
}, {
  day: 'S7',
  nivel1: 54312,
  nivel2: 10340,
  nivel3: 1580,
  ratio: 0.18
}, {
  day: 'S8',
  nivel1: 32085,
  nivel2: 5837,
  nivel3: 902,
  ratio: 0.19
}];
const hourlyData = [{
  hora: '0',
  maletas: 91
}, {
  hora: '1',
  maletas: 85
}, {
  hora: '2',
  maletas: 102
}, {
  hora: '3',
  maletas: 93
}, {
  hora: '4',
  maletas: 126
}, {
  hora: '5',
  maletas: 186
}, {
  hora: '6',
  maletas: 214
}, {
  hora: '7',
  maletas: 271
}, {
  hora: '8',
  maletas: 312
}, {
  hora: '9',
  maletas: 426
}, {
  hora: '10',
  maletas: 508
}, {
  hora: '11',
  maletas: 398
}, {
  hora: '12',
  maletas: 312
}, {
  hora: '13',
  maletas: 271
}, {
  hora: '14',
  maletas: 183
}, {
  hora: '15',
  maletas: 160
}, {
  hora: '16',
  maletas: 143
}, {
  hora: '17',
  maletas: 235
}, {
  hora: '18',
  maletas: 314
}, {
  hora: '19',
  maletas: 333
}, {
  hora: '20',
  maletas: 507
}, {
  hora: '21',
  maletas: 421
}, {
  hora: '22',
  maletas: 217
}, {
  hora: '23',
  maletas: 143
}];
const errorData = [{
  semana: 'S2',
  error: 12
}, {
  semana: 'S3',
  error: 12
}, {
  semana: 'S4',
  error: 12
}, {
  semana: 'S5',
  error: 12
}, {
  semana: 'S6',
  error: 13
}, {
  semana: 'S7',
  error: 12
}, {
  semana: 'S8',
  error: 12
}];
const scannerData = [{
  scanner: 'XCT1',
  value: 100465
}, {
  scanner: 'XCT2',
  value: 135043
}, {
  scanner: 'XCT3',
  value: 304080
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const Dashboard = () => {
  const [startDate, setStartDate] = useState('2024-06-01');
  const [endDate, setEndDate] = useState('2024-06-20');
  const [market, setMarket] = useState('Todos');
  const [llaa, setLlaa] = useState('Todos');
  const [scanner, setScanner] = useState('Todos');
  return <DashboardLayout>
      {/* Dashboard Header */}
      <div className="dashboard-header mb-6 rounded-xl">
        <h1 className="text-xl font-bold">EQUIPAJES SISTEMA BHS/HBS</h1>
        <img alt="LAP Logo" src="/lovable-uploads/d69d7047-04f1-48ff-8d12-ccea3e47031c.png" className="h-20" />
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Año</span>
          <FilterDropdown label="Año" options={['Todos', '2023', '2024']} value="2024" onChange={() => {}} />
        </div>
        
        <DateRangePicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
        
        <FilterDropdown label="Market" options={['Todos', 'Mercado 1', 'Mercado 2', 'Mercado 3']} value={market} onChange={setMarket} />
        
        <FilterDropdown label="LLAA" options={['Todos', 'LLAA 1', 'LLAA 2', 'LLAA 3']} value={llaa} onChange={setLlaa} />
        
        <FilterDropdown label="Scanner" options={['Todos', 'XCT1', 'XCT2', 'XCT3']} value={scanner} onChange={setScanner} />
      </div>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Total de equipajes" value="304,080" description="Maletas procesadas" icon={<Briefcase className="text-primary" size={18} />} trend={{
        value: 5.2,
        isPositive: true
      }} />
        
        <MetricCard title="Equipajes Nivel 1" value="367,147" description="68% del total" valueClassName="text-green-600" />
        
        <MetricCard title="Equipajes Nivel 2" value="72,299" description="13% del total" valueClassName="text-yellow-500" />
        
        <MetricCard title="Equipajes Nivel 3" value="10,926" description="2% del total" valueClassName="text-red-500" />
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Desempeño por nivel de inspección" className="lg:col-span-2" tools={<button className="text-xs text-primary flex items-center gap-1">
              <RefreshCw size={12} />
              Actualizar
            </button>}>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }} />
                <Legend />
                <Bar dataKey="nivel1" name="Nivel 1" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nivel2" name="Nivel 2" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nivel3" name="Nivel 3" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Maletas por scanner" subtitle="Distribución de procesamiento">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={scannerData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {scannerData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => new Intl.NumberFormat().format(value as number)} contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Evolución semanal / diaria" className="lg:col-span-2">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={weeklyData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }} />
                <Legend />
                <Line type="monotone" dataKey="nivel1" name="Maletas" stroke="#3b82f6" activeDot={{
                r: 8
              }} strokeWidth={2} yAxisId="left" />
                <Line type="monotone" dataKey="ratio" name="Ratio" stroke="#8884d8" yAxisId="right" strokeWidth={2} dot={{
                r: 4
              }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="% error de lectura de Bag Tag">
          <div className="h-[240px] flex flex-col items-center justify-center mb-4">
            <GaugeChart value={12} title="Porcentaje de error" colors={{
            primary: '#ef4444',
            background: '#e5e7eb'
          }} size={160} />
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <div className="text-xs text-center bg-green-50 text-green-700 px-2 py-1 rounded">
              Top Performance: 5%
            </div>
          </div>
        </ChartCard>
      </div>
      
      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="% Error de lectura por semana" className="lg:col-span-1">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={errorData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="semana" />
                <YAxis domain={[0, 20]} />
                <Tooltip formatter={value => [`${value}%`, 'Error']} contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }} />
                <Bar dataKey="error" name="Error %" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Promedio maletas por hora" className="lg:col-span-2">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={hourlyData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="hora" label={{
                value: 'Hora',
                position: 'insideBottomRight',
                offset: -5
              }} />
                <YAxis domain={[0, 600]} />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }} />
                <Bar dataKey="maletas" name="Maletas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      {/* Acceptance Rate */}
      <ChartCard title="¿Cuál fue el porcentaje de equipaje aceptado?">
        <div className="flex flex-col lg:flex-row items-center justify-around gap-6 p-4">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-full mb-2 animate-pulse-gentle">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="font-bold text-2xl text-green-700">83%</div>
            <div className="text-sm text-muted-foreground">Aceptado</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-full mb-2 animate-pulse-gentle">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="font-bold text-2xl text-red-700">5%</div>
            <div className="text-sm text-muted-foreground">Rechazo</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-full mb-2 animate-pulse-gentle">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="font-bold text-2xl text-yellow-700">12%</div>
            <div className="text-sm text-muted-foreground">Error</div>
          </div>
          
          <div className="hidden lg:block w-32">
            <img src="https://cdn-icons-png.flaticon.com/512/1067/1067555.png" alt="Luggage" className="w-full animate-float" />
          </div>
        </div>
      </ChartCard>
    </DashboardLayout>;
};
export default Dashboard;