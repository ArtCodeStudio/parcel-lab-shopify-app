import { io as Io } from 'socket.io-client';
import * as _io from 'socket.io-client';

export const io: typeof Io = _io as any;
