class CreateProviderCertifications < ActiveRecord::Migration[7.0]
  def change
    create_table :provider_certifications do |t|
      t.references :provider, null: false, foreign_key: true
      t.references :certification, null: false, foreign_key: true
      t.timestamps
    end

    add_index :provider_certifications, [:provider_id, :certification_id], unique: true, name: 'idx_prov_cert_on_prov_id_and_cert_id'
  end
end
