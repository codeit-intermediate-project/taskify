import { notifications } from '@mantine/notifications';

interface Props {
  message?: string;
}

export default function showErrorNotification({
  message = 'unknown error',
}: Props) {
  notifications.show({
    color: 'red',
    message,
    position: 'bottom-right',
    autoClose: 3000,
    className:
      '[&_*]:font-2xl-24px-semibold bg-red my-4 [&_*]:text-white py-5 px-10',
  });
}
