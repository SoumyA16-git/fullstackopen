interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  if (!message) {
    return null;
  }

  return (
    <div style={{ color: 'red', marginBottom: '1em', fontWeight: 'bold' }}>
      {message}
    </div>
  );
};

export default Notification;
