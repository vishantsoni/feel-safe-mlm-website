export type NotificationCategory = "bar" | "popup";

export type NotificationType = {
  id: string;
  category: NotificationCategory;
  title: string;
  message?: string;
  url?: string;
  createdAt?: string;
};

export type NotificationsResponse = {
  notifications: NotificationType[];
};
