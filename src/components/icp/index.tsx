import { styled } from '@umijs/max';

const ICPBar = () => {
  return (
    <ICP>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        皖ICP备2024036364号
      </a>
    </ICP>
  );
};

export default ICPBar;

const ICP = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 20px;
  background: #ddd;
  z-index: 1000;
  text-align: center;
`;
