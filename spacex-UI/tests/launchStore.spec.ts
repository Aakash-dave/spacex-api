import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { useLaunchStore } from '../src/stores/launchStore';

vi.mock('axios');
const mockedAxios = axios as typeof axios;

vi.mock('vue3-toastify', () => {
  return {
    toast: {
      warn: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

describe('launchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches launches and updates state', async () => {
    const mockLaunches = [
      { flight_number: 111, name: 'Launch 1', date_utc: '2024-09-20' },
      { flight_number: 222, name: 'Launch 2', date_utc: '2024-10-20' },
    ];

    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: mockLaunches });

    const launchStore = useLaunchStore();
    await launchStore.fetchAllLaunches();

    expect(launchStore.allLaunches).toEqual(mockLaunches);
  });

  it('fetches saved launches and updates state', async () => {
    const mockSavedLaunches = [
      { _id: '111', flight_number: 111, name: 'Saved Launch 1', date_utc: '2024-09-10' },
    ];

    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: mockSavedLaunches });

    const launchStore = useLaunchStore();
    await launchStore.fetchSavedLaunches();

    expect(launchStore.savedLaunch).toEqual(mockSavedLaunches);
  });

  it('saves a launch and updates state', async () => {
    const newLaunch = { flight_number: 333, name: 'New Launch', date_utc: '2024-11-01' };
    const savedLaunch = { ...newLaunch, _id: '333' };

    mockedAxios.post = vi.fn().mockResolvedValueOnce({ data: savedLaunch });

    const launchStore = useLaunchStore();
    await launchStore.addLaunch(newLaunch);

    expect(launchStore.savedLaunch).toContainEqual(savedLaunch);
  });

  it('deletes a launch and updates state', async () => {
    const launchStore = useLaunchStore();
    launchStore.savedLaunch = [
      { _id: '111', flight_number: 111, name: 'Saved Launch 1', date_utc: '2024-09-15' },
      { _id: '222', flight_number: 222, name: 'Saved Launch 2', date_utc: '2024-10-10' },
    ];

    mockedAxios.delete = vi.fn().mockResolvedValueOnce({});

    await launchStore.deleteLaunch(1);

    expect([launchStore.savedLaunch]).not.toContainEqual({ _id: '111', flight_number: 111, name: 'Saved Launch 1', date_utc: '2024-09-15' });
  });
});
