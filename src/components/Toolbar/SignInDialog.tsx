import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { makeStyles, shorthands } from "@griffel/react";
import { ProviderButton } from "./ProviderButtons";
import { getProviders } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const useSignInDialogStyles = makeStyles({
  dialogRoot: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("35px"),
    maxWidth: "500px",
    textAlign: "center",
  },
  signInButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: "1",
    ...shorthands.gap("10px"),
  },
});

export const SignInDialog = () => {
  const signInDialogStyles = useSignInDialogStyles();

  const { data, isLoading } = useQuery(
    ["providers", prompt],
    () => getProviders(),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: true,
    }
  );

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogSurface className={signInDialogStyles.dialogRoot}>
        {/* <Image src="/image/signinArt.svg" alt="Calendar app company logo" height={200} width={200} /> */}
        <DialogTitle>Select a provider below</DialogTitle>
        <div className={signInDialogStyles.signInButtonWrapper}>
          {!isLoading && data ? (
            Object.values(data).map((provider: any, index) => (
              <ProviderButton
                provider={provider}
                id={index}
                key={provider.id}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </DialogSurface>
    </Dialog>
  );
};
