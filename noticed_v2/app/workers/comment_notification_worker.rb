class CommentNotificationWorker
  include Sidekiq::Worker
  sidekiq_options queue: :notifications

  def perform(comment_id)
    comment = Comment.find(comment_id)
    CommentNotifier.with(record: comment, post: comment.post).deliver(comment.post.user)
  end
end
