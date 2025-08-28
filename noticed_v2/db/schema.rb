# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_08_27_235248) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "analytics", force: :cascade do |t|
    t.bigint "provider_id", null: false
    t.integer "leads_received", default: 0
    t.integer "page_views", default: 0
    t.integer "conversions", default: 0
    t.decimal "conversion_rate", precision: 5, scale: 2, default: "0.0"
    t.decimal "monthly_growth", precision: 5, scale: 2, default: "0.0"
    t.string "response_time"
    t.decimal "average_rating", precision: 3, scale: 2, default: "0.0"
    t.integer "total_reviews", default: 0
    t.integer "profile_views", default: 0
    t.date "date"
    t.integer "intention_score", default: 0
    t.integer "conversion_point_leads", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_analytics_on_date"
    t.index ["provider_id", "date"], name: "index_analytics_on_provider_id_and_date", unique: true
    t.index ["provider_id"], name: "index_analytics_on_provider_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "content"
    t.text "excerpt"
    t.string "status"
    t.datetime "published_at"
    t.string "author"
    t.string "category"
    t.boolean "featured"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "category_id"
    t.bigint "product_id"
    t.integer "article_category", default: 0
    t.string "topics", default: [], array: true
    t.index ["article_category"], name: "index_articles_on_article_category"
    t.index ["category_id"], name: "index_articles_on_category_id"
    t.index ["featured"], name: "index_articles_on_featured"
    t.index ["product_id"], name: "index_articles_on_product_id"
    t.index ["slug"], name: "index_articles_on_slug", unique: true
    t.index ["topics"], name: "index_articles_on_topics", using: :gin
    t.index ["user_id"], name: "index_articles_on_user_id"
  end

  create_table "b2b_ads", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.date "starts_on"
    t.date "expires_on"
    t.integer "status", default: 0
    t.integer "clicks", default: 0
    t.bigint "category_id"
    t.string "subscription_plan"
    t.bigint "provider_id"
    t.bigint "customer_id"
    t.string "operation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_b2b_ads_on_category_id"
    t.index ["company_id"], name: "index_b2b_ads_on_company_id"
    t.index ["customer_id"], name: "index_b2b_ads_on_customer_id"
    t.index ["provider_id"], name: "index_b2b_ads_on_provider_id"
    t.index ["starts_on", "expires_on"], name: "index_b2b_ads_on_starts_on_and_expires_on"
    t.index ["status"], name: "index_b2b_ads_on_status"
  end

  create_table "badges", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "position", default: 0
    t.integer "year"
    t.string "edition"
    t.bigint "category_id"
    t.integer "products_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_badges_on_category_id"
    t.index ["name"], name: "index_badges_on_name"
    t.index ["position"], name: "index_badges_on_position"
    t.index ["year"], name: "index_badges_on_year"
  end

  create_table "banners", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "link_url", null: false
    t.integer "banner_type", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.integer "device_target", default: 0, null: false
    t.integer "priority", default: 0, null: false
    t.datetime "starts_at", null: false
    t.datetime "ends_at"
    t.integer "click_count", default: 0, null: false
    t.integer "impression_count", default: 0, null: false
    t.text "conversion_tracking_code"
    t.bigint "provider_id"
    t.text "custom_css"
    t.text "custom_html"
    t.boolean "show_close_button", default: false
    t.integer "display_frequency", default: 1
    t.json "targeting_rules"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["banner_type"], name: "index_banners_on_banner_type"
    t.index ["device_target"], name: "index_banners_on_device_target"
    t.index ["ends_at"], name: "index_banners_on_ends_at"
    t.index ["priority"], name: "index_banners_on_priority"
    t.index ["provider_id"], name: "index_banners_on_provider_id"
    t.index ["starts_at", "ends_at"], name: "index_banners_on_starts_at_and_ends_at"
    t.index ["starts_at"], name: "index_banners_on_starts_at"
    t.index ["status", "banner_type"], name: "index_banners_on_status_and_banner_type"
    t.index ["status"], name: "index_banners_on_status"
  end

  create_table "banners_categories", id: false, force: :cascade do |t|
    t.bigint "banner_id", null: false
    t.bigint "category_id", null: false
    t.index ["banner_id", "category_id"], name: "index_banners_categories_on_banner_id_and_category_id", unique: true
    t.index ["banner_id"], name: "index_banners_categories_on_banner_id"
    t.index ["category_id"], name: "index_banners_categories_on_category_id"
  end

  create_table "campaigns", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.string "title", null: false
    t.string "code", null: false
    t.bigint "owner_member_id"
    t.string "share_code"
    t.integer "goal", default: 0
    t.integer "reached", default: 0
    t.integer "beginners", default: 0
    t.integer "shares", default: 0
    t.string "prize"
    t.date "starts_on"
    t.date "ends_on"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_campaigns_on_code", unique: true
    t.index ["owner_member_id"], name: "index_campaigns_on_owner_member_id"
    t.index ["product_id"], name: "index_campaigns_on_product_id"
    t.index ["starts_on", "ends_on"], name: "index_campaigns_on_starts_on_and_ends_on"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "slug"
    t.boolean "featured"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", default: 0
    t.integer "products_count", default: 0
    t.boolean "active", default: true
    t.bigint "parent_id"
    t.string "icon"
    t.string "meta_title"
    t.text "meta_description"
    t.text "keywords"
    t.boolean "is_main_category"
    t.string "promotional_text"
    t.index ["active"], name: "index_categories_on_active"
    t.index ["parent_id"], name: "index_categories_on_parent_id"
    t.index ["position"], name: "index_categories_on_position"
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "categories_providers", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "provider_id", null: false
  end

  create_table "categories_solutions", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "solution_id", null: false
  end

  create_table "categories_sponsoreds", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "sponsored_id", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "post_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "company_members", force: :cascade do |t|
    t.bigint "provider_id", null: false
    t.bigint "user_id", null: false
    t.integer "state", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider_id", "user_id"], name: "index_company_members_on_provider_id_and_user_id", unique: true
    t.index ["provider_id"], name: "index_company_members_on_provider_id"
    t.index ["state"], name: "index_company_members_on_state"
    t.index ["user_id"], name: "index_company_members_on_user_id"
  end

  create_table "contents", force: :cascade do |t|
    t.string "title", null: false
    t.text "short_description"
    t.string "category_tags", default: [], array: true
    t.string "lp_url"
    t.string "format"
    t.string "level"
    t.string "seo_url"
    t.string "seo_title"
    t.text "seo_description"
    t.bigint "product_id"
    t.string "source"
    t.string "maker"
    t.string "kind"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_contents_on_active"
    t.index ["category_tags"], name: "index_contents_on_category_tags", using: :gin
    t.index ["product_id"], name: "index_contents_on_product_id"
    t.index ["seo_url"], name: "index_contents_on_seo_url", unique: true
  end

  create_table "cta_banners", force: :cascade do |t|
    t.string "title", null: false
    t.text "subtitle"
    t.string "button1_text", null: false
    t.string "button1_url", null: false
    t.string "button2_text", null: false
    t.string "button2_url", null: false
    t.string "background_type", default: "solid", null: false
    t.string "background_color"
    t.boolean "enabled", default: true, null: false
    t.string "position", default: "homepage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["enabled", "position"], name: "index_cta_banners_on_enabled_and_position"
    t.index ["enabled"], name: "index_cta_banners_on_enabled"
    t.index ["position"], name: "index_cta_banners_on_position"
  end

  create_table "dynamic_banners", force: :cascade do |t|
    t.string "title", limit: 255, null: false
    t.text "description", null: false
    t.string "link_url", null: false
    t.integer "display_order", default: 1, null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "start_date"
    t.date "end_date"
    t.index ["active", "display_order"], name: "index_dynamic_banners_on_active_and_order"
    t.index ["active"], name: "index_dynamic_banners_on_active"
    t.index ["display_order"], name: "index_dynamic_banners_on_display_order"
  end

  create_table "leads", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "company"
    t.text "message"
    t.bigint "solution_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "product_id"
    t.integer "score"
    t.boolean "distributed", default: false
    t.boolean "converted", default: false
    t.string "company_size"
    t.string "source"
    t.index ["converted"], name: "index_leads_on_converted"
    t.index ["distributed"], name: "index_leads_on_distributed"
    t.index ["product_id"], name: "index_leads_on_product_id"
    t.index ["score"], name: "index_leads_on_score"
    t.index ["solution_id"], name: "index_leads_on_solution_id"
    t.index ["user_id"], name: "index_leads_on_user_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "company"
    t.string "role"
    t.string "status"
    t.string "subscription_plan"
    t.string "subscription_status"
    t.datetime "trial_ends_at"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["slug"], name: "index_members_on_slug", unique: true
  end

  create_table "noticed_events", force: :cascade do |t|
    t.string "type"
    t.string "record_type"
    t.bigint "record_id"
    t.jsonb "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "notifications_count"
    t.index ["record_type", "record_id"], name: "index_noticed_events_on_record"
  end

  create_table "noticed_notifications", force: :cascade do |t|
    t.string "type"
    t.bigint "event_id", null: false
    t.string "recipient_type", null: false
    t.bigint "recipient_id", null: false
    t.datetime "read_at", precision: nil
    t.datetime "seen_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_noticed_notifications_on_event_id"
    t.index ["recipient_type", "recipient_id"], name: "index_noticed_notifications_on_recipient"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "views", default: 0
    t.bigint "user_id", null: false
    t.datetime "published_at"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "pricings", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.string "title", null: false
    t.string "currency", default: "BRL"
    t.decimal "amount", precision: 10, scale: 2
    t.integer "charge_type", default: 0
    t.integer "frequency", default: 0
    t.string "payment_methods", default: [], array: true
    t.integer "display_order", default: 0
    t.integer "discount_pct", default: 0
    t.integer "state", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "display_order"], name: "index_pricings_on_product_id_and_display_order"
    t.index ["product_id"], name: "index_pricings_on_product_id"
    t.index ["state"], name: "index_pricings_on_state"
  end

  create_table "product_accesses", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "solution_id", null: false
    t.string "access_level"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_product_accesses_on_member_id"
    t.index ["solution_id"], name: "index_product_accesses_on_solution_id"
  end

  create_table "product_users", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "user_id", null: false
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "user_id"], name: "index_product_users_on_product_id_and_user_id", unique: true
    t.index ["product_id"], name: "index_product_users_on_product_id"
    t.index ["status"], name: "index_product_users_on_status"
    t.index ["user_id"], name: "index_product_users_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.string "seo_url"
    t.integer "status", default: 0
    t.integer "kind", default: 0
    t.string "country"
    t.date "premium_until"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kind"], name: "index_products_on_kind"
    t.index ["name"], name: "index_products_on_name"
    t.index ["seo_url"], name: "index_products_on_seo_url", unique: true
    t.index ["status"], name: "index_products_on_status"
  end

  create_table "promotional_banners", force: :cascade do |t|
    t.string "title", limit: 200, null: false
    t.string "background_color", default: "#f97316", null: false
    t.string "text_color", default: "#ffffff", null: false
    t.string "link_url", null: false
    t.integer "display_order", default: 1, null: false
    t.boolean "active", default: true, null: false
    t.string "position", default: "homepage", null: false
    t.bigint "provider_id"
    t.string "utm_source", limit: 100
    t.string "utm_medium", limit: 100
    t.string "utm_campaign", limit: 100
    t.string "utm_content", limit: 100
    t.string "utm_term", limit: 100
    t.text "notes"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "clicks_count", default: 0
    t.integer "impressions_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active", "position", "display_order"], name: "index_promotional_banners_active_position_order"
    t.index ["active"], name: "index_promotional_banners_on_active"
    t.index ["created_at"], name: "index_promotional_banners_on_created_at"
    t.index ["display_order"], name: "index_promotional_banners_on_display_order"
    t.index ["position"], name: "index_promotional_banners_on_position"
    t.index ["provider_id"], name: "index_promotional_banners_on_provider_id"
    t.index ["start_date", "end_date"], name: "index_promotional_banners_date_range"
  end

  create_table "providers", force: :cascade do |t|
    t.string "name", null: false
    t.string "seo_url"
    t.string "title"
    t.text "short_description"
    t.string "country"
    t.string "address"
    t.string "phone"
    t.string "social_links", default: [], array: true
    t.integer "members_count", default: 0
    t.integer "foundation_year"
    t.date "premium_until"
    t.string "revenue"
    t.string "tags", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "pending", null: false
    t.text "approval_notes"
    t.bigint "approved_by_id"
    t.datetime "approved_at"
    t.string "slug"
    t.index ["approved_by_id"], name: "index_providers_on_approved_by_id"
    t.index ["country"], name: "index_providers_on_country"
    t.index ["name"], name: "index_providers_on_name"
    t.index ["seo_url"], name: "index_providers_on_seo_url", unique: true
    t.index ["slug"], name: "index_providers_on_slug", unique: true
    t.index ["status"], name: "index_providers_on_status"
    t.index ["tags"], name: "index_providers_on_tags", using: :gin
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "product_id"
    t.bigint "category_id"
    t.string "subject", null: false
    t.text "description"
    t.integer "status", default: 0
    t.datetime "requested_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_questions_on_category_id"
    t.index ["product_id"], name: "index_questions_on_product_id"
    t.index ["requested_at"], name: "index_questions_on_requested_at"
    t.index ["status"], name: "index_questions_on_status"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "replies", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "user_id", null: false
    t.text "answer", null: false
    t.integer "status", default: 0
    t.datetime "requested_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_replies_on_question_id"
    t.index ["requested_at"], name: "index_replies_on_requested_at"
    t.index ["status"], name: "index_replies_on_status"
    t.index ["user_id"], name: "index_replies_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "solution_id"
    t.bigint "user_id", null: false
    t.integer "rating"
    t.string "title"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "product_id", null: false
    t.integer "status", default: 0
    t.string "cliente"
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["solution_id"], name: "index_reviews_on_solution_id"
    t.index ["status"], name: "index_reviews_on_status"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "solutions", force: :cascade do |t|
    t.string "name"
    t.string "company"
    t.text "description"
    t.text "long_description"
    t.decimal "rating"
    t.string "website"
    t.boolean "featured"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "provider_id"
    t.string "slug"
    t.index ["provider_id"], name: "index_solutions_on_provider_id"
    t.index ["slug"], name: "index_solutions_on_slug", unique: true
    t.index ["user_id"], name: "index_solutions_on_user_id"
  end

  create_table "solutions_tags", id: false, force: :cascade do |t|
    t.bigint "solution_id", null: false
    t.bigint "tag_id", null: false
  end

  create_table "sponsoreds", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "link_url"
    t.string "position"
    t.string "status"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.integer "priority"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "views", default: 0
    t.integer "role", default: 0
    t.boolean "approved"
    t.boolean "corporate_email", default: false
    t.string "company_name"
    t.string "position"
    t.index ["company_name"], name: "index_users_on_company_name"
    t.index ["corporate_email"], name: "index_users_on_corporate_email"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role"], name: "index_users_on_role"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "analytics", "providers"
  add_foreign_key "articles", "categories"
  add_foreign_key "articles", "products"
  add_foreign_key "articles", "users"
  add_foreign_key "b2b_ads", "categories"
  add_foreign_key "b2b_ads", "providers"
  add_foreign_key "b2b_ads", "providers", column: "company_id"
  add_foreign_key "b2b_ads", "users", column: "customer_id"
  add_foreign_key "badges", "categories"
  add_foreign_key "banners", "providers"
  add_foreign_key "campaigns", "members", column: "owner_member_id"
  add_foreign_key "campaigns", "products"
  add_foreign_key "categories", "categories", column: "parent_id"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "company_members", "providers"
  add_foreign_key "company_members", "users"
  add_foreign_key "contents", "products"
  add_foreign_key "leads", "products"
  add_foreign_key "leads", "solutions"
  add_foreign_key "leads", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "pricings", "products"
  add_foreign_key "product_accesses", "members"
  add_foreign_key "product_accesses", "solutions"
  add_foreign_key "product_users", "products"
  add_foreign_key "product_users", "users"
  add_foreign_key "promotional_banners", "providers"
  add_foreign_key "providers", "admin_users", column: "approved_by_id"
  add_foreign_key "questions", "categories"
  add_foreign_key "questions", "products"
  add_foreign_key "questions", "users"
  add_foreign_key "replies", "questions"
  add_foreign_key "replies", "users"
  add_foreign_key "reviews", "products"
  add_foreign_key "reviews", "solutions"
  add_foreign_key "reviews", "users"
  add_foreign_key "solutions", "providers"
  add_foreign_key "solutions", "users"
end
