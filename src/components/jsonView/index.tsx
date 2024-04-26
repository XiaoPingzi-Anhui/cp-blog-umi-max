import { FC, memo } from 'react';
import { styled } from '@umijs/max';
import {
  JsonView,
  allExpanded,
  defaultStyles,
  Props,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface JsonViewProps extends Props {
  className?: string;
}

const JsonViewRC: FC<JsonViewProps> = ({ className, ...props }) => {
  return (
    <JsonViewContainer className={className}>
      <JsonView
        style={defaultStyles}
        shouldExpandNode={allExpanded}
        {...props}
      />
    </JsonViewContainer>
  );
};

export default memo(JsonViewRC);

const JsonViewContainer = styled.div`
  max-height: 350px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cfcfcf;
    border-radius: 4px;
    border: none;
    visibility: hidden;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
`;
