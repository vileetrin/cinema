import css from './Buttons.module.css';
import clsx from 'clsx';
import { IoPlayBackOutline } from 'react-icons/io5';

interface PreviousButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const PreviousButton: React.FC<PreviousButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} className={clsx(css.button, { [css.disabled]: disabled })} disabled={disabled}>
      <IoPlayBackOutline />
    </button>
  );
};

export default PreviousButton;
