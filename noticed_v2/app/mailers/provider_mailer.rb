class ProviderMailer < ApplicationMailer
  default from: 'noreply@checkcheck.com'

  def approval_notification(provider)
    @provider = provider
    @admin_user = provider.approved_by
    
    mail(
      to: provider.users.pluck(:email).uniq,
      subject: "Sua empresa #{provider.name} foi aprovada!"
    )
  end

  def rejection_notification(provider)
    @provider = provider
    @admin_user = provider.approved_by
    @rejection_notes = provider.approval_notes
    
    mail(
      to: provider.users.pluck(:email).uniq,
      subject: "Sua empresa #{provider.name} foi rejeitada"
    )
  end

  def suspension_notification(provider)
    @provider = provider
    @admin_user = provider.approved_by
    @suspension_notes = provider.approval_notes
    
    mail(
      to: provider.users.pluck(:email).uniq,
      subject: "Sua empresa #{provider.name} foi suspensa"
    )
  end

  def admin_new_provider_notification(provider, admin_emails)
    @provider = provider
    
    mail(
      to: admin_emails,
      subject: "Nova empresa cadastrada: #{provider.name}"
    )
  end
end