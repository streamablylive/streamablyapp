import { Fragment, useState } from "react";
import {
  Button,
  ContextMenu,
  ContextMenuItem,
  HangUpIcon,
  isMobileDevice,
  MessageModal,
  selectPermissions,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";

export const LeaveRoom = () => {
  const history = useNavigate();
  const [showEndRoomModal, setShowEndRoomModal] = useState(false);
  const [lockRoom, setLockRoom] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const permissions = useHMSStore(selectPermissions);
  const hmsActions = useHMSActions();

  const leaveRoom = () => {
    hmsActions.leave();
    history("/h");
  };

  return (
    <Fragment>
      <ContextMenu
        classes={{
          trigger: "w-auto h-auto",
          root: "static",
          menu: "w-56 bg-white dark:bg-gray-100",
          menuItem: "hover:bg-transparent-0 dark:hover:bg-transparent-0",
        }}
        onTrigger={value => {
          if (permissions?.endRoom) {
            setShowMenu(value);
          } else {
            leaveRoom();
          }
        }}
        menuOpen={showMenu}
        key="LeaveAction"
        trigger={
          <Button
            size="md"
            shape="circle"
            variant="danger"
            active={isMobileDevice()}
            key="LeaveRoom"
          >
            <HangUpIcon
              key="hangUp"
            />
          </Button>
        }
        menuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: 128,
            horizontal: "center",
          },
        }}
      >
        {permissions?.endRoom && (
          <ContextMenuItem
            label="End Room"
            key="endRoom"
            classes={{
              menuTitleContainer: "hidden",
              menuItemChildren: "my-1 w-full",
            }}
          >
            <Button
              shape="rectangle"
              variant="standard"
              classes={{ root: "w-full" }}
              onClick={() => {
                setShowEndRoomModal(true);
              }}
              >
              End Room for all
            </Button>
          </ContextMenuItem>
        )}
        <ContextMenuItem
          label="Leave Room"
          key="leaveRoom"
          classes={{
            menuTitleContainer: "hidden",
            menuItemChildren: "my-1 w-full overflow-hidden",
          }}
        >
          <Button
            shape="rectangle"
            variant="danger"
            classes={{ root: "w-full" }}
            onClick={() => {
              leaveRoom();
            }}
          >
            Just Leave
          </Button>
        </ContextMenuItem>
      </ContextMenu>
      <MessageModal
        show={showEndRoomModal}
        onClose={() => {
          setShowEndRoomModal(false);
          setLockRoom(false);
        }}
        title="End Room"
        body="Are you sure you want to end the room?"
        footer={
          <div className="flex">
            <div className="flex items-center">
              <label className="text-base dark:text-white text-gray-100">
                <input
                  type="checkbox"
                  className="mr-1"
                  onChange={() => setLockRoom(prev => !prev)}
                  checked={lockRoom}
                />
                <span>Lock room</span>
              </label>
            </div>
            <Button
              classes={{ root: "mr-3 ml-3" }}
              onClick={() => {
                setShowEndRoomModal(false);
                setLockRoom(false);
              }}
              >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                hmsActions.endRoom(lockRoom, "End Room");
                leaveRoom();
              }}
            >
              End Room
            </Button>
          </div>
        }
      />
    </Fragment>
  );
};
