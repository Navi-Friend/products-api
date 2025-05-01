import { JSX } from "react";
import { ToastContentProps } from "react-toastify";
import { ApiError } from "../../types/error.interface";

interface NotificationProps extends Partial<ToastContentProps> {
    error: ApiError;
}

export function ErrNotification({ error }: NotificationProps): JSX.Element {
    return (
        <div className="flex flex-col gap-1 ps-5">
            <div className="flex items-center gap-2">
                <h3 className="text-md font-semibold text-red-800">
                    {error.status}
                </h3>
            </div>
            <p className="text-red-700">{error.message}</p>
            {error.details && error.details.length > 0 && (
                <ul className="list-disc list-inside text-sm text-red-600">
                    {error.details.map((error, i) => (
                        <li key={i}>
                            {error.field}: {error.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
