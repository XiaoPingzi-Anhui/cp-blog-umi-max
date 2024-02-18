import { useRef, ReactElement, CSSProperties } from 'react';
import { useOutlet, useLocation, matchPath } from 'react-router-dom';
import { NO_KEEPALIVE_URL } from '@/constants/url';
import Global from '@/global';

const STYLE_OBJ: CSSProperties = {
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: 'hidden auto',
};

const Layout = () => {
  const location = useLocation();
  const element = useOutlet();
  const keepElements = useRef<Record<string, ReactElement | null>>({});

  /* 因为本项目 '/' 有重定向到 '/home', 不将之前的 '/' 删除，会导致 '/' 一直重复渲染重定向 */
  if (keepElements.current['/']) delete keepElements.current['/'];

  if (!NO_KEEPALIVE_URL.includes(location.pathname))
    keepElements.current[location.pathname] = element;
  else return element;

  return (
    <>
      {Object.entries(keepElements.current).map(([pathname, children]: any) => (
        <div
          key={pathname}
          style={STYLE_OBJ}
          className="runtime-keep-alive-layout"
          hidden={!matchPath(location.pathname, pathname)}
        >
          {children}
        </div>
      ))}
      <Global />
    </>
  );
};

export default Layout;
