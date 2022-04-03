import { Loading } from "@100mslive/react-ui";

const FullPageProgress = () => (
  <div className="h-full w-full">
    <div className="flex w-full justify-center h-full items-center">
      <Loading width="100" height="100" />
    </div>
  </div>
);

export default FullPageProgress;
