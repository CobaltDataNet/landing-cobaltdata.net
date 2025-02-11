import { 
  Box, Container, Text, Button, Divider, Flex, Switch, HStack 
} from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Load Subscription State from LocalStorage & React Query
  const [subscriptionSettings, setSubscriptionSettings] = useState({
    hasSubscription: false,
    isTrial: false,
    isDeactivated: false,
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem("subscriptionSettings");
  
    if (storedSettings) {
      setSubscriptionSettings(JSON.parse(storedSettings));
    } else {
      const querySettings = queryClient.getQueryData(["subscriptionSettings"]);
      
      // ✅ Ensure querySettings is valid before setting state
      if (querySettings && typeof querySettings === "object") {
        setSubscriptionSettings(querySettings);
      } else {
        // ✅ Provide a proper default structure instead of an empty object
        setSubscriptionSettings({
          hasSubscription: false,
          isTrial: false,
          isDeactivated: false,
        });
      }
    }
  }, [queryClient]);
  
  const { hasSubscription, isTrial } = subscriptionSettings;
  const isLocked = !hasSubscription && !isTrial;

  return (
    <Container maxW="full">
      {/* 🚀 Promo Header */}
      <Box bg="blue.100" p={4} textAlign="center" borderRadius="md">
        <Text fontWeight="bold" fontSize="lg">🚀 Get a 3-day free trial of our proxies!</Text>
        <Button colorScheme="blue" size="sm" mt={2} onClick={() => navigate({ to: "/proxies/pricing" })}>
          Try now
        </Button>
      </Box>

      {/* Filters & Welcome Section */}
      <Flex mt={6} gap={4} justify="space-between" align="center" flexWrap="wrap">
        {/* Welcome Message */}
        <Box textAlign="left" flex="1">
          <Text fontSize="xl" fontWeight="bold">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text fontSize="sm">Welcome back, let’s get started!</Text>
        </Box>

        {/* Subscription Status */}
        <HStack spacing={3}>
          <Text fontWeight="bold">Subscription:</Text>
          <Switch isChecked={hasSubscription} isDisabled />
        </HStack>
      </Flex>

      <Divider my={4} />

      {/* Subscription Restriction */}
      {isLocked ? (
        <Box textAlign="center" mt={6}>
          <Text fontSize="lg" fontWeight="bold" color="red.500">
            🔒 Access restricted! Subscribe to unlock full dashboard access.
          </Text>
          <Button mt={3} colorScheme="blue" onClick={() => navigate({ to: "/billing" })}>
            Upgrade Now
          </Button>
        </Box>
      ) : (
        <Text>Dashboard Content Here...</Text>
      )}
    </Container>
  );
}

export default Dashboard;
