import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Clock, Building2, Mail, User, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PendingApprovalPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user || !user.corporate_email) {
    return <Navigate to="/" replace />;
  }

  // If user is already approved, redirect to dashboard
  if (user.approved) {
    return <Navigate to="/empresa/analytics" replace />;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Aprovação Pendente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Olá <strong>{user.name}</strong>, sua solicitação de acesso corporativo está sendo analisada pela nossa equipe.
              </p>
              <p className="text-sm text-gray-500">
                O processo de aprovação geralmente leva até 48 horas úteis. Você será notificado por email quando for aprovado.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações Enviadas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">Nome completo</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-gray-600">Email corporativo</p>
                  </div>
                </div>
                
                {user.company_name && (
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{user.company_name}</p>
                      <p className="text-sm text-gray-600">Nome da empresa</p>
                    </div>
                  </div>
                )}
                
                {user.position && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{user.position}</p>
                      <p className="text-sm text-gray-600">Cargo/Posição</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">O que acontece depois da aprovação?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Acesso completo ao dashboard de analytics</li>
                  <li>• Gestão de leads e oportunidades</li>
                  <li>• Customização da página da empresa</li>
                  <li>• Relatórios detalhados de performance</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Verificar Status
              </Button>
              <Button onClick={logout} variant="ghost">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingApprovalPage;