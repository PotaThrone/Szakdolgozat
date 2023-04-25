export interface Game{
  id: string;
  name: string;
  requirements: Requirements;
}

export interface Requirements{
  cpuCore: number;
  gpuClock: number;
  hddSpace: number;
  ramMemory: number;
}
