import React from "react";
import { Activity } from "../types";

interface ActivityLogProps {
  activityLog: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activityLog }) => {
  if (!activityLog || activityLog.length === 0) {
    return <p className="text-sm text-gray-500">No recent activity.</p>;
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {activityLog
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .map((activity) => (
          <div
            key={activity.id}
            className="bg-white p-2 rounded shadow text-sm"
          >
            <p className="font-semibold">{activity.message}</p>
            <p className="text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ActivityLog;
