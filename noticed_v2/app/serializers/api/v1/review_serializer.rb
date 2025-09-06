class Api::V1::ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :title, :comment, :status,
             :solution_id, :user_id, :created_at, :updated_at

  belongs_to :solution, if: -> { object.solution.present? }
  belongs_to :user
end
