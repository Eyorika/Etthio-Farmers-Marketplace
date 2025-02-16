const Notifications = ({ notifications }: { notifications: any[] }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.map((notification) => (
        <div key={notification.id} className="p-4 border-b last:border-b-0">
          <p>{notification.message}</p>
          <p className="text-sm text-gray-500">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
  
  export default Notifications; // Add this line