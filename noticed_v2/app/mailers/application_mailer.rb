class ApplicationMailer < ActionMailer::Base
  default from: "noreply@checkcheck.com"
  layout "mailer"
  
  private
  
  def admin_emails
    AdminUser.pluck(:email)
  end
end
