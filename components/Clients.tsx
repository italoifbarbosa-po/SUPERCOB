import React, { useState } from 'react';
import { Plus, Search, X, User, MapPin, Briefcase, Phone } from 'lucide-react';

const mockClients = [
  { id: 1, name: 'João Silva', cpf: '111.222.333-44', whatsapp: '(11) 98888-7777', email: 'joao@email.com', city: 'São Paulo/SP' },
  { id: 2, name: 'Maria Oliveira', cpf: '555.666.777-88', whatsapp: '(11) 97777-6666', email: 'maria@email.com', city: 'Rio de Janeiro/RJ' },
  { id: 3, name: 'Carlos Santos', cpf: '999.000.111-22', whatsapp: '(11) 96666-5555', email: 'carlos@email.com', city: 'Belo Horizonte/MG' },
  { id: 4, name: 'Ana Beatriz', cpf: '444.555.666-77', whatsapp: '(71) 99999-1111', email: 'ana.ba@email.com', city: 'Salvador/BA' },
  { id: 5, name: 'Roberto Almeida', cpf: '888.999.000-11', whatsapp: '(71) 98888-2222', email: 'roberto.ssa@email.com', city: 'Salvador/BA' },
  { id: 6, name: 'Empresa Alpha Ltda', cpf: '12.345.678/0001-99', whatsapp: '(71) 97777-3333', email: 'contato@alpha.com.br', city: 'Salvador/BA' },
];

export function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            placeholder="Buscar por nome, CPF ou e-mail..."
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Cliente
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF/CNPJ
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WhatsApp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localidade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.whatsapp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.city.includes('Salvador') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {client.city}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Cadastro de Novo Cliente
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                      <User className="h-4 w-4 mr-2 text-indigo-500" /> Dados Pessoais
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Nome Completo" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="CPF" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="email" placeholder="E-mail" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="WhatsApp" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-500" /> Endereço
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input type="text" placeholder="CEP" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Logradouro" className="sm:col-span-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Número" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Bairro" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Cidade/UF" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                    </div>
                  </div>

                  {/* Profissão */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                      <Briefcase className="h-4 w-4 mr-2 text-indigo-500" /> Profissão e Renda
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Cargo/Profissão" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Renda Mensal (R$)" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                    </div>
                  </div>

                  {/* Contatos de Emergência */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                      <Phone className="h-4 w-4 mr-2 text-indigo-500" /> Contatos de Emergência
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Nome do Contato" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                      <input type="text" placeholder="Telefone" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2" />
                    </div>
                  </div>

                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Salvar Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
