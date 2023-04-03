import { useRef, ReactElement } from 'react';
import { useOutlet, useLocation, matchPath } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const element = useOutlet();
  const keepElements = useRef<Record<string, ReactElement | null>>({});

  /* 因为本项目 '/' 有重定向到 '/home', 不将之前的 '/' 删除，会导致 '/' 一直重复渲染重定向 */
  if (keepElements.current['/']) delete keepElements.current['/'];

  keepElements.current[location.pathname] = element;

  return (
    <>
      {Object.entries(keepElements.current).map(([pathname, children]: any) => (
        <div
          key={pathname}
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
    </>
  );
};

export default Layout;
