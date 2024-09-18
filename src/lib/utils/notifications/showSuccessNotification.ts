import { notifications } from '@mantine/notifications';

interface Props {
  message: string;
}

export default function showSuccessNotification({ message }: Props) {
  notifications.show({
    color: 'green',
    message,
    position: 'bottom-right',
    autoClose: 1000,
    className:
      '[&_*]:font-xl-20px-regular bg-white border my-4 [&_*]:text-black py-5 px-10',
  });
}
