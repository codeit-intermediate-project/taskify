import { notifications } from '@mantine/notifications';

interface Props {
  message: string;
}

export default function showSuccessNotification({ message }: Props) {
  notifications.show({
    color: 'green',
    message,
    position: 'bottom-right',
    autoClose: 3000,
    className:
      '[&_*]:font-2xl-24px-semibold bg-green my-4 [&_*]:text-white py-5 px-10',
  });
}
