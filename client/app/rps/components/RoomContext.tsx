// components/RoomContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface RoomContextProps {
  rooms: string[];
  createRoom: () => string;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<string[]>([]);

  const generateRandomString = (length: number): string => {
    let result = "";
    const characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const createRoom = (): string => {
    const roomId = generateRandomString(6);
    setRooms([...rooms, roomId]);
    return roomId;
  };

  return (
    <RoomContext.Provider value={{ rooms, createRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = (): RoomContextProps => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
