class AnalyticsCleanupJob < ApplicationJob
  queue_as :low_priority

  # Cleanup old analytics data to maintain database performance
  def perform
    Rails.logger.info "Starting analytics cleanup at #{Time.current}"
    
    cleanup_old_analytics
    cleanup_orphaned_records
    update_database_statistics
    
    Rails.logger.info "Analytics cleanup completed at #{Time.current}"
  end

  private

  def cleanup_old_analytics
    # Keep analytics data for 2 years, archive older data
    cutoff_date = 2.years.ago
    
    # Count records to be archived
    old_records_count = Analytic.where('date < ?', cutoff_date).count
    
    if old_records_count > 0
      Rails.logger.info "Archiving #{old_records_count} analytics records older than #{cutoff_date}"
      
      # Archive to a separate table or export to file before deletion
      archive_old_analytics(cutoff_date)
      
      # Delete old records in batches to avoid locking the table
      Analytic.where('date < ?', cutoff_date).find_in_batches(batch_size: 1000) do |batch|
        batch_ids = batch.map(&:id)
        Analytic.where(id: batch_ids).delete_all
        Rails.logger.info "Deleted batch of #{batch.size} old analytics records"
      end
      
      Rails.logger.info "Completed archiving #{old_records_count} old analytics records"
    else
      Rails.logger.info "No old analytics records found for cleanup"
    end
  end

  def cleanup_orphaned_records
    # Remove analytics records for providers that no longer exist
    orphaned_count = Analytic.left_joins(:provider).where(providers: { id: nil }).count
    
    if orphaned_count > 0
      Rails.logger.info "Removing #{orphaned_count} orphaned analytics records"
      Analytic.left_joins(:provider).where(providers: { id: nil }).delete_all
      Rails.logger.info "Completed removal of orphaned analytics records"
    else
      Rails.logger.info "No orphaned analytics records found"
    end
  end

  def archive_old_analytics(cutoff_date)
    # Create archive file with old data
    archive_filename = "analytics_archive_#{cutoff_date.strftime('%Y%m%d')}_#{Time.current.strftime('%H%M%S')}.csv"
    archive_path = Rails.root.join('storage', 'archives', archive_filename)
    
    # Ensure archive directory exists
    FileUtils.mkdir_p(File.dirname(archive_path))
    
    # Export old data to CSV
    CSV.open(archive_path, 'w', write_headers: true, headers: analytics_csv_headers) do |csv|
      Analytic.includes(:provider)
              .where('date < ?', cutoff_date)
              .find_each(batch_size: 500) do |analytic|
        csv << [
          analytic.id,
          analytic.provider&.name || 'Unknown Provider',
          analytic.provider_id,
          analytic.date,
          analytic.leads_received,
          analytic.page_views,
          analytic.conversions,
          analytic.conversion_rate,
          analytic.monthly_growth,
          analytic.average_rating,
          analytic.total_reviews,
          analytic.created_at,
          analytic.updated_at
        ]
      end
    end
    
    Rails.logger.info "Archived old analytics data to #{archive_path}"
    
    # Optionally compress the archive
    compress_archive(archive_path) if File.exist?(archive_path)
  end

  def compress_archive(file_path)
    compressed_path = "#{file_path}.gz"
    
    Zlib::GzipWriter.open(compressed_path) do |gz|
      File.open(file_path, 'rb') do |file|
        gz.write(file.read)
      end
    end
    
    # Remove uncompressed file
    File.delete(file_path)
    
    Rails.logger.info "Compressed archive to #{compressed_path}"
  end

  def update_database_statistics
    # Update database statistics for better query performance
    case ActiveRecord::Base.connection.adapter_name.downcase
    when 'postgresql'
      ActiveRecord::Base.connection.execute('ANALYZE analytics;')
      Rails.logger.info "Updated PostgreSQL statistics for analytics table"
    when 'mysql', 'mysql2'
      ActiveRecord::Base.connection.execute('ANALYZE TABLE analytics;')
      Rails.logger.info "Updated MySQL statistics for analytics table"
    when 'sqlite'
      ActiveRecord::Base.connection.execute('ANALYZE analytics;')
      Rails.logger.info "Updated SQLite statistics for analytics table"
    else
      Rails.logger.info "Database statistics update not implemented for #{ActiveRecord::Base.connection.adapter_name}"
    end
  end

  def analytics_csv_headers
    [
      'ID',
      'Provider Name',
      'Provider ID',
      'Date',
      'Leads Received',
      'Page Views',
      'Conversions',
      'Conversion Rate',
      'Monthly Growth',
      'Average Rating',
      'Total Reviews',
      'Created At',
      'Updated At'
    ]
  end
end