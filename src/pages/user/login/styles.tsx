import { styled } from '@umijs/max';

export const LoginPageWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  .ant-pro-form-login-page {
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
    justify-content: space-around;
    .ant-pro-form-login-page-notice {
      max-width: fit-content;
    }
    .ant-pro-form-login-page-container {
      justify-content: center;
      height: fit-content;
      padding: 20px 0;
      border-radius: 16px;
    }
    @media (min-width: 769px) {
      .ant-pro-form-login-page-container,
      .ant-pro-form-login-page-notice {
        opacity: 0.8;
      }
    }
  }
`;
