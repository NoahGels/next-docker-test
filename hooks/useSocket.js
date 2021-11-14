import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket(cb) {
  const [activeSocket, setActiveSocket] = useState(null);

  useEffect(() => {
    fetch('/api/socketio')
      .finally(() => {
      const socket = io();
      // debug("Socket updated", { socket, activeSocket });
      if (activeSocket || !socket) return;
      cb && cb(socket);
      setActiveSocket(socket);
      return function cleanup() {
        // debug("Running useSocket cleanup", { socket });
        socket.off("message.chat1", cb);
      };
    })
  }, [activeSocket, cb]);

  return activeSocket;
}
