import React, { useState } from "react";
import {
  selectAvailableRoleNames,
  selectRemotePeers,
  useHMSStore,
  selectUnreadHMSMessagesCount,
  selectMessagesUnreadCountByRole,
  selectMessagesUnreadCountByPeerID,
} from "@100mslive/react-sdk";
import {
  HorizontalDivider,
  IconButton,
  Input,
  Text,
  Tooltip,
  Flex
} from "@100mslive/react-ui";
import { CheckIcon, CrossIcon } from "@100mslive/react-icons";
import { ChatDotIcon } from "./ChatDotIcon";

const SelectorItem = ({ value, active, onClick, unreadCount }) => {
  return (

    <div onClick={onClick} className="flex content-center cursor-pointer py-2 px-6 flex-shrink-0 hover:bg-gray-500">
      <Text variant="sm">{value}</Text>
      <div className="flex content-center ml-auto ">
        {unreadCount > 0 && (
          <Tooltip title={`${unreadCount} unread`}>
            <div className={active?"mr-3":"mr-0"} >
              <ChatDotIcon />
            </div>
          </Tooltip>
        )}
        {active && <CheckIcon width={16} height={16} />}
      </div>
    </div>
  );
};

const SelectorHeader = React.memo(({ children }) => {
  return (
    <div className="flex-shrink-0">
      <HorizontalDivider space={4} />
      <Text variant="md" css={{ p: "$4 $8", fontWeight: "$semiBold" }}>
        {children}
      </Text>
    </div>
  );
});

const Everyone = React.memo(({ onSelect, active }) => {
  const unreadCount = useHMSStore(selectUnreadHMSMessagesCount);
  return (
    <SelectorItem
      value="Everyone"
      active={active}
      unreadCount={unreadCount}
      onClick={() => {
        onSelect({ role: "", peerId: "", selection: "Everyone" });
      }}
    />
  );
});

const RoleItem = React.memo(({ onSelect, role, active }) => {
  const unreadCount = useHMSStore(selectMessagesUnreadCountByRole(role));
  return (
    <SelectorItem
      value={role}
      active={active}
      unreadCount={unreadCount}
      onClick={() => {
        onSelect({ role: role, selection: role });
      }}
    />
  );
});

const PeerItem = ({ onSelect, peerId, name, active }) => {
  const unreadCount = useHMSStore(selectMessagesUnreadCountByPeerID(peerId));
  return (
    <SelectorItem
      value={name}
      active={active}
      unreadCount={unreadCount}
      onClick={() => {
        onSelect({ role: "", peerId, selection: name });
      }}
    />
  );
};

export const ChatSelector = ({ role, peerId, onSelect }) => {
  const roles = useHMSStore(selectAvailableRoleNames);
  const peers = useHMSStore(selectRemotePeers);
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col w-full h-[95%] absolute top-4  left-0 rounded-lg  overflow-y-auto bg-gray-900">
      <div className="p-4 flex-shrink-0 relative">
        <Input
          type="text"
          autoCorrect="off"
          autoComplete="name"
          value={search}
          placeholder="Search Participants"
          css={{
            bg: "$menuBg",
            w: "100%",
            pr: "$12",
            "$:focus": { boxShadow: "none", outline: "none" },
          }}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        <div className="flex items-center absolute right-0 top-0 h-full mr-6">
          <div>
          <IconButton onClick={() => setSearch("")}>
            <CrossIcon width={18} height={18} />
          </IconButton>
          </div>
        </div>
      </div>
      <Everyone onSelect={onSelect} active={!role && !peerId} />
      {roles.length > 0 && <SelectorHeader>Roles</SelectorHeader>}
      {roles.map(userRole => 
          <RoleItem
            key={userRole}
            active={role === userRole}
            role={userRole}
            onSelect={onSelect}
          />
      )}
      {peers.length > 0 && <SelectorHeader>Participants</SelectorHeader>}
      {peers
        .filter(peer => !search || peer.name.toLowerCase().includes(search))
        .map(peer => {
          return (
            <PeerItem
            key={peer.id}
            name={peer.name}
            peerId={peer.id}
            active={peer.id === peerId}
              onSelect={onSelect}
            />
            );
          })}
    </div>
  );
};
