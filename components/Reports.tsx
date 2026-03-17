import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, PiggyBank, TrendingUp, CalendarDays, AlertTriangle, MapPin } from 'lucide-react';

// --- MOCK DATA ---
const interestByMonth = [
  { month: 'Jan', juros: 12500 },
  { month: 'Fev', juros: 14200 },
  { month: 'Mar', juros: 15800 },
  { month: 'Abr', juros: 16100 },
  { month: 'Mai', juros: 18500 },
  { month: 'Jun', juros: 21000 },
];

const volumeByLocation = [
  { city: 'Salvador, BA', volume: 450000 },
  { city: 'São Paulo, SP', volume: 280000 },
  { city: 'Rio de Janeiro, RJ', volume: 150000 },
  { city: 'Belo Horizonte, MG', volume: 95000 },
];

const abcCurveData = [
  { rank: 1, client: 'Empresa Alpha Ltda', city: 'Salvador/BA', volume: 150000, class: 'A', acc: '25%' },
  { rank: 2, client: 'Roberto Almeida', city: 'Salvador/BA', volume: 120000, class: 'A', acc: '45%' },
  { rank: 3, client: 'Tech Solutions', city: 'São Paulo/SP', volume: 90000, class: 'A', acc: '60%' },
  { rank: 4, client: 'Ana Beatriz', city: 'Salvador/BA', volume: 60000, class: 'B', acc: '70%' },
  { rank: 5, client: 'João Silva', city: 'São Paulo/SP', volume: 40000, class: 'B', acc: '76%' },
  { rank: 6, client: 'Maria Oliveira', city: 'Rio de Janeiro/RJ', volume: 15000, class: 'C', acc: '79%' },
];

const defaultersData = [
  { id: 'EMP-089', client: 'Carlos Santos', city: 'Belo Horizonte/MG', daysLate: 45, amount: 10000 },
  { id: 'EMP-102', client: 'Pedro Henrique', city: 'Salvador/BA', daysLate: 15, amount: 5400 },
  { id: 'EMP-045', client: 'Comercial Souza', city: 'São Paulo/SP', daysLate: 60, amount: 25000 },
];

export function Reports() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Montante Emprestado"
          value="R$ 975.000"
          subtitle="Capital principal ativo"
          icon={Wallet}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <ReportCard
          title="Montante a Receber"
          value="R$ 1.245.000"
          subtitle="Principal + Juros projetados"
          icon={PiggyBank}
          color="text-emerald-600"
          bgColor="bg-emerald-100"
        />
        <ReportCard
          title="Total de Juros (Mês)"
          value="R$ 21.000"
          subtitle="Referente a Junho/2026"
          icon={TrendingUp}
          color="text-indigo-600"
          bgColor="bg-indigo-100"
        />
        <ReportCard
          title="Total de Juros (Ano)"
          value="R$ 98.100"
          subtitle="Acumulado YTD"
          icon={CalendarDays}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interest Over Time */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Evolução de Juros (Mensal)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interestByMonth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `R$ ${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value as number), 'Juros']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="juros" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume by Location */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Volume Emprestado por Localidade</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <MapPin className="w-3 h-3 mr-1" /> Destaque: Salvador
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeByLocation} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} tickFormatter={(value) => `${value / 1000}k`} />
                <YAxis dataKey="city" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 12 }} width={100} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value as number), 'Volume']}
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                  {volumeByLocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.city.includes('Salvador') ? '#3B82F6' : '#9CA3AF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ABC Curve */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Curva ABC de Clientes</h3>
            <p className="text-sm text-gray-500 mt-1">Concentração de risco e volume por tomador</p>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente / Local</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {abcCurveData.map((item) => (
                  <tr key={item.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.client}</div>
                      <div className="text-xs text-gray-500">{item.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(item.volume)}
                      <div className="text-xs text-gray-400 font-normal">Acumulado: {item.acc}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        item.class === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        item.class === 'B' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.class}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Defaulters Report */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Relatório de Inadimplentes
              </h3>
              <p className="text-sm text-gray-500 mt-1">Atrasos superiores a 5 dias</p>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
              {defaultersData.length} Casos
            </span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrato / Cliente</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Atraso</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Devido</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {defaultersData.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.client}</div>
                      <div className="text-xs text-gray-500">{item.id} • {item.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                        {item.daysLate} dias
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right font-bold">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, value, subtitle, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

// Needed for Recharts Cell component which wasn't imported at the top
import { Cell } from 'recharts';
