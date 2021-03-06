import React, { useEffect } from 'react';
import LayoutToggle from 'components/LayoutToggle';
import Xbar from 'components/UILayout/Xbar';
import Hotbar from 'components/UILayout/Hotbar';
import { layouts } from 'lib/xbars';
import { useAppState, useAppDispatch } from 'components/App/context';
import styles from './UILayout.styles.module.scss';

function UILayout() {
  const { layout, encodedSlots } = useAppState();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (encodedSlots) {
      appDispatch({ type: 'bulkLoadActionsToSlots', slottedActions: encodedSlots });
    }
  }, []);

  function SlotLayout() {
    switch (layouts[layout]) {
      case 'xbars': {
        return <Xbar />;
      }
      case 'hotbars': {
        return <Hotbar />;
      }
      default: {
        throw new Error(`Unknown layout type: ${layout}`);
      }
    }
  }

  return (
    <>
      <LayoutToggle />
      <div className={styles.uiLayout}>
        <SlotLayout />
      </div>
    </>
  );
}

export default UILayout;
