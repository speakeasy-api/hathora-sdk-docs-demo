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
    { from: '*#tag/AppV1/operation/GetApps*', to: '/curl/app_v1/get_apps' },
    { from: '*#tag/AppV1/operation/CreateApp*', to: '/curl/app_v1/create_app' },
    { from: '*#tag/AppV1/operation/UpdateApp*', to: '/curl/app_v1/update_app' },
    { from: '*#tag/AppV1/operation/GetAppInfo*', to: '/curl/app_v1/get_app_info' },
    { from: '*#tag/AppV1/operation/DeleteApp*', to: '/curl/app_v1/delete_app' },
    { from: '*#tag/AppV1*', to: '/curl/app_v1' },
    { from: '*#tag/AuthV1/operation/LoginAnonymous*', to: '/curl/auth_v1/login_anonymous' },
    { from: '*#tag/AuthV1/operation/LoginNickname*', to: '/curl/auth_v1/login_nickname' },
    { from: '*#tag/AuthV1/operation/LoginGoogle*', to: '/curl/auth_v1/login_google' },
    { from: '*#tag/AuthV1*', to: '/curl/auth_v1' },
    { from: '*#tag/BuildV1/operation/GetBuilds*', to: '/curl/build_v1/get_builds' },
    { from: '*#tag/BuildV1/operation/GetBuildInfo*', to: '/curl/build_v1/get_build_info' },
    { from: '*#tag/BuildV1/operation/CreateBuild*', to: '/curl/build_v1/create_build' },
    { from: '*#tag/BuildV1/operation/RunBuild*', to: '/curl/build_v1/run_build' },
    { from: '*#tag/BuildV1/operation/DeleteBuild*', to: '/curl/build_v1/delete_build' },
    { from: '*#tag/BuildV1*', to: '/curl/build_v1' },
    { from: '*#tag/DeploymentV1/operation/GetDeployments*', to: '/curl/deployment_v1/get_deployments' },
    { from: '*#tag/DeploymentV1/operation/GetDeploymentInfo*', to: '/curl/deployment_v1/get_deployment_info' },
    { from: '*#tag/DeploymentV1/operation/CreateDeployment*', to: '/curl/deployment_v1/create_deployment' },
    { from: '*#tag/DeploymentV1*', to: '/curl/deployment_v1' },
    { from: '*#tag/DiscoveryV1/operation/GetPingServiceEndpoints*', to: '/curl/discovery_v1/get_ping_service_endpoints' },
    { from: '*#tag/DiscoveryV1*', to: '/curl/discovery_v1' },
    { from: '*#tag/LobbyV3/operation/CreateLobby*', to: '/curl/lobby_v3/create_lobby' },
    { from: '*#tag/LobbyV3/operation/ListActivePublicLobbies*', to: '/curl/lobby_v3/list_active_public_lobbies' },
    { from: '*#tag/LobbyV3/operation/GetLobbyInfoByRoomId*', to: '/curl/lobby_v3/get_lobby_info_by_room_id' },
    { from: '*#tag/LobbyV3/operation/GetLobbyInfoByShortCode*', to: '/curl/lobby_v3/get_lobby_info_by_short_code' },
    { from: '*#tag/LobbyV3*', to: '/curl/lobby_v3' },
    { from: '*#tag/LogV1/operation/GetLogsForProcess*', to: '/curl/log_v1/get_logs_for_process' },
    { from: '*#tag/LogV1/operation/DownloadLogForProcess*', to: '/curl/log_v1/download_log_for_process' },
    { from: '*#tag/LogV1*', to: '/curl/log_v1' },
    { from: '*#tag/MetricsV1/operation/GetMetrics*', to: '/curl/metrics_v1/get_metrics' },
    { from: '*#tag/MetricsV1*', to: '/curl/metrics_v1' },
    { from: '*#tag/ProcessesV1/operation/GetRunningProcesses*', to: '/curl/processes_v1/get_running_processes' },
    { from: '*#tag/ProcessesV1/operation/GetStoppedProcesses*', to: '/curl/processes_v1/get_stopped_processes' },
    { from: '*#tag/ProcessesV1/operation/GetProcessInfo*', to: '/curl/processes_v1/get_process_info' },
    { from: '*#tag/ProcessesV1*', to: '/curl/processes_v1' },
    { from: '*#tag/RoomV2/operation/CreateRoom*', to: '/curl/room_v2/create_room' },
    { from: '*#tag/RoomV2/operation/GetRoomInfo*', to: '/curl/room_v2/get_room_info' },
    { from: '*#tag/RoomV2/operation/GetActiveRoomsForProcess*', to: '/curl/room_v2/get_active_rooms_for_process' },
    { from: '*#tag/RoomV2/operation/GetInactiveRoomsForProcess*', to: '/curl/room_v2/get_inactive_rooms_for_process' },
    { from: '*#tag/RoomV2/operation/DestroyRoom*', to: '/curl/room_v2/destroy_room' },
    { from: '*#tag/RoomV2/operation/SuspendRoom*', to: '/curl/room_v2/suspend_room' },
    { from: '*#tag/RoomV2/operation/GetConnectionInfo*', to: '/curl/room_v2/get_connection_info' },
    { from: '*#tag/RoomV2/operation/UpdateRoomConfig*', to: '/curl/room_v2/update_room_config' },
    { from: '*#tag/RoomV2*', to: '/curl/room_v2' },
    { from: '*#tag/LobbyV1*', to: '/curl/lobby_v1' },
    { from: '*#tag/LobbyV2*', to: '/curl/lobby_v2' },
    { from: '*#tag/RoomV1*', to: '/curl/room_v1' },
    { from: '*#tag/BillingV1*', to: '/curl/billing_v1' },
    { from: '*#tag/ManagementV1*', to: '/curl/management_v1' },
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
