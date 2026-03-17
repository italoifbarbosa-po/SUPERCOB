import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, AlertCircle } from 'lucide-react';

const statusData = [
  { name: 'Aberto', value: 45, color: '#EF4444' }, // Red
  { name: 'Negociação', value: 25, color: '#EAB308' }, // Yellow
  { name: 'Quitado', value: 30, color: '#22C55E' }, // Green
];

const agentData = [
  { name: 'Agente A', value: 40, color: '#6366F1' },
  { name: 'Agente B', value: 35, color: '#8B5CF6' },
  { name: 'Agente C', value: 25, color: '#EC4899' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Empréstimos em Aberto"
          value="45"
          subtitle="R$ 145.000 em risco"
          icon={AlertCircle}
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <MetricCard
          title="Total Recuperado"
          value="R$ 12.000"
          subtitle="+15% este mês"
          icon={TrendingUp}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <MetricCard
          title="Em Negociação"
          value="25"
          subtitle="R$ 85.000 negociados"
          icon={DollarSign}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />
        <MetricCard
          title="Total de Clientes"
          value="1.204"
          subtitle="Ativos na base"
          icon={Users}
          color="text-indigo-600"
          bgColor="bg-indigo-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Empréstimos por Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recuperação por Agente</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
      <div className={`p-3 rounded-lg ${bgColor} ${color} mr-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
