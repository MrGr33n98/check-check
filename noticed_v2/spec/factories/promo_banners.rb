FactoryBot.define do
  factory :promo_banner do
    title { "MyString" }
    subtitle { "MyText" }
    button_text { "MyString" }
    button_url { "MyString" }
    background_color { "MyString" }
    text_color { "MyString" }
    position { "MyString" }
    active { false }
    priority { 1 }
  end
end
