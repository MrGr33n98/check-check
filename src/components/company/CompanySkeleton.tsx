export const CompanySkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="flex items-start gap-6">
        {/* Logo placeholder */}
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
        
        {/* Informações principais */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-3 flex-1">
              {/* Nome da empresa */}
              <div className="h-7 bg-gray-200 rounded w-3/4" />
              
              {/* Localização */}
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              
              {/* Avaliações */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
                ))}
                <div className="w-24 h-5 bg-gray-200 rounded ml-2" />
              </div>
            </div>
            
            {/* Preço */}
            <div className="text-right">
              <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Informações secundárias */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Serviços */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-24" />
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded w-24" />
              <div className="h-10 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-10 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};