"use client"

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} borderRadius="md" boxShadow="lg" p={4}>
            <Stack direction="row" align="center" spaceX={3}>
              {toast.type === "loading" ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Toast.Indicator color="white" />
              )}
              <Stack p={2} gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title fontSize="md" fontWeight="bold" color="white">{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description fontSize="sm" color="white">{toast.description}</Toast.Description>
                )}
              </Stack>
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger fontSize="sm" color="blue.400">{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
