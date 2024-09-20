import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';
import GradientFrame from '@components/@shared/animations/GradientFrame';

interface CreateDashboardButtonProps {
  onClick: () => void;
}

const CreateDashboardButton = ({ onClick }: CreateDashboardButtonProps) => (
  <GradientFrame className="rounded-lg">
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-[22px] font-lg-16px-semibold dark:border-black-600 dark:bg-black-600"
    >
      <p>새로운 대시보드</p>
      <PurpleAddIcon />
    </button>
  </GradientFrame>
);

export default CreateDashboardButton;
