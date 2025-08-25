import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, Button, DropdownMenu, DropdownItem } from '../styles/DropdownStyles';

export default function DropdownSelect({ options, initial, onSelect }) {
  const [selected, setSelected] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const ClickOutsideHandler = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) //组件不是在下拉菜单内部
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', ClickOutsideHandler);
    }

    return () => {
      document.removeEventListener('mousedown', ClickOutsideHandler);
    };
  }, [isOpen]);

  return (
    <ButtonContainer ref={containerRef}>
      <Button onClick={() => setIsOpen(open => !open)}>
        {selected} <span style={{ padding: '0rem 0.2rem' }}>▼</span>
      </Button>

      {isOpen && (
        <DropdownMenu>
          {options.map(option => (
            <DropdownItem
              key={option}
              onClick={() => handleSelect(option)}
              style={{ fontWeight: selected === option ? 'bold' : 'normal' }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </ButtonContainer>
  );
}

DropdownSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  initial: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
