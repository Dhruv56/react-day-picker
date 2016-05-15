import React, { PropTypes } from 'react';
import { isSameDay } from './DateUtils';

function handleEvent(handler, day, modifiers) {
  if (!handler) {
    return undefined;
  }
  return e => {
    e.persist();
    handler(e, day, modifiers);
  };
}
export default function Day({
  day,
  tabIndex,
  empty,
  modifiers,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  onTouchStart,
  onTouchEnd,
  ariaLabel,
  ariaDisabled,
  children,
}) {
  let className = 'DayPicker-Day';
  const cssModifiers = [...modifiers];
  if (isSameDay(day, new Date())) {
    cssModifiers.push('today');
  }
  className += cssModifiers.map(modifier => ` ${className}--${modifier}`).join('');

  if (empty) {
    return <div role="gridcell" aria-disabled className={className} />;
  }

  return (
    <div
      className={className}
      tabIndex={tabIndex}
      role="gridcell"
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled.toString()}
      onClick={handleEvent(onClick, day, modifiers)}
      onKeyDown={handleEvent(onKeyDown, day, modifiers)}
      onMouseEnter={handleEvent(onMouseEnter, day, modifiers)}
      onMouseLeave={handleEvent(onMouseLeave, day, modifiers)}
      onTouchEnd={handleEvent(onTouchEnd, day, modifiers)}
      onTouchStart={handleEvent(onTouchStart, day, modifiers)}
    >
      {children}
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.node.isRequired,

  ariaDisabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  empty: PropTypes.bool,
  modifiers: PropTypes.array,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  tabIndex: PropTypes.number,
};

Day.defaultProps = {
  modifiers: [],
  empty: false,
};
