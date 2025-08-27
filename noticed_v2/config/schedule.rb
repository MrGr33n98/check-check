# Use this file to easily define all of your cron jobs.
# Learn more: http://github.com/javan/whenever

# Set the environment for all jobs
set :environment, 'production'
set :output, 'log/cron.log'

# Daily analytics collection at 2 AM
every 1.day, at: '2:00 am' do
  runner "AnalyticsCollectionJob.perform_later"
end

# Weekly analytics summary report (Mondays at 8 AM)
every :monday, at: '8:00 am' do
  runner "WeeklyAnalyticsReportJob.perform_later"
end

# Monthly analytics cleanup (first day of month at 3 AM)
every '0 3 1 * *' do
  runner "AnalyticsCleanupJob.perform_later"
end

# Hourly metrics update for real-time data
every 1.hour do
  runner "HourlyMetricsUpdateJob.perform_later"
end