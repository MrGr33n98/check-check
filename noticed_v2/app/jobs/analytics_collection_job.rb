# Analytics Collection Job
# Job responsável por coletar métricas automaticamente em intervalos regulares

class AnalyticsCollectionJob < ApplicationJob
  queue_as :default
  
  # Executa a coleta de métricas diárias
  def perform(date = Date.current)
    Rails.logger.info "Starting analytics collection for #{date}"
    
    begin
      # Atualizar métricas para todos os provedores ativos
      AnalyticsService.update_all_daily_metrics(date)
      
      # Limpar cache antigo
      cleanup_old_cache
      
      Rails.logger.info "Analytics collection completed successfully for #{date}"
      
    rescue => e
      Rails.logger.error "Error in analytics collection: #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
      raise e
    end
  end
  
  private
  
  # Limpa cache antigo para evitar acúmulo
  def cleanup_old_cache
    # Em produção, isso seria mais sofisticado
    # Por enquanto, apenas log da limpeza
    Rails.logger.info "Cleaning up old analytics cache"
  end
end