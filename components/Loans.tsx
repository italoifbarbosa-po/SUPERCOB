import React from 'react';
import { Search, Filter, MessageCircle } from 'lucide-react';

type LoanStatus = 'ABERTO' | 'NEGOCIACAO' | 'QUITADO';

interface Loan {
  id: string;
  clientName: string;
  phone: string;
  value: number;
  interest: number;
  dueDate: string;
  status: LoanStatus;
}

const mockLoans: Loan[] = [
  { id: 'EMP-001', clientName: 'João Silva', phone: '11988887777', value: 5000, interest: 3.5, dueDate: '2026-04-10', status: 'ABERTO' },
  { id: 'EMP-002', clientName: 'Maria Oliveira', phone: '11977776666', value: 2500, interest: 4.0, dueDate: '2026-03-15', status: 'NEGOCIACAO' },
  { id: 'EMP-003', clientName: 'Carlos Santos', phone: '11966665555', value: 10000, interest: 2.5, dueDate: '2026-02-28', status: 'QUITADO' },
  { id: 'EMP-004', clientName: 'Ana Costa', phone: '11955554444', value: 1500, interest: 5.0, dueDate: '2026-05-05', status: 'ABERTO' },
];

const statusStyles: Record<LoanStatus, string> = {
  ABERTO: 'bg-red-100 text-red-800',
  NEGOCIACAO: 'bg-yellow-100 text-yellow-800',
  QUITADO: 'bg-green-100 text-green-800',
};

const statusLabels: Record<LoanStatus, string> = {
  ABERTO: 'Aberto',
  NEGOCIACAO: 'Em Negociação',
  QUITADO: 'Quitado',
};

export function Loans() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
  };

  const generateWhatsAppLink = (loan: Loan) => {
    const text = `Olá ${loan.clientName}, sou da SUPERCOB. Gostaria de falar sobre o seu empréstimo no valor de ${formatCurrency(loan.value)}.`;
    return `https://wa.me/55${loan.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Buscar por cliente ou ID..."
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Filter className="h-5 w-5 mr-2 text-gray-400" />
          Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Juros (a.m)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{loan.clientName}</div>
                    <div className="text-sm text-gray-500">{loan.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatCurrency(loan.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.interest.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(loan.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[loan.status]}`}>
                      {statusLabels[loan.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href={generateWhatsAppLink(loan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                      title="Contatar via WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
