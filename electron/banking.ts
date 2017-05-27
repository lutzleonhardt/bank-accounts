/**
 * Created by lutzl on 27.05.2017.
 */

import axios, { AxiosResponse } from 'axios'
import { ipcMain } from 'electron'

export function registerBankingCalls() {
  ipcMain.on('bankingRequest', async (event: any) => {
    const result: AxiosResponse = await axios.get('https://www.dkb.de/banking', { headers: { Accept: 'text/html' }, withCredentials: true })
    event.sender.send('bankingResponse', result)
  })
}

export function blub(text: string) {
  return text
}
