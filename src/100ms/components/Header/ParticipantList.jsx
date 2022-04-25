import React, { Fragment, useState } from "react";
import {
  Dropdown,
  Flex,
  Box,
  Text,
  Avatar,
  textEllipsis,
  IconButton,
  Tooltip,
} from "@100mslive/react-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PeopleIcon,
  SettingIcon,
} from "@100mslive/react-icons";
import {
  selectPermissions,
  useHMSStore,
  useParticipantList,
  useHMSActions
} from "@100mslive/react-sdk";
import { RoleChangeModal } from "../RoleChangeModal";
import { ConnectionIndicator } from "../Connection/ConnectionIndicator";
import {MdAdd} from 'react-icons/md'

export const ParticipantList = () => {
  const hmsActions=useHMSActions()
  const { roles, participantsByRoles, peerCount, isConnected } =
    useParticipantList();
  const [open, setOpen] = useState(false);
  const [selectedPeerId, setSelectedPeerId] = useState(null);
  const canChangeRole = useHMSStore(selectPermissions)?.changeRole;
  if (peerCount === 0) {
    return null;
  }
  const AddPeer=async(peer)=>{
    console.log(peer)
    await hmsActions.changeRole(
      peer.id,
      "participant",
      true
    ); 
  }
  

  return (
    <Fragment>
      <Dropdown.Root open={open} onOpenChange={value => setOpen(value)}>
        <Dropdown.Trigger asChild data-testid="participant_list">
          <Flex
            css={{
              color: "$textPrimary",
              borderRadius: "$1",
              border: "1px solid $textDisabled",
              padding: "$2 $4",
            }}
          >
            <Tooltip title="Participant List">
              <Flex>
                <ParticipantCount peerCount={peerCount} />
                {roles.length > 0 && (
                  <Box
                    css={{
                      ml: "$2",
                      "@lg": { display: "none" },
                      color: "$textDisabled",
                    }}
                  >
                    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Box>
                )}
              </Flex>
            </Tooltip>
          </Flex>
        </Dropdown.Trigger>
        {roles.length > 0 && (
          <Dropdown.Content
            sideOffset={5}
            align="end"
            css={{ height: "auto", maxHeight: "$96" }}
          >
            {roles.map(role => {
              const participants = participantsByRoles[role];
              return (
                <Dropdown.Group
                  css={{
                    h: "auto",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                  key={role}
                >
                  <ParticipantListInARole
                    roleName={role}
                    participants={participants}
                    canChangeRole={canChangeRole}
                    showActions={isConnected}
                    onParticipantAction={setSelectedPeerId}
                    onAddAction={AddPeer}
                  />
                </Dropdown.Group>
              );
            })}
          </Dropdown.Content>
        )}
      </Dropdown.Root>
      {selectedPeerId && (
        <RoleChangeModal
          peerId={selectedPeerId}
          onOpenChange={value => {
            !value && setSelectedPeerId(null);
          }}
        />
      )}
    </Fragment>
  );
};

const ParticipantCount = React.memo(({ peerCount }) => {
  return (
    <>
      <Box css={{ display: "block", mr: "$2" }}>
        <PeopleIcon />
      </Box>
      <Text variant="md">{peerCount}</Text>
    </>
  );
});

/**
 * list of all peers for the role
 */
const ParticipantListInARole = ({
  roleName,
  participants,
  showActions,
  onParticipantAction,
  onAddAction,
  canChangeRole,
}) => {
  return (
    <>
      <Dropdown.Label css={{ h: "$14" }}>
        <Text variant="md" css={{ pl: "$8" }}>
          {roleName}({participants.length})
        </Text>
      </Dropdown.Label>
      {participants.map((peer, i) => {
        return (
          <Dropdown.Item
            key={peer.id}
            css={{ w: "100%", h: "$14" }}
            data-testid={"participant_" + i}
          >
            <Box css={{ width: "$13" }}>
              <Avatar
                shape="square"
                name={peer.name}
                css={{
                  position: "unset",
                  transform: "unset",
                  mr: "$4",
                  fontSize: "$sm",
                }}
              />
            </Box>
            <Text variant="md" css={{ ...textEllipsis(150), flex: "1 1 0" }}>
              {peer.name}
            </Text>
            <ConnectionIndicator peerId={peer.id} />
            {showActions && (
              <ParticipantActions
                peerId={peer.id}
                onSettings={() => {
                  onParticipantAction(peer.id);
                }}
                onAdd={() => {
                  onAddAction(peer)
                }}
                Role={peer.roleName}
                canChangeRole={canChangeRole}
              />
            )}
          </Dropdown.Item>
        );
      })}
    </>
  );
};

/**
 * shows settings to change for a participant like changing their role
 */
const ParticipantActions = React.memo(({ canChangeRole, onSettings,onAdd,Role }) => {
  return (
    <Fragment>
      <Flex align="center">
        {canChangeRole && (
          <div className="flex items-center h-full space-x-2 py-2">
            {Role==='wait'&&<IconButton onClick={onAdd}>
              <MdAdd />
            </IconButton>}
            <IconButton onClick={onSettings}>
              <SettingIcon />
            </IconButton>
          </div>
        )}
      </Flex>
    </Fragment>
  );
});
