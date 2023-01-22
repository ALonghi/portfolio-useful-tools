import React from 'react'
import {eventsSelector, ToastData} from "@context/redux/toast/toastSlice";
import {useSelector} from "react-redux";
import NotificationToast from "@components/shared/Notifications/NotificationToast/NotificationToast";


const Notifications: React.VFC = () => {
    const toastNotifications = useSelector(eventsSelector)

    return (
        <>
            {toastNotifications?.length > 0 &&
                <div
                    className={`h-max min-h-[8rem] z-50 fixed inset-0 flex justify-items-start flex-col sm:items-start 
                top-4 right-4 left-auto min-w-[80%] md:min-w-[25%]`}>
                    {
                        toastNotifications.map((notification: ToastData) =>
                            <NotificationToast key={notification.id}
                                               notification={notification}/>
                        )
                    }
                </div>
            }
        </>
    )
}

export default Notifications