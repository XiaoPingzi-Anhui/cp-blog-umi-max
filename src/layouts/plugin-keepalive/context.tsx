// @ts-nocheck
/* eslint-disable */
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
// keepalive 插件源码，但是有问题，就修改了一下，这里存着源码做参考
import React, { useState } from 'react';
import {
  useOutlet,
  useLocation,
  matchPath,
  useNavigate,
} from 'react-router-dom';
// import { Tabs, message } from 'antd';
import { getPluginManager } from '../core/plugin';

export const KeepAliveContext = React.createContext({});

const { TabPane } = Tabs;

const isKeepPath = (aliveList: any[], path: string) => {
  let isKeep = false;
  aliveList.map((item) => {
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }
    if (typeof item === 'string' && item.toLowerCase() === path) {
      isKeep = true;
    }
  });
  return isKeep;
};

export function useKeepOutlets() {
  const location = useLocation();
  const element = useOutlet();
  const navigate = useNavigate();
  const runtime = getPluginManager().applyPlugins({
    key: 'tabsLayout',
    type: 'modify',
    initialValue: {},
  });
  const { local } = runtime;

  const { cacheKeyMap, keepElements, keepalive, dropByCacheKey } =
    React.useContext<any>(KeepAliveContext);
  console.log('cacheKeyMap');
  const isKeep = isKeepPath(keepalive, location.pathname);
  if (isKeep) {
    keepElements.current[location.pathname] = element;
  }
  return (
    <>
      <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
        <Tabs
          hideAdd
          onChange={(key: string) => {
            navigate(key);
          }}
          activeKey={location.pathname}
          type="editable-card"
          onEdit={(targetKey: string) => {
            let newActiveKey = location.pathname;
            let lastIndex = -1;
            const newPanel = Object.keys(keepElements.current);
            for (let i = 0; i < newPanel.length; i++) {
              if (newPanel[i] === targetKey) {
                lastIndex = i - 1;
              }
            }
            const newPanes = newPanel.filter((pane) => pane !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
              if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex];
              } else {
                newActiveKey = newPanes[0];
              }
            }
            if (lastIndex === -1 && targetKey === location.pathname) {
              message.info('至少要保留一个窗口');
            } else {
              dropByCacheKey(targetKey);
              if (newActiveKey !== location.pathname) {
                navigate(newActiveKey);
              }
            }
          }}
        >
          {Object.entries(keepElements.current).map(
            ([pathname, element]: any) => (
              <TabPane tab={`${local[pathname] || pathname}`} key={pathname} />
            ),
          )}
        </Tabs>
      </div>
      {Object.entries(keepElements.current).map(([pathname, children]: any) => (
        <div
          key={`${pathname}:${cacheKeyMap[pathname] || '_'}`}
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden auto',
          }}
          className="runtime-keep-alive-layout"
          hidden={!matchPath(location.pathname, pathname)}
        >
          {children}
        </div>
      ))}
      <div
        hidden={isKeep}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden auto',
        }}
        className="runtime-keep-alive-layout-no"
      >
        {!isKeep && element}
      </div>
    </>
  );
}