import { bem, getFocusable, onNextRender } from '@gugbab-integrated-admin-poc/utils';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { PanelStyleType, TooltipProps } from '@types';
import Icon from '../Icon';

const cn = bem('tooltip');

const Tooltip = ({
  anchor,
  children,
  isFirstRenderVisible = false,
  onAfterHide,
  onAfterShow,
  placement = 'bottom-start',
  trigger = 'click',
  type = 'bubble',
  useCloseBtn = true,
  useHideClick = true,
  useHideScroll = false,
}: TooltipProps) => {
  const uniqueId = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState<PanelStyleType | undefined>();
  const focusable = useRef<{ first: Element; last: Element }>(null);

  /** focus 요소 */
  const getFocusableElement = useCallback(() => {
    if (!panelRef.current) return;
    const elements = getFocusable(panelRef?.current);
    if (!elements) return;
    return {
      first: elements[0],
      last: elements[elements.length - 1],
    };
  }, []);

  /** isFirstRenderVisible 시 한번 활성화 */
  const setOpen = () => {
    if (!panelRef.current) return;
    panelRef.current?.classList.add('tooltip__panel--rect');
    const { clientWidth } = panelRef.current;
    panelRef.current?.classList.remove('tooltip__panel--rect');
    onNextRender(() => {
      setPanel({
        width: `${clientWidth + 1}px`,
      });
    });
    onNextRender(() => {
      setVisible(true);
    });
  };

  /** 열림처리 */
  const handleOpen = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      if (!panelRef.current) return;
      if (visible) return;

      panelRef.current?.classList.add('tooltip__panel--rect');
      const { clientWidth } = panelRef.current;
      flushSync(() =>
        setPanel({
          width: `${clientWidth + 1}px`,
        }),
      );
      flushSync(() => setVisible(true));
      if (e?.type === 'click') {
        e.preventDefault();
        panelRef.current?.focus();
      }
      onAfterShow?.();
    },
    [onAfterShow, visible],
  );

  /** focus 열림처리 */
  const handleFocus = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  /** 닫기처리 */
  const handleClose = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      if (!panelRef.current) return;
      if (e) {
        e.preventDefault();
        anchorRef.current?.focus();
      }
      setVisible(false);
      setTimeout(() => {
        if (!panelRef.current) return;
        setPanel(undefined);
        panelRef.current.style.removeProperty('width');
        panelRef.current.style.removeProperty('left');
        panelRef.current.style.removeProperty('opacity');
      });
      onAfterHide?.();
    },
    [onAfterHide],
  );

  /** panel 키보드 이벤트 처리 */
  const handlePanelKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const keyCode = e.key;
      if (keyCode === 'Escape') {
        e.preventDefault();
        handleClose();
        anchorRef.current?.focus();
      }
      if ((e.target as HTMLDivElement).getAttribute('role') !== 'tooltip') return;
      if (keyCode === 'Tab') {
        if (e.shiftKey) {
          handleClose();
          return;
        }
        if (!focusable.current?.last) {
          handleClose();
        }
      }
    },
    [handleClose],
  );

  /** panel 마지막 포커스 요소 키보드 이벤트 처리*/
  const handleLastKeyDown = useCallback(
    (e: any) => {
      const keyCode = e.key;
      if (!panelRef.current) return;
      if (keyCode === 'Tab') {
        if (!e.shiftKey) {
          handleClose();
        }
      }
    },
    [handleClose],
  );

  /** 외부 클릭시 닫힘 처리 */
  const handleOutsideClose = useCallback(
    (e: Event) => {
      if (visible && !tooltipRef.current?.contains(e.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose, visible],
  );

  /** 스크롤시 닫힘 처리 */
  const handleScrollClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  /** mouse leave 처리 */
  const handleLeaveClose = useCallback(() => {
    if (trigger !== 'hover') return;
    handleClose();
  }, [handleClose, trigger]);

  const closeSize = useMemo(() => {
    if (
      placement === 'left-top' ||
      placement === 'left-bottom' ||
      placement === 'right-top' ||
      placement === 'right-bottom'
    ) {
      return 16;
    }

    return 14;
  }, [placement]);

  /** isFirstRenderVisible에 따라 활성화 */
  useEffect(() => {
    isFirstRenderVisible && setOpen();
  }, [isFirstRenderVisible]);

  /** useCloseBtn 변경시 panel 닫기 */
  useEffect(() => {
    handleClose();
  }, [handleClose, useCloseBtn]);

  /** panel 안 마지막 focus요소 keyboard event 처리 */
  useEffect(() => {
    if (children && panelRef.current) {
      focusable.current = getFocusableElement() ?? null;
      if (focusable.current?.last) {
        (focusable.current?.last as HTMLElement).addEventListener('keydown', handleLastKeyDown);
        return () => (focusable.current?.last as HTMLElement).removeEventListener('keydown', handleLastKeyDown);
      }
    }
  }, [children, getFocusableElement, handleLastKeyDown]);

  /** 외부 click이나 scroll시 event 처리 */
  useEffect(() => {
    useHideClick && document.addEventListener('click', handleOutsideClose);
    useHideScroll && window.addEventListener('scroll', handleScrollClose);
    return () => {
      useHideClick && document.removeEventListener('click', handleOutsideClose);
      useHideScroll && window.removeEventListener('scroll', handleScrollClose);
    };
  }, [handleLeaveClose, handleOutsideClose, handleScrollClose, useHideClick, useHideScroll]);

  return (
    <div className={cn()} ref={tooltipRef} onMouseLeave={handleLeaveClose}>
      {anchor && (
        <button
          aria-labelledby={`toggle-${uniqueId}`}
          className={cn('button')}
          ref={anchorRef}
          type="button"
          onClick={trigger === 'click' ? handleOpen : undefined}
          onFocus={trigger === 'hover' ? handleFocus : undefined}
          onMouseEnter={trigger === 'hover' ? handleOpen : undefined}
        >
          {React.isValidElement(anchor)
            ? React.createElement((anchor as React.ReactElement<any>).type, {
                ...(anchor as React.ReactElement<any>).props,
              })
            : null}
        </button>
      )}
      {children && (
        <div
          id={`toggle-${uniqueId}`}
          ref={panelRef}
          role="tooltip"
          style={{ ...panel }}
          tabIndex={visible ? 0 : -1}
          className={cn('panel', {
            [`${placement}`]: !!placement,
            visible: visible,
            [`${type}`]: !!type,
          })}
          onKeyDown={handlePanelKeyDown}
        >
          <div className={cn('inner')}>
            {children}
            {useCloseBtn && (
              <button className={cn('close')} type="button" onClick={handleClose} onKeyDown={handleLastKeyDown}>
                <Icon color="grayscale-gray900" irName="닫기" name="close" size={closeSize} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;
