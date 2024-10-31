import css from './Buttons.module.css';
import clsx from 'clsx';
import { TbPlayerTrackNext } from 'react-icons/tb';

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} className={clsx(css.button, { [css.disabled]: disabled })} disabled={disabled}>
      <TbPlayerTrackNext />
    </button>
  );
};

export default NextButton;
