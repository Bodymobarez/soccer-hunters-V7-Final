declare module 'simple-peer' {
  export interface Options {
    initiator?: boolean;
    channelConfig?: object;
    channelName?: string;
    trickle?: boolean;
    stream?: MediaStream;
    streams?: MediaStream[];
    config?: object;
    offerConstraints?: object;
    answerConstraints?: object;
    sdpTransform?: (sdp: string) => string;
    objectMode?: boolean;
  }

  export interface SignalData {
    type?: string;
    sdp?: string;
    candidate?: any;
    renegotiate?: boolean;
    transceiverRequest?: any;
  }

  export interface Instance {
    signal(data: SignalData): void;
    destroy(): void;
    on(event: string, callback: (...args: any[]) => void): void;
    once(event: string, callback: (...args: any[]) => void): void;
    removeListener(event: string, callback: (...args: any[]) => void): void;
    removeAllListeners(event?: string): void;
    addTransceiver(kind: string, options?: any): void;
    addStream(stream: MediaStream): void;
    removeStream(stream: MediaStream): void;
    addTrack(track: MediaStreamTrack, stream: MediaStream): void;
    removeTrack(track: MediaStreamTrack, stream: MediaStream): void;
    send(data: any): void;
    readonly connected: boolean;
    readonly destroyed: boolean;
    readonly localAddress: string;
    readonly localPort: number;
    readonly remoteAddress: string;
    readonly remotePort: number;
  }

  export default function SimplePeer(opts?: Options): Instance;
}
