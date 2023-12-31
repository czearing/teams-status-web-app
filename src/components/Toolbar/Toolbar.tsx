import React from "react";
import { Toolbar as ToolbarComponent } from "@fluentui/react-components";
import { makeStyles } from "@griffel/react";
import { tokens } from "@fluentui/react-theme";
import { SignInDialog } from "./SignInDialog";
import { UserMenuSettings } from "./UserMenuSettings";
import { useSession } from "next-auth/react";

const useToolbarStyles = makeStyles({
  root: {
    position: "sticky",
    top: "0px",
    height: "48px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 10000,
    boxShadow: tokens.shadow2,
  },
  linkStyles: {
    textDecorationLine: "none",
    color: tokens.colorNeutralForeground1,
  },
});

export const Toolbar = () => {
  const toolbarStyles = useToolbarStyles();
  const { data: session } = useSession();

  return (
    <ToolbarComponent className={toolbarStyles.root}>
      <div />
      {session !== null ? <UserMenuSettings /> : <SignInDialog />}
    </ToolbarComponent>
  );
};
