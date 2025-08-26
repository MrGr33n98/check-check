class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :slug
      t.text :content
      t.text :excerpt
      t.string :status
      t.datetime :published_at
      t.string :author
      t.string :category
      t.boolean :featured

      t.timestamps
    end
    add_index :articles, :slug, unique: true
  end
end
