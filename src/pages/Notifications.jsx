import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import {
    getNotifications,
    markAsRead,
    deleteNotification
} from "../services/notificationService";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {

        try {

            const response = await getNotifications();

            setNotifications(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    const readNotification = async (id) => {

        await markAsRead(id);

        loadNotifications();

    };

    const removeNotification = async (id) => {

        if (!window.confirm("Delete this notification?"))
            return;

        await deleteNotification(id);

        loadNotifications();

    };

    return (

        <Layout>

            <div className="container-fluid">

                <h2 className="fw-bold mb-4">

                    🔔 Notifications

                </h2>

                {

                    notifications.length === 0 ?

                    <div className="alert alert-info">

                        No Notifications Found

                    </div>

                    :

                    notifications.map(notification => (

                        <div
                            key={notification.id}
                            className={`card shadow border-0 mb-3 ${
                                notification.isRead
                                ? ""
                                : "border-start border-5 border-danger"
                            }`}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <div>

                                        <h5>

                                            {

                                                notification.type === "WARNING"

                                                ? "⚠ Warning"

                                                : notification.type === "SUCCESS"

                                                ? "✅ Success"

                                                : "ℹ Info"

                                            }

                                        </h5>

                                        <p className="mb-1">

                                            {notification.message}

                                        </p>

                                        <small className="text-muted">

                                            {notification.createdAt}

                                        </small>

                                    </div>

                                    <div>

                                        {

                                            !notification.isRead &&

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    readNotification(notification.id)
                                                }
                                            >
                                                Mark Read
                                            </button>

                                        }

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removeNotification(notification.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </Layout>

    );

}

export default Notifications;