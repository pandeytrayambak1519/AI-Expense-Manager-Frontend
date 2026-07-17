import api from "./api";

// Get all notifications
export const getNotifications = () => {
    return api.get("/notifications");
};

// Get unread notifications
export const getUnreadNotifications = () => {
    return api.get("/notifications/unread");
};

// Create notification
export const createNotification = (message, type) => {
    return api.post(
        `/notifications?message=${encodeURIComponent(message)}&type=${encodeURIComponent(type)}`
    );
};

// Mark notification as read
export const markAsRead = (id) => {
    return api.put(`/notifications/${id}/read`);
};

// Delete notification
export const deleteNotification = (id) => {
    return api.delete(`/notifications/${id}`);
};