import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects + custom redirects defined in theme.yaml
  const redirects: Redirect[] = [
    { from: '#tag/AppV1*', to: '/curl/app_v1' },
    { from: '#tag/AuthV1*', to: '/curl/auth_v1' },
    { from: '#tag/BuildV1*', to: '/curl/build_v1' },
    { from: '#tag/DeploymentV1*', to: '/curl/deployment_v1' },
    { from: '#tag/DiscoveryV1*', to: '/curl/discovery_v1' },
    { from: '#tag/LobbyV3*', to: '/curl/lobby_v3' },
    { from: '#tag/LogV1*', to: '/curl/log_v1' },
    { from: '#tag/MetricsV1*', to: '/curl/metrics_v1' },
    { from: '#tag/ProcessesV1*', to: '/curl/processes_v1' },
    { from: '#tag/RoomV2*', to: '/curl/room_v2' },
    { from: '#tag/LobbyV1*', to: '/curl/lobby_v1' },
    { from: '#tag/LobbyV2*', to: '/curl/lobby_v2' },
    { from: '#tag/RoomV1*', to: '/curl/room_v1' },
    { from: '#tag/BillingV1*', to: '/curl/billing_v1' },
    { from: '#tag/ManagementV1*', to: '/curl/management_v1' },
  ];

  useLayoutEffect(() => {
    const currentPath = window.location.pathname;

    const matchedRedirect = redirects.find((r) => {
      if (!r.from.endsWith('*')) {
        return r.from === currentPath;
      }

      if (r.from.startsWith('*') && r.from.endsWith('*')) {
        const totalHref = window.location.href;
        return totalHref.includes(r.from.replace(/\*/g, ''));
      }

      const basePath = r.from.replace('*', '');

      return currentPath.startsWith(basePath);
    });

    if (matchedRedirect) {
      const newPath =
        matchedRedirect.from.endsWith('*') &&
        !matchedRedirect.from.startsWith('*')
          ? matchedRedirect.to.replace('*', '') +
            currentPath.replace(matchedRedirect.from.replace('*', ''), '')
          : matchedRedirect.to;

      router.replace(newPath);
    }
  }, []);

  return null;
};
