class RemoveImageUrlFromSponsoreds < ActiveRecord::Migration[7.0]
  def change
    remove_column :sponsoreds, :image_url, :string
  end
end
