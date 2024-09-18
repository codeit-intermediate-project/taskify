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
      '[&_*]:font-xl-20px-regular bg-white border my-4 [&_*]:text-black py-5 px-10',
  });
}
