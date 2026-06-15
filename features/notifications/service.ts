export type NotificationDraft = {
  userId: string;
  title: string;
  body: string;
};

export function buildNotification(input: NotificationDraft) {
  return {
    user_id: input.userId,
    title: input.title.trim(),
    body: input.body.trim(),
    read_at: null
  };
}
